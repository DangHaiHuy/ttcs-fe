import useHttpPrivate from '../hooks/useHttpPrivate';

function useChatMessageService() {
    const httpRequestPrivate = useHttpPrivate();
    const getListMessage = async (receiverId, page) => {
        try {
            const res = await httpRequestPrivate.get(`/messages/${receiverId}`, {
                params: {
                    page,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    const saveMessageTypeImage = async (receiverId, multipartFile, id) => {
        try {
            const formData = new FormData();
            formData.append('receiverId', receiverId);
            formData.append('multipartFile', multipartFile);
            formData.append('id', id);
            const res = await httpRequestPrivate.post(`/api/v1/cloudinary/save-message-type-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    const saveMessageTypeAudio = async (receiverId, multipartFile, id) => {
        try {
            const formData = new FormData();
            formData.append('receiverId', receiverId);
            formData.append('multipartFile', multipartFile);
            formData.append('id', id);
            const res = await httpRequestPrivate.post(`/api/v1/cloudinary/save-message-type-audio`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    const delMessage = async (id) => {
        try {
            const res = await httpRequestPrivate.post(`/messages/delete/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    return { getListMessage, saveMessageTypeImage, delMessage, saveMessageTypeAudio };
}

export default useChatMessageService;
