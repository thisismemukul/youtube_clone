import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
import timeago from 'timeago.js';


import axios from 'axios';
import LoadingComp from './LoadingComp';

const Container = styled.div`
display: ${(props) => props.type === 'sm' && 'flex'};
width: ${(props) => props.type === 'sm' ? `100%` : `300px`};
margin-bottom: ${(props) => props.type === 'sm' ? `${SPACING.s}px` : `${SPACING.xl}px`};
cursor: pointer;
gap: ${SPACING.s}px;
@media only screen and (max-width: 700px) {
    display: block;
    width: 380px;
    left: 0;
    right: 0;
    margin: auto;
      }
`;
const Image = styled.img`
width: 100%;
height:  ${(props) => props.type === 'sm' ? `100px` : `170px`};
background-color: #999;
flex: 1;
@media only screen and (max-width: 700px) {
    height: 200px;
      }
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
const Texts = styled.div`
@media only screen and (max-width: 700px) {
    padding: ${SPACING.s}px;
    width: ${(props) => props.type === 'sm' ? `100%` : `360px`};
}
      `;
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
const Card = ({ type, video }) => {
    var timeagoInstance = timeago();
    const [channel, setChannel] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const res = await axios.get(`/users/find/${video.userId}`);
                setChannel(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        }
        fetchChannel();
    }, [video.userId]);
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
            {error && <p>{error}</p>}
            {loading ? (
                <LoadingComp />
            ) : (
                <Container type={type}>
                    <Image type={type} src={video.imgUrl} />
                    <Details type={type}>
                        <ChannelImage type={type} src={channel.img} />
                        <Texts type={type}>
                            <Title>{video.title}</Title>
                            <ChannelName>{channel.name}</ChannelName>
                            <Info> {video.views} views · {timeagoInstance.format(video.createdAt)} </Info>
                        </Texts>
                    </Details>
                </Container>
            )}
        </Link>
    )
}

export default Card