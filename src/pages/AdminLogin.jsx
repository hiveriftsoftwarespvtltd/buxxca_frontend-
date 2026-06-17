import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useToast } from '../context/ToastContext';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('buxaa-admin-token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const normEmail = email.trim().toLowerCase();
    const normPassword = password.trim();

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normEmail, password: normPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('buxaa-admin-token', data.token);
        showToast('✨ Portal Authenticated successfully!', '✨');
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      setError('Connection to server failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <Helmet>
        <title>Admin Login Portal | BUXAA</title>
        <meta name="description" content="Secure administrative login portal for the BUXAA e-commerce dashboard." />
      </Helmet>
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img
            src="/images/buxaa-logo.png?v=2"
            alt="Buxaa Logo"
            style={{ height: '64px', width: 'auto', objectFit: 'contain', marginBottom: '0.5rem' }}
          />
          <span className="logo-name">Buxaa Admin</span>
          <span className="logo-tagline">Management Portal</span>
        </div>
        
        <h3 className="admin-login-title">Sign In to Dashboard</h3>

        {error && (
          <div className="error-banner" style={{ display: 'block' }}>
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="admin-email">Admin Email Address</label>
            <input
              type="email"
              id="admin-email"
              className="form-control"
              placeholder="vineetvineet8006@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="admin-password">Secure Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="admin-password"
                className="form-control"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  transition: 'color 0.2s ease'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword
                  ? <EyeOff size={17} strokeWidth={1.8} />
                  : <Eye size={17} strokeWidth={1.8} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-gold btn-full"
            disabled={loading}
            style={{ marginBottom: '1rem', cursor: 'pointer' }}
          >
            {loading ? '⏳ Authenticating...' : '🔒 Authenticate & Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
