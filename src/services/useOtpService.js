import useHttpPublic from '../hooks/useHttpPublic';

function useOtpService() {
    const httpRequestPublic = useHttpPublic();

    const sendOtpViaEmail = async (username) => {
        try {
            const res = await httpRequestPublic.get(`/api/v1/otp/send-otp/${username}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const verifyOtpCode = async (username, body) => {
        try {
            const res = await httpRequestPublic.post(`/api/v1/otp/check-otp/${username}`, body);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return { sendOtpViaEmail, verifyOtpCode };
}

export default useOtpService;
