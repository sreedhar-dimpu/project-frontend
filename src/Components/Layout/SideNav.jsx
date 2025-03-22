import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { routes, getFullPath } from '../../routes/routes';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginTop: '84px',
  height: 'calc(100% - 84px)',
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    marginTop: '84px',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideNav = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleClick = (path) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Generate menu items
    const renderMenuItems = (items, parentPath = '') => {
    return items.map((item) => {
      if (item.hideInMenu) return null;
      
      const fullPath = getFullPath(parentPath, item.path);
      const hasChildren = item.children && item.children.length > 0;
      const active = isActive(fullPath);
      if (hasChildren && active && openSubMenus[fullPath] === undefined) {
        setOpenSubMenus((prev) => ({ ...prev, [fullPath]: true }));
      }
      

      return (
        <React.Fragment key={fullPath}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={hasChildren ? 'div' : Link}
              to={hasChildren ? undefined : fullPath}
              onClick={hasChildren ? () => handleClick(fullPath) : undefined}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                backgroundColor: active ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: active ? 'primary.main' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                sx={{ 
                  opacity: open ? 1 : 0,
                  color: active ? 'primary.main' : 'inherit',
                  fontWeight: active ? 'bold' : 'normal',
                }} 
              />
              {hasChildren && open && (
                openSubMenus[fullPath] ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItemButton>
          </ListItem>
          
          {hasChildren && (
            <Collapse in={open && openSubMenus[fullPath]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children
                  .filter((child) => !child.hideInMenu)
                  .map((child) => {
                    const childFullPath = getFullPath(fullPath, child.path);
                    const childActive = location.pathname === childFullPath;
                    
                    return (
                      <ListItemButton
                        key={childFullPath}
                        component={Link}
                        to={childFullPath}
                        sx={{
                          pl: 4,
                          backgroundColor: childActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                        }}
                      >
                        <ListItemText 
                          primary={child.name} 
                          sx={{ 
                            color: childActive ? 'primary.main' : 'inherit',
                            fontWeight: childActive ? 'bold' : 'normal',
                          }} 
                        />
                      </ListItemButton>
                    );
                  })}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Divider />
      <List>
        {renderMenuItems(routes)}
      </List>
    </Drawer>
  );
};

export default SideNav;