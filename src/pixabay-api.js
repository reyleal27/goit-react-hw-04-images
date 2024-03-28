import axios from "axios";

export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42283682-cbd5aadb7ea641090067d964b';

export const getAPI = async (query, page) => {
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const response = await axios.get(url);
    return response.data;
}