'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '../utils/auth';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

export function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && user) {
      router.push('/movies'); 
    }
  }, [user, loading, router]);
  
  if (loading) {
    return <div>Loading...</div>;  
  }

  const handleSignUp = async () => {
    try {
      const user = await signUpWithEmail(email, password);
      if (user) {
        alert('Signed up successfully!');
        router.push('/login'); 
      }
    } catch (error) {
      alert('Error signing up: ' + error.message);
    }
  };

  return (
          <Box
            position="absolute" 
            transform="translate(-50%, -50%)" 
            zIndex={2} 
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems="center"
            p={6} 
            bgcolor="rgba(0, 0, 0, 0.8)" 
            borderRadius={4} 
            boxShadow={4} 
            width="90%" 
            maxWidth="500px" 
          >
            <Typography variant="h4" mb={3} color="white">
                Sign Up
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }} justifyContent={'center'} alignItems={'center'}>
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ 
                        bgcolor: 'white',
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-root': {
                            fontSize: '1.1rem',
                        },
                    }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ 
                        bgcolor: 'white',
                        borderRadius: '12px', 
                        '& .MuiOutlinedInput-root': {
                            fontSize: '1.1rem',
                        },
                    }}
                />
                <Box spacing={2} padding={2} sx={{ width: '100%', maxWidth: '350px' }}>
                <Button
                    variant="contained"
                    onClick={handleSignUp}
                    fullWidth
                    sx={{
                        backgroundColor: '#1A202C', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2D3748', 
                        },
                        padding: '12px 0',
                        fontSize: '1rem',
                        borderRadius: '8px', 
                    }}
                >
                    Sign Up
                </Button>
                </Box>
            </Stack>
        </Box>
    );
}
