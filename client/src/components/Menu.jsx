import React from 'react';
import styled from 'styled-components';

import { IoLogoYoutube } from "react-icons/io5";

const Container = styled.div`
    flex: 1;
    color: #fff;
    background-color: #202020;
    height: 100vh;
    font-size: 14px;
    `;
const Wrapper = styled.div`
  padding: 18px 26px;
    `;
const Logo = styled.div`
display: flex;
align-items: center;
gap: 6px;
font-weight: bold;
margin-bottom: 25px;
    `;
const Menu = () => {
    return (
        <Container>
            <Wrapper>
                <Logo>
                    <IoLogoYoutube size={24} color="#ff0000" />
                    <span>Youtube</span>
                </Logo>
            </Wrapper>
        </Container>
    )
}

export default Menu