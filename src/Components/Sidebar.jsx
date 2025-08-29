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
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Sidebar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { CurrentUser } = useSelector((state) => state.user);
  console.log("l'utilisateur connecté est ",CurrentUser )
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Récupérer le rôle de l'utilisateur connecté
  const userRole = CurrentUser?.role || CurrentUser?.user?.role;

  // Définir le menu complet
  const menuItems = [
    { text: t('Acceuil'), icon: <HomeIcon />, path: '/', roles: ['ROLE_ENSEIGNANT', 'ROLE_ELEVE'] },
    { text: t('Ressources'), icon: <GroupIcon />, path: '/app/Ressources', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('Gérer des quiz et devoirs'), icon: <AssignmentIcon />, path: '/app/AddQuizDevoirs', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('Evaluer des quiz et devoirs'), icon: <AssignmentTurnedInIcon />, path: '/app/EvaluerQuizDevoirs', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('VisioConférence'), icon: <AssignmentTurnedInIcon />, path: '/app/visioconférence', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('Mes devoirs'), icon: <PictureInPictureIcon />, path: '/app/devoirs', roles: ['ROLE_ELEVE'] },
    { text: t('Mes matiéres'), icon: <PictureInPictureIcon />, path: '/app/matieres', roles: ['ROLE_ELEVE'] },
    { text: t('Compte'), icon: <AccountCircleIcon />, path: '/app/profile', roles: ['ROLE_ENSEIGNANT','ROLE_ELEVE'] },
    { text: t('Paramétre'), icon: <SettingsIcon />, path: '/app/Paramétre', roles: ['ROLE_ENSEIGNANT','ROLE_ELEVE'] },
    
  ];

  // Filtrer le menu selon le rôle de l'utilisateur
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const isRouteActive = (path) => location.pathname === path;

  const toggleDrawer = () => {
    setOpen(!open);
    if (onMenuClick) onMenuClick();
  };

  const renderList = () => (
    <List>
      {filteredMenuItems.map((item) => (
        <ListItem disablePadding key={item.text}>
          <ListItemButton
            component={RouterLink}
            to={item.path}
            onClick={toggleDrawer}
            sx={{
              backgroundColor: isRouteActive(item.path) ? '#FFA726' : 'transparent',
              '&:hover': {
                backgroundColor: isRouteActive(item.path) ? '#FB8C00' : '#f0f0f0',
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
