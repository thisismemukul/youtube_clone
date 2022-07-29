import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/theme';
import Home from './pages/Home';
import Video from './pages/Video';
const Container = styled.div`
display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color:${({ theme }) => theme.bg};
  `;
const Wrapper = styled.div`
padding: 22px 16px;
`;
const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App