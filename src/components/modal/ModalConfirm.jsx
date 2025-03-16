import { Modal } from 'antd';
import { useState } from 'react';

function ModalConfirm({ openModal, setOpenModal, title, onSubmit }) {
    const [loading, setLoading] = useState(false);
    const onCancel = () => {
        setOpenModal(false);
    };
    const submit = async () => {
        if (typeof onSubmit === 'function') {
            setLoading(true);
            await onSubmit();
            setLoading(false);
        }
        setOpenModal(false);
    };
    return (
        <>
            <Modal
                open={openModal}
                onCancel={onCancel}
                onOk={submit}
                title={<p className="text-xl pt-[26px] font-semibold">{title}</p>}
                confirmLoading={loading}
                centered
            ></Modal>
        </>
    );
}

export default ModalConfirm;
