import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getProfile, 
  getEducation, 
  getExperience, 
  getSkills, 
  getProjects, 
  getLanguages, 
  submitContactMessage 
} from './api';

function App() {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [languages, setLanguages] = useState([]);

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    // Fetch all portfolio data from Spring Boot REST API
    getProfile().then(setProfile).catch(err => console.error("Error loading profile", err));
    getEducation().then(setEducation).catch(err => console.error("Error loading education", err));
    getExperience().then(setExperience).catch(err => console.error("Error loading experience", err));
    getSkills().then(setSkills).catch(err => console.error("Error loading skills", err));
    getProjects().then(setProjects).catch(err => console.error("Error loading projects", err));
    getLanguages().then(setLanguages).catch(err => console.error("Error loading languages", err));
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      setStatusMsg('All fields are required.');
      return;
    }
    setStatus('loading');
    try {
      await submitContactMessage({ name, email, message });
      setStatus('success');
      setStatusMsg('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setStatusMsg('Failed to send message. Please try again.');
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {});

  return (
    <div className="portfolio-app">
      {/* Decorative Background Glows */}
      <div className="background-glow">
        <div className="glow-bubble-1"></div>
        <div className="glow-bubble-2"></div>
      </div>

      {/* Navigation Header */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="nav-logo">
            {profile ? profile.name : 'Portfolio'}
          </a>
          <div className="nav-links">
            <span onClick={() => handleScrollTo('experience')} className="nav-link">Experience</span>
            <span onClick={() => handleScrollTo('education')} className="nav-link">Education</span>
            <span onClick={() => handleScrollTo('skills')} className="nav-link">Skills</span>
            <span onClick={() => handleScrollTo('projects')} className="nav-link">Projects</span>
            <span onClick={() => handleScrollTo('contact')} className="nav-link">Contact</span>
          </div>
        </div>
      </nav>

      {/* Main Content Areas */}
      <main className="main-content">
        
        {/* Hero Banner */}
        {profile && (
          <motion.section 
            className="hero-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-text">
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Hi, I'm <span>{profile.name}</span>
              </motion.h1>
              <motion.p 
                className="hero-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {profile.tagline}
              </motion.p>
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <button onClick={() => handleScrollTo('contact')} className="btn-primary">
                  Get in touch
                </button>
                <a href="/cv.pdf" download="Aruzhan_Shakenova_CV.pdf" className="btn-secondary">
                  Download CV
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="hero-avatar"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
            >
              <img src={profile.profileImageUrl} alt={profile.name} onError={(e) => {
                e.target.onerror = null;
                // Fallback image using generic placeholder design avatar
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80";
              }} />
            </motion.div>
          </motion.section>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section id="experience">
            <h2 className="section-title">Work Experience</h2>
            <div className="timeline-container">
              {experience.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="timeline-card"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{item.position}</h3>
                      <h4 className="card-subtitle">{item.company}</h4>
                    </div>
                    <span className="card-date">{item.startDate} — {item.endDate}</span>
                  </div>
                  <p className="card-description">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Education Timeline */}
        {education.length > 0 && (
          <section id="education">
            <h2 className="section-title">Education</h2>
            <div className="timeline-container">
              {education.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="timeline-card"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{item.degree}</h3>
                      <h4 className="card-subtitle">{item.institution}</h4>
                    </div>
                    <span className="card-date">{item.startDate} — {item.endDate}</span>
                  </div>
                  <p className="card-description">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {Object.keys(skillsByCategory).length > 0 && (
          <section id="skills">
            <h2 className="section-title">Technical Expertise</h2>
            <div className="skills-grid">
              {Object.entries(skillsByCategory).map(([category, items], catIndex) => (
                <motion.div 
                  key={category} 
                  className="skill-category"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  <h3 className="category-name">{category}</h3>
                  <div className="skill-items">
                    {items.map((skill, sIndex) => (
                      <div key={sIndex} className="skill-item">
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percentage">{skill.proficiency}%</span>
                        </div>
                        <div className="skill-bar-bg">
                          <motion.div 
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.div 
                  key={index} 
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="project-image">
                    <img src={project.imageUrls && project.imageUrls[0] ? project.imageUrls[0] : ""} alt={project.name} onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80";
                    }} />
                  </div>
                  <div className="project-info">
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    {project.features && (
                      <ul className="project-features">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx}>{feat}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-tags">
                      {project.techStack && project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="project-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                          GitHub
                        </a>
                      )}
                      {project.liveDemoUrl && (
                        <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Form Section */}
        <section id="contact">
          <h2 className="section-title">Contact</h2>
          <div className="contact-container">
            <div className="contact-info">
              <div>
                <h3 className="contact-info-title">Let's connect</h3>
                <p className="contact-info-description">
                  Have an interesting project proposal, opportunities, or just want to chat? Fill out the form or reach out directly.
                </p>
              </div>

              <div className="contact-details">
                {profile && (
                  <>
                    <div className="contact-detail-item">
                      <div className="contact-detail-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                      </div>
                      <div className="contact-detail-text">
                        <h4>Email</h4>
                        <p>{profile.email}</p>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-detail-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </div>
                      <div className="contact-detail-text">
                        <h4>Phone</h4>
                        <p>{profile.phone}</p>
                      </div>
                    </div>

                    <div className="contact-detail-item">
                      <div className="contact-detail-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div className="contact-detail-text">
                        <h4>Location</h4>
                        <p>{profile.location}</p>
                      </div>
                    </div>
                  </>
                )}
                
                {languages.length > 0 && (
                  <div className="contact-detail-item">
                    <div className="contact-detail-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                      </svg>
                    </div>
                    <div className="contact-detail-text">
                      <h4>Languages</h4>
                      <p>{languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="form-name">Name</label>
                <input 
                  type="text" 
                  id="form-name" 
                  className="form-input" 
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-email">Email</label>
                <input 
                  type="email" 
                  id="form-email" 
                  className="form-input" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-message">Message</label>
                <textarea 
                  id="form-message" 
                  className="form-textarea" 
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              {status && (
                <div className={`form-message ${status}`}>
                  {statusMsg}
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-text">
          &copy; {new Date().getFullYear()} {profile ? profile.name : ''}. Built with Spring Boot & React.
        </div>
      </footer>
    </div>
  );
}

export default App;
