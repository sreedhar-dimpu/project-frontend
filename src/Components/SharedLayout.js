import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../themes/ThemeProvider';
import Layout from './Layout';

const SharedLayout = ({ children }) => (
    <ThemeProvider>
        <CssBaseline />
        <Layout>{children}</Layout>
    </ThemeProvider>
);

export default SharedLayout;
