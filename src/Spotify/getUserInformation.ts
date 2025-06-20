import axios from "axios";
import "dotenv/config";

const token = process.env.TOKEN;

export async function getUserInformation() {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.id;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            if (error.response) {
                console.error('Response Status:', error.response.status);
                console.error('Response Data:', error.response.data);
                console.error('Response Headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
        throw error;
    }
}