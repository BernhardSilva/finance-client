import '@/App.css';
import Navbar from '@/scenes/navbar';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { themeSettings } from './theme';

function App() {
	const theme = useMemo(() => createTheme(themeSettings), []);
	return (
		<>
			<div className='app'>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Box width='100%' height='100%' padding='1remn 2rem 4rem 2rem'>
							<Navbar />
							<Routes>
								<Route path='/' element={<div>dashboard page</div>} />
								<Route path='/predictions' element={<div>predictions page</div>} />
							</Routes>
						</Box>
					</ThemeProvider>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
