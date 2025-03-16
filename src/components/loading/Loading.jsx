import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Loading({ fontSize }) {
    return (
        <div className="w-full h-full absolute top-0 left-0">
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: fontSize || 80 }} spin />}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
}

export default Loading;
