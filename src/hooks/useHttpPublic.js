import { useEffect, useRef } from 'react';
import { ACCESS_TOKEN, removeToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const useHttpPublic = () => {
    const navigate = useNavigate();
    const httpRequestPublic = useRef(
        axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        }),
    );

    useEffect(() => {
        const instance = httpRequestPublic.current;
        const responseIntercept = instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const code = error?.response?.data?.code;
                if (code === 1011) {
                    removeToken(ACCESS_TOKEN);
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                    navigate('/activate');
                } else if (code === 1007) {
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                    navigate('/');
                } else if (code === 1014) {
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                    navigate('/login');
                } else
                    toast.error(error?.response?.data?.errMessage || error?.response?.data?.message || 'Có lỗi xảy ra');
                return Promise.reject(error);
            },
        );
        return () => {
            instance.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return httpRequestPublic.current;
};
export default useHttpPublic;

//các service tách riêng useHttpPublic useHttpPrivate riêng vì ví dụ như getMyInfo, nếu bỏ cả 2 vào cùng 1 service thì sẽ gọi useHttpPublic 1 lần
// nhưng chưa xóa phải thực hiện xong getMyInfo mới xóa trong useEffect
// trong khi chưa thực hiện xong thì gọi hàm refresh có sử dụng useHttpPublic tiếp thì sẽ lại chạy thêm 1 interceptor,
// kết quả là về trang login hiện ra 2 lần thông báo hết hạn

// api lồng trong api, vì vậy phải tách ra, còn các trường hợp api đồng thời hay cái này đến cái kia thì 1 cái xong
// sẽ chạy hàm xóa useEffect
