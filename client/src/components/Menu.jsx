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
    color: #fff;
    background-color: #202020;
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
&:hover {
    background-color: #1a1a1a;
}
    `;
const Hr = styled.hr`
    margin:15px 0;
    border: 0.5px solid #373737;
    `;
const Login = styled.div``;
const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`;
const Menu = () => {
    return (
        <Container>
            <Wrapper>
                <Logo>
                    <IoLogoYoutube size={24} color="#ff0000" />
                    <span>Youtube</span>
                </Logo>
                <Item>
                    <IoHomeSharp size={18} color="#fff" />
                    Home
                </Item>
                <Item>
                    <IoCompassOutline size={18} color="#fff" />
                    Explore
                </Item>
                <Item>
                    <MdOutlineSubscriptions size={18} color="#fff" />
                    Subscriptions
                </Item>
                <Hr />
                <Item>
                    <MdOutlineVideoLibrary size={18} color="#fff" />
                    Library
                </Item>
                <Item>
                    <MdHistory size={18} color="#fff" />
                    History
                </Item>
                <Hr />
                <Login>
                    Sign in to like videos, comment, and subscribe.
                    <Button><MdOutlineAccountCircle size={18} />SIGN IN</Button>
                </Login>
                <Hr />
                <Item>
                    <MdOutlineLibraryMusic size={18} color="#fff" />
                    Music
                </Item>
                <Item>
                    <MdOutlineSportsBasketball size={18} color="#fff" />
                    Sports
                </Item>
                <Item>
                    <MdOutlineSportsEsports size={18} color="#fff" />
                    Gaming
                </Item>
                <Item>
                    <MdOutlineMovie size={18} color="#fff" />
                    Movies
                </Item>
                <Item>
                    <MdOutlineArticle size={18} color="#fff" />
                    News
                </Item>
                <Item>
                    <MdOutlineLiveTv size={18} color="#fff" />
                    Live
                </Item>
                <Hr />
                <Item>
                    <MdOutlineSettings size={18} color="#fff" />
                    Settings
                </Item>
                <Item>
                    <MdOutlinedFlag size={18} color="#fff" />
                    Report
                </Item>
                <Item>
                    <MdOutlineHelpOutline size={18} color="#fff" />
                    Help
                </Item>
                <Item>
                    <MdOutlineSettingsBrightness size={18} color="#fff" />
                    Light Mode
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu