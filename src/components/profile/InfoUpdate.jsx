import { Button, DatePicker, Input } from 'antd';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getMyInfoAction } from '../../redux/action/userAction';

const dateFormat = 'DD/MM/YYYY';

function InfoUpdate({ myInfo }) {
    const [firstName, setFirstName] = useState(myInfo.firstName);
    const [lastName, setLastName] = useState(myInfo.lastName);
    const [email, setEmail] = useState(myInfo.email);
    const [username, setUsername] = useState(myInfo.username);
    const [phone, setPhone] = useState(myInfo.phone);
    const [errorPhone, setErrorPhone] = useState('');
    const [location, setLocation] = useState(myInfo.location);
    const [dob, setDob] = useState(myInfo.dob);
    const [errorDob, setErrorDob] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const { updateInfo } = useUserServicePrivate();

    const handleSubmitChange = async () => {
        setLoading(true);
        const body = {
            firstName,
            lastName,
            phone,
            location,
            dob: dayjs(dob, dateFormat).format('YYYY-MM-DD'),
        };
        const res = await updateInfo(body);
        setLoading(false);
        if (!res) return;
        if (Array.isArray(res)) {
            res.forEach((re) => {
                if (re.message === 'Invalid phone') {
                    setErrorPhone(re.errMessage);
                } else if (re.message === 'Invalid dob') {
                    setErrorDob(re.errMessage);
                }
            });
        } else {
            toast.success('Sửa thông tin thành công');
            dispatch(getMyInfoAction(res?.result))
        }
    };
    const inputs = [
        {
            type: 'text',
            title: 'fullName',
            name: 'Full Name',
            value: `${lastName} ${firstName}`,
            state: false,
            errorMessage: null,
        },
        {
            type: 'text',
            title: 'username',
            name: 'Username',
            value: username,
            state: false,
            errorMessage: null,
        },
        {
            type: 'text',
            title: 'lastName',
            onChange: (e) => {
                setLastName(e.target.value);
            },
            name: 'Last Name',
            value: lastName,
            state: true,
            errorMessage: null,
        },
        {
            type: 'text',
            title: 'firstName',
            onChange: (e) => {
                setFirstName(e.target.value);
            },
            name: 'First Name',
            value: firstName,
            state: true,
            errorMessage: null,
        },
        {
            type: 'text',
            title: 'email',
            name: 'Email',
            value: email,
            state: false,
            errorMessage: null,
        },
        {
            type: 'text',
            title: 'phone',
            onChange: (e) => {
                setErrorPhone('');
                setPhone(e.target.value);
            },
            name: 'Phone',
            value: phone,
            state: true,
            errorMessage: errorPhone,
        },
        {
            type: 'text',
            title: 'location',
            onChange: (e) => {
                setLocation(e.target.value);
            },
            name: 'Location',
            value: location,
            state: true,
            errorMessage: null,
        },
        {
            type: 'date',
            title: 'dob',
            onChange: (_, dateString) => {
                setErrorDob('');
                setDob(dateString);
            },
            name: 'Birthday',
            value: dob,
            state: true,
            errorMessage: errorDob,
        },
    ];
    return (
        <div className="flex-1 flex items-center">
            <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-lg:grid-cols-1">
                    {inputs.map((input, index) => {
                        return (
                            <div key={index}>
                                <p>{input.name}</p>
                                {input.type === 'text' && (
                                    <Input
                                        value={input.value}
                                        onChange={input.onChange}
                                        className={clsx('border-solid border-[2px] border-primary h-[50px]', {})}
                                        disabled={!input.state}
                                    ></Input>
                                )}
                                {input.type === 'date' && (
                                    <DatePicker
                                        defaultValue={input.value ? dayjs(input.value, dateFormat) : null}
                                        format={dateFormat}
                                        className={clsx('border-solid border-[2px] border-primary h-[50px] w-full', {})}
                                        disabled={!input.state}
                                        onChange={input.onChange}
                                        allowClear={false}
                                    ></DatePicker>
                                )}
                                {input.errorMessage && <p className="text-red-500 break-words">{input.errorMessage}</p>}
                            </div>
                        );
                    })}
                </div>
                <Button
                    size="large"
                    type="primary"
                    className="h-[50px] mt-[30px]"
                    htmlType="submit"
                    onClick={handleSubmitChange}
                    loading={loading}
                >
                    Chỉnh sửa
                </Button>
            </div>
        </div>
    );
}

export default InfoUpdate;
