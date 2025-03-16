import { Button, Flex, Input, Typography } from 'antd';
import Form from './Form';
import { useEffect, useState } from 'react';
import { LockOutlined, MailOutlined, RedoOutlined, SkinOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useUserServicePublic from '../../services/useUserServicePublic';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN, getToken } from '../../services/tokenService';

function FormRegister() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { register } = useUserServicePublic();

    const handleRegister = async () => {
        if (confirmPassword !== password) {
            setErrorConfirmPassword('Xác nhận mật khẩu không đúng');
            return;
        }
        setLoading(true);
        const request = {
            username,
            password,
            email,
            firstName,
            lastName,
        };
        const res = await register(request);
        setLoading(false);
        if (!res) return;
        else if (Array.isArray(res)) {
            res.forEach((re) => {
                if (re.message === 'Invalid username') {
                    setErrorUsername(re.errMessage);
                } else if (re.message === 'Invalid password') {
                    setErrorPassword(re.errMessage);
                } else if (re.message === 'Invalid email') {
                    setErrorEmail(re.errMessage);
                } else if (re.message === 'Invalid firstName') {
                    setErrorFirstName(re.errMessage);
                } else if (re.message === 'Invalid lastName') {
                    setErrorLastName(re.errMessage);
                }
            });
        } else {
            toast.success('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản');
            navigate('/login');
        }
    };

    return (
        <Form>
            <div
                className="absolute w-[500px] bg-gray-800 bg-opacity-90 border-solid border-[2px] border-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] p-5"
                style={{ maxWidth: '95%' }}
            >
                <h1 className="text-primary text-3xl font-semibold text-center">ĐĂNG KÝ</h1>
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
                    <div className="relative">
                        <Input.Password
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrorConfirmPassword('');
                            }}
                            size="large"
                            className="mt-[24px] border-solid border-[2px] border-primary h-[50px] "
                            prefix={<RedoOutlined className="mr-[4px]" />}
                        />
                        <Typography.Paragraph
                            ellipsis={{ rows: 1, expandable: false }}
                            className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                        >
                            {errorConfirmPassword}
                        </Typography.Paragraph>
                    </div>
                    <div className="relative">
                        <Input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorEmail('');
                            }}
                            size="large"
                            className="mt-[24px] border-solid border-[2px] border-primary h-[50px] "
                            prefix={<MailOutlined className="mr-[4px]" />}
                        />
                        <Typography.Paragraph
                            ellipsis={{ rows: 1, expandable: false }}
                            className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                        >
                            {errorEmail}
                        </Typography.Paragraph>
                    </div>
                    <Flex gap="12px">
                        <div className="relative">
                            <Input
                                placeholder="Họ"
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setErrorFirstName('');
                                }}
                                size="large"
                                className="mt-[24px] border-solid border-[2px] border-primary h-[50px] "
                                prefix={<SkinOutlined className="mr-[4px]" />}
                            />
                            <Typography.Paragraph
                                ellipsis={{ rows: 1, expandable: false }}
                                className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                            >
                                {errorFirstName}
                            </Typography.Paragraph>
                        </div>
                        <div className="relative">
                            <Input
                                placeholder="Tên"
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    setErrorLastName('');
                                }}
                                size="large"
                                className="mt-[24px] border-solid border-[2px] border-primary h-[50px] "
                                prefix={<SmileOutlined className="mr-[4px]" />}
                            />
                            <Typography.Paragraph
                                ellipsis={{ rows: 1, expandable: false }}
                                className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                            >
                                {errorLastName}
                            </Typography.Paragraph>
                        </div>
                    </Flex>
                    <Flex vertical gap="24px" className="w-full my-[24px]">
                        <Button
                            size="large"
                            type="primary"
                            className="h-[50px]"
                            htmlType="submit"
                            onClick={handleRegister}
                            loading={loading}
                        >
                            Đăng ký
                        </Button>
                        <Button
                            size="large"
                            className="h-[50px]"
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Flex>
                </form>
            </div>
        </Form>
    );
}

export default FormRegister;
