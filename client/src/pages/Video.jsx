import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineThumbUp, MdOutlineThumbDown, MdOutlineReply, MdOutlineAddTask, MdThumbUp, MdThumbDown } from 'react-icons/md';
import timeago from 'timeago.js';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';
import Comments from '../components/Comments';
import { SPACING, SIZES, COLORS } from '../constants';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';
const Container = styled.div`
display: flex;
gap: ${SPACING.s}px;
@media only screen and (max-width: 700px) {
  display: block;
  min-height: 100vh;
}
`;
const Content = styled.div`
flex: 6;
@media only screen and (max-width: 700px) {
}
`;
const VideoWrapper = styled.div``;
const Title = styled.div`
font-size: ${SIZES.m}px;
font-weight: 400;
margin-top: ${SPACING.s}px;
margin-bottom: ${SPACING.xs}px;
color: ${({ theme }) => theme.text};
@media only screen and (max-width: 700px) {
  padding: ${SPACING.s}px;
}
`;
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media only screen and (max-width: 700px) {
  padding: ${SPACING.s}px;
  display: block;
}

`;
const Info = styled.span`
color: ${({ theme }) => theme.textSoft};
@media only screen and (max-width: 700px) {
  margin-bottom: ${SPACING.s}px;
  display: block;
}

`;
const Buttons = styled.div`
display: flex;
gap: ${SPACING.s}px;
color: ${({ theme }) => theme.text};
@media only screen and (max-width: 700px) {
  justify-content: space-between;
}
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

const Channel = styled.div`
display: flex;
flex-direction: space-between;
justify-content: space-between;

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
const Description = styled.p`
font-size: ${SIZES.body}px;
@media only screen and (max-width: 700px) {
  display: none;
}
`;
const DescriptionMob = styled.p`
max-width: 300px;
font-size: ${SIZES.body}px;
overflow: hidden;
color: ${({ theme }) => theme.text};
padding: ${SPACING.s}px;
@media only screen and (min-width: 700px) {
  display: none;
}
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
const VideoFrame = styled.video`
max-width:64rem;
width:100%;
max-height:30.875rem;
height:100%;
`;
const Video = () => {
  var timeagoInstance = timeago();

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        if (videoRes.data) {
          await axios.put(`/videos/view/${path}`);
        }
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) { }
    };
    fetchData();
    // incView();
  }, [path, dispatch]);
  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser?._id));
  };
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser?._id));
  };
  const handleSub = async () => {
    currentUser?.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {timeagoInstance.format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <MdThumbUp />
              ) : (
                <MdOutlineThumbUp />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <MdThumbDown />
              ) : (
                <MdOutlineThumbDown />
              )}{" "}
              Dislike
            </Button>
            <Button><MdOutlineReply /> Share </Button>
            <Button><MdOutlineAddTask />Save</Button>
          </Buttons>
        </Details>
        <DescriptionMob>{currentVideo?.desc}</DescriptionMob>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {currentUser ? (
            <Subscribe onClick={handleSub}>
              {currentUser?.subscribedUsers?.includes(channel._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          ) : (
            <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Subscribe>
                {currentUser?.subscribedUsers?.includes(channel._id)
                  ? "SUBSCRIBED"
                  : "SUBSCRIBE"}
              </Subscribe>
            </Link>
          )}

        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  )
}

export default Video