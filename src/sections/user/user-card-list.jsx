import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

// Define a mapping of icons & details for each card
const cardElements = {
  "Post Size": {
    icon: <ImageIcon sx={{ fontSize: 50, color: "gray" }} />,
    description: "(1200x1200)"
  },
  "Landscape Size": {
    icon: <CropLandscapeIcon sx={{ fontSize: 50, color: "gray" }} />,
    description: "(1080x566)"
  },
  "Story Size": {
    icon: <ViewCarouselIcon sx={{ fontSize: 50, color: "gray" }} />,
    description: "(1080x1920)"
  },
  "Leaderboard": {
    icon: <LeaderboardIcon sx={{ fontSize: 50, color: "gray" }} />,
    description: "(728x90)"
  },
  "Medium Banner": {
    icon: <WebAssetIcon sx={{ fontSize: 50, color: "gray" }} />,
    description: "(300x250)"
  },
  "Half Page": {
    icon: <AspectRatioIcon sx={{ fontSize: 50, color: "gray" }} />,
    description: "(300x600)"
  }
};

// UserCard Component
export function UserCard({ name, selected, onClick }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 2,
        height: 250,
        boxShadow: 2,
        border: selected ? "2px solid #ff4081" : "none", // Highlight selected card
        transition: "transform 0.3s ease-in-out",
        ':hover': { transform: "scale(1.05)", cursor: "pointer" }
      }}
      onClick={onClick}
    >
      {/* Render the icon dynamically */}
      {cardElements[name]?.icon || <ImageIcon sx={{ fontSize: 50, color: "gray" }} />}

      {/* Card Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: 1 }}>
        {name}
      </Typography>

      {/* Render description (dimensions) if available */}
      {cardElements[name]?.description && (
        <Typography variant="body2" sx={{ color: "gray" }}>
          {cardElements[name].description}
        </Typography>
      )}
    </Card>
  );
}

// UserCardList Component
export function UserCardList() {
  const theme = useTheme();
  const [selected, setSelected] = useState(null);
  const [projectDesc, setProjectDesc] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const dropdownCardStyle = {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90, // Adjusted height for dropdown cards
    boxShadow: 'none'
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Social Media Size Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Social Media Size
          </Typography>
        </Grid>
        {["Post Size", "Landscape Size", "Story Size"].map((size) => (
          <Grid item xs={12} sm={6} md={4} key={size}>
            <UserCard
              name={size}
              selected={selected === size}
              onClick={() => setSelected(size)}
            />
          </Grid>
        ))}

        {/* Display Size Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Display Size
          </Typography>
        </Grid>
        {["Leaderboard", "Medium Banner", "Half Page"].map((size) => (
          <Grid item xs={12} sm={6} md={4} key={size}>
            <UserCard
              name={size}
              selected={selected === size}
              onClick={() => setSelected(size)}
            />
          </Grid>
        ))}

        {/* Dropdown Cards */}
        <Grid item xs={12} sm={6}>
          <Card sx={dropdownCardStyle}>
            <Typography variant="h6" component="div" sx={{ width: '50%' }}>Project Description</Typography>
            <FormControl variant="outlined" sx={{ width: '50%' }}>
              <InputLabel id="project-desc-label">Recommended</InputLabel>
              <Select
                labelId="project-desc-label"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                label="Recommended"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Brief">Brief</MenuItem>
                <MenuItem value="Detailed">Detailed</MenuItem>
                <MenuItem value="Extended">Extended</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={dropdownCardStyle}>
            <Typography variant="h6" component="div" sx={{ width: '50%' }}>Target Audience</Typography>
            <FormControl variant="outlined" sx={{ width: '50%' }}>
              <InputLabel id="target-audience-label">Select</InputLabel>
              <Select
                labelId="target-audience-label"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                label="Select"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="Youth">Youth</MenuItem>
                <MenuItem value="Adults">Adults</MenuItem>
                <MenuItem value="Professionals">Professionals</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Grid>

        {/* Buttons Section */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, padding: 2 }}>
          <Button variant="text" color="primary" startIcon={<ArrowBackIcon />}>
            Go Back
          </Button>
          <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, borderRadius: '30px', padding: theme.spacing(1.5, 3) }}>
            Save & Continue
          </Button>
        </Grid>
      </Grid>
    </>
  );
}