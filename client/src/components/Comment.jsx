import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { fetchComments } from "../helper";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
font-size: 13px;
font-weight: 500;
`;

const Date = styled.span`
font-size: 12px;
font-weight: 400;
color: ${({ theme }) => theme.textSoft};
margin-left: 5px;
`;
const ShowMore = styled.span`
cursor: pointer;
padding: 0 10px;
`;
const Text = styled.span`
font-size: 14px;
`;


const Comment = ({ comment,videoId,setComments }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/comments/${comment._id}`);
      fetchComments(videoId,setComments);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel?.name} <Date>1 day ago</Date>
        </Name>
        <Text>{comment?.desc}</Text>
      </Details>
      {currentUser && currentUser._id === comment.userId ? (
      <ShowMore onClick={handleDelete}>
        <MdOutlineDelete />
      </ShowMore>)
      : null}
    </Container>
  );
};

export default Comment;