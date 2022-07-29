import React from 'react';
import styled from 'styled-components';

import { IoLogoYoutube, IoHomeSharp, IoCompassOutline } from "react-icons/io5";
import {
    MdOutlineSubscriptions,
    MdOutlineVideoLibrary,
    MdHistory,
    MdOutlineLibraryMusic,
    MdOutlineSportsBasketball,
    MdOutlineSportsEsports,
    MdOutlineMovie,
    MdOutlineArticle,
    MdOutlineLiveTv,
    MdOutlineSettings,
    MdOutlinedFlag,
    MdOutlineHelpOutline,
    MdOutlineSettingsBrightness,
    MdOutlineAccountCircle
} from "react-icons/md";

const Container = styled.div`
    flex: 1;
    color:  ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bg};
    height: 100vh;
    font-size: 14px;
    position: sticky;
    top: 0;
    overflow: auto;
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
const Item = styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0;
    `;
const Hr = styled.hr`
    margin:15px 0;
    border: 0.5px solid ${({ theme }) => theme.soft};
    `;
const Login = styled.div``;
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid ${({ theme }) => theme.link};
color: ${({ theme }) => theme.link};F
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`;
const Title = styled.h2`
font-size: 14px;
font-weight: 500;
color:"#aaaaaa";
margin-bottom: 20px;
`;
const Menu = ({ darkMode, setDarkMode }) => {
    return (
        <Container>
            <Wrapper>
                <Logo>
                    <IoLogoYoutube size={24} color="#ff0000" />
                    <span>Youtube</span>
                </Logo>
                <Item>
                    <IoHomeSharp size={18} />
                    Home
                </Item>
                <Item>
                    <IoCompassOutline size={18} />
                    Explore
                </Item>
                <Item>
                    <MdOutlineSubscriptions size={18} />
                    Subscriptions
                </Item>
                <Hr />
                <Item>
                    <MdOutlineVideoLibrary size={18} />
                    Library
                </Item>
                <Item>
                    <MdHistory size={18} />
                    History
                </Item>
                <Hr />
                <Login>
                    Sign in to like videos, comment, and subscribe.
                    <Button><MdOutlineAccountCircle size={18} />SIGN IN</Button>
                </Login>
                <Hr />
                <Title>More from YouTube</Title>
                <Item>
                    <MdOutlineLibraryMusic size={18} />
                    Music
                </Item>
                <Item>
                    <MdOutlineSportsBasketball size={18} />
                    Sports
                </Item>
                <Item>
                    <MdOutlineSportsEsports size={18} />
                    Gaming
                </Item>
                <Item>
                    <MdOutlineMovie size={18} />
                    Movies
                </Item>
                <Item>
                    <MdOutlineArticle size={18} />
                    News
                </Item>
                <Item>
                    <MdOutlineLiveTv size={18} />
                    Live
                </Item>
                <Hr />
                <Item>
                    <MdOutlineSettings size={18} />
                    Settings
                </Item>
                <Item>
                    <MdOutlinedFlag size={18} />
                    Report
                </Item>
                <Item>
                    <MdOutlineHelpOutline size={18} />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <MdOutlineSettingsBrightness size={18} />
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu