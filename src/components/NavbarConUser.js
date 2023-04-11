import * as React from 'react';
import '../assets/stylesheets/header.css'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;
const navItems = ['Home', 'Iniciar sesion', 'Registrarse'];

function NavbarConUser(props) {

  const navigate = useNavigate();



  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  function cerrarSesion(){
    localStorage.removeItem("correo");
    // window.location.replace("/Login");
    navigate("/")
  }


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{my: 2 }}>
        LOGO
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed" sx={{ backgroundColor:'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>

          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none'}}}
          >
          <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{color:'black',ml:5,flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            LOGO
          </Typography>


          <Box sx={{width:500,display: { xs: 'none', sm: 'block' } }}>
          <ul className="lista" >
            <li className="nav-item">
                <NavLink  style={{marginRight:"0px",color:"black", textDecoration: 'none'}} to="/Home">HOME</NavLink>
            </li>
            <li className="nav-item">
                <NavLink   style={{marginLeft:"45px",color:"black", textDecoration: 'none'}} to="/Directorio">DIRECTORIO</NavLink>
            </li>
            <li className="nav-item">
                <NavLink  style={{marginLeft:"45px",color:"black", textDecoration: 'none'}} to="/Agenda">AGENDA</NavLink>
            </li>
            <li className="nav-item">

            <Button
              style={{marginLeft:"25px",color:"black", textDecoration: 'none'}}
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >

            <PermIdentityIcon/>
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              <MenuItem onClick={cerrarSesion}>Cerrar sesion</MenuItem>
            </Menu>
            </li>
          </ul>
          </Box>

        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

NavbarConUser.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavbarConUser;

