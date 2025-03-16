import { EditOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import ModalCropAvatar from '../modal/ModalCropAvatar';

function AvatarUpdate({ picture }) {
    const [openModalCropAvatar, setOpenModalCropAvatar] = useState(false);
    return (
        <div className="min-w-[400px] flex justify-center items-center  py-[40px]">
            <div className="relative">
                <Avatar size={300} className="border-solid border-[2px] border-primary" src={picture} />
                <div
                    className="flex justify-center items-center bg-primary border-solid border-[2px] border-primary cursor-pointer w-[40px] h-[40px] rounded-full absolute left-1/2 -translate-x-1/2"
                    style={{ top: 'calc(100% - 20px)' }}
                    onClick={() => setOpenModalCropAvatar(true)}
                >
                    <EditOutlined style={{ fontSize: '20px', color: 'white' }} />
                </div>
            </div>
            {openModalCropAvatar && <ModalCropAvatar setOpenModalCropAvatar={setOpenModalCropAvatar} />}
        </div>
    );
}

export default memo(AvatarUpdate);
