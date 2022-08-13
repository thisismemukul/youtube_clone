import React, { useState } from 'react';
import styled from 'styled-components';
import { SPACING, SIZES } from '../constants';
import { IoLogoYoutube, IoLogoGithub, IoHomeSharp, IoCompassOutline } from "react-icons/io5";
import {
    MdOutlineSubscriptions,
    MdOutlineCode,
    MdOutlineLibraryMusic,
    MdOutlineSportsBasketball,
    MdOutlineSportsEsports,
    MdOutlineMovie,
    MdOutlineArticle,
    MdOutlineLiveTv,
    MdOutlineSettings,
    MdOutlineBugReport,
    MdOutlineHelpOutline,
    MdOutlineSettingsBrightness,
    MdOutlineAccountCircle,
    MdOutlineLogout,
    MdOutlineAllInbox
} from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from 'axios';
import { fetchAllFailure, fetchAllSuccess } from '../redux/videosSlice';

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
    width: ${(props) => props.type === 'sm' && `65%`};
    @media only screen and (max-width: 700px) {
        display: ${(props) => props.type !== 'sm' && `none`};
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
@media only screen and (max-width: 700px) {
    display: none;
}
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
&.active {
   color:  ${({ theme }) => theme.text};
   background-color:${({ theme }) => theme.soft};
   border-color: ${({ theme }) => theme.text};
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
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  display: none;
  @media only screen and (max-width: 700px) {
      display: block;
  }
`;
const Menu = ({ darkMode, setDarkMode, setOpenMenu, type }) => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeElement, setActiveElement] = useState('All')
    const logOut = async () => {
        try {
            const response = await axios.post(`/auth/signout`);
            if (response.status === 200) {
                localStorage.removeItem('persist:root')
                dispatch(logout());
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async (tag) => {
        setActiveElement(tag)
        if (tag === 'All') {
            dispatch(fetchAllSuccess(await axios.get(`/videos/random`).then(res => res.data)))
        } else {
            try {
                const res = await axios.get(`/videos/tags?tags=${tag}`);
                if (res.data.length > 0) {
                    dispatch(fetchAllSuccess(res.data));
                } else {
                    dispatch(fetchAllFailure("No videos found"));
                    alert("No videos found")
                }
            } catch (err) { }
        }
    }
    return (
        <Container type={type}>
            <Wrapper>
                <Close onClick={() => setOpenMenu(false)}>X</Close>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Logo>
                        <IoLogoYoutube size={24} color="#ff0000" />
                        <span>Youtube</span>
                    </Logo>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <IoHomeSharp size={18} />
                        Home
                    </Item>
                </Link>
                <Link to="trending" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <IoCompassOutline size={18} />
                        Explore
                    </Item>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <MdOutlineSubscriptions size={18} />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />
                <a
                    target="_blank"
                    rel="noreferrer"
                    href='https://thisismemukul.netlify.app' style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <MdOutlineCode size={18} />
                        Hi Developer
                    </Item>
                </a>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href='https://www.github.com/thisismemukul' style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <IoLogoGithub size={18} />
                        My Github
                    </Item>
                </a>
                <Hr />
                {!currentUser &&
                    <>
                        <Login>
                            <SubTitle>Sign in to like videos, comment, and subscribe.</SubTitle>
                            <Link to="signin" style={{ textDecoration: "none" }}>
                                <Button><MdOutlineAccountCircle size={18} />SIGN IN</Button>
                            </Link>
                        </Login>
                        <Hr />
                    </>
                }
                <Title>More from YouTube</Title>
                {[
                    { 'name': 'All', 'icon': <MdOutlineAllInbox size={18} /> },
                    { 'name': 'Music', 'icon': <MdOutlineLibraryMusic size={18} /> },
                    { 'name': 'Sports', 'icon': <MdOutlineSportsBasketball size={18} /> },
                    { 'name': 'Gaming', 'icon': <MdOutlineSportsEsports size={18} /> },
                    { 'name': 'Movies', 'icon': <MdOutlineMovie size={18} /> },
                    { 'name': 'News', 'icon': <MdOutlineArticle size={18} /> },
                    { 'name': 'Live', 'icon': <MdOutlineLiveTv size={18} /> }].map((tag, index) => {
                        return (
                            <Item onClick={() => handleClick(tag.name)} className={activeElement === tag.name ? 'active' : ''} key={index}>{tag.icon}{tag.name}</Item>
                        )
                    })}
                <Hr />
                <Link to="account" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <MdOutlineSettings size={18} />
                        Settings
                    </Item>
                </Link>
                <Link to="connect" style={{ textDecoration: "none", color: 'inherit' }}>
                    <Item>
                        <MdOutlineBugReport size={18} />
                        Report a Bug
                    </Item>
                </Link>
                <Item>
                    <MdOutlineHelpOutline size={18} />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <MdOutlineSettingsBrightness size={18} />
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Item>
                {currentUser &&
                    <>
                        <Hr />
                        <Item onClick={() => logOut()} >
                            <MdOutlineLogout size={18} />
                            Sign Out
                        </Item>
                    </>
                }
            </Wrapper>
        </Container>
    )
}

export default Menu

