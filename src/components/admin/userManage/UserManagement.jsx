import { useEffect, useRef, useState } from 'react';
import useUserServiceAdmin from '../../../services/useUserServiceAdmin';
import { Avatar, Button, Input, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import avatar from '../../../assets/Images/avatar.jpg';
import './index.css';
import { toast } from 'react-toastify';

function UserManagement() {
    const [listUsers, setListUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const { getAllUser, lockUser, unlockUser } = useUserServiceAdmin();

    const searchInput = useRef();

    const getColumnSearchProps = (setSearchText) => ({
        filterIcon: (filtered) => {
            // console.log(filtered);   filterd=false nếu ko có keysearch, true nếu có keysearch
            return <SearchOutlined style={{ color: filtered ? 'oklch(0.795 0.184 86.047)' : undefined }} />;
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
            return (
                <div className="p-[8px]">
                    <Input
                        placeholder="Tìm kiếm..."
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        ref={searchInput}
                    />
                    <div className="mt-[8px] flex gap-x-2">
                        <Button
                            onClick={() => {
                                setSearchText('');
                                clearFilters();
                                confirm();
                            }}
                            className="basis-6/12"
                        >
                            Xóa
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                setSearchText(selectedKeys[0] || '');
                                confirm();
                            }}
                            icon={<SearchOutlined />}
                            className="basis-6/12"
                        >
                            Tìm
                        </Button>
                    </div>
                </div>
            );
        },
        onFilterDropdownOpenChange: (visible) => {
            //console.log(visible); nếu dropdown mở là true, đóng là false
            if (visible) {
                setTimeout(() => {
                    if (searchInput.current) {
                        searchInput.current.focus({ cursor: 'end' });
                    }
                }, 200); // chờ dropdown hoàn thành mới select được
            }
        },
    });

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            // onHeaderCell: () => ({
            //     style: { backgroundColor: '#1890ff', color: 'white', textAlign: 'center' }
            // })
            width: 60,
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'picture',
            key: 'picture',
            render: (text, record) => {
                return (
                    <div className="flex justify-center items-center">
                        <Avatar size={60} src={text || avatar} className="border-solid border-[2px] border-primary" />
                    </div>
                );
            },
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
            ...getColumnSearchProps(setUsername),
        },
        {
            title: 'Họ',
            dataIndex: 'lastName',
            key: 'lastName',
            ...getColumnSearchProps(setLastName),
        },
        {
            title: 'Tên',
            dataIndex: 'firstName',
            key: 'firstName',
            ...getColumnSearchProps(setFirstName),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps(setEmail),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps(setPhone),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Khóa tài khoản',
            dataIndex: 'locked',
            key: 'locked',
            render: (text, record) => {
                return !text ? (
                    <div className="flex items-center justify-between gap-x-1">
                        <p>Hoạt động</p>
                        <Button
                            onClick={() => {
                                handleLockUser(record.username);
                            }}
                            loading={loading}
                        >
                            Khóa
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between gap-x-1">
                        <p>Đã bị khóa</p>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={() => {
                                handleUnlockUser(record.username);
                            }}
                        >
                            Mở khóa
                        </Button>
                    </div>
                );
            },
        },
    ];

    const handleLockUser = async (username) => {
        if (loading) return;
        setLoading(true);
        const body = {
            username,
        };
        const res = await lockUser(body);
        setLoading(false);
        if (!res) return;
        toast.success(res.result.result);
        setListUsers((prevUsers) =>
            prevUsers.map((user) => (user.username === username ? { ...user, locked: !user.locked } : user)),
        );
    };

    const handleUnlockUser = async (username) => {
        if (loading) return;
        setLoading(true);
        const body = {
            username,
        };
        const res = await unlockUser(body);
        setLoading(false);
        if (!res) return;
        toast.success(res.result.result);
        setListUsers((prevUsers) =>
            prevUsers.map((user) => (user.username === username ? { ...user, locked: !user.locked } : user)),
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllUser(page, limit, username, firstName, lastName, phone, email);
            if (!res) {
                return;
            }
            setListUsers(
                res.result.items.map((user, index) => {
                    return {
                        key: (page - 1) * limit + index + 1,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        dob: user.dob,
                        email: user.email,
                        phone: user.phone,
                        location: user.location,
                        picture: user.picture,
                        state: user.state,
                        locked: user.locked,
                    };
                }),
            );
            setPagination((prev) => ({ ...prev, total: res.result.total }));
        };
        fetchData();
    }, [page, username, lastName, firstName, email, phone]);
    return (
        <div className="min-h-screen bg-slate-300 px-[40px] py-[40px] flex flex-col">
            <div className="relative">
                <h1 className="text-3xl">Quản lý tài khoản</h1>
                <div className="absolute w-full h-[2px] bg-primary top-full"></div>
            </div>
            <div className="mt-[40px]">
                <Table
                    dataSource={listUsers}
                    columns={columns}
                    pagination={pagination}
                    onChange={(pag) => {
                        setPage(pag.current);
                        setPagination(pag);
                    }}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </div>
    );
}

export default UserManagement;
