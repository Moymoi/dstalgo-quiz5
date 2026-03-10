import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import {
  sendMessage,
  fetchConversations,
  fetchConversation,
  clearCurrent,
} from '../store/conversationsSlice';
import Message from '../components/Message';
import ConversationItem from '../components/ConversationItem';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { list, current, sendingMessage, loading } = useSelector(
    (state) => state.conversations
  );

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchConversations());
  }, [user, dispatch, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [current]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || sendingMessage) return;
    setInput('');
    dispatch(sendMessage({ message: trimmed, conversationId: current?._id || null }));
  };

  const handleNewChat = () => {
    dispatch(clearCurrent());
  };

  const handleSelectConversation = (id) => {
    dispatch(fetchConversation(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const username = user?.username || 'User';

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#0f0f1a',
        color: '#f1f1f1',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 260,
          background: '#16162a',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #2a2a3a',
          flexShrink: 0,
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: '16px 14px', borderBottom: '1px solid #2a2a3a' }}>
          <button
            onClick={handleNewChat}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #2a2a3a',
              background: 'transparent',
              color: '#f1f1f1',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2a3a')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ fontSize: 18 }}>✏️</span>
            New Conversation
          </button>
        </div>

        {/* Conversation List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
              <Loader size={20} />
            </div>
          ) : list.length === 0 ? (
            <p style={{ color: '#666', fontSize: 13, textAlign: 'center', padding: 16 }}>
              No conversations yet
            </p>
          ) : (
            list.map((conv) => (
              <ConversationItem
                key={conv._id}
                conversation={conv}
                isActive={current?._id === conv._id}
                onClick={() => handleSelectConversation(conv._id)}
              />
            ))
          )}
        </div>

        {/* Sidebar Footer */}
        <div
          style={{
            padding: '12px 14px',
            borderTop: '1px solid #2a2a3a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#10a37f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 14,
                color: '#fff',
              }}
            >
              {username[0].toUpperCase()}
            </div>
            <span style={{ fontSize: 14, color: '#ccc', fontWeight: 500 }}>{username}</span>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
              fontSize: 18,
              padding: '4px 8px',
              borderRadius: 6,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4f')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
          >
            ⏏
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Chat Header */}
        <div
          style={{
            padding: '14px 24px',
            borderBottom: '1px solid #2a2a3a',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 22 }}>🔤</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Acronym Decipher Bot</div>
            <div style={{ color: '#888', fontSize: 12 }}>
              Expands acronyms only — no explanations
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {!current ? (
            <EmptyState />
          ) : (
            <>
              {current.messages.map((msg) => (
                <Message key={msg.id} role={msg.role} content={msg.content} />
              ))}
              {sendingMessage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888' }}>
                  <Loader size={16} />
                  <span style={{ fontSize: 14 }}>Deciphering…</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #2a2a3a',
          }}
        >
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 10 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type an acronym (e.g. NASA, API, MRI)…"
              disabled={sendingMessage}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #2a2a3a',
                background: '#1e1e2e',
                color: '#f1f1f1',
                fontSize: 15,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={sendingMessage || !input.trim()}
              style={{
                padding: '12px 20px',
                borderRadius: 10,
                border: 'none',
                background:
                  sendingMessage || !input.trim() ? '#0d7a5f' : '#10a37f',
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                cursor: sendingMessage || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'background 0.15s',
              }}
            >
              {sendingMessage ? <Loader size={18} /> : '➤'}
            </button>
          </form>
          <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 8 }}>
            This bot only expands acronyms. It will not explain concepts or provide history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
