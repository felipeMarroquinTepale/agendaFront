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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { useState } from 'react';
import { useRef } from 'react';



const theme = createTheme();

export default function Registro() {

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setapellidoPaterno] = useState('');
    const [apellidoMaterno, setapellidoMaterno] = useState('');
    const [celular, setCelular] = useState('');
    const [curp, setCurp] = useState('');
    const [correo, setCorreo] = useState('');
    const [fechaCumpleanio, setfechaCumpleanio] = useState('');
    const [area, setArea] = useState('');
    const [organizacion, setOrganizacion] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [sexo, setSexo] = useState('');
    const [numeroInterior, setNumeroInterior] = useState('');
    const [numeroExterior, setNumeroExterior] = useState('');
    const [direcccion, setDirecccion] = useState('');

    const [municipio, setMunicipio] = React.useState('');
    const handleChangeMunicipio = (event) => {
      setMunicipio(event.target.value);
    };
    const [cargo, setCargo] = React.useState('');

    const handleChangeCargo = (event) => {
      setCargo(event.target.value);
    };



    let nombreRef = useRef(null);
    let apellidoPaternoRef = useRef(null);
    let apellidoMaternoRef = useRef(null);
    let celularRef = useRef(null);
    let curpRef = useRef(null);
    let correoRef = useRef(null);
    let fechaCumpleanioRef = useRef(null);
    let areaRef = useRef(null);
    let organizacionRef = useRef(null);
    let userNameRef = useRef(null);
    let passwordRef = useRef(null);
    let cargoRef = useRef(null);
    let MunicipioRef = useRef(null);

    let sexoRef = useRef(null);
    let numeroInteriorRef = useRef(null);
    let numeroExteriorRef = useRef(null);
    let direcccionRef = useRef(null);



    let nombreTrue = false;
    let apellidoPaternoTrue = false;
    let apellidoMaternoTrue = false;
    let celularTrue = false;
    let curpTrue = false;
    let correoTrue = false;
    let fechaCumpleanioTrue = false;
    let areaTrue = false;
    let organizacionTrue = false;
    let userNameTrue = false;
    let passwordTrue = false;
    let cargoTrue = false;
    let MunicipioTrue = false;

    let sexoTrue = false;
    let numeroInteriorTrue = false;
    let numeroExteriorTrue = false;
    let direcccionTrue = false;








  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("nombre: ",nombre,"apellidoP: ",apellidoPaterno,"apellidoM: ",apellidoMaterno,"Celular: ",celular);
    console.log("curp: ",curp,"correo: ",correo,"fechaCum: ",fechaCumpleanio,"area: ",area,"organizacion: ",organizacion);
    console.log("userName: ",userName,"password: ",password,"sexo: ",sexo,"numeroI: ",numeroInterior,"numeroE: ",numeroExterior,"direccion: ",direcccion);
    console.log("Cargo: ",typeof(cargo), "Municipio: ",municipio);

    if(nombreTrue=== false || apellidoMaternoTrue===false || apellidoPaternoTrue ===false || celularTrue ===false || curpTrue === false || correoTrue ===false || fechaCumpleanioTrue === false || areaTrue ===false || organizacionTrue === false || userNameTrue ===false || passwordTrue ===false || cargoTrue === false || MunicipioTrue===false || sexoTrue===false || numeroInteriorTrue ===false || numeroExteriorTrue === false || direcccionTrue === false ){
        alert("Verifique los datos")
    }else if (nombreTrue=== true && apellidoMaternoTrue=== true && apellidoPaternoTrue === true && celularTrue ===true && curpTrue === true && correoTrue === true && fechaCumpleanioTrue === true && areaTrue === true && organizacionTrue === true && userNameTrue === true && passwordTrue ===true && cargoTrue === true && MunicipioTrue=== true && sexoTrue=== true && numeroInteriorTrue === true && numeroExteriorTrue === true && direcccionTrue === true ){


        const usuario = {
            nombre:nombre,
            apellidoPaterno:apellidoPaterno,
            apellidoMaterno:apellidoMaterno,
            celular:celular,
            curp:curp,
            correo:correo,
            fechaCumpleanio:fechaCumpleanio,
            area:area,
            organizacion:organizacion,
            userName:userName,
            password: password,
            idCargo:cargo,
            sexo:sexo,
            idMunicipio:municipio,
            numeroInterior:numeroInterior,
            numeroExterior:numeroExterior,
            direcccion:direcccion
        }

        console.log("user==> ", usuario)

        const baseURL = "http://localhost:8000/usuario/registrarUsuario";
        axios.post(`${baseURL}`,usuario).then((response) => {
            console.log(response.data["status"]);
            if(response.data["status"]===false){
                alert("Verique que sus datos sean correctos")
            }else{
                //Redirigir al home con usuario
                // window.location.replace("/Home");
                console.log(response.data["message"])
                if (response.data["message"]==="La cuenta ya existe"){
                    alert("La cuenta ya existe");
                }else{
                    alert("Cuenta registrada correctamente");
                    window.location.replace("/Login");
                }
            }
        });
    }

  };


  function formValidate(e){
    const email = RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
    const pass = RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/);


    if(nombre.length===0){
        nombreRef.innerHTML=("Campo requerido");
    }else{
        if(nombre.length<5){
            nombreRef.innerHTML=("Minimo 5 caracteres");
        }else{
            nombreRef.innerHTML=("");
            nombreTrue=true;
        }
    }
    if(apellidoPaterno.length===0){
        apellidoPaternoRef.innerHTML=("campo requerido");
    }else{
        if(apellidoPaterno.length<5){
            apellidoPaternoRef.innerHTML=("Minimo 5 caracteres");
        }else{
            apellidoPaternoTrue=true;
            apellidoPaternoRef.innerHTML=("");
        }
    }
    if(apellidoMaterno.length ===0){
        apellidoMaternoRef.innerHTML=("Campo requerido");
    }else{
        if(apellidoMaterno.length<5){
            apellidoMaternoRef.innerHTML=("Minimo 5 caracteres");

        }else{
            apellidoMaternoTrue=true;
            apellidoMaternoRef.innerHTML=("");
        }
    }
    if(celular.length ===0){
        celularRef.innerHTML=("Campo requerido");
    }else{
        if(celular.length<5){
            celularRef.innerHTML=("Minimo 5 caracteres");
        }else{
            celularTrue= true;
            celularRef.innerHTML=("");
        }
    }
    if(curp.length===0){
        curpRef.innerHTML=("Campo requerido");
    }else{
        if(curp.length<5){
        curpRef.innerHTML=("Minimo 5 caracteres");
        }else{
            curpTrue=true;
            curpRef.innerHTML=("");
        }
    }
    if(correo.length===0){
        correoRef.innerHTML=("Campo requerido");
    }else{
        if(!email.test(correo)){
            correoRef.innerHTML=("formato: example@direccion.com");
        }else{
            correoTrue=true;
            correoRef.innerHTML=("");
        }
    }
    if(fechaCumpleanio.length===0){
        fechaCumpleanioRef.innerHTML=("Requerido");
    }else{
        if(fechaCumpleanio<5){
            fechaCumpleanioRef.innerHTML=("Minimo 5 caracteres");
        }else{
            fechaCumpleanioTrue=true;
            fechaCumpleanioRef.innerHTML=("");
        }
    }
    if(area.length===0){
        areaRef.innerHTML=("Requerido");
    }else{
        if(area.length<5){
            areaRef.innerHTML=("Minimo 5 caracteres");
        }else{
            areaTrue=true;
            areaRef.innerHTML=("");
        }
    }
    if(organizacion.length===0){
        organizacionRef.innerHTML=("Campo requerido");
    }else{
        if(organizacion.length<5){
            organizacionRef.innerHTML=("Minimo 5 caracteres");
        }else{
            organizacionTrue=true;
            organizacionRef.innerHTML=("");
        }
    }

    if(userName.length===0){
        userNameRef.innerHTML=("Campo requerido");
    }else{
        if(userName.length<5){
            userNameRef.innerHTML=("Minimo 5 caracteres");
        }else{
            userNameTrue=true;
            userNameRef.innerHTML=("");
        }
    }
    if(password.length===0){
        passwordRef.innerHTML=("Campo requerido");
    }else{
        if(!pass.test(password)){
            passwordRef.innerHTML=("Siga el formato señalado");
        }else{
            passwordTrue=true;
            passwordRef.innerHTML=("");
        }
    }
    if(cargo.length===0){
        cargoRef.innerHTML=("Campo requerido");
    }else{
        if(cargo.length<5){
            cargoRef.innerHTML=("Minimo 5 caracteres");
        }else{
            cargoTrue=true;
            cargoRef.innerHTML=("");
        }
    }

    if(municipio.length===0){
        MunicipioRef.innerHTML=("Campo requerido");
    }else{
        if(municipio.length<5){
            MunicipioRef.innerHTML=("Minimo 5 caracteres");
        }else{
            MunicipioTrue=true;
            MunicipioRef.innerHTML=("");
        }
    }
    if(sexo.length===0){
        sexoRef.innerHTML=("Campo requerido");
    }else{
        if(sexo.length>1){
            sexoRef.innerHTML=("Maximo 1 caracteres");
        }else{
            sexoTrue=true;
            sexoRef.innerHTML=("");
        }
    }
    if(numeroInterior.length===0){
        numeroInteriorRef.innerHTML=("Campo requerido");
    }else{
        if(numeroInterior.length>5){
            numeroInteriorRef.innerHTML=("Maximo 5 caracteres");
        }else{
            numeroInteriorTrue=true;
            numeroInteriorRef.innerHTML=("");
        }
    }
    if(numeroExterior.length===0){
        numeroExteriorRef.innerHTML=("Campo requerido");
    }else{
        if(numeroExterior.length>5){
            numeroExteriorRef.innerHTML=("Maximo 5 caracteres");
        }else{
            numeroExteriorTrue=true;
            numeroExteriorRef.innerHTML=("");
        }
    }
    if(direcccion.length===0){
        direcccionRef.innerHTML=("Campo requerido");
    }else{
        if(direcccion.length>0 && direcccion.length<10){
            direcccionRef.innerHTML=("Minimo 10 caracteres");
        }else{
            direcccionTrue=true;
            direcccionRef.innerHTML=("");
        }
    }
  }


  const [aCargo, setAcargo] = useState([]);
  const [aMunicipio, setAmunicipio] = useState([]);




  const baseURLC = "http://localhost:8000/cargo/consultCargo";
  const baseURLM = "http://localhost:8000/municipio/consultMunicipio";

  React.useEffect(() => {

    axios.get(baseURLC).then((response) => {
      console.log('cargo: ',response.data['data']);
      setAcargo(response.data['data']);

    });

    axios.get(baseURLM).then((response) => {
        console.log('Municipio: ',response.data['data']);
        setAmunicipio(response.data['data']);

    });

  }, []);



  return (
    <>
    <NavbarSinUser/>

    <Box sx={{}}>
        <p style={{textAlign:'center',fontFamily:'inter', fontWeight:'540',fontSize:'40px'}}>REGISTRO</p>
    </Box>

    <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '80vh',px:'5%',pb:'2%', mb:'20%'}}>
            <CssBaseline />

            <Grid item xs={12} sm={8} md={5}  component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >

                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Grid container sx={{ justifyContent:"center",alignItems:"center"}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="nombre"
                                    label="nombre"
                                    name="nombre"
                                    autoComplete="nombre"
                                    autoFocus
                                    onChange={(e)=>{
                                        setNombre(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => nombreRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="apellidoP"
                                    label="apellidoP"
                                    name="apellidoP"
                                    autoComplete="apellidoP"
                                    autoFocus
                                    onChange={(e)=>{
                                        setapellidoPaterno(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => apellidoPaternoRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="apellidoM"
                                    label="apellidoM"
                                    type="apellidoM"
                                    id="apellidoM"
                                    onChange={(e)=>{
                                        setapellidoMaterno(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => apellidoMaternoRef = self}>
                            </div>

                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="celular"
                                    label="celular"
                                    type="celular"
                                    id="celular"
                                    onChange={(e)=>{
                                        setCelular(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => celularRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="curp"
                                    label="curp"
                                    type="curp"
                                    id="curp"
                                    onChange={(e)=>{
                                        setCurp(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => curpRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="correo"
                                    label="correo"
                                    type="correo"
                                    id="correo"
                                    onChange={(e)=>{
                                        setCorreo(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => correoRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="fechaCumpleanio"
                                    label="fechaCumpleanio"
                                    type="fechaCumpleanio"
                                    id="fechaCumpleanio"
                                    onChange={(e)=>{
                                        setfechaCumpleanio(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => fechaCumpleanioRef = self}>
                            </div>
                            </Grid>


                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="area"
                                    label="area"
                                    type="area"
                                    id="area"
                                    onChange={(e)=>{
                                        setArea(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => areaRef = self}>
                            </div>
                            </Grid>


                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="organizacion"
                                    label="organizacion"
                                    type="organizacion"
                                    id="organizacion"
                                    onChange={(e)=>{
                                        setOrganizacion(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => organizacionRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="userName"
                                    label="userName"
                                    type="userName"
                                    id="userName"
                                    onChange={(e)=>{
                                        setUserName(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => userNameRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="password"
                                    type="password"
                                    id="password"
                                    onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => passwordRef = self}>
                            </div>
                            </Grid>

                            <Grid item width={'38%'} sx={{mt:1}}>

                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cargo}
                                label="Cargo"
                                onChange={handleChangeCargo}
                                onBlur={(e)=>{
                                    formValidate(e);
                                }}
                                >
                                {aCargo.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.cargo}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <div style={{color:'red',fontSize:14}} ref={self => cargoRef = self}>
                            </div>

                            </Grid>


                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="sexo"
                                    label="sexo"
                                    type="sexo"
                                    id="sexo"
                                    onChange={(e)=>{
                                        setSexo(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => sexoRef = self}>
                            </div>

                            </Grid>

                            <Grid item width={'38%'} sx={{mt:1}}>

                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Municipio</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={municipio}
                                label="Municipio"
                                onChange={handleChangeMunicipio}
                                onBlur={(e)=>{
                                    formValidate(e);
                                }}
                                >
                                {aMunicipio.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.municipio}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <div style={{color:'red',fontSize:14}} ref={self => MunicipioRef = self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="numeroInterior"
                                    label="numeroInterior"
                                    type="numeroInterior"
                                    id="numeroInterior"
                                    onChange={(e)=>{
                                        setNumeroInterior(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => numeroInteriorRef= self}>
                            </div>
                            </Grid>

                            <Grid item>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="numeroExterior"
                                    label="numeroExterior"
                                    type="numeroExterior"
                                    id="numeroExterior"
                                    onChange={(e)=>{
                                        setNumeroExterior(e.target.value);
                                    }}
                                    onBlur={(e)=>{
                                        formValidate(e);
                                    }}
                                />
                            <div style={{color:'red',fontSize:14}} ref={self => numeroExteriorRef = self}>
                            </div>
                            </Grid>
                        </Grid>

                        <Grid item px={'13%'}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="direccion"
                            label="direccion"
                            type="direccion"
                            id="direccion"
                            onChange={(e)=>{
                                setDirecccion(e.target.value);
                            }}
                            onBlur={(e)=>{
                                formValidate(e);
                            }}
                            />
                            <div style={{color:'red',fontSize:14}} ref={self => direcccionRef = self}>
                            </div>
                        </Grid>

                        <p>Nota: La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                        Puede tener otros símbolos.</p>

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
                                Registrar cuenta
                            </Button>



                        <Grid container>
                            <Link sx={{color:'black'}} href="/Login" variant="body2">
                                {"¿Ya tienes una cuenta? Inicia sesion"}
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