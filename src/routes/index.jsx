import SidebarAndHeader from '../layouts/SidebarAndSearch';
import SidebarOnly from '../layouts/SidebarOnly';
import Activate from '../page/activate/Activate';
import UserManagementPage from '../page/admin/userManage/UserManageMentPage';
import Authenticate from '../page/authenticate/Authenticate';
import ForgotPassWord from '../page/forgotPassword/ForgotPassword';
import Home from '../page/home/Home';
import LoginPage from '../page/login/LoginPage';
import PostPage from '../page/post/PostPage';
import ProfilePage from '../page/profile/ProfilePage';
import RegisterPage from '../page/register/RegisterPage';
import SettingPage from '../page/setting/SettingPage';
import UserPage from '../page/user/UserPage';

const publicRoutes = [
    { path: '/login', component: LoginPage, layout: null },
    { path: '/authenticate', component: Authenticate, layout: null },
    { path: '/register', component: RegisterPage, layout: null },
    { path: '/activate', component: Activate, layout: null },
    { path: '/activate/:email/:code', component: Activate, layout: null },
    { path: '/forgot-password', component: ForgotPassWord, layout: null },
];

const privateROutes = [
    { path: '/', component: Home, layout: SidebarOnly },
    { path: '/setting', component: SettingPage, layout: SidebarOnly },
    { path: '/profile', component: ProfilePage, layout: SidebarOnly },
    { path: '/admin/manage-users', component: UserManagementPage, layout: SidebarOnly, isAdminEndpoint: true },
    { path: '/user/:id', component: UserPage, layout: SidebarAndHeader },
    { path: '/post', component: PostPage, layout: SidebarAndHeader },
];

export { publicRoutes, privateROutes };
