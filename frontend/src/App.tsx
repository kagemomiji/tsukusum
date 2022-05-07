import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Container, CssBaseline} from "@mui/material";
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotFound from './components/NotFound';
import Summary from './components/Summary';

const theme = createTheme();

const App = (): JSX.Element => {
  return(
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:"center"
          }}
        >
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/summary' element={<Summary/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          </BrowserRouter>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App;
