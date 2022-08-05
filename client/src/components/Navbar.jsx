import React, { useState } from 'react'
import styled from 'styled-components';
import { SPACING, SIZES } from '../constants';
import { IoLogoYoutube } from "react-icons/io5";

import {
  MdOutlineAccountCircle, MdOutlineArrowLeft, MdOutlineMenu, MdOutlineSearch, MdOutlineVideoCall
} from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Upload from './Upload';
import Menu from './Menu';

const Container = styled.div`
position: sticky;
top: 0;
color:  ${({ theme }) => theme.text};
background-color: ${({ theme }) => theme.bgLighter};
height: ${SPACING.m * 3}px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0 ${SPACING.xl / 2}px;
  position: relative;
  @media only screen and (max-width: 700px) {
justify-content: space-between;
}
  `;
const Back = styled.div`
  font-weight: bold;
  visibility: hidden;
  @media only screen and (max-width: 700px) {
   
    display: flex;
    justify-content: flex-end;
}

      `;
const Search = styled.div`
width: ${SPACING.xl}%;
position: absolute;
left:0;
right: 0;
margin:auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: ${SPACING.xs}px;
border: 1px solid "#ccc";
border-radius: ${SPACING.xs}px;
color: ${({ theme }) => theme.text};
@media only screen and (max-width: 700px) {
&:hover ${Back} {
  visibility: visible;
}

&:hover {
    width: 90%;
    background-color: ${({ theme }) => theme.bgLighter};
  }
}
`;
const Input = styled.input`
width: 100%;
border: none;
outline: 1px solid ${({ theme }) => theme.bg};
padding: ${SPACING.xs}px;
color: ${({ theme }) => theme.text};
background-color: transparent;
@media only screen and (max-width: 700px) {
 width: 0%;
&:hover {
    width: 90%;
    background-color: ${({ theme }) => theme.bgLighter};
  }
}
  `;
const Button = styled.button`
padding: ${SIZES.base}px ${SIZES.medium}px;
background-color: transparent;
border: 1px solid ${({ theme }) => theme.link};
color: ${({ theme }) => theme.link};
border-radius: ${SPACING.xs}px;
font-weight: 500;
cursor: pointer;
display: flex;
align-items: center;
gap: ${SPACING.xs};
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.m}px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  `;

const UploadVideo = styled.span`
cursor: pointer;
  `;
const Avatar = styled.img`
  width: ${SIZES.extremeLarge}px;
  height: ${SIZES.extremeLarge}px;
  border-radius: 50%;
  background-color: #ccc;
  @media only screen and (max-width: 700px) {
    display: ${(props) => props.type !== 'sm' ? `none`: `flex`};
  }
  @media only screen and (min-width: 700px) {
    display: ${(props) => props.type === 'sm' && `none`};
  }
  `;
const Text = styled.div`
font-size: ${SIZES.font}px;
@media only screen and (max-width: 700px) {
  display: none;
}

      `;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING.xs}px;
  font-weight: bold;
  margin-bottom: ${SIZES.large}px;
  visibility: hidden;
  @media only screen and (max-width: 700px) {
    margin-bottom: 0px;
    visibility: visible;
    display: flex;
    justify-content: flex-end;
}

      `;

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector(state => state.user);
  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>
              <MdOutlineMenu onClick={() => setOpenMenu(true)} />
              <IoLogoYoutube size={24} color="#ff0000" />
              <span>Youtube</span>
            </Logo>
          </Link>
          <Search>
            <Back>
              <MdOutlineArrowLeft size={36} style={{ cursor: "pointer" }} onClick={() => window.location.reload(false)} />
            </Back>
            <Input placeholder="Search" onChange={e => setQ(e.target.value)} onKeyPress={event => {
              if (event.key === 'Enter') {
                navigate(`/search?q=${q}`)
              }
            }} /><MdOutlineSearch size={18} style={{ cursor: "pointer" }} onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <UploadVideo>
                <MdOutlineVideoCall size={18} onClick={() => setOpen(true)} />
              </UploadVideo>
              <Avatar src={currentUser.img} />
              <Avatar type="sm" src={currentUser.img} onClick={() => setOpenMenu(true)} />
              <Text> {currentUser.name} </Text>
            </User>
          ) : (<Link to="/signin" style={{ textDecoration: "none" }}>
            <Button><MdOutlineAccountCircle size={18} />SIGN IN</Button>
          </Link>)}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
      {openMenu && <Menu darkMode={darkMode} setDarkMode={setDarkMode} setOpenMenu={setOpenMenu} type='sm' />}
    </>
  )
}

export default Navbar