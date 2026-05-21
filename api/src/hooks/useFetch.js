import { useState, useEffect, useCallback } from 'react';

// Custom hook for fetching data from API
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  // Function to manually refetch data
  const refetch = useCallback(() => {
    setRefetchIndex(prev => prev + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        
        const fetchOptions = {
          ...options,
          signal,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          }
        };
        
        const response = await fetch(url, fetchOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error('Fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (url) {
      fetchData();
    }
    
    return () => {
      // Cleanup
    };
  }, [url, refetchIndex, JSON.stringify(options)]);

  return { data, loading, error, refetch };
};

// Specific hook for fetching users from JSONPlaceholder
export const useFetchUsers = () => {
  return useFetch('https://jsonplaceholder.typicode.com/users');
};

// Specific hook for fetching single user
export const useFetchUser = (userId) => {
  return useFetch(userId ? `https://jsonplaceholder.typicode.com/users/${userId}` : null);
};

// Specific hook for fetching posts
export const useFetchPosts = () => {
  return useFetch('https://jsonplaceholder.typicode.com/posts');
};

// Specific hook for fetching single post
export const useFetchPost = (postId) => {
  return useFetch(postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : null);
};

// Specific hook for fetching comments
export const useFetchComments = (postId) => {
  return useFetch(postId ? `https://jsonplaceholder.typicode.com/posts/${postId}/comments` : null);
};

// Specific hook for fetching albums
export const useFetchAlbums = () => {
  return useFetch('https://jsonplaceholder.typicode.com/albums');
};

// Specific hook for fetching photos
export const useFetchPhotos = (albumId) => {
  return useFetch(albumId ? `https://jsonplaceholder.typicode.com/albums/${albumId}/photos` : null);
};

// Specific hook with pagination
export const useFetchPaginated = (baseUrl, page = 1, limit = 10) => {
  const url = `${baseUrl}?_page=${page}&_limit=${limit}`;
  const [totalCount, setTotalCount] = useState(0);
  
  const { data, loading, error, refetch } = useFetch(url);
  
  return { data, loading, error, refetch, totalCount };
};

// Specific hook with search functionality
export const useFetchSearch = (baseUrl, searchTerm, searchField = 'q') => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  const url = debouncedTerm 
    ? `${baseUrl}?${searchField}=${encodeURIComponent(debouncedTerm)}`
    : baseUrl;
  
  return useFetch(url);
};

// Hook for posting data
export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const postData = async (url, data, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  
  return { postData, loading, error };
};

// Hook for updating data
export const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const putData = async (url, data, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  
  return { putData, loading, error };
};

// Hook for deleting data
export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const deleteData = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  
  return { deleteData, loading, error };
};

export default useFetch;