import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import home from '../assets/img/hom.jpg';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function cuerpoHome() {
  return (
    <Box>
      <Grid container spacing={6} >
        <Grid item xs={12} md={6} >
          <Typography variant="h3" fontWeight={600}  sx={{mt:20,mx:5}}>
          Agenda y lleve un control de todas sus

          </Typography>
          <Typography variant="h3" fontWeight={600}  sx={{mx:5}}>
          actividades
          </Typography>
          <Typography variant="h6"  sx={{mt:5,mx:5}}>
          Aqui podras dar seguimiento a tus actividades
          del dia a dia.
          </Typography>
          <Typography variant="h6"  sx={{mx:5}}>
          ¿Que esperas?
          </Typography>
          <Box textAlign='center' sx={{witdt:'100%',height:'10%',mt:15}}>
            <Button
              variant="contained"
              sx={{ width: '440px',height:50,fontSize: '16px',backgroundColor:'#0E9AB1'}}
            >
              Empezar ahora
            </Button>
          </Box>

        </Grid>
        <Grid item xs={12} md={5}>
          <img src={home} width="104%" alt="My Team"  />
        </Grid>
      </Grid>
    </Box>
  );
}