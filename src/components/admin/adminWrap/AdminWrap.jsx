import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../../redux/selector';
import { useEffect, useState } from 'react';
import { Alert, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function AdminWrap({ children }) {
    const myInfo = useSelector(userInfoSelector);
    const [countDown, setCountDown] = useState(10);
    const [checkAdminAuthority, setCheckAdminAuthority] = useState(myInfo.authorities === 'ADMIN');
    const navigate = useNavigate();
    useEffect(() => {
        if (countDown < 0 && checkAdminAuthority === false) {
            navigate('/');
        }
        let timer;
        if (checkAdminAuthority === false) {
            timer = setTimeout(() => {
                if (countDown >= 0) setCountDown((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [countDown, checkAdminAuthority]);

    if (!checkAdminAuthority) {
        return (
            <div className="flex justify-center items-center h-screen flex-col gap-y-4">
                <Alert
                    message="Error"
                    description={`Bạn không có quyền truy cập tài nguyên này. Quay về trong ${countDown} giây`}
                    type="error"
                    showIcon
                    style={{ maxWidth: '70%' }}
                />
                <Button size="large" type="primary" className="h-[50px]" onClick={() => navigate('/')}>
                    Click để về trang chủ
                </Button>
            </div>
        );
    }
    return children;
}

export default AdminWrap;
