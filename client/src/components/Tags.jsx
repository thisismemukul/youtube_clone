import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';

const Tag = styled.span`
// background-color: blue;//REMOVE
    margin-right: 1rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    min-width: 4.2rem;
    text-align: center;
    white-space: nowrap;
    border: 1.5px solid  ${({ theme }) => theme.text};
    border-radius: 999px;
    cursor: pointer;
    &:hover {
       background-color: #374a59;
    }

    &.active {
       color:  ${({ theme }) => theme.text};
       background-color:${({ theme }) => theme.soft};
       border-color: ${({ theme }) => theme.text};
    }
    @media only screen and (max-width: 700px) {
        margin: 10px 1px;
    }
`;
const Tags = ({ tags, setVideos }) => {
    const [activeElement, setActiveElement] = useState('All')
    const handleClick = async (tag) => {
        setActiveElement(tag)
        if (tag === 'All') {
            setVideos(await axios.get(`/videos/random`).then(res => res.data))
        } else {

            try {
                const res = await axios.get(`/videos/tags?tags=${tag}`);
                setVideos(res.data);
            } catch (err) { }
        }
    }
    return (
        tags.map((tag, index) => {
            return <Tag onClick={() => handleClick(tag)} className={activeElement === tag ? 'active' : ''} key={index}>{tag}</Tag>
        })
    )
}

export default Tags