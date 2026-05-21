import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaUserPlus, FaFilter, FaSort,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding,
  FaGlobe, FaStar, FaHeart, FaEye,
  FaChevronLeft, FaChevronRight, FaUserCircle
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './UserDirectory.css';

const UserDirectory = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const usersPerPage = 9;

  // Fetch users from JSONPlaceholder API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Enhance users with additional data
        const enhancedUsers = data.map(user => ({
          ...user,
          fullName: user.name,
          initials: user.name.split(' ').map(n => n[0]).join(''),
          status: Math.random() > 0.3 ? 'Active' : 'Offline',
          department: ['Command', 'Intelligence', 'Operations', 'Support', 'Logistics'][Math.floor(Math.random() * 5)],
          lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          isFavorite: false,
          avatar: `https://ui-avatars.com/api/?background=7C9A92&color=fff&name=${user.name.replace(' ', '+')}`
        }));
        
        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  // Filter and sort users
  useEffect(() => {
    let result = [...users];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sorting
    result.sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'name') {
        aVal = a.name;
        bVal = b.name;
      } else if (sortBy === 'email') {
        aVal = a.email;
        bVal = b.email;
      } else if (sortBy === 'department') {
        aVal = a.department;
        bVal = b.department;
      } else if (sortBy === 'status') {
        aVal = a.status;
        bVal = b.status;
      } else {
        aVal = a[sortBy];
        bVal = b[sortBy];
      }
      
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });
    
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchTerm, users, sortBy, sortOrder]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const toggleFavorite = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isFavorite: !user.isFavorite } : user
    ));
  };

  const getStatusBadge = (status) => {
    return `status-badge ${status === 'Active' ? 'active' : 'offline'}`;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="user-directory-page">
        <div className="directory-container">
          <div className="skeleton-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="user-card-skeleton">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-directory-page">
      <div className="directory-container">
        
        {/* Header */}
        <div className="directory-header">
          <div>
            <h1 className="directory-title">Personnel Directory</h1>
            <p className="directory-subtitle">
              {filteredUsers.length} personnel found • {users.filter(u => u.status === 'Active').length} active
            </p>
          </div>
          <Button variant="primary" icon={FaUserPlus}>
            Add Personnel
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="directory-controls">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <div className="sort-dropdown">
              <FaSort />
              <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
                <option value="department">Sort by Department</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
            
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞ Grid
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ≡ List
              </button>
            </div>
          </div>
        </div>

        {/* Users Grid/List */}
        <div className={`users-container ${viewMode}`}>
          {currentUsers.map((user, index) => (
            <GlassCard key={user.id} className="user-card" hover>
              <button 
                className="favorite-btn"
                onClick={() => toggleFavorite(user.id)}
              >
                <FaHeart className={user.isFavorite ? 'favorited' : ''} />
              </button>
              
              <div className="user-card-header" onClick={() => navigate(`/users/${user.id}`)}>
                <div className="user-avatar">
                  <img src={user.avatar} alt={user.name} />
                  <span className={getStatusBadge(user.status)}></span>
                </div>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-role">{user.department}</p>
              </div>
              
              <div className="user-card-body">
                <div className="user-info-item">
                  <FaEnvelope />
                  <span>{user.email}</span>
                </div>
                <div className="user-info-item">
                  <FaPhone />
                  <span>{user.phone}</span>
                </div>
                <div className="user-info-item">
                  <FaBuilding />
                  <span>{user.company.name}</span>
                </div>
                <div className="user-info-item">
                  <FaMapMarkerAlt />
                  <span>{user.address.city}</span>
                </div>
              </div>
              
              <div className="user-card-footer">
                <Button 
                  variant="outline" 
                  size="small" 
                  fullWidth
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <FaEye /> View Profile
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDirectory;