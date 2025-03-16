import { Button, Flex, Input, Typography } from 'antd';
import Form from './Form';
import { LockOutlined, MailOutlined, RedoOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import useUserServicePublic from '../../services/useUserServicePublic';
import { useNavigate } from 'react-router-dom';
import { InputOTP } from 'antd-input-otp';
import useOtpService from '../../services/useOtpService';
import { toast } from 'react-toastify';
import Loading from '../loading/Loading';
import clsx from 'clsx';

function FormForgotPassword() {
    const [username, setUsername] = useState('');
    const [hiddenEmail, setHiddenEmail] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingSend, setLoadingSend] = useState(false);
    const [codeInput, setCodeInput] = useState([]);
    const [count, setCount] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const navigate = useNavigate();

    const { getHiddenEmail, resetPassword } = useUserServicePublic();
    const { sendOtpViaEmail, verifyOtpCode } = useOtpService();

    const handleGetHiddenEmail = async () => {
        if (!username.trim()) return;
        setLoading(true);
        const res = await getHiddenEmail(username);
        setLoading(false);
        if (!res) return;
        setHiddenEmail(res.result.email);
        setVerifyUser(true);
    };

    const handleSendOtp = async () => {
        if (isCounting) return;
        setLoadingSend(true);
        const res = await sendOtpViaEmail(username);
        setLoadingSend(false);
        if (!res) return;
        toast.success(res.result?.result);
        setCount(10);
        setIsCounting(true);
    };

    const handleVerifyOtp = async () => {
        const body = {
            username,
            otpCode: codeInput.join(''),
        };
        setLoading(true);
        const res = await verifyOtpCode(username, body);
        setLoading(false);
        if (!res) return;
        setVerifyOtp(true);
    };

    const handleResetPassword = async () => {
        if (confirmPassword !== password) {
            setErrorConfirmPassword('Xác nhận mật khẩu không đúng');
            return;
        }
        setLoading(true);
        const body = {
            otpCode: codeInput.join(''),
            username,
            newPassword: password,
        };
        const res = await resetPassword(body);
        setLoading(false);
        if (!res) return;
        else if (Array.isArray(res)) {
            res.forEach((re) => {
                if (re.message === 'Invalid newPassword') {
                    setErrorPassword(re.errMessage);
                }
            });
        } else {
            toast.success('Đặt lại mật khẩu thành công');
        }
    };

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount((prev) => prev - 1);
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        } else {
            setIsCounting(false);
        }
    }, [count]);

    return (
        <Form>
            <div
                className="absolute w-[500px] bg-gray-800 bg-opacity-90 border-solid border-[2px] border-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] p-5"
                style={{ maxWidth: '95%' }}
            >
                <h1 className="text-primary text-3xl font-semibold text-center">Quên mật khẩu</h1>
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
                            }}
                            size="large"
                            className={clsx('border-solid border-[2px] border-primary h-[50px]', {
                                ['pointer-events-none']: verifyUser,
                                ['bg-slate-500']: verifyUser,
                            })}
                            prefix={<UserOutlined className="mr-[4px]" />}
                            readOnly={verifyUser}
                        />
                    </div>
                    {verifyUser && (
                        <>
                            <div className="relative">
                                <Input
                                    placeholder="Email"
                                    value={hiddenEmail}
                                    size="large"
                                    className="mt-[24px] border-solid border-[2px] border-primary h-[50px] bg-slate-500 cursor-not-allowed pointer-events-none"
                                    prefix={<MailOutlined className="mr-[4px]" />}
                                    readOnly
                                />
                                <div className="flex justify-end items-center mt-[2px] text-primary">
                                    {count > 0 && <div className="mr-[12px] font-semibold">{count}</div>}
                                    <SendOutlined
                                        rotate={-60}
                                        className={clsx('mr-[2px] font-semibold text-xs', {
                                            ['opacity-50']: isCounting,
                                        })}
                                    />
                                    <p
                                        className={clsx('font-semibold hover:underline cursor-pointer text-base', {
                                            ['pointer-events-none']: isCounting,
                                            ['opacity-50']: isCounting,
                                        })}
                                        onClick={handleSendOtp}
                                    >
                                        Nhận mã otp qua email
                                    </p>
                                    {loadingSend && (
                                        <div className="relative w-[28px]">
                                            <Loading fontSize={16} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                <InputOTP
                                    autoFocus
                                    inputType="numeric"
                                    length={6}
                                    inputStyle={{ minWidth: 'calc(100%/6 - 10px)' }}
                                    wrapperStyle={{
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '0px',
                                        marginTop: '12px',
                                    }}
                                    value={codeInput}
                                    onChange={(value) => setCodeInput(value)}
                                />
                            </div>
                        </>
                    )}
                    {verifyOtp && (
                        <>
                            <div className="relative">
                                <Input.Password
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorPassword('');
                                    }}
                                    size="large"
                                    className="mt-[24px] border-solid border-[2px] border-primary h-[50px]"
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
                                    placeholder="Nhập lại mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrorConfirmPassword('');
                                    }}
                                    size="large"
                                    className="mt-[24px] border-solid border-[2px] border-primary h-[50px]"
                                    prefix={<RedoOutlined className="mr-[4px]" />}
                                />
                                <Typography.Paragraph
                                    ellipsis={{ rows: 1, expandable: false }}
                                    className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                                >
                                    {errorConfirmPassword}
                                </Typography.Paragraph>
                            </div>
                        </>
                    )}
                    <Flex vertical gap="24px" className="w-full my-[24px]">
                        {!verifyUser ? (
                            <Button
                                size="large"
                                type="primary"
                                className="h-[50px]"
                                htmlType="submit"
                                loading={loading}
                                onClick={handleGetHiddenEmail}
                            >
                                Kiểm tra
                            </Button>
                        ) : !verifyOtp ? (
                            <Button
                                size="large"
                                type="primary"
                                className="h-[50px]"
                                htmlType="submit"
                                loading={loading}
                                onClick={handleVerifyOtp}
                            >
                                Xác minh
                            </Button>
                        ) : (
                            <Button
                                size="large"
                                type="primary"
                                className="h-[50px]"
                                htmlType="submit"
                                loading={loading}
                                onClick={handleResetPassword}
                            >
                                Đặt lại mật khẩu
                            </Button>
                        )}
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

export default FormForgotPassword;
