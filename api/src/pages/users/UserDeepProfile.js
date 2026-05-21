import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaBuilding, FaGlobe, FaCalendarAlt, FaUserFriends,
  FaFileAlt, FaHeart, FaShare, FaStar, FaEdit,
  FaDownload, FaPrint, FaCheckCircle, FaClock,
  FaShieldAlt, FaAward, FaBriefcase, FaGraduationCap
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import './UserDeepProfile.css';

const UserDeepProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user data
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        
        // Check if user exists
        if (!userRes.ok) {
          throw new Error('User not found');
        }
        
        const userData = await userRes.json();
        
        // Fetch user posts
        const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const postsData = await postsRes.json();
        
        // Enhance user data
        const enhancedUser = {
          ...userData,
          fullName: userData.name,
          initials: userData.name.split(' ').map(n => n[0]).join(''),
          avatar: `https://ui-avatars.com/api/?background=7C9A92&color=fff&name=${userData.name.replace(/ /g, '+')}&size=200`,
          status: 'Active',
          department: ['Command', 'Intelligence', 'Operations'][Math.floor(Math.random() * 3)],
          joinDate: '2022-01-15',
          lastActive: '2024-01-15 10:30 AM',
          role: 'Senior Officer',
          clearance: 'Top Secret',
          projects: Math.floor(Math.random() * 20) + 5,
          awards: Math.floor(Math.random() * 10) + 2,
          skills: ['Leadership', 'Strategic Planning', 'Risk Assessment', 'Team Management'],
          languages: ['English', 'Spanish', 'French'],
          bio: 'Experienced military officer with over 10 years of service. Specialized in strategic operations and team leadership. Proven track record in mission success and personnel management.'
        };
        
        setUser(enhancedUser);
        setUserPosts(postsData);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchUserData();
    }
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaUserFriends },
    { id: 'activity', label: 'Activity', icon: FaFileAlt },
    { id: 'posts', label: 'Posts', icon: FaFileAlt },
    { id: 'performance', label: 'Performance', icon: FaStar }
  ];

  if (loading) {
    return (
      <div className="user-profile-page">
        <div className="profile-container">
          <div className="profile-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-content"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-profile-page">
        <div className="profile-container">
          <div className="error-message">
            <h2>User Not Found</h2>
            <p>The user you're looking for doesn't exist or has been removed.</p>
            <Button variant="primary" onClick={() => navigate('/users')}>
              ← Back to Directory
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/users')}>
          <FaArrowLeft /> Back to Directory
        </button>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-cover"></div>
          <div className="profile-info">
            <div className="profile-avatar">
              <img src={user.avatar} alt={user.name} />
              <span className="profile-status"></span>
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-title">{user.role} • {user.department}</p>
              <div className="profile-badges">
                <span className="badge clearance"><FaShieldAlt /> {user.clearance}</span>
                <span className="badge status"><FaCheckCircle /> {user.status}</span>
              </div>
            </div>
            <div className="profile-actions">
              <Button variant="outline" icon={FaEdit}>Edit Profile</Button>
              <Button variant="outline" icon={FaDownload}>Export</Button>
              <Button variant="outline" icon={FaPrint}>Print</Button>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <FaCalendarAlt />
            <div>
              <span className="stat-value">{user.joinDate}</span>
              <span className="stat-label">Joined</span>
            </div>
          </div>
          <div className="stat-item">
            <FaClock />
            <div>
              <span className="stat-value">Active</span>
              <span className="stat-label">Last seen {user.lastActive}</span>
            </div>
          </div>
          <div className="stat-item">
            <FaBriefcase />
            <div>
              <span className="stat-value">{user.projects}</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
          <div className="stat-item">
            <FaAward />
            <div>
              <span className="stat-value">{user.awards}</span>
              <span className="stat-label">Awards</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-grid">
              {/* About Section */}
              <GlassCard className="about-section">
                <h3>About</h3>
                <p className="bio-text">{user.bio}</p>
                
                <div className="info-grid">
                  <div className="info-item">
                    <FaEnvelope />
                    <div>
                      <label>Email</label>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaPhone />
                    <div>
                      <label>Phone</label>
                      <span>{user.phone}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt />
                    <div>
                      <label>Address</label>
                      <span>{user.address?.street}, {user.address?.city}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaBuilding />
                    <div>
                      <label>Company</label>
                      <span>{user.company?.name}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaGlobe />
                    <div>
                      <label>Website</label>
                      <span>{user.website}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaGraduationCap />
                    <div>
                      <label>Education</label>
                      <span>M.Sc. Strategic Studies</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Skills & Languages */}
              <GlassCard className="skills-section">
                <h3>Skills & Expertise</h3>
                <div className="skills-list">
                  {user.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <h3 style={{ marginTop: 24 }}>Languages</h3>
                <div className="languages-list">
                  {user.languages.map((lang, idx) => (
                    <div key={idx} className="language-item">
                      <span>{lang}</span>
                      <div className="proficiency-bar">
                        <div className="proficiency-fill" style={{ width: `${85 - idx * 10}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <GlassCard className="activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-timeline">
                <div className="timeline-item">
                  <div className="timeline-icon"><FaCheckCircle /></div>
                  <div className="timeline-content">
                    <h4>Updated profile information</h4>
                    <p>2 hours ago</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon"><FaFileAlt /></div>
                  <div className="timeline-content">
                    <h4>Submitted quarterly report</h4>
                    <p>Yesterday</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon"><FaUserFriends /></div>
                  <div className="timeline-content">
                    <h4>Joined team meeting</h4>
                    <p>3 days ago</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon"><FaStar /></div>
                  <div className="timeline-content">
                    <h4>Received commendation</h4>
                    <p>1 week ago</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="posts-section">
              <h3>Posts by {user.name}</h3>
              <div className="posts-list">
                {userPosts.map(post => (
                  <GlassCard key={post.id} className="post-item" hover>
                    <h4>{post.title}</h4>
                    <p>{post.body.substring(0, 150)}...</p>
                    <div className="post-meta">
                      <span><FaHeart /> {Math.floor(Math.random() * 100)}</span>
                      <span><FaShare /> {Math.floor(Math.random() * 50)}</span>
                      <span>{new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="performance-section">
              <GlassCard className="performance-card">
                <h3>Performance Metrics</h3>
                <div className="metrics-list">
                  <div className="metric">
                    <span>Task Completion</span>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: '94%' }}></div>
                    </div>
                    <span>94%</span>
                  </div>
                  <div className="metric">
                    <span>Leadership Score</span>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: '88%' }}></div>
                    </div>
                    <span>88%</span>
                  </div>
                  <div className="metric">
                    <span>Team Collaboration</span>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: '92%' }}></div>
                    </div>
                    <span>92%</span>
                  </div>
                  <div className="metric">
                    <span>Project Success</span>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: '96%' }}></div>
                    </div>
                    <span>96%</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserDeepProfile;