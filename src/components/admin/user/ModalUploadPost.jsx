import { CloseOutlined, FileImageOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import Emoji from '../../emoji/Emoji';

function ModalUploadPost({ setOpenModal }) {
    const [content, setContent] = useState('');
    const [isOpenEmoji, setIsOpenEmoji] = useState(false);
    const [images, setImages] = useState([]);

    const textareaRef = useRef();
    const inputImageRef = useRef();

    const handleAddEmoji = (e) => {
        if (!textareaRef.current) return;
        const input = textareaRef.current.resizableTextArea.textArea;
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        const newText = text.slice(0, start) + e.native + text.slice(end);
        setContent(newText);
        setTimeout(() => {
            input.selectionStart = start + e.native.length;
            input.selectionEnd = start + e.native.length;
            input.focus();
        }, 0);
    };

    const onInputImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        setImages(imageUrls);
    };

    useEffect(() => {
        return () => {
            images.forEach((images) => URL.revokeObjectURL(images.url));
        };
    }, [images]);
    return (
        <div className="bg-gray-900/90 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
            <div
                className="relative w-[700px] bg-slate-500 rounded-2xl z-30  flex flex-col"
                style={{ maxHeight: '90%', maxWidth: '90%' }}
            >
                <div
                    className="absolute aspect-square flex justify-center items-center w-[40px] cursor-pointer top-0 right-0"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    <CloseOutlined className="text-[20px]" />
                </div>
                <input
                    type="file"
                    className="hidden"
                    ref={inputImageRef}
                    multiple
                    accept=".jpg, .png, .webp, .gif"
                    onChange={onInputImageChange}
                ></input>
                <div className="px-[40px] pt-[40px] flex flex-col overflow-hidden">
                    <div
                        className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                    >
                        <Input.TextArea
                            ref={textareaRef}
                            autoSize={{ minRows: 1, maxRows: 8 }}
                            className="bg-inherit flex-1 outline-none p-[12px] focus:bg-inherit focus:outline-none"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                            placeholder="Bạn đang nghĩ gì"
                        ></Input.TextArea>
                        <div>
                            {/* <img
                                className="w-full mt-[12px]"
                                src="https://user-images.githubusercontent.com/29153968/232312173-9339000e-8d75-4710-be33-a0a0748b2f71.png"
                            />
                            <img
                                className="w-full mt-[12px]"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8vk9ktFsw_ZvYImjosvL0w2bGhzsGrlHPzQ&s"
                            />
                            <img
                                className="w-full mt-[12px]"
                                src="https://user-images.githubusercontent.com/29153968/232312173-9339000e-8d75-4710-be33-a0a0748b2f71.png"
                            /> */}
                            {images.map((image, index) => {
                                return <img className="w-full mt-[12px]" key={index} src={image.url} />;
                            })}
                        </div>
                    </div>
                </div>
                <div className="px-[40px] mb-[40px]">
                    <div className="mt-[12px] border-t-[1px] border-solid border-slate-200 ">
                        <div className="flex gap-x-[4px]">
                            <div
                                className="aspect-square w-[30px] flex justify-center items-center cursor-pointer bg-slate-200 rounded-lg mt-[12px]"
                                onClick={() => {
                                    if (inputImageRef.current) {
                                        inputImageRef.current.click();
                                    }
                                }}
                            >
                                <FileImageOutlined />
                            </div>
                            <div
                                className="relative aspect-square w-[30px] flex justify-center items-center cursor-pointer bg-slate-200 rounded-lg mt-[12px]"
                                onClick={() => {
                                    setIsOpenEmoji(true);
                                }}
                            >
                                <SmileOutlined />
                                {isOpenEmoji && (
                                    <ClickAwayListener
                                        onClickAway={() => {
                                            setIsOpenEmoji(false);
                                        }}
                                    >
                                        <div className="absolute bottom-full left-full  z-50">
                                            <div className="pb-[6px]">
                                                <Emoji
                                                    setIsOpenEmoji={setIsOpenEmoji}
                                                    handleAddEmoji={handleAddEmoji}
                                                />
                                            </div>
                                        </div>
                                    </ClickAwayListener>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button className="w-full mt-[12px]" type="primary">
                        Đăng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ModalUploadPost;
