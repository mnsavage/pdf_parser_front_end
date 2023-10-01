import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import './Header.css';
import ALogo from '../../assets/A-Square-Logo-4c_Official.jpg'
import nameplate from '../../assets/nameplate_Reverse.png'
  
const Header = () => {
  return (
      <AppBar position="static" className="header">
        <Toolbar>
           <Box
            className="script-a"
                component="img"
                alt="Script A Logo"
                src={ALogo}
            />
            <Box
                className="nameplate"
                component="img"
                alt="Nameplate Logo"
                src={nameplate}
            />
        </Toolbar>
      </AppBar>
  );
}

export default Header;
