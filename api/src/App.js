import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import SoftBackground from './components/common/SoftBackground';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';

// Lazy load pages for better performance
const Login = lazy(() => import('./pages/auth/Login'));
const SignOut = lazy(() => import('./pages/auth/SignOut'));
const Dashboard = lazy(() => import('./pages/dashboard2/Dashboard'));
const UserDirectory = lazy(() => import('./pages/users/UserDirectory'));
const UserDeepProfile = lazy(() => import('./pages/users/UserDeepProfile'));
const FavoriteUsers = lazy(() => import('./pages/users/FavoriteUsers'));
const InteractiveAnalytics = lazy(() => import('./pages/analytics/InteractiveAnalytics'));
const AdvancedDynamicForm = lazy(() => import('./pages/forms/AdvancedDynamicForm'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const PostsBlogsExplorer = lazy(() => import('./pages/posts/PostsBlogsExplorer'));
const SystemActivityLogs = lazy(() => import('./pages/logs/SystemActivityLogs'));
const DevelopersPortfolio = lazy(() => import('./pages/developer/DevelopersPortfolio'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // ✅ SET LOGIN FUNCTION - YAHAN ADD KIYA HAI
  const setLogin = () => {
    sessionStorage.setItem('sessionActive', 'true');
    setIsAuthenticated(true);
  };

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      const authStatus = localStorage.getItem('isAuthenticated');

      if (token && userData && authStatus === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    

    checkAuth();

    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'isAuthenticated') {
        setIsAuthenticated(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <div className="app-container">
        <SoftBackground />

        {isAuthenticated && (
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} />
        )}

        <div className={`main-content ${isAuthenticated && sidebarOpen ? 'sidebar-open' : ''} ${!isAuthenticated ? 'no-sidebar' : ''}`}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Auth Routes */}
              <Route
                path="/login" element={
                  !isAuthenticated ? <Login onLogin={setLogin} /> : <Navigate to="/dashboard" />
                }
              />
              <Route
                path="/signout"
                element={<SignOut />}
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/users"
                element={
                  isAuthenticated ? <UserDirectory /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/users/:id"
                element={
                  isAuthenticated ? <UserDeepProfile /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/favorites"
                element={
                  isAuthenticated ? <FavoriteUsers /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/analytics"
                element={
                  isAuthenticated ? <InteractiveAnalytics /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/forms"
                element={
                  isAuthenticated ? <AdvancedDynamicForm /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/admin"
                element={
                  isAuthenticated ? <AdminSettings /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/posts"
                element={
                  isAuthenticated ? <PostsBlogsExplorer /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/logs"
                element={
                  isAuthenticated ? <SystemActivityLogs /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/portfolio"
                element={<DevelopersPortfolio />}
              />

              {/* Default Route */}
              <Route
                path="/"
                element={
                  <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
                }
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <div className="not-found-page">
                    <h1>404</h1>
                    <p>Page not found</p>
                    <button onClick={() => window.location.href = '/'}>Go Home</button>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(253, 251, 247, 0.95)',
              color: '#2C3E50',
              border: '1px solid rgba(44, 62, 80, 0.1)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '13px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#27ae60',
                secondary: '#FFFFFF',
              },
              style: {
                borderLeft: '4px solid #27ae60',
              },
            },
            error: {
              iconTheme: {
                primary: '#e74c3c',
                secondary: '#FFFFFF',
              },
              style: {
                borderLeft: '4px solid #e74c3c',
              },
            },
            loading: {
              style: {
                borderLeft: '4px solid #3498db',
              },
            },
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;