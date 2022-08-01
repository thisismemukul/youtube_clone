import React from 'react'
import styled from 'styled-components';
import { SPACING, SIZES } from '../constants';

import {
  MdOutlineAccountCircle, MdOutlineSearch, MdOutlineVideoCall
} from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
`;
const Input = styled.input`
width: 100%;
border: none;
outline: 1px solid ${({ theme }) => theme.bg};
padding: ${SPACING.xs}px;
background-color: transparent;
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

const Avatar = styled.img`
  width: ${SIZES.extremeLarge}px;
  height: ${SIZES.extremeLarge}px;
  border-radius: 50%;
  background-color: #ccc;
  `;

const Navbar = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" /><MdOutlineSearch size={18} />
        </Search>
        {currentUser ? (
          <User>
            <MdOutlineVideoCall size={18} />
            <Avatar/>
            {currentUser.name}
          </User>
        ) : (<Link to="/signin" style={{ textDecoration: "none" }}>
          <Button><MdOutlineAccountCircle size={18} />SIGN IN</Button>
        </Link>)}
      </Wrapper>
    </Container>
  )
}

export default Navbar