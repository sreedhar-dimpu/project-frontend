import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { routes } from '../../routes/routes'; // Import routes

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);

const SideNav = ({ open, role }) => {
    const [openSubMenus, setOpenSubMenus] = useState({});
    const theme = useTheme();

    const handleClick = (path) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    // Filter routes based on role recursively
    const filterRoutesByRole = (items) =>
        items
            .filter((item) => !item.roles || item.roles.includes(role)) // Check roles
            .map((item) => ({
                ...item,
                children: item.children ? filterRoutesByRole(item.children) : undefined, // Recursively filter children
            }));

    const filteredRoutes = filterRoutesByRole(routes);

    const renderMenuItems = (items) =>
        items.map((item) => {
            if (item.hideInMenu) return null;

            const hasChildren = item.children && item.children.length > 0;

            return (
                <React.Fragment key={item.path}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={hasChildren ? 'div' : Link}
                            to={hasChildren ? undefined : item.path}
                            onClick={hasChildren ? () => handleClick(item.path) : undefined}
                            sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                            {hasChildren && open && (openSubMenus[item.path] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                    </ListItem>

                    {hasChildren && (
                        <Collapse in={openSubMenus[item.path]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {renderMenuItems(item.children)}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            );
        });

    return (
        <Drawer variant="permanent" open={open}>
            <Divider />
            <List>{renderMenuItems(filteredRoutes)}</List>
        </Drawer>
    );
};

export default SideNav;