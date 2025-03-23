import { Avatar } from 'antd';
import { useState } from 'react';
import ModalUploadPost from './ModalUploadPost';

function UploadPost({ user }) {
    const [openModalUpload, setOpenModalUpload] = useState(false);
    return (
        <div className="p-[8px] bg-slate-250 shadow-lg flex gap-x-[12px]">
            <Avatar className="border-solid border-[1px] border-cyan-400" size={60} src={user.picture}></Avatar>
            <input
                className="flex-1 rounded-[100px] bg-slate-200 outline-none px-[24px]"
                readOnly
                placeholder="Bạn đang nghĩ gì"
                onClick={() => {
                    setOpenModalUpload(true);
                }}
            ></input>
            {openModalUpload && <ModalUploadPost setOpenModal={setOpenModalUpload} />}
        </div>
    );
}

export default UploadPost;
