import { useEffect, useState } from 'react';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import Loading from '../loading/Loading';
import { Avatar, Table } from 'antd';
import avatar from '../../assets/Images/avatar.jpg';

function ListBlockedUser() {
    const [loading, setLoading] = useState(false);
    const [listBlockedUser, setListBlockedUser] = useState([]);
    const { getListBlockedUser } = useUserServicePrivate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await getListBlockedUser();
            setLoading(false);
            if (!res) return;
            setListBlockedUser(
                res.result?.items.map((user, index) => {
                    return {
                        key: index + 1,
                        picture: user.picture,
                        name: `${user.lastName} ${user.firstName}`.trim(),
                        blocked: true,
                    };
                }),
            );
        };
        fetchData();
    }, []);
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            width: 60,
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'picture',
            key: 'picture',
            render: (picture) => {
                return (
                    <div className="flex justify-center items-center">
                        <Avatar
                            size={60}
                            src={picture || avatar}
                            className="border-solid border-[2px] border-primary"
                        />
                    </div>
                );
            },
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chặn',
            dataIndex: 'blocked',
            key: 'blocked',
            width: 100,
        },
    ];
    return (
        <>
            {loading ? (
                <Loading fontSize={50} />
            ) : (
                <div>
                    <Table
                        columns={columns}
                        dataSource={listBlockedUser}
                        scroll={{x:'max-content'}}                        
                    ></Table>
                </div>
            )}
        </>
    );
}

export default ListBlockedUser;
