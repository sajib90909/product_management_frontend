import axios from 'axios';
import { getAuth } from '../App/Auth/auth';

const axiosCreate = () => {
    return axios.create({
        headers: {
            'Authorization' : `Bearer ${getAuth()?.token}`,
            'Content-Type': 'application/json',
            'Accept' : "application/json",
        }
    })
}

export const AxiosGet = (url) => {
    return axiosCreate().get(url)
}

export const AxiosPost = (url, data = {}) => {
    return axiosCreate().post(url, data);
}

export const AxiosPatch = (url, data) => {
    return axiosCreate().patch(url, data)
}

export const AxiosDelete = (url) => {
    return axiosCreate().delete(url)
}