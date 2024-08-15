'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithGoogle, loginWithEmail } from '../utils/auth';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

export function LoginPage() { 
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

    const handleEmailLogin = async () => {
        try {
            const user = await loginWithEmail(email, password);
            if (user) {
                alert('Signed in successfully');
                router.push('/movies'); 
            }
        } catch (error) {
            alert('Error signing in via Email: ' + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await loginWithGoogle(); 
            if (user) {
                alert('Signed in Successfully');
                router.push('/movies'); 
            }
        } catch (error) {
            alert('Error signing in with Google: ' + error.message);
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
                Login
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
                        borderRadius: '12px', // Larger border radius for text fields
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
                        borderRadius: '12px', // Larger border radius for text fields
                        '& .MuiOutlinedInput-root': {
                            fontSize: '1.1rem',
                        },
                    }}
                />
                <Stack spacing={2} padding={2} sx={{ width: '100%', maxWidth: '350px' }}>
                <Button
                    variant="contained"
                    onClick={handleEmailLogin}
                    fullWidth
                    sx={{
                        backgroundColor: '#1A202C', // Same color as the footer
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2D3748', // Slightly lighter on hover
                        },
                        padding: '12px 0',
                        fontSize: '1rem',
                        borderRadius: '8px', // Smaller border radius for buttons
                    }}
                >
                    Login with Email
                </Button>
                <Button
                    variant="contained"
                    onClick={handleGoogleLogin}
                    fullWidth
                    sx={{
                        backgroundColor: '#1A202C',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#2D3748',
                        },
                        padding: '12px 0',
                        fontSize: '1rem',
                        borderRadius: '8px', // Smaller border radius for buttons
                    }}
                >
                   <img src='/images/google-logo.png' alt='Google Logo' style={{ width: '20px', marginRight: '8px', borderRadius: '35%' }} />
                   Login
                </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
