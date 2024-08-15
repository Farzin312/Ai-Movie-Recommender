'use client';
import { Box, Button } from '@mui/material';
import { logOut } from '../utils/auth';

export function MoviePage() {
    
    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            alert('Error logging out: ' + error.message);
        }
    }
    return (
            <Box>
                <h1>Movie Page</h1>
                <Button variant="contained" onClick={handleLogOut}>Log Out</Button>
            </Box>
    );
}
