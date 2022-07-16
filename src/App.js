import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));


function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header/>
     <Route exact path="/" component={HomePage}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
