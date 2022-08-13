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
import SignIn from './pages/SignIn';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import { useSelector } from 'react-redux';
import EmailVerify from './components/EmailVerify';
import Connect from './pages/Connect';
import PageNotFound from './pages/PageNotFound';
const Container = styled.div`
display: flex;
background-color:${({ theme }) => theme.bg};
`;
const Main = styled.div`
  flex: 7;
  background-color:${({ theme }) => theme.bg};
  `;
const Wrapper = styled.div`
padding: 22px 16px;
min-height: 100vh;
`;
const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector(state => state.user);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trending" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="signup" element={<SignUp />} />
                  {currentUser ? <Route path="account" element={<Account currentUser={currentUser} />} /> : <Route path="account" element={<SignIn />} />}
                  <Route path="connect" element={<Connect />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="/auth/:id/verify/:token" element={<EmailVerify />} />
                  <Route path="*" element={<PageNotFound />} />
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