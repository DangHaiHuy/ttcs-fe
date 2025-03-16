import { useEffect } from 'react';
import UserManagement from '../../../components/admin/userManage/UserManagement';
import { useDispatch } from 'react-redux';
import { setSidebarTitleAction } from '../../../redux/action/sidebarAction';

function UserManagementPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSidebarTitleAction('manage-users'));
    }, []);
    return <UserManagement></UserManagement>;
}

export default UserManagementPage;
