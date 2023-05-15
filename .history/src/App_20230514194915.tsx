import { useMemo } from 'react';
import '@/App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { CssBaseline } from '@mui/material';

function App() {
	const theme = useMemo(() => createTheme(themeSettings), []);
	return (
		<>
			<div className='app'>
				<ThemeProvider theme={theme}>
					<CssBaseline />
          HI
				</ThemeProvider>
			</div>
		</>
	);
}

export default App;
