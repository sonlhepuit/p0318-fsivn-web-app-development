import React, { ReactNode, useEffect, useState } from 'react';

import { inject, observer } from 'mobx-react';
import ReactLoading from 'react-loading';
import { Navigate, useNavigate } from 'react-router';

import UserStore from '../../stores/userStore';

interface ProtectedRouteProps {
    userStore?: UserStore;
    children: ReactNode;
}

function ProtectedRoute({ children, userStore }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const [user] = useState('12121212');

    useEffect(() => {
        if (!user) {
            userStore?.fetchUser(navigate).catch(() => console.log());
        }
    }, [user]);

    if (user) {
        return (
            <div className="w-screen h-screen p-24 flex justify-center items-center">
                <ReactLoading type={'bars'} color={'#00C7FC '} height={'70px'} width={'70px'} />
            </div>
        );
    }
    if (user) {
        return <Navigate to="/auth/sign-in" replace={true} />;
    }
    if (user) {
        return <>{children}</>;
    }

    return <Navigate to="/auth/sign-in" replace={true} />;
}

export default inject('userStore')(observer(ProtectedRoute));
