import { getPlaylistFromKUVO } from "./scraper";
import { SongInformation } from '../interfaces/kuvo';
import { getAccessToken } from './authorization'
import axios from "axios";
// import "dotenv/config";

const episodeUrl = "https://www.kuvo.org/shows/268585/episodes/10432" // process.env.EPISODE_URL

async function createSearchableSongArray(episode: string): Promise<string[]> {
    const playlist: SongInformation[] = await getPlaylistFromKUVO(episode);

    const searchQueries: string[] = playlist.map(track => {
        const processedTitle = track.title.replace(/ /g, '+');
        const processedArtist = track.artist.replace(/ /g, '+');
        const processedRelease = track.release.replace(/ /g, '+');

        return `${processedTitle}+${processedArtist}+${processedRelease}`
    });

    return searchQueries;
    // search for songs on Spotify API?
    // return song url from spotify if available
}



async function getSpotifyTrackIDs() {
    const token = await getAccessToken();
    const songs = await createSearchableSongArray(episodeUrl);
    songs.forEach(song => {
        axios.get(`https://api.spotify.com/v1/search?q=${song}&type=track`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const songID = response.data.tracks.items[0].id
            console.log(`https://open.spotify.com/track/${songID}`);
        }).catch(error => {
            console.error('Error: ', error);
        });
    })
}

getSpotifyTrackIDs();