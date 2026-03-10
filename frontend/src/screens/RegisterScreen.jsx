import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearError } from '../store/authSlice';
import FormComponent from '../components/FormComponent';

const fields = [
  { name: 'username', label: 'Username', placeholder: 'Choose a username' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: false },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
];

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => navigate('/login'), 1500);
      return () => clearTimeout(t);
    }
  }, [success, navigate]);

  const handleSubmit = async (formData) => {
    const result = await dispatch(registerUser(formData));
    if (!result.error) setSuccess(true);
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
            Create Account
          </h1>
          <p style={{ color: '#888', fontSize: 14, marginTop: 6 }}>
            Join to start deciphering acronyms
          </p>
        </div>
        {success ? (
          <div
            style={{
              background: '#10a37f22',
              border: '1px solid #10a37f',
              borderRadius: 8,
              padding: '14px',
              color: '#10a37f',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            Account created! Redirecting to login…
          </div>
        ) : (
          <FormComponent
            fields={fields}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Create Account"
            errorMessage={errorMessage}
          />
        )}
        <p style={{ color: '#888', textAlign: 'center', marginTop: 20, fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#10a37f', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
