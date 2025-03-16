import { Avatar } from 'antd';

function Comment() {
    return (
        <div className="rounded-lg p-[8px] bg-slate-400 flex gap-x-[4px]">
            <Avatar
                className="border-solid border-[1px] border-cyan-400 cursor-pointer"
                size={60}
                src="https://images2.thanhnien.vn/zoom/700_438/528068263637045248/2024/1/26/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912-37-0-587-880-crop-1706239860681642023140.jpg"
            ></Avatar>
            <div className="flex-1">
                <div className="flex gap-x-[8px] items-end">
                    <p className="text-[16px] font-semibold">Văn Thanh</p>
                    <span className="text-[12px] text-slate-200">07/07/2000 19:37:58</span>
                </div>
                <p className="text-white">
                    Đẹp quá bạn Đẹp quá bạn Đẹp quá bạn Đẹp quá bạnĐẹp quá bạnĐẹp quá bạnĐẹp quá bạn{' '}
                </p>
            </div>
        </div>
    );
}

export default Comment;
