import React from 'react';

const ConversationItem = ({ conversation, isActive, onClick }) => {
  const title = conversation.title || 'Untitled conversation';
  const date = new Date(conversation.updated_at).toLocaleDateString();

  return (
    <div
      onClick={onClick}
      style={{
        padding: '10px 14px',
        borderRadius: 8,
        cursor: 'pointer',
        background: isActive ? '#2d2d3a' : 'transparent',
        borderLeft: isActive ? '3px solid #10a37f' : '3px solid transparent',
        marginBottom: 4,
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = '#1e1e2e';
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = 'transparent';
      }}
    >
      <div
        style={{
          color: '#f1f1f1',
          fontSize: 14,
          fontWeight: isActive ? 600 : 400,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </div>
      <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{date}</div>
    </div>
  );
};

export default ConversationItem;
