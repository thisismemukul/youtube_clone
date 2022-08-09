import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchAllSuccess } from '../redux/videosSlice';

const Tag = styled.span`
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
        color: #fff;
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
const Tags = ({ tags }) => {
    const dispatch = useDispatch();

    const [activeElement, setActiveElement] = useState('All')
    const handleClick = async (tag) => {
        setActiveElement(tag)
        if (tag === 'All') {
            dispatch(fetchAllSuccess(await axios.get(`/videos/random`).then(res => res.data)))
        } else {

            try {
                const res = await axios.get(`/videos/tags?tags=${tag}`);
                dispatch(fetchAllSuccess(res.data));
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