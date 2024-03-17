import axios from 'axios';
import { NODE_URL } from '../config.js';

async function DeleteImage(file: string): Promise<void> {

    try {
        
        // Send the image to the server using axios
        await axios.delete(NODE_URL + '/deleteImg/' + file);

        console.log('Image deleted sucessfully!');
    } catch (error) {
        console.error('Error deleting image:', error.message);
    }
}

export default DeleteImage;
