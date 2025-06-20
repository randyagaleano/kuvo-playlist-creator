import axios from "axios";
import { getSpotifyTrackIDs } from './getSongIDs';
import "dotenv/config";

const token = process.env.TOKEN;

async function createPlaylist() {
    
    try {
        const response = await axios.get(`https://api.spotify.com/v1/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        return response.data;
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

createPlaylist();