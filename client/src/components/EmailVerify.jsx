import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
import { IoLogoYoutube } from "react-icons/io5";
import { loginFailure, loginSuccess } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

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

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `/auth/${param.id}/verify/${param.token}`;
                const response = await axios.get(url);
                if (response.status === 200) {
                    setValidUrl(true);
                    dispatch(loginSuccess(response.data));
                    dispatch(loginFailure(null));
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
                setValidUrl(false);
                dispatch(loginFailure(error.response.data));
                navigate('/signin');
            }
        };
        verifyEmailUrl();
    }, [param, dispatch, navigate]);
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
                <h1>404 Not Found Please Retry</h1>
            )}
        </Container>
    )
}

export default EmailVerify