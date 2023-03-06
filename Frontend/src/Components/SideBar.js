import * as React from 'react';
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
import Button from '@mui/material/Button';
import distance from '../Images/Trip.png';
import { Avatar } from '@mui/material';
import Post from '../Images/story.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import User_Auth from '../Global_Context/User_Auth';


function SideBar(props) {
  const { window } = props;

  const AuthContext = React.useContext(User_Auth);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [form_status,setform] = useState(false);


  const Data = {
    userid:AuthContext.user
  }

  const LogoutUser = () =>
  {
    AuthContext.logout();
  }

const HomeLink = AuthContext.token && AuthContext.user_id? <NavLink to={`/myprofile/${AuthContext.user_id+"-"+AuthContext.username}`} style={{color:'white',textDecoration:'none'}}>My Profile</NavLink> : '' ;
const CreatePost = AuthContext.token && AuthContext.user_id ? <Avatar alt="Remy Sharp"  style={{color:'white',textDecoration:'none'}} onClick={() => props.onConfirm()} src={Post} sx={{ width: 24, height: 22,borderRadius:'0px',border:'none' }}/> : '';
const Logout= AuthContext.token && AuthContext.user_id ? <NavLink to="/" style={{color:'white',textDecoration:'none'}} onClick={LogoutUser}>Logout</NavLink> : '';
const Login= !AuthContext.token ? <NavLink to="/" style={{color:'white',textDecoration:'none'}} >Login</NavLink> : '';
const drawerWidth = 240;
const navItems = [HomeLink, CreatePost , Logout,Login];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 1 }}>
        MUI
      </Typography>
      <Divider />
   {AuthContext.token!=null &&  <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
}
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex',color:'rgb(78, 18, 78);' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 2, display: { xs: 'none', sm: 'block' } }}
          >
          <NavLink to="/"><Avatar alt="Remy Sharp" src={distance} sx={{ width: 40, height: 40,borderRadius:'0px',border:'none' }}/></NavLink> 
          </Typography>
          {AuthContext.token!=null &&    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>}
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

    </Box>
  );
}

// DrawerAppBar.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default SideBar;