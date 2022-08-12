import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
import { IoLogoYoutube } from "react-icons/io5";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - ${SPACING.m * 6}px);
    margin: ${SPACING.s}px 0;
    color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
    width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const Button = styled.div`
border: none;
outline: none;
padding: 12px 0;
background-color: #3bb19b;
border-radius: 20px;
width: 180px;
font-weight: bold;
font-size: 14px;
cursor: pointer;
`;

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);
    return (
        <Container>
            {validUrl ? (
                <Wrapper>
                    <IoLogoYoutube size={24} color="#ff0000" />
                    <h1>Email verified successfully</h1>
                    <Link to="/signin">
                        <Button>Login</Button>
                    </Link>
                </Wrapper>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </Container>
    )
}

export default EmailVerify