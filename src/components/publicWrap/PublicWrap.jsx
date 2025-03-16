import { useEffect } from 'react';
import { getToken, REFRESH_TOKEN } from '../../services/tokenService';
import { useDispatch } from 'react-redux';
import { logOutUserAction } from '../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import { deleteInfoChatRoomFocusAction } from '../../redux/action/chatRoomAction';

function PublicWrap({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const refreshToken = getToken(REFRESH_TOKEN);
        if (!refreshToken) {
            dispatch(logOutUserAction());
            dispatch(deleteInfoChatRoomFocusAction());
        } else {
            navigate('/');
        }
    }, []);
    return <>{children}</>;
}

export default PublicWrap;
