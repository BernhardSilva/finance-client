import { useMemo } from 'react';
import '@/App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

function App() {
	const theme = useMemo(() => createTheme(themeSettings), []);
	return (
		<>
			<div className='app'>
				<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					HI
				</ThemeProvider>
				<BrowserRouter />
			</div>
		</>
	);
}

export default App;
