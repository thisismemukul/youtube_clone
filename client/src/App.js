import styled from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
const Container = styled.div`
display: flex;
`;
const Main = styled.div`
  flex: 7;
  background-color: #fafafa;
  `;
const Wrapper = styled.div``;
const App = () => {
  return (
    <Container>
      <Menu />
      <Main>
        <Navbar />
        <Wrapper>
          Video Cards
        </Wrapper>
      </Main>
    </Container>
  )
}

export default App