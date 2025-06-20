import axios from "axios";
import "dotenv/config";
import { getUserInformation } from "./Spotify/getUserInformation";

const token = process.env.TOKEN;

async function createPlaylist() {
    const userID = await getUserInformation();
    const requestBody: PlaylistRequestBody = {
        name: "Super Sonido",
        description: "KUVO Jazz 89.3",
        public: false
    }

    try {
        const response = await axios.post(
            `https://api.spotify.com/v1/users/${userID}/playlists`,
            requestBody,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        console.log(response.data)
        return response.data;
    }
    catch (error) {
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

// getUserInformation();
createPlaylist();

interface PlaylistRequestBody {
    name: string;
    description?: string;
    public?: boolean;
    collaborative?: boolean;
}