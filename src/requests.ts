import axios, { AxiosProgressEvent } from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
// const token = process.env.REACT_APP_TOKEN;
const token = localStorage.getItem('jwt');

const requests = {
    get: (url: string, header = false, urlstatic = true) => {
        if (header && token) {
            return axios({
                method: `get`,
                url: `${apiUrl}${url}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        if (urlstatic) {
            return axios({
                method: `get`,
                url: `${apiUrl}${url}`,
            });
        }
        return axios({
            method: `get`,
            url: `${url}`,
        });
    },
    post: (
        url: string,
        body: any,
        header = false,
        onUploadProgress?: (_: AxiosProgressEvent) => void
    ) => {
        if (header) {
            if (onUploadProgress) {
                return axios({
                    method: `post`,
                    url: `${apiUrl}${url}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: body,
                    onUploadProgress,
                });
            }
            return axios({
                method: `post`,
                url: `${apiUrl}${url}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: body,
            });
        }
        return axios({
            method: `post`,
            url: `${apiUrl}${url}`,
            data: body,
        });
    },
    delete: (url: string, body: any = false) => {
        if (body) {
            return axios({
                method: `delete`,
                url: `${apiUrl}${url}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: body,
            });
        }
        return axios({
            method: `delete`,
            url: `${apiUrl}${url}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    put: (url: string, body: any, header: any = false) => {
        if (header) {
            return axios({
                method: `put`,
                url: `${apiUrl}${url}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: body,
            });
        }
        return axios({
            method: `post`,
            url: `${apiUrl}${url}`,
            data: body,
        });
    },
};

const AuthRequest = {
    me: () => requests.get(`/users/me`, true),
    login: (email: string, password: string) =>
        requests.post('/xdLogin', { identifier: email, password }),
    register: (username: string, email: string, password: string) =>
        requests.post('/users', { user: { username, email, password } }),
    save: (user: any) => requests.put('/user', { user }),
};

const agent = {
    AuthRequest,
};

export default agent;
