import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: "https://youtubeappclone.herokuapp.com/api/",
    // headers: {  
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    // }
});