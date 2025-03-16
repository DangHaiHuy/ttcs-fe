import ClickAwayListener from 'react-click-away-listener';
import Comment from '../../comment/Comment';

function ModalComment({ setOpenModalComment }) {
    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
            <div
                className="relative w-[700px] bg-slate-250 rounded-2xl z-30  flex flex-col overflow-hidden"
                style={{ height: '90%', maxWidth: '90%' }}
            >
                <ClickAwayListener
                    onClickAway={() => {
                        setOpenModalComment(false);
                    }}
                >
                    <div className="p-[40px] flex flex-col gap-y-[12px]  overflow-y-auto">
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                        <Comment />
                    </div>
                </ClickAwayListener>
            </div>
        </div>
    );
}

export default ModalComment;
