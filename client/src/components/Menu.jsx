import React from 'react';
import styled from 'styled-components';
import { SPACING, SIZES } from '../constants';
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
import { Link } from 'react-router-dom';

const Container = styled.div`
    flex: 1;
    color:  ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bgLighter};
    height: 100vh;
    font-size: ${SIZES.body}px;
    position: sticky;
    top: 0;
    overflow: auto;
    -ms-overflow-style: none;  
    scrollbar-width: none;  
    ::-webkit-scrollbar {
        display: none;
    }
    `;
const Wrapper = styled.div`
  padding: ${SIZES.large}px ${SIZES.extraLarge}px;
    `;
const Logo = styled.div`
display: flex;
align-items: center;
gap: ${SPACING.xs}px;
font-weight: bold;
margin-bottom: ${SIZES.large}px;
    `;
const Item = styled.div`
display: flex;
align-items: center;
gap: ${SPACING.l / 2}px;
cursor: pointer;
padding: ${SIZES.font / 2}px 0;
&:hover {
    background-color: ${({ theme }) => theme.soft};
}
    `;
const Hr = styled.hr`
    margin:${SIZES.radius}px 0;
    border: ${SPACING.xs / 9}px solid ${({ theme }) => theme.soft};
    `;
const Login = styled.div``;
const Button = styled.button`
padding: ${SIZES.base}px ${SIZES.medium}px;
background-color: transparent;
border: 1px solid ${({ theme }) => theme.link};
color: ${({ theme }) => theme.link};
border-radius: ${SPACING.xs}px;
font-weight: 500;
margin-top: ${SPACING.s}px;
cursor: pointer;
display: flex;
align-items: center;
gap: ${SPACING.xs};
`;
const Title = styled.h2`
font-size: ${SIZES.body}px;
font-weight: 500;
color:"#aaaaaa";
margin-bottom: ${SPACING.s * 2}px;
`;
const SubTitle = styled.h4`
font-size: ${SIZES.small}px;
font-weight: 500;
`;
const Menu = ({ darkMode, setDarkMode }) => {
    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Logo>
                        <IoLogoYoutube size={24} color="#ff0000" />
                        <span>Youtube</span>
                    </Logo>
                </Link>
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
                    <SubTitle>Sign in to like videos, comment, and subscribe.</SubTitle>
                    <Link to="/signin" style={{ textDecoration: "none" }}>
                        <Button><MdOutlineAccountCircle size={18} />SIGN IN</Button>
                    </Link>
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

