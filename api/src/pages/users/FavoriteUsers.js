import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaStar, FaTrash, FaEye, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa';
import './FavoriteUsers.css';

const FavoriteUsers = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      // Get favorite IDs from localStorage
      const favoriteIds = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
      
      console.log('Favorite IDs from localStorage:', favoriteIds);
      
      if (favoriteIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      
      // Fetch all users from API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const allUsers = await response.json();
      
      // Create extra users for demo (total 22 users)
      const extraUsers = [
        { id: 11, name: 'Col. Robert Miller', email: 'robert.miller@army.com', phone: '+1 (555) 111-2222', website: 'robert.army.com', company: { name: 'Strategic Command' }, address: { city: 'Washington DC' } },
        { id: 12, name: 'Gen. Patricia Clark', email: 'patricia.clark@army.com', phone: '+1 (555) 222-3333', website: 'patricia.army.com', company: { name: 'Intelligence Division' }, address: { city: 'Langley' } },
        { id: 13, name: 'Maj. David Wilson', email: 'david.wilson@army.com', phone: '+1 (555) 333-4444', website: 'david.army.com', company: { name: 'Operations Center' }, address: { city: 'Fort Bragg' } },
        { id: 14, name: 'Capt. Lisa Martinez', email: 'lisa.martinez@army.com', phone: '+1 (555) 444-5555', website: 'lisa.army.com', company: { name: 'Cyber Command' }, address: { city: 'Fort Meade' } },
        { id: 15, name: 'Lt. Col. James Brown', email: 'james.brown@army.com', phone: '+1 (555) 555-6666', website: 'james.army.com', company: { name: 'Logistics Unit' }, address: { city: 'Norfolk' } },
        { id: 16, name: 'Sgt. Maj. Kevin Lee', email: 'kevin.lee@army.com', phone: '+1 (555) 666-7777', website: 'kevin.army.com', company: { name: 'Training Command' }, address: { city: 'Fort Benning' } },
        { id: 17, name: 'Adm. Rachel Green', email: 'rachel.green@army.com', phone: '+1 (555) 777-8888', website: 'rachel.army.com', company: { name: 'Naval Operations' }, address: { city: 'Norfolk' } },
        { id: 18, name: 'Brig. Gen. Mark Taylor', email: 'mark.taylor@army.com', phone: '+1 (555) 888-9999', website: 'mark.army.com', company: { name: 'Air Defense' }, address: { city: 'Colorado Springs' } }
      ];
      
      const allUsersCombined = [...allUsers, ...extraUsers];
      
      // Filter favorite users
      const favoriteUsers = allUsersCombined
        .filter(user => favoriteIds.includes(user.id))
        .map(user => ({
          ...user,
          avatar: `https://ui-avatars.com/api/?background=7cba9a&color=fff&name=${user.name.replace(/ /g, '+')}`,
          department: ['Command', 'Intelligence', 'Operations', 'Support', 'Logistics', 'Special Forces', 'Cyber', 'Medical'][Math.floor(Math.random() * 8)],
          addedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
        }));
      
      setFavorites(favoriteUsers);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (userId) => {
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
    const updatedIds = favoriteIds.filter(id => id !== userId);
    localStorage.setItem('favoriteUsers', JSON.stringify(updatedIds));
    setFavorites(favorites.filter(user => user.id !== userId));
    
    // Show toast or alert
    alert(' Removed from favorites');
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      localStorage.setItem('favoriteUsers', JSON.stringify([]));
      setFavorites([]);
      alert('All favorites cleared');
    }
  };

  // Function to add favorite (for testing)
  const addSampleFavorite = () => {
    const currentFavs = JSON.parse(localStorage.getItem('favoriteUsers') || '[]');
    const newFavId = 1; // John Doe
    if (!currentFavs.includes(newFavId)) {
      currentFavs.push(newFavId);
      localStorage.setItem('favoriteUsers', JSON.stringify(currentFavs));
      loadFavorites();
      alert(' Sample favorite added! Go to User Directory to add more by clicking the heart icon.');
    } else {
      alert('Already in favorites!');
    }
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="favorites-container">
          <div className="loading-skeleton">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="favorite-skeleton"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        
        {/* Header */}
        <div className="favorites-header">
          <div>
            <h1 className="favorites-title">
              <FaHeart className="title-icon" /> Favorite Personnel
            </h1>
            <p className="favorites-subtitle">
              {favorites.length} saved personnel • Your trusted contacts
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {favorites.length === 0 && (
              <button className="clear-all-btn" onClick={addSampleFavorite} style={{ background: '#7cba9a', color: 'white', borderColor: '#7cba9a' }}>
                Add Sample Favorite
              </button>
            )}
            {favorites.length > 0 && (
              <button className="clear-all-btn" onClick={clearAllFavorites}>
                <FaTrash /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="empty-state">
            <FaRegHeart className="empty-icon" />
            <h3>No favorites yet</h3>
            <p>Click on the heart icon in User Directory to add personnel to your favorites</p>
            <button className="browse-btn" onClick={() => navigate('/users')}>
              Browse Directory →
            </button>
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 && (
          <>
            <div className="favorites-grid">
              {favorites.map(user => (
                <div key={user.id} className="favorite-card">
                  <button 
                    className="remove-favorite"
                    onClick={() => removeFavorite(user.id)}
                    title="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                  
                  <div className="favorite-card-header" onClick={() => navigate(`/users/${user.id}`)}>
                    <div className="favorite-avatar">
                      <img src={user.avatar} alt={user.name} />
                      <FaStar className="star-badge" />
                    </div>
                    <h3 className="favorite-name">{user.name}</h3>
                    <p className="favorite-role">{user.department}</p>
                  </div>
                  
                  <div className="favorite-card-body">
                    <div className="info-row">
                      <FaEnvelope />
                      <span>{user.email}</span>
                    </div>
                    <div className="info-row">
                      <FaPhone />
                      <span>{user.phone}</span>
                    </div>
                    <div className="info-row">
                      <FaBuilding />
                      <span>{user.company?.name || 'Army Command'}</span>
                    </div>
                    <div className="info-row">
                      <FaMapMarkerAlt />
                      <span>{user.address?.city || 'Washington DC'}</span>
                    </div>
                  </div>
                  
                  <div className="favorite-card-footer">
                    <div className="added-date">
                      Added on {user.addedDate}
                    </div>
                    <button 
                      className="view-profile-fav-btn"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      <FaEye /> View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="favorites-stats">
              <div className="stat">
                <span className="stat-number">{favorites.length}</span>
                <span className="stat-label">Total Favorites</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {favorites.filter(u => u.department === 'Command').length}
                </span>
                <span className="stat-label">Command Staff</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {favorites.filter(u => u.department === 'Intelligence').length}
                </span>
                <span className="stat-label">Intelligence</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {favorites.filter(u => u.department === 'Operations').length}
                </span>
                <span className="stat-label">Operations</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteUsers;