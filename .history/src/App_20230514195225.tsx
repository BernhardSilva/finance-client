import { useMemo } from 'react';
import '@/App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function App() {
	const theme = useMemo(() => createTheme(themeSettings), []);
	return (
		<>
			<div className='app'>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Box width="100%" height="100%" padding="1remn 2rem 4rem 2rem">

            </Box>
					</ThemeProvider>
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
