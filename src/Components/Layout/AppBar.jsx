import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useThemeContext } from '../../themes/ThemeProvider';

const AppBarStyled = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const AppBar = ({ onLogout, username }) => {
  const { toggleColorMode, mode } = useThemeContext();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => setLogoutDialogOpen(true);
  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    onLogout();
  };

  return (
    <>
      <AppBarStyled position="fixed">
        <Toolbar sx={{ padding: '0 20px' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold'}}
          >
            Accounting Software
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {username && (
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {username}
              </Typography>
            )}
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogoutClick}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              <IconButton
                color="inherit"
                onClick={toggleColorMode}
                sx={{ transition: '0.3s', '&:hover': { color: 'primary.light' } }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBarStyled>
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmLogout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppBar;