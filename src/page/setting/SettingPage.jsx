import { useEffect } from 'react';
import Setting from '../../components/setting/Setting';
import { useDispatch } from 'react-redux';
import { setSidebarTitleAction } from '../../redux/action/sidebarAction';

function SettingPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSidebarTitleAction('setting'));
    }, []);
    return <Setting />;
}

export default SettingPage;
