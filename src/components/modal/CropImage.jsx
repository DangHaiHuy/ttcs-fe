import { Button } from 'antd';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import useUserServicePrivate from '../../services/useUserServicePrivate';
import { useDispatch } from 'react-redux';
import { updatePictureAction } from '../../redux/action/userAction';

function CropImage({ image, setOpenModalCropAvatar }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 }); // tọa độ của vùng cắt
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [loading, setLoading] = useState(false);

    const { updateAvatar } = useUserServicePrivate();

    const dispatch = useDispatch();

    const onCropComplete = (cropPercentage, cropPixel) => {
        setCroppedArea(cropPixel);
    };

    const onCropDone = () => {
        const canvasEle = document.createElement('canvas');
        canvasEle.width = croppedArea.width;
        canvasEle.height = croppedArea.height;
        const context = canvasEle.getContext('2d');

        let imgObject = new Image();
        imgObject.src = image;
        imgObject.crossOrigin = 'anonymous';
        imgObject.onload = () => {
            context.drawImage(
                imgObject,
                croppedArea.x,
                croppedArea.y,
                croppedArea.width,
                croppedArea.height,
                0,
                0,
                croppedArea.width,
                croppedArea.height,
            );
            canvasEle.toBlob((blob) => {
                if (blob) {
                    setLoading(true);
                    updateAvatar(blob)
                        .then((response) => {
                            console.log(response);
                            dispatch(updatePictureAction(response.result.url));
                            setOpenModalCropAvatar(false);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
            }, 'image/jpeg');
        };
    };

    return (
        <>
            <div className="w-full h-full relative my-[20px]">
                <Cropper
                    image={image}
                    style={{
                        containerStyle: {
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                        },
                    }}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    aspectRatio={1 / 1}
                    onCropComplete={onCropComplete}
                ></Cropper>
            </div>
            <Button size="large" className="h-[50px] bg-primary" onClick={onCropDone} loading={loading}>
                Cắt ảnh
            </Button>
        </>
    );
}

export default CropImage;
