import React from 'react';
import { Container, Typography } from '@mui/material';
import 'tailwindcss/tailwind.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <Container maxWidth="lg" className="flex justify-center items-center">
        <Typography variant="body1" className="text-center">
          &copy; 2024 Farzin Shifat. 
        </Typography>
      </Container>
    </footer>
  );
};

export { Footer };
