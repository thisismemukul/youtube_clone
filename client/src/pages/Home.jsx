import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;
const Home = ({type}) => {
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
            }
        }
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {videos.map((video) => <Card key={video._id} video={video} />)}
        </Container>
    )
}

export default Home