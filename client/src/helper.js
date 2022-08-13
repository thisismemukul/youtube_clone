import { axiosInstance } from "./config";

export const fetchComments = async(videoId, setComments) => {
    try {
        const res = await axiosInstance.get(`/comments/${videoId}`);
        setComments(res.data);
    } catch (err) {}
};