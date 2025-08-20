
import {AppBar, Toolbar, IconButton, Box, Badge, Avatar, Typography, InputBase,
  alpha,Menu, MenuItem,
  Button,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import keysafe from '../assets/keysafe.jpg';
import { Link } from 'react-router-dom';
import Flag from 'react-world-flags';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogoutAction } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
const Navbar = () => {
  // Exemple de username (tu peux le récupérer dynamiquement)
  const username = "Amel Abid";
    // Séparation des états des menus
  const [userMenu, setUserMenu] = useState(null);
const [langMenu, setLangMenu] = useState(null);
// Menu utilisateur
  const handleUserClick = (event) => setUserMenu(event.currentTarget);
  const handleUserClose = () => setUserMenu(null);
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
   const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state.user.CurrentUser);
  const userusername= CurrentUser?.username|| CurrentUser?.user?.username;
  const userEmail   = CurrentUser?.email   || CurrentUser?.user?.email;
  const userRole    = CurrentUser?.role    || CurrentUser?.user?.role;
   // Déconnexion
  const handleLogout = async () => {
    try {
      await dispatch(LogoutAction()).unwrap();
      toast.success("Déconnexion réussie !");
      localStorage.removeItem("user");
      window.location.href = "/LoginEtudiant";
    } catch (err) {
      toast.error("Erreur lors de la déconnexion");
    }
  };
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
{/* Notifications + Avatar + username à droite */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
{CurrentUser ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  py: 0.7,
                  bgcolor: '#F3FAFF',
                  borderRadius: 4,
                  boxShadow: '0 2px 8px rgba(34,127,191,0.07)',
                  gap: 1.3,
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s, background 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 16px rgba(34,127,191,0.15)',
                    bgcolor: '#e9f4fb',
                  },
                  ml: 2,
                  minWidth: 140,
                }}
                onClick={handleUserClick}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    border: '2px solid #227FBF',
                    bgcolor: '#eaf6fb',
                  }}
                  src= "https://i.pravatar.cc/150?img=3"/* {
                    userImage
                      ? `http://localhost:3000/uploads/users/${encodeURIComponent(userImage)}?t=${Date.now()}`
                      : undefined
                  } */
                />
                {/* Bloc nom et rôle en colonne */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: '#1976d2',
                      fontWeight: 700,
                      fontSize: '1.12rem',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {userusername}
                  </Typography>
                  {userRole && (
                    <Typography
                      sx={{
                        color: '#227FBF',
                        fontWeight: 500,
                        fontSize: '0.97rem',
                        lineHeight: 1.1,
                        mt: '1px',
                        letterSpacing: 0.3,
                        textTransform: 'capitalize',
                      }}
                    >
                      {userRole}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="#227FBF">
                    <path d="M5.5 8l4.5 4.5L14.5 8" stroke="#227FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Box>
              </Box>

              {/* Menu déroulant User */}
              <Menu
                anchorEl={userMenu}
                open={Boolean(userMenu)}
                onClose={handleUserClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    borderRadius: 3,
                    minWidth: 220,
                    boxShadow: '0 6px 24px rgba(34,127,191,0.10)',
                    mt: 1,
                  },
                }}
              >
                {/* Header du menu (avatar + nom + email) */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  py: 2,
                  px: 2,
                  bgcolor: '#f5faff',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottom: '1px solid #E0E7EF',
                  mb: 1
                }}>
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      mb: 1,
                      bgcolor: '#eaf6fb',
                      border: '2px solid #227FBF',
                    }}
                    src=""/* {
                      userImage
                        ? `http://localhost:3000/uploads/users/${encodeURIComponent(userImage)}?t=${Date.now()}`
                        : undefined
                    } */
                  />
                  <Typography sx={{ fontWeight: 700, color: '#1976d2', fontSize: '1.07rem', mb: 0.2 }}>
                    {username}
                  </Typography>
                  {userEmail && (
                    <Typography sx={{ color: '#608AB3', fontSize: '0.93rem' }}>
                      {userEmail}
                    </Typography>
                  )}
                </Box>
                {/* Bouton Profil */}
                <MenuItem
                  onClick={() => {
                    handleUserClose();
                    window.location.href = "profile";
                  }}
                  sx={{
                    color: '#1976d2',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    gap: 1.2,
                    borderRadius: 2,
                    my: 0.2,
                    '&:hover': {
                      bgcolor: '#eaf6fb',
                      color: '#094466',
                    },
                    fontSize: '0.97rem'
                  }}
                >
                  <PersonIcon sx={{ fontSize: 20, color: 'inherit', mr: 1 }} />
                  {t('Mon Profil')}
                </MenuItem>
                {/* Bouton Déconnexion */}
                <MenuItem
                  onClick={() => {
                    handleUserClose();
                    handleLogout();
                  }}
                  sx={{
                    color: '#1976d2',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    gap: 1.2,
                    borderRadius: 2,
                    my: 0,
                    '&:hover': {
                      bgcolor: '#f5faff',
                      color: '#094466',
                    },
                    fontSize: '0.97rem'
                  }}
                >
                  <LogoutIcon sx={{ fontSize: 20, color: 'inherit', mr: 1 }} />
                  {t('Déconnexion')}
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button to="/login" bgColor="#09759D">
              {t("login")}
            </Button>
          )}
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
           {/* Right: login/logout + langue */}

          
  
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
