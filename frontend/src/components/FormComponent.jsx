import React, { useState } from 'react';
import Loader from './Loader';

const FormComponent = ({
  onSubmit,
  loading,
  placeholder = 'Type a message...',
  buttonLabel = 'Send',
  fields = [],
  submitLabel,
  errorMessage,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {})
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (fields.length > 0) {
    return (
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {errorMessage && (
          <div
            style={{
              background: '#ff4d4f22',
              border: '1px solid #ff4d4f',
              borderRadius: 8,
              padding: '10px 14px',
              color: '#ff4d4f',
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {typeof errorMessage === 'object'
              ? Object.values(errorMessage).flat().join(' ')
              : errorMessage}
          </div>
        )}
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                color: '#ccc',
                marginBottom: 6,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {field.label}
            </label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder || ''}
              required={field.required !== false}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #3a3a4a',
                background: '#1e1e2e',
                color: '#f1f1f1',
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: loading ? '#0d7a5f' : '#10a37f',
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.15s',
          }}
        >
          {loading ? <Loader size={18} /> : null}
          {loading ? 'Please wait...' : submitLabel || buttonLabel}
        </button>
      </form>
    );
  }

  return null;
};

export default FormComponent;
