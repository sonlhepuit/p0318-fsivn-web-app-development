import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { NavigateFunction } from 'react-router';

import request from '../requests';
const { AuthRequest } = request;

export type User = {
    id: number;
    email: string;
    bio: string;
    image: string;
    token: string;
    username: string;
    createdAt: string;
    updatedAt: string;
};

export class UserStore {
    currentUser?: User;
    loadingUser?: boolean;
    updatingUser?: boolean;
    updatingUserErrors: any;
    token: string | null | undefined = localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this);
    }

    async login(email: string, password: string, isRemember : boolean , navigate: NavigateFunction) {
        return new Promise(async (resolve, reject) => {
            const waitcompleted = async () => {
                AuthRequest.login(email, password)
                    .then((response: AxiosResponse) => {
                        if (response?.data) {
                            navigate('/home');
                            this.token = response?.data?.jwt;
                            this.currentUser = response?.data?.user;
                            if (isRemember) {
                                localStorage.setItem('jwt', response.data.jwt)
                            } else {
                                sessionStorage.setItem('jwt', response.data.jwt)
                            }
                        }
                        resolve(response.data);
                    })
                    .catch((err: AxiosError | any) => {
                        reject(err);
                    });
            };
            await waitcompleted();
        });
    }

    async me(navigate: NavigateFunction) {
        return new Promise(async (resolve, reject) => {
            const waitcompleted = async () => {
                AuthRequest.me()
                    .then((response: AxiosResponse) => {
                        if (response?.data) {
                            navigate('/home');
                        }
                        resolve(response.data);
                    })
                    .catch((err: AxiosError | any) => {
                        reject(err);
                    });
            };
            await waitcompleted();
        });
    }

    logout() {}
    

    async fetchUser(navigate: NavigateFunction) {
        console.log(navigate);
        return true;
    }

    forgetUser() {
        this.currentUser = undefined;
    }
}

const userStore = new UserStore();
export default userStore;
