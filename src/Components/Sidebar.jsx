import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, useMediaQuery, useTheme
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: t('Acceuil'), icon: <HomeIcon />, path: '/' },
    { text: t('Ressources'), icon: <GroupIcon />, path: '/Ressources' },
    { text: t('Gérer des quiz et devoirs'), icon: <AssignmentIcon />, path: '/AddQuizDevoirs' },
    { text: t('Evaluer des quiz et devoirs'), icon: <AssignmentTurnedInIcon />, path: '/EvaluerQuizDevoirs' },
    { text: t('VisioConférence'), icon: <AssignmentTurnedInIcon />, path: '/visioconférence' },
    { text: t('Compte'), icon: <AccountCircleIcon />, path: '/profile' },
    { text: t('Paramétre'), icon: <SettingsIcon />, path: '/Paramétre' },
  ];

  const isRouteActive = (path) => location.pathname === path;

  const toggleDrawer = () => {
    setOpen(!open);
    if (onMenuClick) onMenuClick();
  };

  const renderList = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem disablePadding key={item.text}>
          <ListItemButton
  component={RouterLink}
  to={item.path}
  onClick={toggleDrawer}
  sx={{
    backgroundColor: isRouteActive(item.path) ? '#FFA726' : 'transparent', // orange vif
    '&:hover': {
      backgroundColor: isRouteActive(item.path) ? '#FB8C00' : '#f0f0f0', // orange foncé si actif, gris clair sinon
    },
    borderRadius: 2,
    mb: 0.5,
    transition: 'background-color 0.3s ease'
  }}
>
  <ListItemIcon
    sx={{
      minWidth: 'auto',
      marginRight: '8px',
      color: isRouteActive(item.path) ? '#fff' : '#080D50'
    }}
  >
    {item.icon}
  </ListItemIcon>
  <ListItemText
    primary={item.text}
    primaryTypographyProps={{
      style: {
        color: isRouteActive(item.path) ? '#fff' : '#080D50',
        fontWeight: 'bold'
      }
    }}
  />
</ListItemButton>

        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={onMenuClick}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          <Box p={1} width={260}>
            {renderList()}
          </Box>
        </Drawer>
      ) : (
        <Box p={1} width="17%" sx={{ position: 'fixed' }}>
          {renderList()}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
