import axios from "axios";
import "dotenv/config";
import { getUserInformation } from "./getUserInformation";
// import { getSpotifyTrackIDs } from "../getSongIDs";

const token = process.env.TOKEN;

async function getPlaylistID() {
    const userID = await getUserInformation();

    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        const playlist = response.data.items.find((item: { description: string; }) => item.description === "KUVO Jazz 89.3")
        console.log(playlist.id)
        return playlist.id;
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

async function addSongsToPlaylist() {
    const playlistID = await getPlaylistID();
    // const songs = await getSpotifyTrackIDs()
    const requestBody = {
        uris: [
            "spotify:track:5detsOsoGLvE0rU7KVt8Kg"
        ],
        position: 0
    }    
    try {
        const response = await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
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

addSongsToPlaylist();