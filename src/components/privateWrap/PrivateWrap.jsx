import { useEffect, useState } from 'react';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import { useDispatch, useSelector } from 'react-redux';
import { getMyInfoAction } from '../../redux/action/userAction';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import WebsocketClient from '../websocketClient/WebsocketClient';

function PrivateWrap({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    const { getMyInfo } = useUserServicePrivate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMyInfo();
            if (!res) return;
            dispatch(getMyInfoAction(res?.result));
            setIsLoading(false);
        };
        fetchData();
    }, []);
    if (isLoading)
        return (
            <div className="w-full h-full absolute top-0 left-0">
                <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>
        );
    return (
        <>
            <WebsocketClient>{children}</WebsocketClient>
        </>
    );
}

export default PrivateWrap;
