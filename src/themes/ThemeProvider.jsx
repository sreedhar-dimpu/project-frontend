import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

// Create context for theme
const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

// Custom hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Toggle between light and dark themes
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Light theme
  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
          },
          secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: '#ffffff',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 6,
              },
              contained: {
                boxShadow: 'none',
                '&:active': {
                  boxShadow: 'none',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                borderRadius: 12,
              },
            },
          },
        },
      }),
    []
  );

  // Dark theme
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
          },
          secondary: {
            main: '#ce93d8',
            light: '#f3e5f5',
            dark: '#ab47bc',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: '#1e1e1e',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 6,
              },
              contained: {
                boxShadow: 'none',
                '&:active': {
                  boxShadow: 'none',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                borderRadius: 12,
              },
            },
          },
        },
      }),
    []
  );

  // Select theme based on mode
  const theme = mode === 'light' ? lightTheme : darkTheme;

  // Context value
  const contextValue = useMemo(
    () => ({
      toggleColorMode,
      mode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;