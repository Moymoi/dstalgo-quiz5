import React from 'react';

const EmptyState = () => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#aaa',
      padding: 32,
      textAlign: 'center',
    }}
  >
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: '#10a37f22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        fontSize: 36,
      }}
    >
      🔤
    </div>
    <h2 style={{ color: '#f1f1f1', marginBottom: 8, fontSize: 22 }}>
      Acronym Decipher Bot
    </h2>
    <p style={{ fontSize: 15, maxWidth: 400, lineHeight: 1.6 }}>
      Type any acronym — tech, medical, or business — and I'll tell you exactly
      what each letter stands for. Nothing more, nothing less.
    </p>
    <p style={{ fontSize: 13, color: '#666', marginTop: 12 }}>
      Examples: <strong style={{ color: '#10a37f' }}>NASA</strong>,{' '}
      <strong style={{ color: '#10a37f' }}>API</strong>,{' '}
      <strong style={{ color: '#10a37f' }}>MRI</strong>,{' '}
      <strong style={{ color: '#10a37f' }}>CEO</strong>
    </p>
  </div>
);

export default EmptyState;
