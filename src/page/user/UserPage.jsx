import { Avatar, Button } from 'antd';
import { useParams } from 'react-router-dom';
import Post from '../../components/admin/user/Post';
import { MessageOutlined, UserAddOutlined } from '@ant-design/icons';
import UploadPost from '../../components/admin/user/UploadPost';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../redux/selector';

function UserPage() {
    const id = { useParams };
    const myId = useSelector(userInfoSelector)?.id;
    return (
        <div className=" bg-slate-300" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <div className="relative">
                <div className="h-[200px] w-full max-h-[200px] overflow-hidden">
                    <img
                        className="object-cover object-center w-full max-h-full"
                        src="https://scontent.fvii2-4.fna.fbcdn.net/v/t1.6435-9/105494418_916655928758944_1597928988591367552_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeE-bvHqQIcG4hH5l5i24Y1X81RET55xSxvzVERPnnFLG-4ffFaTZvgahKREi-W-iaYrG7wJJJUCgZ6Aq28iTHGl&_nc_ohc=jUdxAgIgBJYQ7kNvgH9wdqK&_nc_oc=AdgDvUM_WB_TELOSjDCwCPrgmDVPjyBCkDB803TTnwkgd6ar6Dvaz6kNL15F5q_NJeAPUcwACruARVmIcJ2qP0uV&_nc_zt=23&_nc_ht=scontent.fvii2-4.fna&_nc_gid=zNEB6nLQ-GxnaaruhoHLOA&oh=00_AYGoUB11RNxWp6kIpZ4r8grrZuzj4PmIXzKXga_XruDTxw&oe=67FD25CD"
                    />
                </div>
                <div className="flex items-end absolute bottom-[10px] px-[40px] justify-between w-full">
                    <div className="flex items-end ">
                        <Avatar
                            className="border-solid border-[2px] border-cyan-400"
                            size={120}
                            src="https://images2.thanhnien.vn/zoom/700_438/528068263637045248/2024/1/26/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912-37-0-587-880-crop-1706239860681642023140.jpg"
                        />
                        <div className="px-[12px]">
                            <p className="text-3xl font-semibold">Văn Thanh</p>
                        </div>
                    </div>
                    <div className="flex gap-x-[12px]">
                        <Button size="large" icon={<UserAddOutlined />}>
                            Kết bạn
                        </Button>
                        <Button type="primary" size="large" icon={<MessageOutlined />}>
                            Nhắn tin
                        </Button>
                    </div>
                </div>
                <div className="h-[100px] shadow-lg bg-slate-250"></div>
            </div>
            <div className="mt-[40px] px-[40px]">
                <UploadPost />
            </div>
            <div className="mt-[40px] px-[40px]">
                <Post />
            </div>
            <div className="mt-[40px] px-[40px]">
                <Post />
            </div>
        </div>
    );
}

export default UserPage;
