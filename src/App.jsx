import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './themes/ThemeProvider';
import Layout from './Components/Layout/Layout';
import { routes, flattenRoutes } from './routes/routes';
import { useAuth } from './Context/AuthContext';

function App({ onLogout }) {
  // Get the user's role from AuthContext
  const { role } = useAuth();

  // Flatten and filter routes based on the user's role
  const flattenedRoutes = flattenRoutes(routes, "", role);

  return (
    <ThemeProvider>
      <CssBaseline />
      <Layout onLogout={onLogout}>
        <Routes>
          {/* Map over filtered routes */}
          {flattenedRoutes.map((route, index) => {
            if (route.redirectTo) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Navigate to={route.redirectTo} replace />}
                />
              );
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={route.component && <route.component />}
              />
            );
          })}
          {/* Default fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;