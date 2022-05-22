import axios from "axios";

export const API_URL = 'https://thingproxy.freeboard.io/fetch/http://51.250.26.192:80'

export const RECPOINT = {
    GET_RECOMMEND: () => `${API_URL}`,
}

export const $recommendApi = axios.create({
    headers: {
        'Access-Control-Allow-Credentials': '*',
        // 'Access-Control-Allow-Headers': '*',
    },
       // withCredentials: true
})