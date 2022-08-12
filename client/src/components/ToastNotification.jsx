import React from "react";
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';

const Container = styled.div`
display: flex;
width: 100%;
margin-bottom: ${SPACING.xl}px;
background-color:  ${(props) => props.type === 'error' ? `red` : `#00ff00`};
color: white;
`;


const Details = styled.div`
display: flex;
margin: ${SPACING.s}px;
flex: 1;
text-align: center;
align-items: center;
justify-content: center;
`;

const Texts = styled.div`
@media only screen and (max-width: 700px) {
    padding: ${SPACING.s}px;
    width: 100%;
}
      `;
const Title = styled.h1`
font-size: ${SIZES.medium}px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`;

const ToastNotification = ({ type, message }) => {
    return (
        <>
            <Container type={type}>
                <Details>
                    <Texts>
                        <Title>{message}</Title>
                    </Texts>
                </Details>
            </Container>
        </>
    );
};

export default ToastNotification;