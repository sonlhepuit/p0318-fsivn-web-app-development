import { Fragment, useEffect } from 'react';

import { inject, observer } from 'mobx-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { AuthPageWrapper, FormSubtitle, FormTitle, FormWrapper } from './styled';
import {UserStore} from '../../../stores/userStore';
import LoginForm from '../Login/Login';

interface ComponentProps {
    userStore?: UserStore;
}

const AuthPage: React.FC<ComponentProps> = ({  }) => {
    const { authType } = useParams();

    useEffect(() => {}, []);

    const authFormInput = () => {
        switch (authType) {
        case 'sign-in':
            return (
                <Fragment>
                    <FormTitle>{'Welcome back'}!</FormTitle>
                    <FormSubtitle>{'Sign in by entering the information below'}</FormSubtitle>
                    <LoginForm />
                </Fragment>
            );
        case 'sign-up':
            return (
                <Fragment>
                    <FormTitle>{'Register'}</FormTitle>
                    <FormSubtitle>{'Register your account to access services.'}</FormSubtitle>
                    <LoginForm />
                </Fragment>
            );
        case 'sign-up':
            return (
                <Fragment>
                    <FormTitle>{'logout'}</FormTitle>
                    <FormSubtitle>{'logout'}</FormSubtitle>
                </Fragment>
            );
        default:
            break;
        }
    };

    const authPageTitle = () => {
        switch (authType) {
        case 'sign-in':
            return 'Login';
        case 'sign-up':
            return 'Register';
        case 'forgot-password':
            return 'Forgot Password';
        default:
            return 'Undefined';
        }
    };

    return (
        <HelmetProvider>
            <AuthPageWrapper>
                <Helmet>
                    <title>{authPageTitle()}</title>
                </Helmet>
                <FormWrapper style={authType === 'register' ? { marginTop: 150 } : {}}>
                    {authFormInput()}
                </FormWrapper>
            </AuthPageWrapper>
        </HelmetProvider>
    );
};

export default inject('userStore')(observer(AuthPage));