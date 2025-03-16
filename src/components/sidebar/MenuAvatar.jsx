import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../redux/selector';
import useAuthenService from '../../services/authenService';
import { ACCESS_TOKEN, getToken, REFRESH_TOKEN, removeToken } from '../../services/tokenService';
import { useNavigate } from 'react-router-dom';

function MenuAvatar({ setVisible }) {
    const navigate = useNavigate();
    const myInfo = useSelector(userInfoSelector);
    const { logOut } = useAuthenService();
    const handleLogOut = async () => {
        const body1 = {
            token: getToken(ACCESS_TOKEN),
        };
        const body2 = {
            token: getToken(REFRESH_TOKEN),
        };
        const [res1, res2] = await Promise.all([logOut(body1), logOut(body2)]);
        removeToken(ACCESS_TOKEN);
        removeToken(REFRESH_TOKEN);
        navigate('/login');
        setVisible(false);
    };
    return (
        <div className="w-[200px] flex flex-col">
            <div className="px-[12px] py-[8px] font-medium text-xl border-b-2 border-slate-200">
                {`${myInfo.lastName} ${myInfo.firstName}`}
            </div>
            <div
                className="px-[12px] py-[8px] hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                    navigate('/profile');
                    setVisible(false);
                }}
            >
                Hồ sơ
            </div>
            <div className="px-[12px] py-[8px] hover:bg-slate-100 cursor-pointer" onClick={handleLogOut}>
                Đăng xuất
            </div>
        </div>
    );
}

export default MenuAvatar;
