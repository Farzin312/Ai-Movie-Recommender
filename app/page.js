'use client';
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { Box, Container, Stack } from '@mui/material';
import { MovieBackground } from './components/moviebackground'; 
import { NavBar } from './components/navbar';
import { Footer } from './components/footer';
import { auth } from '@/firebase';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/movies');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

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
      </Box>
      <Footer /> 
    </Box>
  );
}
