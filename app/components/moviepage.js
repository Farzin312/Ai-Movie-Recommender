'use client';
import { Box, Button } from '@mui/material';
import ChatWidget from '../chatbot/chatwidget'; 

export function MoviePage() {

    return (
        <Box className="relative min-h-screen">
            <h1>Movie Page</h1>
            <ChatWidget />
        </Box>
    );
}
