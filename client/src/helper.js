import axios from 'axios';
export const fetchComments = async(videoId, setComments) => {
    try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
    } catch (err) {}
};