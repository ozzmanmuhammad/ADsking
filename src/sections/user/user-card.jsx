import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

export function UserCard({ user, sx, ...other }) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        width: '100%',
        height: 'auto',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 180, bgcolor: 'grey.200' }}>
        {/* Placeholder box to maintain card dimensions */}
      </Box>
      <ListItemText
        sx={{
          width: 80,
          height: 80,
          zIndex: 10,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
        }}
        primary={user.name}
        secondary={user.role}
        primaryTypographyProps={{ typography: 'h6' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />
    </Card>
  );
}