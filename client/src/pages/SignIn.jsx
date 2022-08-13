import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import ToastNotification from '../components/ToastNotification';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - ${SPACING.m * 6}px);
    margin: ${SPACING.l}px 0;
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

const LinkIt = styled.span`
  margin-left: ${SPACING.l}px;
`;

const SignIn = () => {
    const [UnameOrEmail, setUnameOrEmail] = useState("");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.user);
    useEffect(() => {
        if (error === '') {
            dispatch(loginFailure(''));
        }
        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        if (isValidEmail(UnameOrEmail)) {
            setEmail(UnameOrEmail);
            setUsername('');
        } else {
            setUsername(UnameOrEmail);
            setEmail('');
        }
    }, [error, dispatch, UnameOrEmail])
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const response = username ? await axios.post(`/auth/signin`, { username, password }) : await axios.post(`/auth/signin`, { email, password });
            if (response.status === 200) {
                dispatch(loginSuccess(response.data));
                dispatch(loginFailure(null));
                navigate('/');
            }
        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
        }
    }
    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
            .then((result) => {
                const username = result.user.displayName.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 90 + 10);
                axios.post(`/auth/google`, {
                    name: result.user.displayName,
                    username: username,
                    email: result.user.email,
                    img: result.user.photoURL,
                })
                    .then((res) => {
                        dispatch(loginSuccess(res.data));
                        navigate('/');
                    });
            })
            .catch((error) => {
                dispatch(loginFailure(error.response.data.message));
            });
    };
    return (
        <Container>
            {error === '' ? null : <ToastNotification type="error" message={error} />}
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to continue to YouTube</SubTitle>
                <Input placeholder='username or email' onChange={(e) => { setUnameOrEmail(e.target.value); dispatch(loginFailure('')); }} />
                <Input placeholder='password' type='password' onChange={e => { setPassword(e.target.value); dispatch(loginFailure('')); }} />
                <Button onClick={handleLogin} >Sign In</Button>
                <SubTitle>Or</SubTitle>
                <Button onClick={signInWithGoogle} >Sign In with Google</Button>
                <SubTitle>Or</SubTitle>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>Create an account</Link>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <LinkIt>Help</LinkIt>
                    <LinkIt>Privacy</LinkIt>
                    <LinkIt>Terms</LinkIt>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn