import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSidebarTitleAction } from '../../redux/action/sidebarAction';
import Post from '../../components/admin/user/Post';

function PostPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSidebarTitleAction('post'));
    }, []);

    return (
        <div className=" bg-slate-300 overflow-hidden" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <div className="px-[40px] mt-[40px]">
                <Post />
            </div>
            <div className="px-[40px] mt-[40px]">
                <Post />
            </div>
            <div className="px-[40px] mt-[40px]">
                <Post />
            </div>
            <div className="px-[40px] mt-[40px]">
                <Post />
            </div>
        </div>
    );
}

export default PostPage;
