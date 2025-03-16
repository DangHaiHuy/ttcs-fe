import Search from '../components/search/Search';
import Sidebar from '../components/sidebar/SideBar';

function SidebarAndHeader({ children }) {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className="ml-[80px] overflow-hidden">
                <Search />
                <div className='mt-[60px]'>{children}</div>
            </div>
        </div>
    );
}

export default SidebarAndHeader;
