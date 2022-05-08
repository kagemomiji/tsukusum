import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, Container, CssBaseline} from "@mui/material";
import Home from './components/page/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NotFound from './components/page/NotFound';
import Summary from './components/page/Summary';
import HeaderBar from './components/common/HeaderBar';

const theme = createTheme();

const App = (): JSX.Element => {
  return(
    <>
      <HeaderBar/>
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
    </>
  )
}

export default App;
