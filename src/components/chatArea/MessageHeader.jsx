import { SearchOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { chatRoomFocusSelector } from '../../redux/selector';
import { useState } from 'react';
import ModalUserInfo from '../modal/ModalUserInfo';

function MessageHeader() {
    const [openModalUserInfo, setOpenModalUserInfo] = useState(false);
    const chatRoomFocus = useSelector(chatRoomFocusSelector);
    const receiver = chatRoomFocus?.receiver;
    return (
        <>
            <div className="w-full h-[60px] px-[12px] flex items-center">
                <Avatar size={50} src={receiver?.picture} className='cursor-pointer' onClick={()=>{setOpenModalUserInfo(true)}}/>
                <Title
                    level={5}
                    className="m-0 pr-[24px] ml-[12px] flex-1 flex items-center"
                    ellipsis={{ rows: 1, expandable: false }}
                    style={{ maxWidth: '100%', marginBottom: '0px' }}
                >
                    {`${receiver?.lastName} ${receiver?.firstName}`}
                    {receiver?.state === 'ONLINE' && (
                        <div className="rounded-full w-[8px] h-[8px] ml-[6px] mt-[1px]  bg-lime-500"></div>
                    )}
                </Title>
                {/* <div className="flex">
                    <div className="text-[20px] w-[40px] h-[40px] flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                        <SearchOutlined />
                    </div>
                    <div className="text-[20px] w-[40px] h-[40px] flex items-center justify-center hover:bg-slate-100 cursor-pointer">
                        <VideoCameraOutlined />
                    </div>
                </div> */}
            </div>
            {openModalUserInfo && <ModalUserInfo setOpenModalUserInfo={setOpenModalUserInfo} />}
        </>
    );
}

export default MessageHeader;
