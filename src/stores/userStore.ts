import { makeAutoObservable } from 'mobx';
import { NavigateFunction } from 'react-router';

import { RootStore } from './rootStore';
import request from '../requests';

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
    rootStore?: any;
    token?: string;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    async login(email: string, password: string, navigate: NavigateFunction) {
        return new Promise(async (resolve, reject) => {
            const waitcompleted = async () => {
                request.Auth.login(email, password)
                    .then((response) => {
                        if (response?.data) {
                            navigate('/home');
                        }
                        resolve(response.data);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            };
            await waitcompleted();
        });
    }

    async fetchUser(navigate: NavigateFunction) {
        console.log(navigate);
        return true;
    }

    forgetUser() {
        this.currentUser = undefined;
    }
}

export default UserStore;
