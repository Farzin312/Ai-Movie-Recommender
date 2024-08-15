'use client';
import React from 'react';
import { Box } from '@mui/material';
import { NavBar } from '../components/navbar';
import { Footer } from '../components/footer';
import { MovieBackground } from '../components/moviebackground';
import { SignUpPage } from '../components/signuppage';

export default function SignUp() {
    return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavBar /> 
      <Box
        component="main"
        flex="1"
        mt={8}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflowY="auto"
        sx={{ paddingBottom: '8px' }}
      >
        <MovieBackground /> 
        <SignUpPage/> 
      </Box>
      <Footer /> 
    </Box>
    );
}

