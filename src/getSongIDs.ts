import { getPlaylistFromKUVO } from "./scraper";
import { SongInformation } from '../interfaces/kuvo';
import { getAccessToken } from './authorization'
import axios from "axios";
import "dotenv/config";

const episodeUrl = process.env.EPISODE_URL as string;

async function createSearchableSongArray(episode: string): Promise<string[]> {
    const playlist: SongInformation[] = await getPlaylistFromKUVO(episode);

    const searchQueries: string[] = playlist.map(track => {
        const processedTitle = track.title.replace(/ /g, '+');
        const processedArtist = track.artist.replace(/ /g, '+');
        const processedRelease = track.release.replace(/ /g, '+');

        return `${processedTitle}+${processedArtist}+${processedRelease}`
    });

    return searchQueries;
}


export async function getSpotifyTrackIDs(): Promise<string[]> {
    const token = await getAccessToken();
    const songs = await createSearchableSongArray(episodeUrl);

    const songPromise = songs.map(song => {
        return axios.get(`https://api.spotify.com/v1/search?q=${song}&type=track`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const songID = response.data.tracks.items[0].id
            return `spotify:track:${songID}`
        }).catch(error => {
            console.error('Error: ', error);
        });
    })

    // @ts-ignore
    const uriArray: string[] = await Promise.all(songPromise)

    console.log(uriArray);
    return uriArray;
}
