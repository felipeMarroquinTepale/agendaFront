import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import "../assets/stylesheets/calendario.css";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Button from '@mui/material/Button';
import { useState, useRef } from 'react';
import Navbar from '../components/NavbarConUser'
import "dayjs/locale/es";
import AddIcon from '@mui/icons-material/Add';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import dayjs from 'dayjs';
import timegrid from '@fullcalendar/timegrid';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 950,
  bgcolor: 'background.paper',
  borderRadius:'2%',
  p: 4,

};

const styleDetails = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height:320,
  bgcolor: 'background.paper',
  borderRadius:'2%',
  p:2

};

const drawerWidth = 285;
export default function Agenda() {
    const calendarRef = useRef();
    let tituloRef = useRef(null);
    let descripcionRef = useRef(null);
    let tipoActividadRef = useRef(null);
    let objetivoRef = useRef(null);
    let vestimentaRef = useRef(null);
    let productoRef = useRef(null);
    let linkRef = useRef(null);
    let lugarRef = useRef(null);
    let coloniaRef = useRef(null);
    let numeroInteriorRef = useRef(null);
    let numeroExteriorRef = useRef(null);
    let calleRef = useRef(null);
    let codigoPostalRef = useRef(null);
    let modalidadRef = useRef(null);
    let fechaInicioRef = useRef(null);
    let fechaFinalRef = useRef(null);


    const [startDate, setStartDate] = useState(new Date());
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    let tituloTrue = false;
    let fechaInicioTrue = false;
    let fechaFinalTrue = false;
    let descripcionTrue = false;
    let tipoActividadTrue = false;
    let objetivoTrue = false;
    let vestimentaTrue = false;
    let productoTrue = false;
    let linkTrue = false;
    let lugarTrue = false;
    let coloniaTrue = false;
    let numeroInteriorTrue = false;
    let numeroExteriorTrue = false;
    let calleTrue = false;
    let codigoPostalTrue = false;
    let modalidadTrue = false;



  //Titulo
  const [titulo, setTitulo] = useState('');
  //Descripcion
  const [descripcion, setDescripcion] = useState('');
  //Objetivo
  const [objetivo, setObjetivo] = useState('');
  //Tipo vestimenta
  const [vestimenta, setVestimenta] = useState('');
  //Recordatorio
  //Tipo de actividad
  const [recordatorio, setRecordatorio] = useState('');
  //Fecha Inicio
  const [fechaInicio, setValuefechaInicio] = React.useState(null);
  //Fecha final
  const [fechaFinal, setValuefechaFinal] = React.useState(null);
  //Modalidad
  const [modalidad, setModalidad] = React.useState('');
  //Producto
  const [producto, setValueProducto] = useState('');
  //Link
  const [linkReunion, setValueLink] = useState('');
  //Lugar
  const [lugar, setLugar] = useState('');
  //Colonia
  const [colonia, setColonia] = useState('');
  //Numero interior
  const [numeroInterior, setNumeroInterior] = useState('');
  //Numero Exterior
  const [numeroExterior, setNumeroExterior] = useState('');
  //Calle
  const [calle, setCalle] = useState('');
  //Codigo postal
  const [codigoPostal, setCodigoPostal] = React.useState('');
  const [alignment, setAlignment] = React.useState('Evento');
  const [idUsuarioCreo, setIdUsuarioCreo] = useState('');
  // const [idActividad, setIdActividad] = useState('');
  const [tituloDetails, setTituloDetails] = useState('');
  const [fechaIDetails, setFechaIDetails] = useState('');
  const [fechaFDetails, setFechaFDetails] = useState('');


  const [aEvents, setAEvents] = useState([]);


  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChangeModalidad = (event) => {
    setModalidad(event.target.value);
  };

  const [openModalDetails, setOpenModalDetails] = React.useState(false);
  const handleOpenModalDetails = () => setOpenModalDetails(true);
  const handleCloseModalDetails = () => setOpenModalDetails(false);


  React.useEffect(() => {
    let correo=  localStorage.getItem("correo");
    console.log("correo==> ",correo);

    const baseURL = "http://localhost:8000/usuario/consultarIdUsuario";
    axios.post(`${baseURL}`, {correo:correo}).then((response) => {
        console.log(response.data['data'][0]['id']);
        setIdUsuarioCreo(response.data['data'][0]['id']);
    });



    //Hacer consulta para recuperar el array de eventos que tendra datos como titulo, fecha inicial, fecha Final, hora Inicio, hora Final depende del idUsuario logueado

    const leerActividadPorIdUsuario = "http://localhost:8000/actividad/leerActividadPorIdUsuario";
    axios.post(`${leerActividadPorIdUsuario}`, {idUsuarioCreo:idUsuarioCreo}).then((response) => {
        console.log(response.data['data']);
        setAEvents(response.data['data'])
    });




  }, [idUsuarioCreo]);




  function preparandoModal(e){
    //  Quiero sacar la fecha y hora por separado

    console.log('fechaInicio',e.dateStr)

    setValuefechaInicio(dayjs(e.dateStr))
    // console.log('horaInicio',horaInicio)
    handleOpen();
  }


  function setEditModalEvent(){
    handleCloseModalDetails();
    handleOpen();

  }

  function deleteEvent(){

    let idModalidad='';
    let idActividad='';

    //Sacar el id del evento
    const urlIdActividad = "http://localhost:8000/actividad/consultIdActividad";
    const urlModalidad='http://localhost:8000/actividad/leerActividad';

    const urlEliminarAct = 'http://localhost:8000/actividad/eliminarActividad';
    const urlEliminarActVirtual = 'http://localhost:8000/actividadVirtual/eliminarActVirtual';
    const urlEliminarActPresencial = 'http://localhost:8000/actividadPresencial/eliminarActPresencial';



    axios.post(`${urlIdActividad}`,{titulo:tituloDetails}).then((response) => {


      console.log("Entra a idActividad")

      idActividad = (response.data['data'][0]['id']);
      console.log("ID actividad: ",idActividad);

      axios.post(`${urlModalidad}`,{id:idActividad}).then((response) => {

        idModalidad = (response.data['data'][0]['idModalidad']);
        console.log("Id modalidad: ", idModalidad)


        if(idModalidad===1){
          //si el idmodalidad = 1 entonces elimna tabla actividad y tabla virtual

          axios.post(`${urlEliminarActVirtual}`,{idActividad:idActividad}).then((response) => {
            if(response.data["status"]===false){
              alert("Ocurrio un problema activida virtual")
            }else{

              axios.post(`${urlEliminarAct}`,{id:idActividad}).then((response) => {
                if(response.data["status"]===false){
                  alert("Ocurrio un problema actividad")
                }else{
                  alert("actividad eliminada correctamente")
                  handleCloseModalDetails();
                  window.location.replace("/Agenda");
                }
              })

            }
          })


        }else if(idModalidad===2){
          //si el idmodalidad = 2 entonces elimna tabla actividad y tabla presencial

          axios.post(`${urlEliminarActPresencial}`,{idActividad:idActividad}).then((response) => {
            if(response.data["status"]===false){
              alert("Ocurrio un problema activida virtual")
            }else{

              axios.post(`${urlEliminarAct}`,{id:idActividad}).then((response) => {
                if(response.data["status"]===false){
                  alert("Ocurrio un problema actividad")
                }else{
                  alert("actividad eliminada correctamente")
                  handleCloseModalDetails();
                  window.location.replace("/Agenda");
                }
              })

            }
          })


        }

      });

    });



  }



  function addEventCallendar ()  {


    let dateI = fechaInicio.format().split("T")[0]
    let hourI = fechaInicio.format().split("T")[1].substring(0,8)
    let dateF = fechaFinal.format().split("T")[0]
    let hourF = fechaFinal.format().split("T")[1].substring(0,8)


    console.log('titulo:',titulo,'descripcion',descripcion,'Tipo actividad',alignment, 'fechaInicio: ',dateI,'fechaFin',dateF);
    console.log('modalidad',modalidad, 'hora inicio: ',hourI,'hora Final: ',hourF);
    console.log('lugar:',lugar,' colonia: ',colonia, 'numero Interior: ',numeroInterior, 'numero Exterior: ',numeroExterior);
    console.log('calle: ',calle,' codigoPostal: ',codigoPostal);
    console.log('link: ', linkReunion, 'producto: ',producto);
    console.log('objetivo',objetivo,'vestimenta:',vestimenta,'recordatorio',recordatorio);

    console.log("  ",tituloTrue,descripcionTrue,tipoActividadTrue,fechaInicioTrue,fechaFinalTrue,modalidadTrue,productoTrue,linkTrue,objetivoTrue,vestimentaTrue)


        const actividad = {
          titulo: titulo,
          fechaInicio: dateI,
          fechaFinal: dateF,
          horaInicio: hourI,
          horaFinal: hourF,
          descripcion: descripcion,
          vestimenta: vestimenta,
          objetivo: objetivo,
          tiempoRecordatorio:recordatorio,
          idUsuarioCreo: idUsuarioCreo,
          fechaCreo: dateI,
          idStatus: 1,
          idModalidad: modalidad,
          idTipoActividad: alignment,
          idUsuarioActualizo: idUsuarioCreo,
          fechaActualizo: dateI
      }



      const baseURL = "http://localhost:8000/actividad/crearActividad";
      const urlIdActividad = "http://localhost:8000/actividad/consultIdActividad";
      const baseURLCrearActVirtual = "http://localhost:8000/actividadVirtual/crearActVirtual";
      const baseURLCrearActPresencial = "http://localhost:8000/actividadPresencial/crearActPresencial";



      if(modalidad===1){
        if(tituloTrue===true && descripcionTrue===true && tipoActividadTrue===true && fechaInicioTrue ===true && fechaFinalTrue===true && modalidadTrue===true && productoTrue===true && linkTrue===true && objetivoTrue===true && vestimentaTrue===true){
          console.log("entra modalidad 1")
          //insertar en la tabla actividad y virtual
          axios.post(`${baseURL}`,actividad).then((response) => {
            console.log(response.data["status"]);
            if(response.data["status"]===false){
              alert("Ocurrio un problema con insertar los datos ");
            }else{
              alert("Datos insertados correctamente en actividad");

              //Se saca el id de la actividad insertada mediante el titulo

              axios.post(`${urlIdActividad}`,{titulo:titulo}).then((response) => {


                console.log("Entra a idActividad")
                console.log("ID actividad",response.data['data'][0]['id']);

                let idActividad = (response.data['data'][0]['id']);

                const virtual = {
                  idActividad: idActividad,
                  linkReunion: linkReunion,
                  producto: producto,
                  idUsuarioCreo: idUsuarioCreo,
                  fechaCreo: dateI,
                  idUsuarioActualizo: idUsuarioCreo,
                  fechaActualizo: dateI
                }

              //Se inserta datos en la tabla actividad virtual
              axios.post(`${baseURLCrearActVirtual}`,virtual).then((response) => {
                if(response.data["status"]===false){
                  alert("Ocurrio un problema al insertar los datos en la tabla virtual");
                  console.log(response.data)
                }else{
                  alert("campos insertados correctamente en la tabla actividad y virtual virtual")
                  //conectar con la api
                  handleClose();

                  let calendarApi = calendarRef.current.getApi();
                  calendarApi.addEvent({
                    id: 1,
                    title: titulo,
                    start:fechaInicio.toISOString(),
                    end:fechaFinal.toISOString()
                  })
                }
              });
              });
            }
          });

        }else{
          alert("verifique sus datos")
        }

      }else{


        if(tituloTrue===true && descripcionTrue===true && tipoActividadTrue===true && fechaInicioTrue ===true && fechaFinalTrue===true && modalidadTrue===true && lugarTrue===true && coloniaTrue===true && numeroInteriorTrue===true && numeroExteriorTrue===true && calleTrue===true && codigoPostalTrue===true && objetivoTrue===true && vestimentaTrue===true ){


        //insertar en la tabla actividad y presencial
        console.log("entra modalidad 2")
        //insertar en la tabla actividad y virtual
        axios.post(`${baseURL}`,actividad).then((response) => {
          console.log(response.data["status"]);
          if(response.data["status"]===false){
            alert("Ocurrio un problema con insertar los datos ");
          }else{
            alert("Datos insertados correctamente en actividad");

            //Se saca el id de la actividad insertada mediante el titulo

            axios.post(`${urlIdActividad}`,{titulo:titulo}).then((response) => {


              console.log("Entra a idActividad")
              console.log("ID actividad",response.data['data'][0]['id']);

              let idActividad = (response.data['data'][0]['id']);

              const presencial = {
                idActividad: idActividad,
                lugar: lugar,
                colonia: colonia,
                numeroInterior: numeroInterior,
                numeroExterior: numeroExterior,
                calle: calle,
                codigoPostal:codigoPostal,
                idUsuarioCreo: idUsuarioCreo,
                fechaCreo: dateI,
                idUsuarioActualizo: idUsuarioCreo,
                fechaActualizo: dateI
              }

            //Se inserta datos en la tabla actividad virtual
            axios.post(`${baseURLCrearActPresencial}`,presencial).then((response) => {
              if(response.data["status"]===false){
                alert("Ocurrio un problema al insertar los datos en la tabla presencial");
                console.log(response.data)
              }else{
                alert("campos insertados correctamente en la tabla actividad y presencial")
                //conectar con la api
                handleClose();


                let calendarApi = calendarRef.current.getApi();
                calendarApi.addEvent({
                  id: 1,
                  title: titulo,
                  start:fechaInicio.toISOString(),
                  end:fechaFinal.toISOString()
                })
              }

            });
            });
          }
        });
      }
      else{
        alert("Revise sus datos")
      }

      }

}






  function detailsEventCallendar(info){
    console.log(info.event.title)
    console.log(info.event.start)
    console.log(info.event.end)

    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", hour12:"false"};

    setTituloDetails(info.event.title)
    setFechaIDetails(info.event.start.toLocaleString("es-ES", options))
    setFechaFDetails(info.event.end.toLocaleString("es-ES", options))

    handleOpenModalDetails()
  }




  function modal1Validate(e){
    if(titulo.length===0 || titulo.length<5){
      tituloRef.innerHTML = ("Este campo debe tener al menos 5 caracteres");
    }else {
      tituloRef.innerHTML = ("");
      tituloTrue= true;
    }if(objetivo.length===0 || objetivo.length<5){
      objetivoRef.innerHTML = ("Este campo debe tener al menos 5 caracteres");
    }else{
      objetivoTrue = true;
      objetivoRef.innerHTML=("");
    }
    if(vestimenta.length===0 || vestimenta.length<5){
      vestimentaRef.innerHTML = ("Este campo debe tener al menos 5 caracteres");
    }else{
      vestimentaTrue = true;
      vestimentaRef.innerHTML=("");
    }if(modalidad.length===0){
      modalidadRef.innerHTML = ("Este campo es requerido");
    }else {
      modalidadTrue = true;
      modalidadRef.innerHTML = ("");
    }if(descripcion.length===0 || descripcion.length<5){
      descripcionRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      descripcionTrue = true;
      descripcionRef.innerHTML=("");
    }if(producto.length===0 || producto.length<5){
      productoRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      productoTrue = true;
      productoRef.innerHTML=("");
    }if(linkReunion.length===0 || linkReunion.length<5){
      linkRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      linkTrue = true;
      linkRef.innerHTML=("")
    }if(lugar.length===0 || lugar.length<5){
      lugarRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      lugarTrue = true;
      lugarRef.innerHTML=("");
    }if(colonia.length===0 || colonia.length<5){
      coloniaRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      coloniaTrue = true;
      coloniaRef.innerHTML=("");
    }if(numeroInterior.length===0 || numeroInterior.length<2){
      numeroInteriorRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      numeroInteriorTrue = true;
      numeroInteriorRef.innerHTML=("");

    }if(numeroExterior.length===0 || numeroExterior.length<2){
      numeroExteriorRef.innerHTML=("Este campo debe tener al menos 2 caracteres");
    }else{
      numeroExteriorTrue = true;
      numeroExteriorRef.innerHTML=("");
    }if(calle.length===0 || calle.length<5){
      calleRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      calleTrue = true;
      calleRef.innerHTML=("");
    }if(codigoPostal.length===0 || codigoPostal.length<5){
      codigoPostalRef.innerHTML=("Este campo debe tener al menos 5 caracteres");
    }else{
      codigoPostalTrue=true;
      codigoPostalRef.innerHTML=("");
    }if(alignment.length===0){
      tipoActividadRef.innerHTML=("Este campo es requerido");
    }else{
      tipoActividadTrue=true;
      tipoActividadRef.innerHTML=("");

    }if(fechaInicio===null){
      fechaInicioRef.innerHTML=("requerido");
    }else{
      fechaInicioTrue=true;
      fechaInicioRef.innerHTML=("");
    }if(fechaFinal===null){
      fechaFinalRef.innerHTML=("requerido");
    }else{
      fechaFinalTrue=true;
      fechaFinalRef.innerHTML=("");
    }
}

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar/>

      {/* VISATA LATERAL IZQUIERDA */}
      <Drawer
        variant="permanent"
        sx={{
          // backgroundColor:'red',
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Button sx={{mt:15,ml:2,backgroundColor:'#0E9AB1',height:'50px',width:'79%',borderRadius:5,fontSize:14,
            ":hover":{
              bgcolor:'#0b899e'
            }
            }}
            variant="contained" size="large"
        >
        <AddIcon sx={{mr:1,fontSize:30}}/>
          Crear actividad
        </Button>

        {/* CALENDARIO VISTA LATERAL IZQUIERDA */}
        <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale={"es"} >
          <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
          <DemoItem >
              <DateCalendar

                views={['day']}
                locale={'es'}
                  sx={{
                    width:'85%', mt:2,
                    "& .MuiPickersDay-root": {
                      "&.Mui-selected": {
                        height:'30px',
                        backgroundColor: "#0E9AB1",
                        "&.Mui-selected:hover": {
                          backgroundColor: "#0E9AB1",
                        },
                        "&.Mui-selected:focus": {
                          height:'30px',
                          backgroundColor: "#0E9AB1",
                        }
                      },
                    },
                  }}

                  onChange={(date) => {
                    setStartDate(date);
                    calendarRef.current.getApi().gotoDate(new Date(date));
                  }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      </Drawer>


      {/* CUERPO DE LA AGENDA */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* CALENDARIO PRINCIPAL */}

        <FullCalendar
            ref={calendarRef}
            headerToolbar={{
              center:"title",
              start:"today prev next",
              end: "dayGridMonth timeGridWeek timeGridDay",
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Dia",
              list: "Lista",
            }}

            height={840}
            contentHeight= {780}
            aspectRatio={3}

            views={["dayGridMonth", "timeGridWeek", "timeGridDay"]}
            plugins={[ interactionPlugin,daygridPlugin, timegrid]}

            slotLabelFormat={
              {hour: '2-digit',
              minute: '2-digit',
              hour12: true}
              }

            eventTimeFormat= {{
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }}

            eventClick={detailsEventCallendar}

            events={aEvents}




            editable={true}
            locale={'es'}
            goToDate={startDate}
            selectable={true}

            dateClick={preparandoModal}
        />
      </Box>


      {/* MODAL PARA AGREGAR EVENTO DESPUES DE HACER CLICK EN DIA,MES */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>



          <Box>
          <TextField fullWidth
            id="titulo"
            label="Añade un titulo"
            helperText=""
            variant="standard"
            value={titulo}

            onBlur={(e)=>{
              modal1Validate(e);
            }}
            onChange={(e)=>{
              setTitulo(e.target.value);
            }}
          />
          <div style={{color:'red',fontSize:14}} ref={self => tituloRef = self}>
          </div>

          <TextField fullWidth
            id="descripcion"
            label="Descripcion"
            helperText=""
            variant="standard"
            value={descripcion}

            onBlur={(e)=>{
              modal1Validate(e);
            }}
            onChange={(e)=>{
              setDescripcion(e.target.value);
            }}
          />
          <div style={{color:'red',fontSize:14}} ref={self => descripcionRef = self}>
          </div>

          <ToggleButtonGroup size='large'
            sx={{mt:2,ml:10}}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value={1}>Evento</ToggleButton>
            <ToggleButton value={2}>Tiempo de concentracion</ToggleButton>
            <ToggleButton value={3}>Fuera de oficina</ToggleButton>
            <ToggleButton value={4}>Tarea</ToggleButton>
            <ToggleButton value={5}>Cita</ToggleButton>
          </ToggleButtonGroup>


          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>

                <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <DateTimePicker
                    sx={{ml:10,mt:5}}
                    autoFocus={true}
                    format='YYYY-MM-DD hh:mm A'
                    label="fecha inicio"
                    value={fechaInicio}
                    onChange={(newValue) => setValuefechaInicio(newValue)}
                  />
                  <div style={{color:'red',fontSize:14,marginRight:'35%'}} ref={self => fechaInicioRef = self}>
                  </div>


                </Grid>
                <Grid item xs={8} >
                  <DateTimePicker
                    sx={{ml:10,mt:5}}
                    autoFocus={true}
                    format='YYYY-MM-DD hh:mm A'
                    label="fecha final"
                    value={fechaFinal}
                    onChange={(newValue) => setValuefechaFinal(newValue)}
                  />
                  <div style={{color:'red',fontSize:14, marginLeft:'35%'}} ref={self => fechaFinalRef = self}>
                  </div>

                </Grid>
              </Grid>
            </DemoContainer>
          </LocalizationProvider>



          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
            <FormControl fullWidth variant="standard" sx={{ mt:2, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Modalidad</InputLabel>
              <Select
                labelId="demo-simple-select-standarsd-label"
                id="demo-simple-select-standard"
                value={modalidad}
                onChange={handleChangeModalidad}
                label="Modalidad"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Virtual</MenuItem>
                <MenuItem value={2}>Presencial</MenuItem>
              </Select>
            </FormControl>
            <div style={{color:'red',fontSize:14}} ref={self => modalidadRef = self}>
            </div>

            </Grid>
            <Grid item xs={8} >

              <TextField sx={{mt:2,width:'100%'}}
                id="standard-helperText"
                label="Invitados"
                helperText=""
                variant="standard"
              />

            </Grid>
          </Grid>
            {
              modalidad ===1 &&
                <Grid container spacing={2} columns={16}>
                  <Grid item xs={8}>
                    <TextField sx={{mt:2,width:'100%'}}
                      id="Producto"
                      label="Producto"
                      variant="standard"
                      value={producto}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setValueProducto(e.target.value);
                      }}
                    />
                    <div style={{color:'red',fontSize:14}} ref={self => productoRef = self}>
                    </div>
                  </Grid>

                  <Grid item xs={8} >
                    <TextField sx={{mt:2,width:'100%'}}
                      id="Link"
                      label="Link"
                      helperText=""
                      variant="standard"
                      value={linkReunion}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setValueLink(e.target.value);
                      }}
                    />
                    <div style={{color:'red',fontSize:14}} ref={self => linkRef = self}>
                    </div>
                  </Grid>
               </Grid>
            }

            {
              modalidad ===2 &&
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={2} sm={4} md={4} >
                    <TextField sx={{mt:1,width:'100%'}}
                      id="standard-helperText"
                      label="Lugar"

                      variant="standard"
                      value={lugar}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setLugar(e.target.value);
                      }}
                      />
                      <div style={{color:'red',width:'90%',fontSize:14}} ref={self => lugarRef = self}>
                      </div>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} >
                    <TextField sx={{mt:1,width:'100%'}}
                      id="standard-helperText"
                      label="Colonia"
                      helperText=""
                      variant="standard"
                      value={colonia}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setColonia(e.target.value);
                      }}
                    />
                    <div style={{color:'red',width:'90%',fontSize:14}} ref={self => coloniaRef = self}>
                    </div>

                  </Grid>
                  <Grid item xs={2} sm={4} md={4} >
                    <TextField sx={{mt:1,width:'100%'}}
                      id="standard-helperText"
                      label="Numero Interior"
                      helperText=""
                      variant="standard"
                      value={numeroInterior}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setNumeroInterior(e.target.value);
                      }}
                    />
                    <div style={{color:'red',width:'90%',fontSize:14}} ref={self => numeroInteriorRef = self}>
                    </div>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} >
                    <TextField sx={{mt:1,width:'100%'}}
                      id="standard-helperText"
                      label="Numero exterior"
                      helperText=""
                      variant="standard"
                      value={numeroExterior}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setNumeroExterior(e.target.value);
                      }}
                    />
                    <div style={{color:'red',width:'90%',fontSize:14}} ref={self => numeroExteriorRef = self}>
                    </div>
                  </Grid>

                  <Grid item xs={2} sm={4} md={4} >
                    <TextField sx={{mt:1,width:'100%'}}
                      id="standard-helperText"
                      label="Calle"
                      helperText=""
                      variant="standard"
                      value={calle}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setCalle(e.target.value);
                      }}
                    />
                      <div style={{color:'red',width:'90%',fontSize:14}} ref={self => calleRef = self}>
                      </div>
                  </Grid>

                  <Grid item xs={2} sm={4} md={4} >
                    <TextField sx={{mt:1,width:'100%'}}
                      id="standard-helperText"
                      label="Codigo postal"
                      helperText=""
                      variant="standard"
                      value={codigoPostal}
                      onBlur={(e)=>{
                        modal1Validate(e);
                      }}
                      onChange={(e)=>{
                        setCodigoPostal(e.target.value);
                      }}
                    />
                    <div style={{color:'red',width:'90%',fontSize:14}} ref={self => codigoPostalRef = self}>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            }

          <TextField fullWidth
            sx={{mt:2}}
            id="standard-helperText"
            label="Objetivo"
            helperText=""
            variant="standard"
            value={objetivo}
            onBlur={(e)=>{
              modal1Validate(e);
            }}
            onChange={(e)=>{
              setObjetivo(e.target.value);
            }}
          />
          <div style={{color:'red',fontSize:14}} ref={self => objetivoRef = self}>
          </div>

          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <TextField sx={{mt:1,width:'100%'}}
                id="standard-helperText"
                label="Vestimenta"
                helperText=""
                variant="standard"
                value={vestimenta}
                onBlur={(e)=>{
                  modal1Validate(e);
                }}
                onChange={(e)=>{
                  setVestimenta(e.target.value);
                }}
              />
          <div style={{color:'red',width:'90%',fontSize:14}} ref={self => vestimentaRef = self}>
          </div>
          </Grid>

            <Grid item xs={8} >
            <TextField sx={{mt:1,width:'100%'}}
              id="standard-helperText"
              label="Recordatorio"
              helperText=""
              variant="standard"
              value={recordatorio}
              onChange={(e)=>{
                setRecordatorio(e.target.value);
              }}
            />

            </Grid>
          </Grid>

          <Button sx={{
            mt:8,ml:25,backgroundColor:'#0E9AB1',height:'45px',width:'50%',borderRadius:5,fontSize:14,
            ":hover":{
              bgcolor:'#0b899e'
            }
            }}
            variant="contained" size="large"
            onClick={()=>{
              addEventCallendar();
            }}

          >
            Continuar
          </Button>
          </Box>
        </Box>
      </Modal>

      <div>
      <Modal
        open={openModalDetails}
        onClose={handleCloseModalDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={styleDetails}>


        <Stack direction="row" spacing={0.5} justifyContent="flex-end" alignItems="flex-start" >

          <IconButton
            onClick={()=>{
              setEditModalEvent();
            }}
          >
            <BorderColorOutlinedIcon sx={{color:'black'}}/>
          </IconButton>

          <IconButton
           onClick={()=>{
              deleteEvent();
            }}>
            <DeleteOutlineOutlinedIcon sx={{color:'black'}}/>
          </IconButton>

          <IconButton
          onClick={handleCloseModalDetails}
          >
            <HighlightOffOutlinedIcon sx={{color:'black'}}/>
          </IconButton>

        </Stack>




        <div style={{fontFamily:'sans-serif', fontSize:'130%'}}>{tituloDetails}</div>
        <hr/>
        <div style={{marginTop:'5%'}} >{fechaIDetails} ==== {fechaFDetails}</div>

        <Button sx={{
            mt:12,ml:19,backgroundColor:'#0E9AB1',height:'45px',width:'50%',borderRadius:5,fontSize:14,color:'white',
            ":hover":{
              bgcolor:'#0b899e'
            }
            }}
          >
            Ver detalles
          </Button>

        </Box>
      </Modal>
      </div>
    </Box>

  );
}