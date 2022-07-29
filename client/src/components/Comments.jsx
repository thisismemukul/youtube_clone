import React from 'react';
import styled from 'styled-components';
import { SPACING } from '../constants';
import Comment from './Comment';
const Container = styled.div`
`;
const NewComment = styled.div`
display: flex;
align-items: center;
gap: ${SPACING.s}px;
`;
const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;
const Input = styled.input`
border: none;
border-bottom: 1px solid ${({ theme }) => theme.soft}};
color: ${({ theme }) => theme.text};
background-color: transparent;
outline: none;
padding: ${SPACING.xs}px;
width: 100%;
`;

const Comments = () => {
    return (
        <Container>
            <NewComment>
                <Avatar src='https://yt3.ggpht.com/k-_HJtdmP1EiG-ypRyZygN6UmyA9lpI0mR-BBkiDADVuGTAYSnMe4Wz6gv635JGeZWoBHrzXZpc=s88-c-k-c0x00ffffff-no-rj-mo' />
                <Input placeholder="Write a comment..." />
            </NewComment>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </Container>
    )
}

export default Comments