import axios from "axios";

const BASE_URL = "https://api.freeapi.app/api/v1";

export const api = axios.create({
    baseURL: BASE_URL,

    headers: {
        'Content-Type' : 'application/json'
    }
})