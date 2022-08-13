import React, { useState, useEffect } from 'react'
import { SPACING } from '../constants';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPer(Math.round(progress)) : setVideoPer(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs(prev => {
            return { ...prev, [urlType]: downloadURL }
          });
        });
      }
    );

  };
  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);


  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/videos`, { ...inputs, tags });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  }
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video</Label>
        {videoPer ? (
          "Uploading " + videoPer + "%"
        ) :
          (<Input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />)
        }
        <Input type="text" placeholder="Title" name="title" onChange={handleChange} />
        <Desc placeholder="Description" rows={8} name="desc" onChange={handleChange} />
        <Input type="text" placeholder="Separate the tags with commas." onChange={handleTags} />
        <Label>Image</Label>
        {imgPer ? (
          "Uploading " + imgPer + "%"
        ) :
          (<Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />)
        }
        <Button onClick={handleUpload} >Upload</Button>
      </Wrapper>
    </Container>
  )
}

export default Upload