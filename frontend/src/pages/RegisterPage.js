// frontend/src/pages/RegisterPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading } = useSelector((state) => state.auth);

  // Yeh useEffect ab sirf successful registration ke baad redirect karega.
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
    } else {
      dispatch(register({ name, email, password }))
        .unwrap() // .unwrap() promise return karega
        .then(() => {
          // Yeh sirf success par chalega
          toast.success('Registered successfully!');
          // Navigate ka kaam useEffect karega.
        })
        .catch((err) => {
          // Yeh sirf error par chalega
          toast.error(err);
        });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={styles.input} />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registering...' : 'Register'}
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
  button: { padding: '0.75rem', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }
};

export default RegisterPage;