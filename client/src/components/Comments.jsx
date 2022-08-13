import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SPACING } from '../constants';
import { fetchComments } from '../helper';
import Comment from './Comment';
const Container = styled.div`
`;
const NewComment = styled.div`
display: flex;
align-items: center;
gap: ${SPACING.s}px;
@media only screen and (max-width: 700px) {
  margin-bottom: ${SPACING.s}px;
}
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

const Buttons = styled.div`
display: flex;
gap: ${SPACING.s}px;
color: ${({ theme }) => theme.text};
@media only screen and (max-width: 700px) {
  justify-content: space-between;
}
`;

const Button = styled.button`
border-radius: ${SPACING.xs}px;
border:none;
padding: ${SPACING.s}px  ${SPACING.l}px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;
const Comments = ({ videoId }) => {

  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState('');
  useEffect(() => {
    fetchComments(videoId, setComments);
  }, [videoId, setComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/comments`, { desc, videoId });
      setDesc('');
      fetchComments(videoId, setComments);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <NewComment>
        {currentUser ? (
          <Avatar src={currentUser?.img} />
        ) : (
          <Avatar src="https://i.pravatar.cc/150?img=3" />
        )}
        <Input placeholder="Write a comment..." value={desc} onChange={(e) => setDesc(e.target.value)} />
        {currentUser ? (
          <Buttons>
            <Button onClick={handleSubmit}>Comment</Button>
          </Buttons>
        ) : (
          <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Buttons>
              <Button >Comment</Button>
            </Buttons>
          </Link>
        )}

      </NewComment>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} videoId={videoId} setComments={setComments} />
      ))}
    </Container>
  )
}

export default Comments