'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import 'tailwindcss/tailwind.css';


const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('Logged out successfully');
    } catch (error) {
      console.error('Error logging out: ', error);
      alert('Failed to log out');
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1A202C', width: '100%', top: 0, left: 0 }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" sx={{ color: 'white' }}>
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </Typography>
        <div className="hidden md:flex space-x-4">
          <Link href="/" passHref>
            <Button sx={{ color: 'white', '&:hover': { color: 'gray.400' }, transition: 'color 0.3s ease-in-out' }}>
              Home
            </Button>
          </Link>
          {user ? (
            <Button 
              sx={{ color: 'white', '&:hover': { color: 'gray.400' }, transition: 'color 0.3s ease-in-out' }} 
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button sx={{ color: 'white', '&:hover': { color: 'gray.400' }, transition: 'color 0.3s ease-in-out' }}>
                  Login
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button sx={{ color: 'white', '&:hover': { color: 'gray.400' }, transition: 'color 0.3s ease-in-out' }}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton edge="start" color="inherit" aria-label="menu" className="md:hidden" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250, backgroundColor: '#333', height: '100%' }}>
          <Link href="/" passHref>
            <ListItem onClick={toggleDrawer}>
              <ListItemText primary="Home" sx={{ color: 'white' }} />
            </ListItem>
          </Link>
          {user ? (
            <ListItem  onClick={() => { toggleDrawer(); handleLogout(); }}>
              <ListItemText primary="Logout" sx={{ color: 'white' }} />
            </ListItem>
          ) : (
            <>
              <Link href="/login" passHref>
                <ListItem onClick={toggleDrawer}>
                  <ListItemText primary="Login" sx={{ color: 'white' }} />
                </ListItem>
              </Link>
              <Link href="/signup" passHref>
                <ListItem onClick={toggleDrawer}>
                  <ListItemText primary="Sign Up" sx={{ color: 'white' }} />
                </ListItem>
              </Link>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export { NavBar };
