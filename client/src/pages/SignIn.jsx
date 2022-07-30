import React from 'react';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - ${SPACING.m * 6}px);
    color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: ${SPACING.m}px  ${SPACING.xl}px;
    gap: ${SPACING.m}px;
`;
const Title = styled.h1`
font-size: ${SIZES.extraLarge}px;
`;
const SubTitle = styled.h2`
font-size: ${SIZES.large}px;
`;
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: ${SPACING.xs}px;
padding: ${SPACING.s}px;
width: 100%;
outline: none;
background-color: transparent;
`;
const Button = styled.button`
border-radius: ${SPACING.xs}px;
border:none;
padding: ${SPACING.m}px  ${SPACING.xl}px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  margin-top: ${SPACING.s}px;
  font-size: ${SIZES.small}px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: ${SPACING.xl}px;
`;

const Link = styled.span`
  margin-left: ${SPACING.l}px;
`;

const SignIn = () => {
    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to continue to YouTube</SubTitle>
                <Input placeholder='username or email' />
                <Input placeholder='password' type='password' />
                <Button>Sign In</Button>
                <Title>Or</Title>
                <Input placeholder='username' />
                <Input type="email" placeholder='email' />
                <Input placeholder='password' type='password' />
                <Button>Sign Up</Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn