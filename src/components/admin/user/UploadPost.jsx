import { Avatar } from 'antd';
import { useState } from 'react';
import ModalUploadPost from './ModalUploadPost';

function UploadPost() {
    const [openModalUpload, setOpenModalUpload] = useState(false);
    return (
        <div className="p-[8px] bg-slate-250 shadow-lg flex gap-x-[12px]">
            <Avatar
                className="border-solid border-[1px] border-cyan-400"
                size={60}
                src="https://images2.thanhnien.vn/zoom/700_438/528068263637045248/2024/1/26/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912-37-0-587-880-crop-1706239860681642023140.jpg"
            ></Avatar>
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
