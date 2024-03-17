import axios from 'axios';
import { NODE_URL } from '../config.js';

async function processAndSendImage(image: any): Promise<void> {
    // Process the image here (e.g., resize, compress, etc.)
    // ...

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append('file', image);

    try {
        
        // Send the image to the server using axios
        await axios.post(NODE_URL + '/uploadImg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Image uploaded successfully!');
    } catch (error) {
        console.error('Error uploading image:', error.message);
    }
}

export default processAndSendImage;
