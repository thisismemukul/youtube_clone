import React,{useState,useEffect} from 'react'
import { SPACING } from '../constants';
import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: ${SPACING.m}px;
  display: flex;
  flex-direction: column;
  gap:  ${SPACING.m}px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding:  ${SPACING.s}px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding:  ${SPACING.s}px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding:  ${SPACING.s}px  ${SPACING.m}px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;


const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [video, setVideo] = useState(undefined);
  const [videoPer, setVideoPer] = useState(0);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  }
  useEffect(() => {  }, [video]);
  useEffect(() => {  }, [img]);
  
    return (
        <Container>
            <Wrapper>
                <Close onClick={()=>setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video</Label>
                <Input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])} />
                <Input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
                <Desc placeholder="Description" rows={8} onChange={e=>setDesc(e.target.value)} />
                <Input type="text" placeholder="Separate the tags with commas." onChange={handleTags} />
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])} />
                <Button>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload