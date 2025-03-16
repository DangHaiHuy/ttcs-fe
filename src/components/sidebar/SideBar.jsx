import { GlobalOutlined, MessageOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, Popover } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sidebarTitleSelector, userInfoSelector } from '../../redux/selector';
import MenuAvatar from './MenuAvatar';

function Sidebar() {
    const [visible, setVisible] = useState(false);

    const selectBtnTitle = useSelector(sidebarTitleSelector);

    const listBtns = [
        {
            icon: <TeamOutlined className="text-[30px]" />,
            href: '/admin/manage-users',
            title: 'manage-users',
            type: 'admin',
        },
        {
            icon: <MessageOutlined className="text-[30px]" />,
            href: '/',
            title: 'home',
            type: 'user',
        },
        {
            icon: <GlobalOutlined className="text-[30px]" />,
            href: '/post',
            title: 'post',
            type: 'user',
        },
        {
            icon: <SettingOutlined className="text-[30px]" />,
            href: '/setting',
            title: 'setting',
            type: 'user',
        },
    ];
    const myInfo = useSelector(userInfoSelector);
    const navigate = useNavigate();
    return (
        <div className="fixed w-[80px] h-screen bg-slate-200 shadow-lg">
            <Popover
                overlayInnerStyle={{ padding: '0', overflow: 'hidden' }}
                trigger="click"
                placement="right"
                open={visible}
                onOpenChange={() => setVisible((prev) => !prev)}
                content={<MenuAvatar setVisible={setVisible}></MenuAvatar>}
            >
                <Avatar
                    size={60}
                    className="border-solid border-[2px] border-primary ml-[10px] mt-[48px] cursor-pointer"
                    src={myInfo.picture}
                />
            </Popover>
            <Flex vertical gap="0" className="w-full mt-[12px]">
                {listBtns.map((btn, index) => {
                    return (
                        <div key={index}>
                            {(btn.type === 'user' || (btn.type === 'admin' && myInfo.authorities === 'ADMIN')) && (
                                <div
                                    className={clsx('h-[80px] flex items-center justify-center cursor-pointer', {
                                        'bg-primary text-white': btn.title === selectBtnTitle,
                                    })}
                                    onClick={() => {
                                        navigate(btn.href);
                                    }}
                                >
                                    {btn.icon}
                                </div>
                            )}
                        </div>
                    );
                })}
            </Flex>
        </div>
    );
}

export default Sidebar;
