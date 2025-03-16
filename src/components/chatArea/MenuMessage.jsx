import { useState } from 'react';
import ModalConfirm from '../modal/ModalConfirm';
import useChatMessageService from '../../services/useChatMessageService';
import ModalMessageForwarding from '../modal/ModalMessageForwarding';

function MenuMessage({ messageId, message }) {
    const [openModal, setOpenModal] = useState(false);
    const [openModalMessageForwarding, setOpenModalMessageForwarding] = useState(false);

    const { delMessage } = useChatMessageService();

    const listBtns = [
        {
            name: 'Thu hồi',
            title: 'Delete',
            onClick: () => {
                setOpenModal(true);
            },
        },
        {
            name: 'Chuyển tiếp',
            title: 'Forwarding',
            onClick: () => {
                setOpenModalMessageForwarding(true);
            },
        },
    ];
    const handleSubmitDeleteMessage = async () => {
        delMessage(messageId);
    };
    return (
        <>
            <div className="flex">
                {listBtns.map((btn, index) => {
                    return (
                        <div
                            className="px-[8px] py-[4px] cursor-pointer text-white hover:bg-slate-500"
                            onClick={btn.onClick}
                            key={index}
                        >
                            {btn.name}
                        </div>
                    );
                })}
            </div>
            <ModalConfirm
                openModal={openModal}
                setOpenModal={setOpenModal}
                onSubmit={handleSubmitDeleteMessage}
                title={'Bạn có chắc chắn muốn xóa tin nhắn này?'}
            />
            {openModalMessageForwarding && (
                <ModalMessageForwarding
                    setOpenModalMessageForwarding={setOpenModalMessageForwarding}
                    message={message}
                />
            )}
        </>
    );
}

export default MenuMessage;
