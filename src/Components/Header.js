import React from 'react'
import {AppBar , Container, Toolbar, Typography , Select, MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { createTheme , ThemeProvider } from '@material-ui/core/styles';
import { CryptoState} from "../CryptoContext"


const useStyles = makeStyles({
  title: {
   flex:1,
   color: "gold",
   fontFamily:"Montserrat",
   fontWeight: "bold",
   cursor: "pointer",
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  }
})
    

const Header = () => {

  const classes = useStyles();
  const history =  useHistory();
   const {currency, setCurrency}  = CryptoState();



  return (

    <ThemeProvider theme={darkTheme}>


       <AppBar color="transparent" position='static'>
      <Container>
       <Toolbar>
           <Typography onClick={()=>{history.push('/')}} className={classes.title}>
            Crypto Tracker
           </Typography>

           <Select value={currency} onChange={(e)=>{setCurrency(e.target.value)}} variant='outlined' style={{
            width: 100,
            height:40,
            marginLeft:15,

           }}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"PKR"}>PKR</MenuItem>

           </Select>
       </Toolbar>
      </Container>
       </AppBar>

       </ThemeProvider>
  )
}

export default Header
