import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import LoadingComp from '../components/LoadingComp';
const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;
const Details = styled.div`
display: flex;
margin-top: 40px;
gap: 10px;
flex: 1;
color: ${({ theme }) => theme.text};
`;
const Home = ({ type }) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`/videos/${type}`);
                setVideos(res.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        }
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {error ? (<Details>No videos found Please Refresh</Details>) : videos ? videos.map((video) => <Card key={video._id} video={video} />) : loading ? (<LoadingComp />) : (
                <Details>No videos found</Details>
            )}
        </Container>
    )
}

export default Home