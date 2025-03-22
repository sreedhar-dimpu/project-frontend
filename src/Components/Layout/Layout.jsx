import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from './AppBar';
import SideNav from './SideNav';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout = ({ children, onLogout }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar onLogout={onLogout} />
      <SideNav open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        overflow: 'auto',
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: 0
      }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;