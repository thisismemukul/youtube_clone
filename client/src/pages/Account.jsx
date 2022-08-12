import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { SIZES, SPACING } from '../constants';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ToastNotification from '../components/ToastNotification';
const Container = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: space-between;
color: ${({ theme }) => theme.text};
@media only screen and (max-width: 700px) {
    justify-content: center;
}
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: ${SPACING.m}px  ${SPACING.xl}px;
    gap: ${SPACING.m}px;
`;


const Details = styled.div`
display: flex;
margin: 40px;
flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
gap: 10px;
flex: 1;
color: ${({ theme }) => theme.text};
@media only screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
}
`;
const Avatar = styled.img`
  width: ${SIZES.extremeLarge * 6}px;
  height: ${SIZES.extremeLarge * 6}px;
  border-color: ${({ theme }) => theme.soft};
  border-radius: 50%;
  padding: ${SIZES.extraLarge}px;
  background-color: ${({ theme }) => theme.soft};
  `;
const Texts = styled.div`
`;
const Text = styled.div`
font-size: ${(props) => props.type === 'sm' ? `${SIZES.small}px` : `${SIZES.extremeLarge}px`};
@media only screen and (max-width: 700px) {
    font-size: ${(props) => props.type === 'sm' ? `${SIZES.small}px` : `${SIZES.large}px`};
}

      `;
const FormData = styled.div`
display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: ${SPACING.m}px  ${SPACING.xl}px;
    gap: ${SPACING.m}px;
`;
const Input = styled.input`
      border: 1px solid ${({ theme }) => theme.soft};
      color: ${({ theme }) => theme.text};
      border-radius: ${SPACING.xs}px;
      padding: ${SPACING.s}px;
      width: 100%;
      outline: none;
      background-color: transparent;
      `;
const SubTitle = styled.h2`
font-size: ${SIZES.medium}px;
align-self: flex-start;
`;
const Button = styled.button`
border-radius: ${SPACING.xs}px;
border:none;
padding: ${SPACING.m}px  ${SPACING.xl}px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;

const Account = ({ currentUser }) => {
    const { error } = useSelector(state => state.user);
    const [inputs, setInputs] = useState({
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,

    });
    const [img, setImg] = useState(undefined);
    const [imgPer, setImgPer] = useState(0);
    const dispatch = useDispatch();
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'profileImages/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "img" && setImgPer(Math.round(progress));
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
        img && uploadFile(img, "img");
    }, [img]);
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }
    const handleSave = async (e) => {
        e.preventDefault();
        dispatch(updateUserStart());
        try {
            const res = await axios.put(`/users/${currentUser._id}`, { ...inputs });
            res.status === 200 && dispatch(updateUserSuccess(res.data));
        } catch (error) {
            dispatch(updateUserFailure(error.response.data.message));
        }
    }
    return (
        <>
            <Container>
                {currentUser ? (
                    <Wrapper>

                        <Details>
                            <Texts>
                                <Text> Customize how you appear on YouTube </Text>
                                <Text type='sm'> Signed in as {currentUser.email}</Text>
                            </Texts>
                            <Avatar src={currentUser.img} />
                            <Texts>
                                <Text> {currentUser.name} </Text>
                                <Text type='sm'>Update yout photo and personal details. </Text>
                            </Texts>
                        </Details>
                        <FormData>
                        {error && <ToastNotification message={error} />}
                            <SubTitle>Name</SubTitle>
                            <Input placeholder='name' value={inputs.name} name='name' onChange={handleChange} />

                            <SubTitle>Username</SubTitle>
                            <Input placeholder='username' value={inputs.username} name='username' onChange={handleChange} />

                            <SubTitle>Email</SubTitle>
                            <Input placeholder='email' value={inputs.email} type='email' name='email' onChange={handleChange} disabled />

                            <SubTitle>Profile Pic</SubTitle>
                            {imgPer ? (
                                "Uploading " + imgPer + "%"
                            ) :
                                (
                                    <Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />
                                )
                            }
                            <Button onClick={handleSave}>Save</Button>
                        </FormData>
                    </Wrapper>
                ) : (
                    <Details>No user found</Details>
                )}
            </Container>
        </>
    )
}

export default Account