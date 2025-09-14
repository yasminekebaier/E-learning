import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, useMediaQuery, useTheme, Collapse
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';
import ListIcon from '@mui/icons-material/List';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Sidebar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openAdminMenu, setOpenAdminMenu] = useState(false);
  const { CurrentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Récupérer le rôle de l'utilisateur connecté
  const userRole = CurrentUser?.role || CurrentUser?.user?.role;

  // Définir le menu complet
  const menuItems = [
    { text: t('Acceuil'), icon: <HomeIcon />, path: '/app/acceuiladmin', roles: ['ROLE_ADMIN'] },
    { text: t('Gestion des cours'), icon: <PictureInPictureIcon />, path: '/app/GestionCours', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('Ressources'), icon: <GroupIcon />, path: '/app/Ressources', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('Gérer des quiz et devoirs'), icon: <AssignmentIcon />, path: '/app/AddQuizDevoirs', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('Evaluer des quiz et devoirs'), icon: <AssignmentTurnedInIcon />, path: '/app/EvaluerQuizDevoirs', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('VisioConférence'), icon: <AssignmentTurnedInIcon />, path: '/app/visioconférence', roles: ['ROLE_ENSEIGNANT'] },
    { text: t('Mes devoirs'), icon: <PictureInPictureIcon />, path: '/app/devoirs', roles: ['ROLE_ELEVE'] },
    { text: t('Mes matiéres'), icon: <ListIcon/>, path: '/app/matieres', roles: ['ROLE_ELEVE'] },
    { text: t('VisioConférence'), icon: <AssignmentTurnedInIcon/>, path: '/app/VisioCnférenceEtudiant', roles: ['ROLE_ELEVE'] },
    { text: t('Message de descussion'), icon: <ChatIcon />, path: '/app/message', roles: ['ROLE_ELEVE'] },
     { text: t('Gestion des matiéres'), icon: <PictureInPictureIcon />, path: '/app/gestionmatiere', roles: ['ROLE_ADMIN'] },
     
    { text: t('Compte'), icon: <AccountCircleIcon />, path: '/app/profile', roles: ['ROLE_ENSEIGNANT','ROLE_ELEVE','ROLE_ADMIN'] },
   
    

  ];

  // Filtrer le menu selon le rôle de l'utilisateur
  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole));

  const isRouteActive = (path) => location.pathname === path;

  const toggleDrawer = () => {
    setOpen(!open);
    if (onMenuClick) onMenuClick();
  };

  const handleAdminMenuClick = () => {
    setOpenAdminMenu(!openAdminMenu);
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

      {/* Menu Admin */}
      {userRole === 'ROLE_ADMIN' && (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={handleAdminMenuClick}>
              <ListItemIcon sx={{ color: '#080D50', minWidth: 'auto', marginRight: '8px' }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Gestion des utilisateurs"
              primaryTypographyProps={{
                style: {
                  color: '#080D50',
                  fontWeight: 'bold'
                }
              }} />
              {openAdminMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={openAdminMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
           
            {['eleves', 'enseignants', 'admin'].map((route) => {
  const labelMap = {
    eleves: 'Liste des élèves',
    enseignants: 'Liste des enseignants',
    admin: 'Liste des administrateurs',
  };
  const path = `/app/${route}`;
  const active = isRouteActive(path);

  return (
    <ListItemButton
      key={route}
      component={RouterLink}
      to={path}
      onClick={toggleDrawer}
      sx={{
        pl: 4,
        backgroundColor: active ? '#FFA726' : 'transparent',
        '&:hover': {
          backgroundColor: active ? '#FB8C00' : '#f0f0f0',
        },
        borderRadius: 2,
        mb: 0.5,
        transition: 'background-color 0.3s ease',
      }}
    >
      <ListItemText
        primary={labelMap[route]}
        primaryTypographyProps={{
          style: {
            color: active ? '#fff' : '#080D50',
            fontWeight: 'bold',
          },
        }}
      />
    </ListItemButton>
  );
})}

            </List>
          </Collapse>
        </>
      )}
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
        <Box p={1} width="18%" sx={{ position: 'fixed' }}>
          {renderList()}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
