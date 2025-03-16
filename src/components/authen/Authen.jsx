import { useNavigate } from 'react-router-dom';
import Form from '../form/Form';
import Loading from '../loading/Loading';
import useAuthenService from '../../services/authenService';
import { ACCESS_TOKEN, getToken, REFRESH_TOKEN, setToken } from '../../services/tokenService';
import { useEffect } from 'react';

function Authen() {
    const navigate = useNavigate();
    const { authenGoogle } = useAuthenService();

    useEffect(() => {
        const authen = async () => {
            const authCodeRegex = /code=([^&]+)/;
            const isMatch = window.location.href.match(authCodeRegex);

            if (isMatch) {
                const authCode = isMatch[1];
                const result = await authenGoogle(authCode);
                if (!result) return;
                console.log(result);
                setToken(ACCESS_TOKEN, result.result.accessToken);
                setToken(REFRESH_TOKEN, result.result.refreshToken);
                navigate('/');
            }
        };
        authen();
    }, []);
    return (
        <Form>
            <div
                className="absolute w-[500px] bg-gray-800 bg-opacity-90 border-solid border-[2px] border-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] p-5"
                style={{ maxWidth: '95%', minHeight: '500px' }}
            >
                <Loading />
            </div>
        </Form>
    );
}

export default Authen;
