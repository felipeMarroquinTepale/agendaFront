import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavbarSinUser from '../components/NavbarSinUser';
import log from '../assets/img/log.png'
import { useState,useRef } from 'react';
import axios from "axios";




const theme = createTheme();


export default function Login() {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    let correoRef = useRef(null);
    let passwordRef = useRef(null);


    let emailTrue = false;
    let passwordTrue = false;



    const handleSubmit = (event) => {

        if(emailTrue === false && passwordTrue === false){
            event.preventDefault();
            alert("verifique los datos")
        }else{
            event.preventDefault();
            console.log("correo: ",correo," password: ",password);

            // const json = JSON.stringify({
            //     "correo":correo,
            //     "password":password
            // })

            const baseURL = "http://localhost:8000/usuario/inicioSesionUsuario";
            axios.post(`${baseURL}`,{correo:correo,password:password}).then((response) => {
                console.log(response.data["status"]);
                if(response.data["status"]===false){
                    alert("Verique que sus datos sean correctos")
                }else{
                    //Guardamos el correo en el localStorage
                    localStorage.setItem("correo",correo);
                    //Redirigir al home con usuario
                    window.location.replace("/Home");
                }
            });
        }
    };


    function modal1Validate(e){
        const email = RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
        const pass = RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/);


        if(correo.length===0){
            correoRef.innerHTML=("Este campo es requerido");
        }else{
            if(!email.test(correo)){
                correoRef.innerHTML=("Campo invalido. Debe contener:  example@direccion.com");
            }else{
                correoRef.innerHTML=("");
                emailTrue= true;
            }
        }
        if(password.length===0){
            passwordRef.innerHTML=("Este campo es requerido");
        }else{
            if(!pass.test(password)){
                passwordRef.innerHTML=("La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.");
            }else{
                passwordRef.innerHTML=("");
                passwordTrue=true;
            }
        }
    }



  return (
    <>
    <NavbarSinUser/>

    <Box sx={{}}>
        <p style={{textAlign:'center',fontFamily:'inter', fontWeight:'530',fontSize:'40px'}}>INICIO DE SESION</p>
    </Box>

    <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '80vh',px:'5%',pb:'2%'}}>
            <CssBaseline />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 10, width:'100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="correo"
                            label="Correo"
                            name="correo"
                            autoComplete="correo"
                            autoFocus
                            onBlur={(e)=>{
                                modal1Validate(e);
                            }}
                              onChange={(e)=>{
                                setCorreo(e.target.value);
                            }}
                        />
                        <div style={{color:'red',fontSize:14}} ref={self => correoRef = self}>
                        </div>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onBlur={(e)=>{
                                modal1Validate(e);
                            }}
                              onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                        />

                        <div style={{color:'red',fontSize:14}} ref={self => passwordRef = self}>
                        </div>

                        <Link sx={{color:'black'}} href="#" variant="body2">
                            Has olvidado tu contaseña?
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 10, mb: 2, height:50,backgroundColor:'#0E9AB1',
                            ":hover":{
                                bgcolor:'#0b899e'
                            }
                            }}
                        >
                            Iniciar sesion
                        </Button>

                        <Grid container>
                            <Link sx={{color:'black'}} href="/Registro" variant="body2">
                                {"¿No tienes una cuenta? cree una"}
                            </Link>
                        </Grid>
                    </Box>

                </Box>
            </Grid>

            <Grid
                item
                xs={12}
                sm={4}
                md={7}
                sx={{
                    // backgroundImage:`url(${log})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#0E9AB1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <p style={{textAlign:'center',fontWeight:'bold',fontSize:'40px',color:'white'}}>Bienvenido</p>

                <Box sx={{align:'center', justifyContent:'center',alignItems:'center',display:'flex',mt:'15%'}}>
                    <img src={log} alt=''/>
                </Box>

            </Grid>
        </Grid>
    </ThemeProvider>
    </>
  );
}