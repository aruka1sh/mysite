package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.chat.id}")
    private String chatId;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    @PostMapping("/contact")
    public ResponseEntity<String> submitContact(@RequestBody ContactMessage message) {
        try {
            // Format message style for Telegram
            String text = String.format(
                "💼 *New Contact Message!*\n\n" +
                "👤 *Name:* %s\n" +
                "✉️ *Email:* %s\n\n" +
                "💬 *Message:*\n%s",
                message.getName(),
                message.getEmail(),
                message.getMessage()
            );

            // Telegram API URL
            String url = String.format(
                "https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s&parse_mode=Markdown",
                botToken,
                chatId,
                URLEncoder.encode(text, StandardCharsets.UTF_8)
            );

            // Build HTTP Request
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

            // Send request asynchronously
            httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenAccept(response -> {
                    if (response.statusCode() != 200) {
                        System.err.println("Failed to send Telegram message: " + response.body());
                    }
                });

            return ResponseEntity.ok("Message received and sent to Telegram successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to process message");
        }
    }
}
