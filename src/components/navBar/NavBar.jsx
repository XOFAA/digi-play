import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavbarColor } from '../../context/NavbarColorContext';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const pages = [
  { label: "Início", icon: "/assets/icon-home.svg", href: "/" },
  { label: "Palestras", icon: "/assets/icon-mic.svg", href: "/palestras" },
  { label: "Aulas", icon: "/assets/icon-aulas.svg", href: "/aulas" },
  { label: "Podcasts", icon: "/assets/icon-podcast.svg", href: "/podcasts" },
  { label: "Salvos", icon: "/assets/icon-salvar.svg", href: "/salvos" },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { navbarColor } = useNavbarColor();
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSettingClick = (setting) => {
    handleCloseUserMenu();

    if (setting === "Logout") {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    // opcional: navegação pros outros itens
    // if (setting === "Profile") navigate("/profile");
    // if (setting === "Account") navigate("/account");
    // if (setting === "Dashboard") navigate("/dashboard");
  };

  return (
    <AppBar
      sx={{
        bgcolor: navbarColor,
        backgroundImage: "none",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "none",

        position: { xs: "sticky", md: "fixed" },
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >


      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <Toolbar disableGutters>
          <Box sx={{ minWidth: "82px", height: "50px", display: { xs: "none", md: "flex" } }}>
            <img src='/assets/logo-brilhante.png' style={{ width: "100%", height: "100%" }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', fontWeight: "bolder" }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              minWidth: "25px",
              height: "50px",
              display: { xs: "flex", md: "none" },
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <img
              src="/assets/logo-brilhante.png"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center", gap: { md: 1, lg: 5 } }}>
            {pages.map((page) => (

              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  fontWeight: "600px",
                  fontSize: { lg: "22px", md: "16px" },
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  component="img"
                  src={page.icon}
                  alt=""
                  sx={{ width: 24, height: 24, objectFit: "contain", display: "block" }}
                />
                {page.label}
              </Button>

            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                  <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
