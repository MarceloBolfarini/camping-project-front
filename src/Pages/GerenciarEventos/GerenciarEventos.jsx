import { Grid } from '@mui/material';
import Header from "../../Components/Header";
import BackGroundPage from "../../Components/BackgroundPage";
import { InputTitle, Title } from './style';
import { useState } from 'react';
import TextFieldComponent from '../../Components/TextFieldComponent';
import { useForm } from 'react-hook-form';
import ButtonRegister from '../../Components/ButtonComponent';
import { Icon } from '@iconify/react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({}) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(to bottom , #902747 , #542864B0)",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    border: 0,
    textAlign: "center"
  },
  [`&.${tableCellClasses.body}`]: {
    background: "rgba(0,0,0,0.6)",
    fontSize: 14,
    border: 0,
    color: "white",
    textAlign: "center"
   
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "rgba(0,0,0,0.5)",
    border: 0,
    boxShadow: "0px 0px 20px rgba(3, 3, 3, 0.5)"
    
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    color: "white"
  },
}));

const GerenciarEventos = () => {

  const { control, handleSubmit, register, watch, setValue, setFocus } = useForm();

  const [eventos, setEventos] = useState([]);

    const loadEvents = async () => (
        await axios.get('http://localhost:8080/eventos',{
            // headers:{
            //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgQWNhbXBhbWVudG9zIiwic3ViIjoiRW1haXNUZXN0ZWVAaG90bWFpbC5jb20iLCJpYXQiOjE2NjYzODg3MTQsImV4cCI6MTY2NjQ3NTExNH0.OzL7-5oukSRk5MVWhC8JIc42RUq0r7c_4tC0xPVZqNQ'
            // }
        })
        .then( (response)=> {setEventos(response.data); 
                            console.log(response) }).catch(console.log)
    )

    useEffect( async()=>{
        await  loadEvents();
        console.log(eventos)
    },[])


  return (
    <>
      <Header></Header>
      <BackGroundPage page={
        <Grid container justifyContent="center">
          <Grid item xs={4} style={{ display: "flex", marginTop: 40 }} justifyContent="center">
            <Title>Gerenciamento de Eventos</Title>
          </Grid>

          <Grid item xs={12} style={{ margin: "0 auto" }}>
            <Grid container justifyContent="space-around" style={{ margin: "60px 0px 0px 0px" }}>
              <Grid item xs={9}>
                <TableContainer component={Paper} style={{ boxShadow: "10px 5px 30px rgba(3, 3, 3, 0.5)"}}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="right">Título</StyledTableCell>
                        <StyledTableCell align="right">Local</StyledTableCell>
                        <StyledTableCell align="right">Data Início</StyledTableCell>
                        <StyledTableCell align="right">Data Encerramento</StyledTableCell>
                        <StyledTableCell align="right">Taxa Inscrição</StyledTableCell>
                        <StyledTableCell align="right">Qtd. Inscritos</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {eventos.map((evento) => 
                        <StyledTableRow key={evento?.id}>
                          <StyledTableCell component="th" scope="row">{evento?.titulo}</StyledTableCell>
                          <StyledTableCell align="right">{evento?.local}</StyledTableCell>
                          <StyledTableCell align="right">{evento?.dataAbertura}</StyledTableCell>
                          <StyledTableCell align="right">{evento?.dataEncerramento}</StyledTableCell>
                          <StyledTableCell align="right">{evento?.taxaInscricao}</StyledTableCell>
                          <StyledTableCell align="right">{evento?.inscritos.length}</StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }></BackGroundPage>
    </>
  )
}

export default GerenciarEventos;