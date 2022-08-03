import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import LoadingComp from "../components/LoadingComp";
import { SPACING } from "../constants";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  @media only screen and (max-width: 700px) {
    display: block;
    min-height: 100vh;
  margin-top: ${SPACING.l}px;
      }
`;
const Text = styled.div`
display: flex;
margin-top: 40px;
gap: 10px;
flex: 1;
color: ${({ theme }) => theme.text};
`;
const Search = () => {
  const [error, setError] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useLocation().search;
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/search${query}`);
        setVideos(res.data);
        if (res.data.length === 0) {
          setError("No videos found");
        } else {
          setError("");
        }
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {loading ? <LoadingComp /> : error ? (<Text>{error}</Text>) : videos.map((video) => <Card key={video._id} video={video} />)}
  </Container>;
};

export default Search;