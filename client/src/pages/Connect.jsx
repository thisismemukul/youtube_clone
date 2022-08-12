import React, { useState } from 'react'
import { IoLogoWhatsapp } from 'react-icons/io5';

import styled from 'styled-components';
import ToastNotification from '../components/ToastNotification';
import { SIZES, SPACING } from '../constants';


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
const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: ${SPACING.xs}px;
padding: ${SPACING.s}px;
width: 100%;
outline: #7ed957;
background-color: transparent;
`;
const TextArea = styled.textarea`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.text};
border-radius: ${SPACING.xs}px;
padding: ${SPACING.s}px;
width: 100%;
outline: #7ed957;
background-color: transparent;
`;

const textFieldInputLabelStyle = {
    fontSize: "0.9em",
    alignSelf: "center",
    justifySelf: "center",
};

const Button = styled.button`
border-radius: ${SPACING.xs}px;
border:none;
padding: ${SPACING.m}px  ${SPACING.xl}px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;
const Connect = () => {
    const CHARACTER_LIMIT = 100;
    const URL = "https://web.whatsapp.com/send";
    const [nameEmptyError, setNameEmptyError] = useState(false);
    const [messageEmptyError, setMessageEmptyError] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        message: "",
    });

    const { userName, message } = formData;

    const onChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (userName.length < 1) {
            setNameEmptyError(true);
            setTimeout(() => setNameEmptyError(false), 3000);
        } else if (message.length < 1) {
            setMessageEmptyError(true);
            setTimeout(() => setMessageEmptyError(false), 3000);
        } else {
            let number = 8769506494;

            let url = `${URL}?phone=${number}`;

            url += `&text=${encodeURI(message + " Message From " + userName)}&app_absent=0`;
            window.open(url);

        }
    };

    return (
        <Container>
            <Wrapper>
                <div style={{ marginRight: "0.5em" }}>
                    <IoLogoWhatsapp size={36} color="#7ed957" />
                </div>
                <Title>Send Message</Title>
                {nameEmptyError && (
                    <ToastNotification type="error" message="Mobile number cannot be empty!" />
                )}
                {messageEmptyError && (
                    <ToastNotification type="error" message="Message cannot be empty!" />
                )}
                <Input
                    type="text"
                    placeholder='Your Name'
                    label='Your Name'
                    error={nameEmptyError}
                    name='userName'
                    onChange={onChange}
                    value={userName}
                    style={{
                        margin: "1em 0em",
                    }}
                    required
                />
                {/* <Input placeholder='Your Name'
                    label='Your Name'
                    error={nameEmptyError}
                    name='userName'
                    onChange={onChange}
                    value={userName}
                    style={{
                        margin: "1em 0em",
                    }}
                    required
                /> */}
                <TextArea
                    cols="40"
                    rows="5"
                    label='Message'
                    placeholder='Hi! I am interested in your product. Please contact me.'
                    InputLabelProps={{
                        style: textFieldInputLabelStyle,
                    }}
                    inputProps={{
                        style: {
                            width: "230px",
                            height: "90px",
                        },
                        maxLength: CHARACTER_LIMIT,
                    }}
                    FormHelperTextProps={{
                        style: {
                            margin: 0,
                            padding: "0 0 0 5px",
                            fontSize: 10,
                        },
                    }}
                    name='message'
                    value={message}
                    onChange={onChange}
                    required
                    error={message.length > CHARACTER_LIMIT - 1 || messageEmptyError}
                    helperText={
                        !(message.length > CHARACTER_LIMIT - 1)
                            ? `${message.length}/${CHARACTER_LIMIT}`
                            : "Max length exceeded"
                    }
                />
                <Button onClick={onSubmit}>
                    Send
                </Button>
            </Wrapper>

        </Container>
    );
}

export default Connect