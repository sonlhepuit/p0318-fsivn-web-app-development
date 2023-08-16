import React from 'react';

import { Checkbox, Form, Input, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import { Link, useNavigate } from 'react-router-dom';

import { ButtonLogin } from './styled';
import  {UserStore} from '../../../stores/userStore';
import { CustomNavLink } from '../AuthPage/styled';
interface ComponentProps {
    userStore?: UserStore;
}
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC<ComponentProps> = ({ userStore }) => {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = () => {
        form.validateFields()
            .then(async (values) => {
                await userStore?.login(values.username, values.password,values.remember, navigate);
            })
            .catch((err) => {
                onFinishFailed(err);
            });
    };

    const onFinishFailed = (_errorInfo: any) => {};

    return (
        <Form
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            form={form}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item<FieldType>
                label={'Username'}
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'please-input-your-username',
                    },
                ]}
            >
                <Input style={{ width: '100%' }} placeholder={'your-username'} />
            </Form.Item>
            <Form.Item<FieldType>
                label={'Password'}
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'please-input-your-password',
                    },
                ]}
            >
                <Input style={{ width: '100%' }} type="password" placeholder={'your-password'} />
            </Form.Item>
            <div className={'remember'}>
                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    initialValue={true}
                    noStyle
                >
                    <Checkbox>{'remember-me'}</Checkbox>
                </Form.Item>
                <Link
                    className="login-form-forgot"
                    to="/auth/forgot-password"
                    style={{ color: '#ff8d4f' }}
                >
                    {'forgot-password'}
                </Link>
            </div>
            <ButtonLogin
                block
                size={'large'}
                type={'primary'}
                htmlType={'submit'}
                onClick={onFinish}
                style={{ marginBottom: '10px', marginTop: '10px' }}
            >
                Login
            </ButtonLogin>
            <CustomNavLink margin="15px 0">
                <span style={{ marginRight: 10 }}>{'do-not-have-an-account'}</span>
                <Link to={'/auth/register'} style={{ color: '#ff8d4f' }}>
                    {'register-account-here'}
                </Link>
            </CustomNavLink>
            <Row justify="center">
                <a href={`${1 ? 1 : '#'}`} target="_blank" style={{ color: '#ff8d4f' }}>
                    {'privacy-policy'}
                </a>
                <div style={{ padding: '0 5px' }}> | </div>
                <a href={`${1 ? 1 : '#'}`} target="_blank" style={{ color: '#ff8d4f' }}>
                    {'terms-and-conditions'}
                </a>
            </Row>
        </Form>
    );
};
export default inject('userStore')(observer(Login));
