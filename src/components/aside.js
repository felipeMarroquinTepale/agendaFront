import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CalendarSmall from './calendar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';



const drawerWidth = 285;

export default function aside() {
  return (
    <Drawer
        variant="permanent"
        sx={{
          // backgroundColor:'red',
          width: 220,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <Button sx={{mt:15,ml:2,backgroundColor:'#0E9AB1',height:'50px',width:'79%',borderRadius:5,fontSize:15,
          ":hover":{
            bgcolor:'#0b899e'
          }
        }}
        variant="contained" size="large"
        >
          <AddIcon sx={{mr:1,fontSize:35}}/>
          Crear actividad
        </Button>
        <CalendarSmall/>
        </Box>
      </Drawer>
  );
}