import React from 'react';
import ChatComponent from 'src/components/chat/chatarea.jsx'; // Updated the extension to .jsx
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box
      component="section"
      id="secondary-features"
      aria-label="Features for analyzing code plagiarism and performance"
      sx={{
        pb: { xs: '14px', sm: '20px', lg: '32px' },
        pt: { xs: '20px', sm: '32px', lg: '32px' },
        maxWidth: '1280px', // Standard maximum width for a large container
        mx: 'auto', // Centers the container
        px: { xs: 2, sm: 3, md: 4 }, // Responsive padding on the x-axis to maintain a gutter
      }}
    >
      {/* Replacing Container with a Box that directly manages the layout */}
      <Box sx={{ position: 'relative' }}>
        {/* If the Header component is needed, ensure it's styled with MUI as well */}
        <ChatComponent />
      </Box>
    </Box>
  );
}
