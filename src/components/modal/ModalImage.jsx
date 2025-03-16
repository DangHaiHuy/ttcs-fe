import ClickAwayListener from 'react-click-away-listener';

function ModalImage({ source, type, setOpenModalImage }) {
    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center">
            <ClickAwayListener
                onClickAway={() => {
                    setOpenModalImage(false);
                }}
            >
                {type === 'IMAGE' && <img src={source} className="max-h-[500px] w-auto max-w-[700px] z-50" />}
            </ClickAwayListener>
        </div>
    );
}

export default ModalImage;
