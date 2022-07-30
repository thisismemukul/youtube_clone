import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SIZES, SPACING } from '../constants';
import {format} from 'timeago.js';
import axios from 'axios';

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
const Card = ({ type, video }) => {
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
        <Link to="/video/test" style={{ textDecoration: 'none' }}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details type={type}>
                    <ChannelImage type={type} src={channel.img} />
                    <Texts>
                        <Title>{video.title}</Title>
                        <ChannelName>{channel.name}</ChannelName>
                        <Info> {video.views} views · {format(video.createdAt)} </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card