
import {AppBar, Toolbar, IconButton, Box, Badge, Avatar, Typography, InputBase,
  alpha,Menu, MenuItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import keysafe from '../assets/keysafe.jpg';
import { Link } from 'react-router-dom';
import Flag from 'react-world-flags';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const Navbar = () => {
  // Exemple de fullname (tu peux le récupérer dynamiquement)
  const fullname = "Amel Abid";
const [langMenu, setLangMenu] = useState(null);
// Menu langue
  const handleFlagClick = (e) => setLangMenu(e.currentTarget);
  const handleFlagClose = () => setLangMenu(null);

  // Changement de langue
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    handleFlagClose();
  };
   const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const { t, i18n } = useTranslation();
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'white',
          
          px: 2,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo à gauche */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={keysafe} alt="Logo" style={{ width: "90px", height: "60px" }} />
          </Link>
{/* Search bar centrée */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              backgroundColor: alpha('#000', 0.05),
              '&:hover': { backgroundColor: alpha('#000', 0.1) },
              width: '40%',
              display: 'flex',
              alignItems: 'center',
              px: 2,
            }}
          >
            <SearchIcon sx={{ mr: 1, color: 'gray' }} />
            <InputBase
              placeholder="Rechercher…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ width: '100%' }}
            />
          </Box>
{/* Notifications + Avatar + Fullname à droite */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Avatar alt="User Avatar" src="https://i.pravatar.cc/150?img=3" />

            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'black' }}>
              {fullname}
            </Typography>
               {/* ==== Bouton langue ==== */}
          <IconButton
            onClick={handleFlagClick}
            sx={{ p: 0.5, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
          >
            <Flag
              code={selectedLanguage === 'fr' ? 'FR' : 'GB'}
              style={{ width: 28, height: 18, borderRadius: 3 }}
            />
          </IconButton>
          {/* ==== Menu langue ==== */}
          <Menu
            anchorEl={langMenu}
            open={Boolean(langMenu)}
            onClose={handleFlagClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleLanguageChange('fr')}>
              <Flag code="FR" style={{ width: 26, marginRight: 10 }} />
              Français
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('en')}>
              <Flag code="GB" style={{ width: 26, marginRight: 10 }} />
              English
            </MenuItem>
          </Menu>
          </Box>
          
  
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
