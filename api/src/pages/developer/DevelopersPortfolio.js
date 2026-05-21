import React, { useState } from 'react';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, 
  FaCode, FaDesktop, FaMobile, FaDatabase,
  FaCloud, FaShieldAlt, FaRocket, FaStar,
  FaUserTie, FaBriefcase, FaGraduationCap,
  FaAward, FaHeart, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaLaptopCode, FaGitAlt,
  FaReact, FaNodeJs, FaPython, FaJava,
  FaDocker, FaAws, FaProjectDiagram
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import './DevelopersPortfolio.css';

const DevelopersPortfolio = () => {
  const [activeTab, setActiveTab] = useState('about');

  const developer = {
    name: 'Alex Morgan',
    title: 'Senior Full Stack Developer',
    role: 'Lead Software Architect',
    company: 'Command Tech Solutions',
    location: 'San Francisco, CA',
    email: 'alex.morgan@commandtech.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate full-stack developer with 8+ years of experience building scalable enterprise applications. Specialized in React, Node.js, and cloud architecture.',
    avatar: 'https://ui-avatars.com/api/?background=7C9A92&color=fff&name=Alex+Morgan&size=120',
    stats: {
      projects: 47,
      years: 8,
      clients: 32,
      awards: 12
    },
    skills: {
      frontend: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Next.js'],
      backend: ['Node.js', 'Python', 'Java', 'Go', 'PHP'],
      database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
      tools: ['Docker', 'Kubernetes', 'AWS', 'Git', 'Jenkins']
    },
    experience: [
      {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Solutions',
        period: '2021 - Present',
        description: 'Leading frontend team, architecting microservices, optimizing performance'
      },
      {
        title: 'Software Engineer',
        company: 'InnovateLabs',
        period: '2018 - 2021',
        description: 'Developed REST APIs, integrated third-party services, mentored juniors'
      },
      {
        title: 'Junior Developer',
        company: 'StartupHub',
        period: '2016 - 2018',
        description: 'Built responsive web applications, implemented UI/UX designs'
      }
    ],
    education: [
      {
        degree: 'M.Sc. Computer Science',
        institution: 'Stanford University',
        year: '2016'
      },
      {
        degree: 'B.Sc. Software Engineering',
        institution: 'UC Berkeley',
        year: '2014'
      }
    ],
    projects: [
      {
        name: 'Command Portal',
        description: 'Enterprise military management system',
        tech: ['React', 'Node.js', 'MongoDB'],
        link: '#'
      },
      {
        name: 'Analytics Dashboard',
        description: 'Real-time data visualization platform',
        tech: ['Vue.js', 'D3.js', 'Express'],
        link: '#'
      },
      {
        name: 'Cloud Infrastructure',
        description: 'AWS-based microservices architecture',
        tech: ['AWS', 'Docker', 'Kubernetes'],
        link: '#'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect',
      'Microsoft Certified: Azure Developer',
      'Google Professional Cloud Architect'
    ]
  };

  const tabs = [
    { id: 'about', label: 'About', icon: FaUserTie },
    { id: 'skills', label: 'Skills', icon: FaCode },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram }
  ];

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        
        {/* Hero Section */}
        <div className="portfolio-hero">
          <div className="hero-background"></div>
          <div className="hero-content">
            <div className="hero-avatar">
              <img src={developer.avatar} alt={developer.name} />
            </div>
            <h1 className="hero-name">{developer.name}</h1>
            <p className="hero-title">{developer.title}</p>
            <p className="hero-role">{developer.role} at {developer.company}</p>
            <div className="hero-location">
              <FaMapMarkerAlt /> {developer.location}
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-value">{developer.stats.projects}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">{developer.stats.years}+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">{developer.stats.clients}</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">{developer.stats.awards}</span>
                <span className="stat-label">Awards</span>
              </div>
            </div>
            <div className="hero-social">
              <a href="#" className="social-link"><FaGithub /></a>
              <a href="#" className="social-link"><FaLinkedin /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaEnvelope /></a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="portfolio-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`portfolio-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="portfolio-content">
          
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="about-section">
              <GlassCard className="about-card">
                <h3 className="section-title">Bio</h3>
                <p className="about-bio">{developer.bio}</p>
                
                <div className="contact-info">
                  <h4>Contact Information</h4>
                  <div className="contact-grid">
                    <div className="contact-item">
                      <FaEnvelope /> {developer.email}
                    </div>
                    <div className="contact-item">
                      <FaPhone /> {developer.phone}
                    </div>
                    <div className="contact-item">
                      <FaMapMarkerAlt /> {developer.location}
                    </div>
                    <div className="contact-item">
                      <FaCalendarAlt /> Joined 2016
                    </div>
                  </div>
                </div>

                <div className="education-section">
                  <h4>Education</h4>
                  {developer.education.map((edu, idx) => (
                    <div key={idx} className="education-item">
                      <div className="education-icon"><FaGraduationCap /></div>
                      <div className="education-details">
                        <h5>{edu.degree}</h5>
                        <p>{edu.institution} | {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="certifications-section">
                  <h4>Certifications</h4>
                  <div className="cert-list">
                    {developer.certifications.map((cert, idx) => (
                      <div key={idx} className="cert-item">
                        <FaAward /> {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="skills-section">
              <div className="skills-grid">
                <GlassCard className="skill-category">
                  <h3><FaLaptopCode /> Frontend</h3>
                  <div className="skill-list">
                    {developer.skills.frontend.map((skill, idx) => (
                      <div key={idx} className="skill-item">
                        <span className="skill-name">{skill}</span>
                        <div className="skill-bar">
                          <div className="skill-progress" style={{ width: `${85 - idx * 5}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="skill-category">
                  <h3><FaDatabase /> Backend</h3>
                  <div className="skill-list">
                    {developer.skills.backend.map((skill, idx) => (
                      <div key={idx} className="skill-item">
                        <span className="skill-name">{skill}</span>
                        <div className="skill-bar">
                          <div className="skill-progress" style={{ width: `${80 - idx * 5}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="skill-category">
                  <h3><FaDatabase /> Database</h3>
                  <div className="skill-list">
                    {developer.skills.database.map((skill, idx) => (
                      <div key={idx} className="skill-item">
                        <span className="skill-name">{skill}</span>
                        <div className="skill-bar">
                          <div className="skill-progress" style={{ width: `${85 - idx * 8}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="skill-category">
                  <h3><FaCloud /> Tools & DevOps</h3>
                  <div className="skill-list">
                    {developer.skills.tools.map((skill, idx) => (
                      <div key={idx} className="skill-item">
                        <span className="skill-name">{skill}</span>
                        <div className="skill-bar">
                          <div className="skill-progress" style={{ width: `${75 - idx * 5}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="experience-section">
              <GlassCard className="timeline-card">
                <div className="timeline">
                  {developer.experience.map((exp, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <h3>{exp.title}</h3>
                          <span className="timeline-date">{exp.period}</span>
                        </div>
                        <h4>{exp.company}</h4>
                        <p>{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="projects-section">
              <div className="projects-grid">
                {developer.projects.map((project, idx) => (
                  <GlassCard key={idx} className="project-card">
                    <div className="project-header">
                      <FaRocket className="project-icon" />
                      <h3>{project.name}</h3>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, tidx) => (
                        <span key={tidx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <Button variant="outline" size="small">View Project →</Button>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="portfolio-footer">
          <p>© 2024 {developer.name} - All Rights Reserved</p>
          <p>Made with <FaHeart className="heart-icon" /> using React</p>
        </div>
      </div>
    </div>
  );
};

export default DevelopersPortfolio;