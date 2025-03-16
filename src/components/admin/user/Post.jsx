import { Avatar, Typography } from 'antd';
import { useState } from 'react';
import PhotoLayout from './PhotoLayout';
import { useNavigate } from 'react-router-dom';
import { CommentOutlined, HeartOutlined } from '@ant-design/icons';
import ModalComment from './ModalComment';

function Post({ isModal }) {
    const [isExpand, setIsExpand] = useState(false);
    const [openModalComment, setOpenModalComment] = useState(false);

    const navigate = useNavigate();
    return (
        <div
            className="pt-[8px] px-[8px] bg-slate-250 shadow-lg flex flex-col overflow-hidden"
            style={{ maxHeight: '100%' }}
        >
            <div className="flex">
                <Avatar
                    onClick={() => {
                        navigate('/user/1');
                    }}
                    className="border-solid border-[1px] border-cyan-400 cursor-pointer"
                    size={60}
                    src="https://images2.thanhnien.vn/zoom/700_438/528068263637045248/2024/1/26/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912-37-0-587-880-crop-1706239860681642023140.jpg"
                ></Avatar>
                <div className="flex flex-col justify-center px-[8px]">
                    <p className="">Văn Thanh</p>
                    <p className="text-sm text-gray-500">07/07/2000 19:28:00</p>
                </div>
            </div>
            <div className="px-[8px] mt-[12px]">
                <Typography.Paragraph
                    ellipsis={{
                        rows: 1,
                        expandable: 'collapsible',
                        symbol: <span className="text-slate-300">{isExpand ? 'Thu nhỏ' : 'Mở rộng'}</span>,
                        onExpand: (_, info) => {
                            setIsExpand(info.expanded);
                        },
                    }}
                    style={{ maxWidth: '100%', margin: '0' }}
                >
                    abc abc abc abc abc abc abc abc abc abc abc abc abc abc abc
                </Typography.Paragraph>
            </div>
            <PhotoLayout isModal={isModal} />
            <div className="h-[40px] relative mt-[12px] columns-2">
                <div className="absolute w-full top-0 h-[1px] bg-slate-100"></div>
                <div className="flex justify-center items-center h-full cursor-pointer hover:bg-slate-400">
                    <HeartOutlined className="mr-[4px]" />
                    Thích
                </div>
                <div
                    className="flex justify-center items-center h-full cursor-pointer hover:bg-slate-400"
                    onClick={() => {
                        setOpenModalComment(true);
                    }}
                >
                    <CommentOutlined className="mr-[4px]" />
                    Bình luận
                </div>
            </div>
            {openModalComment && <ModalComment setOpenModalComment={setOpenModalComment} />}
        </div>
    );
}

export default Post;
