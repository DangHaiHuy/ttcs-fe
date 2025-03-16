import Sidebar from '../components/sidebar/SideBar';

function SidebarOnly({ children }) {
    return (
        <div>
            <Sidebar></Sidebar>
            <div className="ml-[80px]">{children}</div>
        </div>
    );
}

export default SidebarOnly;
