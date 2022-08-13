import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.text};
    `;
    const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: ${SPACING.m}px  ${SPACING.xl}px;
    gap: ${SPACING.m}px;
`;
const Title = styled.h1`
font-size: ${SIZES.extraLarge}px;
`;
const Image = styled.img`
width: 100%;
height:  ${(props) => props.type === 'sm' ? `100px` : `300px`};
flex: 1;
@media only screen and (max-width: 700px) {
    height: 200px;
      }
`;
const PageNotFound = () => {
    return (
        <Container>
            <Wrapper>
                <Image
                    src="https://cdn1.iconfinder.com/data/icons/photo-stickers-words/128/word_18-1024.png"
                    alt="Not Found"
                />

                <Link to="/">
                    <Title>Go to Home  </Title>
                </Link>
            </Wrapper>

        </Container>
    );
};
export default PageNotFound;