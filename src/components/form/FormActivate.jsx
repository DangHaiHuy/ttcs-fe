import { useNavigate, useParams } from 'react-router-dom';
import Form from './Form';
import { useState } from 'react';
import { Button, Flex, Input, Typography } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { MailOutlined } from '@ant-design/icons';
import useUserServicePublic from '../../services/useUserServicePublic';
import { toast } from 'react-toastify';

function FormActivate() {
    const { email } = useParams();
    const { code } = useParams();

    const [codeInput, setCodeInput] = useState(() => {
        if (code) return code.split('');
        else return [];
    });
    const [emailInput, setEmailInput] = useState(email);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { activate } = useUserServicePublic();

    const handleActivate = async () => {
        setLoading(true);
        const res = await activate({ code: codeInput.join(''), email: emailInput });
        setLoading(false);
        if (!res) return;
        else {
            toast.success('Kích hoạt tài khoản thành công');
        }
    };
    return (
        <Form>
            <div
                className="absolute w-[500px] bg-gray-800 bg-opacity-90 border-solid border-[2px] border-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] p-5"
                style={{ maxWidth: '95%' }}
            >
                <h1 className="text-primary text-3xl font-semibold text-center">KÍCH HOẠT</h1>
                <form
                    className="mt-[48px]"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
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
                            }}
                            value={codeInput}
                            onChange={(value) => setCodeInput(value)}
                        />
                    </div>
                    <div className="relative">
                        <Input
                            placeholder="Email"
                            value={emailInput}
                            onChange={(e) => {
                                setEmailInput(e.target.value);
                            }}
                            size="large"
                            className="mt-[24px] border-solid border-[2px] border-primary h-[50px] "
                            prefix={<MailOutlined className="mr-[4px]" />}
                        />
                    </div>
                    <Flex vertical gap="24px" className="w-full my-[24px]">
                        <Button
                            size="large"
                            type="primary"
                            className="h-[50px]"
                            htmlType="submit"
                            loading={loading}
                            onClick={handleActivate}
                        >
                            Kích hoạt
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

export default FormActivate;
