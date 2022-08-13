import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import LoadingComp from '../components/LoadingComp';
import Tags from '../components/Tags';
import { fetchAllSuccess } from '../redux/videosSlice';
import { useDispatch, useSelector } from 'react-redux';
const Container = styled.div`
// background-color: red;//REMOVE
display: flex;
flex-wrap: wrap;
justify-content: space-between;
@media only screen and (max-width: 700px) {
    justify-content: center;
}
`;
const Wrapper = styled.div`
// background-color: green;//REMOVE
padding: 0.5rem 0;
font-size: 0.8rem;
display: flex;
flex-wrap: wrap;
width: 100%;
overflow-x: scroll;
scrollbar-width: none;
color: ${({ theme }) => theme.text};
&::-webkit-scrollbar {
    width: 0px;
 }
@media only screen and (max-width: 700px) {
    margin: 10px 0px;
}
`;


const Details = styled.div`
display: flex;
margin-top: 40px;
gap: 10px;
flex: 1;
min-height: 100vh;
color: ${({ theme }) => theme.text};
`;
const Home = ({ type }) => {
    const { allVideos } = useSelector(state => state.videos);
    const [tags, setTags] = useState([]);
    const [err, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`/videos/${type}`);
                dispatch(fetchAllSuccess(res.data));
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        }
        const fetchTags = async () => {
            try {
                const res = await axios.get(`/videos/tags/all`);
                setTags(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        }
        fetchVideos();
        fetchTags();
    }, [type, dispatch]);

    return (
        <>
            <Wrapper>
                <Tags tags={tags} />
            </Wrapper>
            <Container>

                {err ? (<Details>No videos found Please Refresh</Details>) : allVideos ? allVideos?.map((video) => <Card key={video._id} video={video} />) : loading ? (<LoadingComp />) : (
                    <Details>No videos found</Details>
                )}
            </Container>
        </>
    )
}

export default Home