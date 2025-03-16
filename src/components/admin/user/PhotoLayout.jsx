import { useState } from 'react';
import { ImageGrid } from 'react-fb-image-video-grid/dist/react-fb-image-video-grid.cjs.production.min';
import ModalPost from './ModalPost';

function PhotoLayout({ isModal }) {
    const [openModalPost, setOpenModalPost] = useState(false);
    return (
        <>
            <div
                className="flex-1 overflow-y-auto "
                onClick={() => {
                    if (!isModal) setOpenModalPost(true);
                }}
            >
                {isModal ? (
                    <div className="flex flex-col gap-y-[4px]">
                        <img
                            alt="ig"
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            style={{ objectFit: 'cover', objectPosition: 'center', width: '100%' }}
                        />
                        <img
                            style={{ objectFit: 'cover', objectPosition: 'center', width: '100%' }}
                            alt="ig"
                            src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
                        />
                    </div>
                ) : (
                    <ImageGrid showModal={false}>
                        <img
                            alt="ig"
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            style={{ objectFit: 'cover', objectPosition: 'center', maxHeight: '200px' }}
                        />
                        <img
                            style={{ objectFit: 'cover', maxHeight: '200px', objectPosition: 'center' }}
                            alt="ig"
                            src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
                        />
                        <img
                            style={{ objectFit: 'cover', maxHeight: '200px', objectPosition: 'center' }}
                            alt="ig"
                            src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg"
                        />
                        <img
                            style={{ objectFit: 'cover', maxHeight: '200px', objectPosition: 'center' }}
                            alt="ig"
                            src="https://thumbs.dreamstime.com/b/imagination-girl-kiss-lion-love-nature-abstract-concept-young-steals-male-wildlife-children-like-to-imagine-play-129595579.jpg"
                        />
                        <img
                            style={{ objectFit: 'cover', maxHeight: '200px', objectPosition: 'center' }}
                            alt="ig"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg45jUi84SYeCf4uNAaprS7aoKzS8AohaLwQ&usqp=CAU"
                        />
                        <img
                            style={{ objectFit: 'cover', maxHeight: '200px', objectPosition: 'center' }}
                            alt="ig"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg45jUi84SYeCf4uNAaprS7aoKzS8AohaLwQ&usqp=CAU"
                        />
                    </ImageGrid>
                )}
            </div>
            {openModalPost && <ModalPost setOpenModalPost={setOpenModalPost} />}
        </>
    );
}

export default PhotoLayout;
