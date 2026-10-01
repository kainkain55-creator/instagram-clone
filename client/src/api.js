import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (username, email, password) =>
    API.post('/auth/register', { username, email, password }),
  login: (email, password) =>
    API.post('/auth/login', { email, password }),
  getCurrentUser: () =>
    API.get('/auth/me')
};

// Messages endpoints
export const messagesAPI = {
  getAll: (limit = 50, skip = 0) =>
    API.get('/messages', { params: { limit, skip } }),
  getConversation: (userId, limit = 50, skip = 0) =>
    API.get(`/messages/conversation/${userId}`, { params: { limit, skip } }),
  sendMessage: (recipientId, content, image = null) =>
    API.post('/messages/send', { recipientId, content, image }),
  markAsRead: (messageId) =>
    API.put(`/messages/${messageId}/read`),
  getUnreadCount: () =>
    API.get('/messages/unread/count'),
  deleteMessage: (messageId) =>
    API.delete(`/messages/${messageId}`)
};

// Users endpoints
export const usersAPI = {
  getUserByUsername: (username) =>
    API.get(`/users/${username}`),
  getUserById: (userId) =>
    API.get(`/users/id/${userId}`),
  updateProfile: (bio, profilePicture) =>
    API.put('/users/profile/update', { bio, profilePicture }),
  followUser: (userId) =>
    API.post(`/users/${userId}/follow`),
  unfollowUser: (userId) =>
    API.post(`/users/${userId}/unfollow`)
};

// Photos endpoints
export const photosAPI = {
  uploadPhoto: (formData) =>
    API.post('/photos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getPhotos: () =>
    API.get('/photos'),
  deletePhoto: (photoId) =>
    API.delete(`/photos/${photoId}`),
  likePhoto: (photoId) =>
    API.post(`/photos/${photoId}/like`),
  addComment: (photoId, text) =>
    API.post(`/photos/${photoId}/comment`, { text })
};

// Convenience functions for easier use
export const registerUser = (username, email, password) =>
  authAPI.register(username, email, password).then(res => res.data);

export const loginUser = (email, password) =>
  authAPI.login(email, password).then(res => res.data);

export const uploadPhoto = (formData) =>
  photosAPI.uploadPhoto(formData).then(res => res.data);

export const getPhotos = () =>
  photosAPI.getPhotos().then(res => res.data);

export const deletePhoto = (photoId) =>
  photosAPI.deletePhoto(photoId).then(res => res.data);

export default API;
