import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearError } from '../store/authSlice';
import FormComponent from '../components/FormComponent';

const fields = [
  { name: 'username', label: 'Username', placeholder: 'Enter your username' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
];

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/');
    return () => dispatch(clearError());
  }, [user, navigate, dispatch]);

  const handleSubmit = ({ username, password }) => {
    dispatch(loginUser({ username, password }));
  };

  const errorMessage = error
    ? error.detail || Object.values(error).flat().join(' ')
    : null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          background: '#16162a',
          borderRadius: 16,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔤</div>
          <h1 style={{ color: '#f1f1f1', fontSize: 22, margin: 0, fontWeight: 700 }}>
            Acronym Decipher Bot
          </h1>
          <p style={{ color: '#888', fontSize: 14, marginTop: 6 }}>
            Sign in to continue
          </p>
        </div>
        <FormComponent
          fields={fields}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Sign In"
          errorMessage={errorMessage}
        />
        <p style={{ color: '#888', textAlign: 'center', marginTop: 20, fontSize: 14 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#10a37f', textDecoration: 'none', fontWeight: 600 }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
