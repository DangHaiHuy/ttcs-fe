import { useSelector } from 'react-redux';
import AvatarUpdate from './AvatarUpdate';
import InfoUpdate from './InfoUpdate';
import { userInfoSelector } from '../../redux/selector';

function Profile() {
    const myInfo = useSelector(userInfoSelector);
    return (
        <div className="min-h-screen  bg-slate-300 px-[40px] py-[40px] ">
            <div className='relative'>
                <h1 className='text-3xl'>Chỉnh sửa thông tin</h1>
                <div className='absolute w-full h-[2px] bg-primary top-full'></div>
            </div>
            <div className="flex mt-[40px] max-lg:flex-col">
                <AvatarUpdate picture={myInfo.picture}></AvatarUpdate>
                <InfoUpdate myInfo={myInfo}></InfoUpdate>
            </div>
        </div>
    );
}

export default Profile;
