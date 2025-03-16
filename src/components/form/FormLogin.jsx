import { Button, Flex, Input, Typography } from 'antd';
import Form from './Form';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, getToken, REFRESH_TOKEN, setToken } from '../../services/tokenService';
import useAuthenService from '../../services/authenService';
import { useNavigate } from 'react-router-dom';
import { Oauth2Config } from '../../config/Oauth2Config';

function FormLogin() {
    const [username, setUsername] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuthenService();

    const handleLogin = async () => {
        setLoading(true);
        const loginRequest = {
            username,
            password,
        };
        const result = await login(loginRequest);
        setLoading(false);
        if (!result) return;
        else if (Array.isArray(result)) {
            result.forEach((re) => {
                if (re.message === 'Invalid password') {
                    setErrorPassword(re.errMessage);
                } else if (re.message === 'Invalid username') {
                    setErrorUsername(re.errMessage);
                }
            });
        } else {
            setToken(ACCESS_TOKEN, result?.result?.accessToken);
            setToken(REFRESH_TOKEN, result?.result.refreshToken);
            // const res = await getMyInfo();
            // dispatch(getMyInfoAction(res?.result));
            navigate('/');
        }
    };
    const handleContinueWithGoogle = () => {
        const redirectUrl = Oauth2Config.redirectUrl;
        const authUrl = Oauth2Config.authUrl;
        const clientId = Oauth2Config.clientId;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            redirectUrl,
        )}&response_type=code&client_id=${clientId}&scope=openid%20email%20profile`;

        window.location.href = targetUrl;
    };

    return (
        <Form>
            <div
                className="absolute w-[500px] bg-gray-800 bg-opacity-90 border-solid border-[2px] border-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] p-5"
                style={{ maxWidth: '95%' }}
            >
                <h1 className="text-primary text-3xl font-semibold text-center">Đăng nhập</h1>
                <form
                    className="mt-[48px]"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="relative">
                        <Input
                            placeholder="Tên tài khoản"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrorUsername('');
                            }}
                            size="large"
                            className="border-solid border-[2px] border-primary h-[50px] "
                            prefix={<UserOutlined className="mr-[4px]" />}
                        />
                        <Typography.Paragraph
                            ellipsis={{ rows: 1, expandable: false }}
                            className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                        >
                            {errorUsername}
                        </Typography.Paragraph>
                    </div>
                    <div className="relative">
                        <Input.Password
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorPassword('');
                            }}
                            size="large"
                            className="mt-[24px] border-solid border-[2px] border-primary h-[50px] "
                            prefix={<LockOutlined className="mr-[4px]" />}
                        />
                        <Typography.Paragraph
                            ellipsis={{ rows: 1, expandable: false }}
                            className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                        >
                            {errorPassword}
                        </Typography.Paragraph>
                    </div>
                    <div className="flex justify-end mt-[2px]">
                        <p
                            className="text-primary cursor-pointer m-0 hover:underline"
                            onClick={() => {
                                navigate('/forgot-password');
                            }}
                        >
                            Quên mật khẩu
                        </p>
                    </div>
                    <Flex vertical gap="24px" className="w-full my-[24px]">
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="h-[50px]"
                            onClick={handleLogin}
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            size="large"
                            className="h-[50px]"
                            icon={<GoogleOutlined />}
                            iconPosition="start"
                            onClick={handleContinueWithGoogle}
                        >
                            Đăng nhập với Google
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            className="h-[50px]"
                            onClick={() => {
                                navigate('/register');
                            }}
                        >
                            Đăng ký
                        </Button>
                    </Flex>
                </form>
            </div>
        </Form>
    );
}

export default FormLogin;
