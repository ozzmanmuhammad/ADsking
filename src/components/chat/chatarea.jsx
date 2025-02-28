'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatComponent = () => {
  const theme = useTheme();
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Great to meet you. I'm here to help with your questions.",
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const chatbotApiUrl = 'http://127.0.0.1:8000/api/query';

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setIsLoading(true);
    setMessages([...messages, { role: 'bot', content: 'Thinking...' }]);

    try {
      const response = await fetch(chatbotApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Network response was not ok');
      }

      const data = await response.json();
      const botResponse = data.response || "I'm having trouble generating a response.";

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === messages.length - 1 ? { ...msg, content: botResponse } : msg
        )
      );
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === messages.length - 1 ? { ...msg, content: 'Oops! Something went wrong.' } : msg
        )
      );
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 'tooltip' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleChatbox}
          startIcon={<FaComments />}
        >
          Chat
        </Button>
      </Box>

      {isChatboxOpen && (
        <Box
          sx={{ position: 'fixed', inset: 0, bgcolor: 'background.paperOpacity', zIndex: 'modal' }}
          onClick={toggleChatbox}
        />
      )}

      {isChatboxOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 64,
            right: 8,
            width: 340,
            maxWidth: '90%',
            transform: isChatboxOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            zIndex: 'tooltip',
            bgcolor: 'background.paper',
            boxShadow: 6,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Typography variant="h6">Chat</Typography>
            <IconButton color="inherit" onClick={toggleChatbox}>
              <FaTimes />
            </IconButton>
          </Box>
          <Box sx={{ p: 2, maxHeight: 320, overflowY: 'auto' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: message.role === 'user' ? 'right' : 'left',
                  mb: 1,
                  bgcolor:
                    message.role === 'user'
                      ? theme.palette.primary.main
                      : theme.palette.background.default,
                  color:
                    message.role === 'user'
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Typography
                  sx={{
                    display: 'inline-block',
                  }}
                >
                  {message.content}
                </Typography>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress color="primary" />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <TextField
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary" onClick={sendMessage} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatComponent;
