import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { MdOutlineThumbUp, MdOutlineThumbDown, MdOutlineReply, MdOutlineAddTask, MdThumbUp, MdThumbDown } from 'react-icons/md';
import {format} from 'timeago.js';

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import Card from '../components/Card';
import Comments from '../components/Comments';
import { SPACING, SIZES, COLORS } from '../constants';
import { fetchSuccess } from '../redux/videoSlice';
const Container = styled.div`
display: flex;
gap: ${SPACING.s}px;
`;
const Content = styled.div`
flex: 6;
`;
const VideoWrapper = styled.div``;
const Title = styled.div`
font-size: ${SIZES.m}px;
font-weight: 400;
margin-top: ${SPACING.s}px;
margin-bottom: ${SPACING.xs}px;
color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`;
const Info = styled.span`
color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
display: flex;
gap: ${SPACING.s}px;
color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
display: flex;
align-items: center;
gap: ${SPACING.s}px;
cursor: pointer;
`;
const Hr = styled.hr`
    margin:${SIZES.radius}px 0;
    border: ${SPACING.xs / 9}px solid ${({ theme }) => theme.soft};
    `;
const Recommendation = styled.div`
flex: 3;
`;
const Channel = styled.div`
display: flex;
flex-direction: space-between;
`;
const ChannelInfo = styled.div`
display: flex;
gap: ${SPACING.m}px;
`;
const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`;
const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.div`
font-weight: 500;
`;
const ChannelCounter = styled.div`
margin-top: ${SPACING.xs}px;
margin-bottom: ${SPACING.m}px;
color: ${({ theme }) => theme.textSoft};
font-size: ${SIZES.small}px;
`;
const Description = styled.div`
font-size: ${SIZES.body}px;
`;
const Subscribe = styled.button`
background-color: ${COLORS.error};
color: ${COLORS.white};
border: none;
border-radius: ${SIZES.radius / 5}px;
height: max-content;
padding: ${SPACING.s}px ${SPACING.m}px;
cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  console.log(currentVideo);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);
  
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title='YouTube Video Player'
            frameBorder="0"
            allow="accelerometer; autoplay; clipbord-media; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
          <Buttons>
          <Button >
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <MdThumbUp />
              ) : (
                <MdOutlineThumbUp />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
          <Button >
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <MdThumbDown />
              ) : (
                <MdOutlineThumbDown />
              )}{" "}
              Dislike
              {currentVideo?.likes?.length}
            </Button>
            <Button><MdOutlineReply />Share</Button>
            <Button><MdOutlineAddTask />Save</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers}</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  )
}

export default Video