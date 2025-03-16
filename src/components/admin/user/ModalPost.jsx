import ClickAwayListener from 'react-click-away-listener';
import Post from './Post';

function ModalPost({ setOpenModalPost }) {
    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
            <div
                className="relative w-[700px] bg-slate-250 rounded-2xl z-30  flex flex-col overflow-hidden"
                style={{ maxHeight: '90%', maxWidth: '90%' }}
            >
                <ClickAwayListener
                    onClickAway={() => {
                        setOpenModalPost(false);
                    }}
                >
                    <div
                        className="px-[40px] max-h-full  overflow-y-auto [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-slate-250
                        [&::-webkit-scrollbar-thumb]:bg-slate-500
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-slate-250"
                    >
                        <div className="overflow-hidden">
                            <Post isModal={true} />
                        </div>
                    </div>
                </ClickAwayListener>
            </div>
        </div>
    );
}

export default ModalPost;
