import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
import { signupStart, signupSuccess, signupFailure } from '../redux/userSlice';
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
    margin: ${SPACING.s}px 0;
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

const SignUp = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.user);
    const [msg , setMsg] = useState('');
    console.log(error);
    useEffect(() => {
        if (error === '') {
            dispatch(signupFailure(''));
        }
    }, [error, dispatch]);


    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const signInWithGoogle = async () => {
        dispatch(signupStart());
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
                        dispatch(signupSuccess(res.data));
                        console.log(res.data);
                        navigate('/');
                    });
            })
            .catch((error) => {
                dispatch(signupFailure(error.response.data.message));
            });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (name && username && email && password) {
            if (isValidEmail(email)) {
                setEmail(email);
                const img = "https://uploads.commoninja.com/searchengine/wordpress/adorable-avatars.png";
                try {
                    const response = await axios.post(`/auth/signup`, { name, username, email, img, password });
                    if (response.status === 201) {
                        setMsg(response.data.message);
                        // dispatch(signupSuccess());
                        // navigate('/signin');
                    }
                } catch (error) {
                    console.log(error.response.data);
                    dispatch(signupFailure(error.response.data.message));
                }
            } else {
                dispatch(signupFailure('Please Provide a valid email'));
            }

        } else {
            dispatch(signupFailure("Please fill all the fields"));
        }
    };
    return (
        <Container>
            {error && <ToastNotification  type="error"   message={error} />}
            {msg && <ToastNotification type="success"  message={msg} />}
            <Wrapper>
                <Title>Sign Up</Title>
                <SubTitle>to continue your YouTube account</SubTitle>
                <Input placeholder='name' onChange={e => { setName(e.target.value); dispatch(signupFailure('')); }} />
                <Input placeholder='username' onChange={e => { setUsername(e.target.value); dispatch(signupFailure('')); }} />
                <Input type="email" placeholder='email' onChange={e => { setEmail(e.target.value); dispatch(signupFailure('')); }} />
                <Input placeholder='password' type='password' onChange={e => { setPassword(e.target.value); dispatch(signupFailure('')); }} />
                <Button onClick={handleSignup}>Sign Up</Button>
                <SubTitle>Or</SubTitle>
                <Button onClick={signInWithGoogle} >Sign In with Google</Button>
                <SubTitle>Or</SubTitle>
                <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>Login to an account</Link>
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

export default SignUp