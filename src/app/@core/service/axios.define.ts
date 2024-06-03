import axios from "axios";

export const i_axios = axios.create({
    baseURL: 'http://192.168.99.102:3263'
})