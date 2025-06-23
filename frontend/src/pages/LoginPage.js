// frontend/src/pages/LoginPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading } = useSelector((state) => state.auth);

  // Yeh useEffect ab sirf successful login ke baad redirect karega.
  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap() // .unwrap() promise return karega
      .then(() => {
        // Yeh sirf success par chalega
        toast.success('Logged in successfully!');
        // Navigate ka kaam useEffect karega jab userInfo update hoga.
      })
      .catch((err) => {
        // Yeh sirf error par chalega
        toast.error(err); // 'err' mein wohi message hoga jo rejectWithValue se aaya hai.
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// Styles mein koi tabdeeli nahi
const styles = {
  container: { maxWidth: '500px', margin: 'auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' },
  title: { textAlign: 'center', color: '#333' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  formGroup: { display: 'flex', flexDirection: 'column' },
  input: { padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' },
  button: { padding: '0.75rem', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }
};

export default LoginPage;