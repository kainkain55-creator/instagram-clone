import React, { useState, useEffect } from 'react';
import { messagesAPI } from '../api';
import './MessagesPage.css';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch all messages
  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await messagesAPI.getAll(50, 0);
      setMessages(response.data.messages);
      setError('');
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await messagesAPI.getUnreadCount();
      setUnreadCount(response.data.unreadCount);
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await messagesAPI.sendMessage(selectedConversation, newMessage);
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await messagesAPI.markAsRead(messageId);
      fetchMessages();
      fetchUnreadCount();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await messagesAPI.deleteMessage(messageId);
      fetchMessages();
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  if (loading) return <div className="messages-container"><p>Loading messages...</p></div>;

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h1>Messages</h1>
        {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="messages-content">
        <div className="messages-list">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`message-item ${!msg.isRead ? 'unread' : ''}`}
                onClick={() => {
                  if (!msg.isRead) handleMarkAsRead(msg._id);
                }}
              >
                <div className="message-avatar">
                  {msg.sender.profilePicture ? (
                    <img src={msg.sender.profilePicture} alt={msg.sender.username} />
                  ) : (
                    <div className="avatar-placeholder">{msg.sender.username[0].toUpperCase()}</div>
                  )}
                </div>
                <div className="message-info">
                  <div className="message-header">
                    <span className="sender-name">{msg.sender.username}</span>
                    <span className="message-time">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="message-preview">{msg.content.substring(0, 50)}...</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteMessage(msg._id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {selectedConversation && (
          <div className="message-compose">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message-input"
              />
              <button type="submit" className="send-btn">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
