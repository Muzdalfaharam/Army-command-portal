import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaHeart, FaComment, 
  FaShare, FaEye, FaBookmark, FaUser,
  FaCalendarAlt, FaTag, FaArrowLeft, FaArrowRight
} from 'react-icons/fa';
import GlassCard from '../../components/common/GlassCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useFetchPosts, useFetchUsers } from '../../hooks/useFetch';
import './PostsBlogsExplorer.css';

const PostsBlogsExplorer = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const postsPerPage = 6;

  // Fetch data from JSONPlaceholder API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
        const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
        const postsData = await postsRes.json();
        const usersData = await usersRes.json();
        
        // Enhance posts with user info and mock metadata
        const enhancedPosts = postsData.map(post => ({
          ...post,
          author: usersData.find(u => u.id === post.userId)?.name || 'Unknown',
          authorEmail: usersData.find(u => u.id === post.userId)?.email || '',
          likes: Math.floor(Math.random() * 500) + 50,
          comments: Math.floor(Math.random() * 100) + 10,
          views: Math.floor(Math.random() * 5000) + 500,
          category: ['Technology', 'Security', 'Strategy', 'Leadership', 'Innovation'][Math.floor(Math.random() * 5)],
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          image: `https://picsum.photos/id/${post.id + 100}/400/250`
        }));
        
        setPosts(enhancedPosts);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const categories = ['all', 'Technology', 'Security', 'Strategy', 'Leadership', 'Innovation'];
  
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleBookmark = (postId) => {
    // Implement bookmark functionality
    alert('Post saved to bookmarks!');
  };

  return (
    <div className="posts-page">
      <div className="posts-container">
        {/* Header */}
        <div className="posts-header">
          <div>
            <h1 className="posts-title">Posts & Blogs Explorer</h1>
            <p className="posts-subtitle">Discover the latest articles and insights</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-filter-section">
          <div className="search-bar-posts">
            <FaSearch />
            <input
              type="text"
              placeholder="Search posts by title, content, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat === 'all' ? 'All Posts' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="posts-loading">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="post-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {currentPosts.map(post => (
                <GlassCard key={post.id} className="post-card" hover>
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                    <span className="post-category">{post.category}</span>
                  </div>
                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">
                      {post.body.substring(0, 120)}...
                    </p>
                    <div className="post-meta">
                      <div className="post-author">
                        <FaUser /> {post.author}
                      </div>
                      <div className="post-date">
                        <FaCalendarAlt /> {post.date}
                      </div>
                    </div>
                    <div className="post-stats">
                      <button className="stat-btn" onClick={() => handleLike(post.id)}>
                        <FaHeart /> {post.likes}
                      </button>
                      <button className="stat-btn">
                        <FaComment /> {post.comments}
                      </button>
                      <button className="stat-btn">
                        <FaEye /> {post.views}
                      </button>
                      <button className="stat-btn" onClick={() => handleBookmark(post.id)}>
                        <FaBookmark />
                      </button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="small" 
                      fullWidth
                      onClick={() => setSelectedPost(post)}
                    >
                      Read More →
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
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <FaArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="modal-overlay-posts" onClick={() => setSelectedPost(null)}>
            <div className="modal-content-posts" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-posts">
                <h2>{selectedPost.title}</h2>
                <button className="modal-close-posts" onClick={() => setSelectedPost(null)}>&times;</button>
              </div>
              <div className="modal-body-posts">
                <div className="modal-meta">
                  <span><FaUser /> {selectedPost.author}</span>
                  <span><FaCalendarAlt /> {selectedPost.date}</span>
                  <span><FaTag /> {selectedPost.category}</span>
                </div>
                <div className="modal-image">
                  <img src={selectedPost.image} alt={selectedPost.title} />
                </div>
                <p className="modal-content-full">{selectedPost.body}</p>
                <div className="modal-stats">
                  <span><FaHeart /> {selectedPost.likes} Likes</span>
                  <span><FaComment /> {selectedPost.comments} Comments</span>
                  <span><FaEye /> {selectedPost.views} Views</span>
                </div>
              </div>
              <div className="modal-footer-posts">
                <Button variant="outline" onClick={() => handleLike(selectedPost.id)}>
                  <FaHeart /> Like
                </Button>
                <Button variant="primary">
                  <FaShare /> Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsBlogsExplorer;