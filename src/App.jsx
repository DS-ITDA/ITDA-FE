import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import palette from '@/styles/theme';
import GlobalStyle from '@/styles/GlobalStyle';
import router from '@/routes/pagesRoutes';
import { ImageProvider } from './context/ImageContext';

function App() {
  return (
    <ImageProvider>
      <ThemeProvider theme={palette}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ImageProvider>
  );
}

export default App;
