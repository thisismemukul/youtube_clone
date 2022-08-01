import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

const Comments = ({videoId}) => {

    const { currentUser } = useSelector((state) => state.user);
  
    const [comments, setComments] = useState([]);
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const res = await axios.get(`/comments/${videoId}`);
          setComments(res.data);
        } catch (err) {}
      };
      fetchComments();
    }, [videoId]);
    return (
        <Container>
            <NewComment>
                <Avatar src={currentUser.img}/>
                <Input placeholder="Write a comment..." />
            </NewComment>
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </Container>
    )
}

export default Comments