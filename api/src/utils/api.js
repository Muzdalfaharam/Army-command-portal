// API configuration and helper functions for JSONPlaceholder

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Generic fetch function with error handling
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
};

// Users API
export const userAPI = {
  // Get all users
  getAll: async () => {
    return await apiFetch('/users');
  },

  // Get single user by ID
  getById: async (id) => {
    return await apiFetch(`/users/${id}`);
  },

  // Create new user
  create: async (userData) => {
    return await apiFetch('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Update user
  update: async (id, userData) => {
    return await apiFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Delete user
  delete: async (id) => {
    return await apiFetch(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Get user posts
  getUserPosts: async (userId) => {
    return await apiFetch(`/users/${userId}/posts`);
  },

  // Get user albums
  getUserAlbums: async (userId) => {
    return await apiFetch(`/users/${userId}/albums`);
  },

  // Get user todos
  getUserTodos: async (userId) => {
    return await apiFetch(`/users/${userId}/todos`);
  },
};

// Posts API
export const postAPI = {
  // Get all posts
  getAll: async () => {
    return await apiFetch('/posts');
  },

  // Get single post by ID
  getById: async (id) => {
    return await apiFetch(`/posts/${id}`);
  },

  // Get posts by user
  getByUser: async (userId) => {
    return await apiFetch(`/posts?userId=${userId}`);
  },

  // Create new post
  create: async (postData) => {
    return await apiFetch('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  // Update post
  update: async (id, postData) => {
    return await apiFetch(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  // Delete post
  delete: async (id) => {
    return await apiFetch(`/posts/${id}`, {
      method: 'DELETE',
    });
  },

  // Get post comments
  getComments: async (postId) => {
    return await apiFetch(`/posts/${postId}/comments`);
  },
};

// Comments API
export const commentAPI = {
  // Get all comments
  getAll: async () => {
    return await apiFetch('/comments');
  },

  // Get comments by post
  getByPost: async (postId) => {
    return await apiFetch(`/posts/${postId}/comments`);
  },

  // Create comment
  create: async (commentData) => {
    return await apiFetch('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },

  // Delete comment
  delete: async (id) => {
    return await apiFetch(`/comments/${id}`, {
      method: 'DELETE',
    });
  },
};

// Albums API
export const albumAPI = {
  // Get all albums
  getAll: async () => {
    return await apiFetch('/albums');
  },

  // Get album by ID
  getById: async (id) => {
    return await apiFetch(`/albums/${id}`);
  },

  // Get albums by user
  getByUser: async (userId) => {
    return await apiFetch(`/albums?userId=${userId}`);
  },

  // Get album photos
  getPhotos: async (albumId) => {
    return await apiFetch(`/albums/${albumId}/photos`);
  },
};

// Photos API
export const photoAPI = {
  // Get all photos
  getAll: async () => {
    return await apiFetch('/photos');
  },

  // Get photo by ID
  getById: async (id) => {
    return await apiFetch(`/photos/${id}`);
  },

  // Get photos by album
  getByAlbum: async (albumId) => {
    return await apiFetch(`/albums/${albumId}/photos`);
  },
};

// Todos API
export const todoAPI = {
  // Get all todos
  getAll: async () => {
    return await apiFetch('/todos');
  },

  // Get todos by user
  getByUser: async (userId) => {
    return await apiFetch(`/todos?userId=${userId}`);
  },

  // Create todo
  create: async (todoData) => {
    return await apiFetch('/todos', {
      method: 'POST',
      body: JSON.stringify(todoData),
    });
  },

  // Update todo
  update: async (id, todoData) => {
    return await apiFetch(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todoData),
    });
  },

  // Delete todo
  delete: async (id) => {
    return await apiFetch(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};

// Utility functions for API
export const apiUtils = {
  // Get paginated data
  getPaginated: async (endpoint, page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const result = await apiFetch(endpoint);
    if (result.success) {
      return {
        ...result,
        data: result.data.slice(start, end),
        pagination: {
          page,
          limit,
          total: result.data.length,
          totalPages: Math.ceil(result.data.length / limit),
        },
      };
    }
    return result;
  },

  // Search data
  search: async (endpoint, searchField, searchTerm) => {
    const result = await apiFetch(`${endpoint}?${searchField}_like=${searchTerm}`);
    return result;
  },

  // Filter data
  filter: async (endpoint, filters) => {
    const queryString = Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return await apiFetch(`${endpoint}?${queryString}`);
  },
};

// Cache management
class APICache {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expiry) {
      return item.data;
    }
    this.cache.delete(key);
    return null;
  }

  set(key, data, ttl = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl,
    });
  }

  clear() {
    this.cache.clear();
  }

  remove(key) {
    this.cache.delete(key);
  }
}

export const apiCache = new APICache();

// Request queue for rate limiting
class RequestQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const { requestFn, resolve, reject } = this.queue.shift();
      try {
        const result = await requestFn();
        resolve(result);
        await this.delay(100);
      } catch (error) {
        reject(error);
      }
    }

    this.processing = false;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const requestQueue = new RequestQueue();

// Error handler
export const handleAPIError = (error, context = '') => {
  console.error(`API Error in ${context}:`, error);
  
  let message = 'An unexpected error occurred';
  
  if (error.message) {
    if (error.message.includes('404')) {
      message = 'Resource not found';
    } else if (error.message.includes('500')) {
      message = 'Server error. Please try again later';
    } else {
      message = error.message;
    }
  }
  
  return {
    success: false,
    error: message,
    context,
  };
};