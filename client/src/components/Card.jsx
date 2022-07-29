import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';

const Container = styled.div`
display: ${(props) => props.type === 'sm' && 'flex'};
width: ${(props) => props.type !== 'sm' && `300px`};
margin-bottom: ${(props) => props.type === 'sm' ? `${SPACING.s}px` : `${SPACING.xl}px`};
cursor: pointer;
gap: ${SPACING.s}px;
`;
const Image = styled.img`
width: 100%;
height:  ${(props) => props.type === 'sm' ? `140px` : `170px`};
background-color: #999;
flex: 1;
`;
const Details = styled.div`
display: flex;
margin-top: ${(props) => props.type !== 'sm' && `${SPACING.s * 2}px`};
gap: ${SPACING.s}px;
flex: 1;
`;
const ChannelImage = styled.img`
display: ${(props) => props.type === 'sm' && 'none'};
width: 34px;
height: 34px;
border-radius: 50%;
background-color: #999;
`;
const Texts = styled.div``;
const Title = styled.h1`
font-size: ${SIZES.medium}px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
font-size: ${SIZES.font}px;
color: ${({ theme }) => theme.textSoft};
margin: ${SPACING.s}px 0;
`;
const Info = styled.div`
font-size: ${SIZES.font}px;
color: ${({ theme }) => theme.textSoft};
`;
const Card = ({ type }) => {
    return (
        <Link to="/video/test" style={{ textDecoration: 'none' }}>
            <Container type={type}>
                <Image type={type} src='https://i.ytimg.com/vi/AiMv46tt_JM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBksT3YU-q4_PgB1hiMf8ZsiL69Yw' />
                <Details type={type}>
                    <ChannelImage type={type} src='https://yt3.ggpht.com/ws8PYywY8d0TBvG7ecdK6T00qNRxFtFF5AUyNVLnpenJ-khFPPo95BTGG589wmyrHrEoE76J=s68-c-k-c0x00ffffff-no-rj' />
                    <Texts>
                        <Title>
                            The best of the best
                        </Title>
                        <ChannelName>
                            Thisismemukul
                        </ChannelName>
                        <Info> 1,97,876,976 views · 1 day ago </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card