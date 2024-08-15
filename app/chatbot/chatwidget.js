import React, { useState } from 'react';
import { Box, IconButton, TextField, Button, Paper, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme ? theme.spacing(2) : '16px', 
  right: theme ? theme.spacing(2) : '16px',
  width: '300px',
  maxHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
}));

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleToggleChat = () => {
    setOpen(!open);
  };

  const handleSend = async () => {
    if (!input) return;
  
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
  
    try {
      const response = await fetch('/api/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });
  
      const data = await response.json();
      console.log('Received data from API:', data);
  
      if (!data || !data.content) {
        throw new Error('Invalid response from the server');
      }
  
      setMessages([...newMessages, { role: 'bot', content: data.content }]);
    } catch (error) {
      console.error('Error handling response:', error);
      setMessages([...newMessages, { role: 'bot', content: 'Sorry, something went wrong.' }]);
    }
  };
  

  return (
    <div>
      {!open && (
        <IconButton
          onClick={handleToggleChat}
          className="fixed bottom-4 right-4 bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 animate-bounce"
          size="large"
          sx={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            animation: `bounce 2s infinite`,
          }}
        >
          <ChatIcon fontSize="large" />
        </IconButton>
      )}

      {open && (
        <ChatContainer className="p-4 bg-white rounded-lg shadow-lg">
          <Box className="flex justify-between items-center mb-2">
            <Typography variant="h6" className="font-semibold">
              Movie Bot
            </Typography>
            <IconButton onClick={handleToggleChat}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className="flex flex-col space-y-2 flex-grow overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <Typography
                key={index}
                className={`p-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-200 text-black self-start'
                }`}
              >
                {msg.content}
              </Typography>
            ))}
          </Box>
          <Box className="flex space-x-2">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="rounded-lg"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              endIcon={<SendIcon />}
              className="bg-blue-500 hover:bg-blue-700 transition-all duration-300"
            >
              Send
            </Button>
          </Box>
        </ChatContainer>
      )}
    </div>
  );
};

export default ChatWidget;
