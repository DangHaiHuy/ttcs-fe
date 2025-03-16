import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function Emoji({ handleAddEmoji }) {
    return (
        <Picker
            data={data}
            onEmojiSelect={handleAddEmoji}
            locale="vi"
            maxFrequentRows={1}
            set="native"
            previewPosition="none"
        />
    );
}

export default Emoji;
