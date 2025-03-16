import { CloseOutlined, FileImageOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { useSelector } from 'react-redux';
import { userInfoPictureSelector } from '../../redux/selector';
import CropImage from './CropImage';
import clsx from 'clsx';

function ModalCropAvatar({ setOpenModalCropAvatar }) {
    const [image, setImage] = useState(useSelector(userInfoPictureSelector));

    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setImage(e.target.result);
            };
        }
    };

    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center">
            <ClickAwayListener
                onClickAway={() => {
                    setOpenModalCropAvatar(false);
                }}
            >
                <div
                    className="relative flex justify-center items-center w-[700px] z-50"
                    style={{ height: '70%', maxWidth: '90%' }}
                >
                    <div
                        className="absolute right-[10px] top-[10px] cursor-pointer"
                        onClick={() => {
                            setOpenModalCropAvatar(false);
                        }}
                    >
                        <CloseOutlined style={{ fontSize: '25px' }} />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".jpg, .png, .webp, .gif"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div
                        className={clsx('bg-slate-500 w-full p-[40px] rounded-2xl', {
                            ['h-full']: image,
                            ['max-h-full']: !image,
                        })}
                    >
                        <div className="flex flex-col items-center h-full">
                            <Button
                                size="large"
                                className="h-[50px] bg-slate-200"
                                icon={<FileImageOutlined />}
                                iconPosition="start"
                                onClick={() => {
                                    if (fileInputRef.current) {
                                        fileInputRef.current.click();
                                    }
                                }}
                            >
                                Tải ảnh lên
                            </Button>
                            {image && <CropImage image={image} setOpenModalCropAvatar={setOpenModalCropAvatar} />}
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    );
}

export default ModalCropAvatar;
