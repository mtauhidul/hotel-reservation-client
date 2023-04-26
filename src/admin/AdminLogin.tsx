import { Box, Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/index';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    toast.loading('Logging in...');

    const res = await login(username, password);

    if (res) {
      toast.dismiss();
      toast.success('Login successful');
      navigate('/admin');
    } else {
      toast.dismiss();
      setLoading(false);
      toast.error('Please enter username and password correctly');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#F5F5F5',
      }}>
      <form
        onSubmit={handleSubmit}
        className='
        flex flex-col items-center justify-center w-96 h-96 bg-gray-300 rounded-xl shadow-xl p-8'>
        <h1 className='text-3xl font-bold mb-8'>Admin Login</h1>

        <TextField
          sx={{
            width: '100%',
            marginBottom: '1rem',
          }}
          label='Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          sx={{
            width: '100%',
            marginBottom: '1rem',
          }}
          label='Password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{
            width: '160px',
            height: '40px',
            marginBottom: '1rem',
          }}
          type='submit'>
          {loading ? <CircularProgress color='inherit' size={20} /> : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default AdminLogin;
