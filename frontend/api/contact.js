export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Telegram credentials (we will configure these in Vercel settings)
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8207868117:AAHJJshg2iP4sXQmQLZnH0u434GFGHrVbMM';
  const chatId = process.env.TELEGRAM_CHAT_ID || '721920259';

  const text = `💼 *New Contact Message!*\n\n` +
               `👤 *Name:* ${name}\n` +
               `✉️ *Email:* ${email}\n\n` +
               `💬 *Message:*\n${message}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API Error:', errorText);
      return res.status(502).json({ error: 'Failed to send message to Telegram' });
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
