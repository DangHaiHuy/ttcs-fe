import { Button, Input, Typography } from 'antd';
import { useState } from 'react';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import { toast } from 'react-toastify';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorNewPassword, setErrorNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState('');

    const { changePassword } = useUserServicePrivate();

    const inputs = [
        {
            type: 'password',
            title: 'oldPassword',
            name: 'Mật khẩu cũ',
            value: oldPassword,
            state: true,
            errorMessage: null,
            onChange: (e) => {
                setOldPassword(e.target.value);
            },
        },
        {
            type: 'password',
            title: 'newPassword',
            name: 'Mật khẩu mới',
            value: newPassword,
            state: true,
            errorMessage: errorNewPassword,
            onChange: (e) => {
                setNewPassword(e.target.value);
                setErrorNewPassword('');
            },
        },
        {
            type: 'password',
            title: 'confirmNewPassword',
            name: 'Nhập lại mật khẩu',
            value: confirmNewPassword,
            state: true,
            errorMessage: errorConfirmNewPassword,
            onChange: (e) => {
                setConfirmNewPassword(e.target.value);
                setErrorConfirmNewPassword('');
            },
        },
    ];

    const handleSubmitChange = async () => {
        if (confirmNewPassword !== newPassword) {
            setErrorConfirmNewPassword('Nhập lại mật khẩu không đúng');
            return;
        }
        setLoading(true);
        const body = {
            oldPassword,
            newPassword,
        };
        const res = await changePassword(body);
        setLoading(false);
        if (!res) return;
        if (Array.isArray(res)) {
            res.forEach((re) => {
                if (re.message === 'Invalid newPassword') setErrorNewPassword(re.errMessage);
            });
        } else toast.success('Đổi mật khẩu thành công');
    };
    return (
        <div className="flex flex-col">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className='flex flex-col gap-y-5'
            >
                {inputs.map((input, index) => {
                    return (
                        <div key={index} className='relative'>
                            <p>{input.name}</p>
                            {input.type === 'password' && (
                                <Input.Password
                                    value={input.value}
                                    onChange={input.onChange}
                                    className="border-solid border-[2px] border-primary h-[50px]"
                                    disabled={!input.state}
                                ></Input.Password>
                            )}
                            {input.errorMessage && (
                                <Typography.Paragraph
                                    ellipsis={{ rows: 1, expandable: false }}
                                    className="text-red-600 absolute top-full text-sm max-w-full font-medium mt-[2px]"
                                >
                                    {input.errorMessage}
                                </Typography.Paragraph>
                            )}
                        </div>
                    );
                })}
                <Button
                    size="large"
                    type="primary"
                    className="h-[50px] mt-[30px] w-full"
                    htmlType="submit"
                    onClick={handleSubmitChange}
                    loading={loading}
                >
                    Đổi mật khẩu
                </Button>
            </form>
        </div>
    );
}

export default ChangePassword;
