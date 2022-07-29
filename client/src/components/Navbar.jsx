import React from 'react'
import styled from 'styled-components';
import { SPACING, SIZES } from '../constants';

import {
  MdOutlineAccountCircle, MdOutlineSearch
} from "react-icons/md";

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
const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" /><MdOutlineSearch size={18} />
        </Search>
        <Button><MdOutlineAccountCircle size={18} />SIGN IN</Button>
      </Wrapper>
    </Container>
  )
}

export default Navbar