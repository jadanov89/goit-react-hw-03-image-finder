import axios from "axios";

const KEY = "20180121-6058dbf0c2d40e7fb1402d980";
const URL = "https://pixabay.com/api";

const instance = axios.create({
    baseURL: URL,
    params: {
        per_page: 12,
        key: KEY,
        image_type: "photo",
        orientation: "horizontal",
    }
});



export const Api = async (page = 1) => {
    const { data } = await instance.get("/", {
        params: {
            page,
        }
    });
    return data;
}

export const searchPixabayAPI = async (q, page = 1) => {
    const { data } = await instance.get("/", {
        params: {
        page,
        q,
    }
    });
return data;
}