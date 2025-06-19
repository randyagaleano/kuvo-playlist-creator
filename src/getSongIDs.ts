import { getPlaylistFromKUVO } from "./scraper";
import { SongInformation } from '../interfaces/kuvo';

const episodeUrl = "https://www.kuvo.org/shows/268585/episodes/10432"

async function getSongInformationFromSpotify(episode: string) {
  const playlist: SongInformation[] = await getPlaylistFromKUVO(episode);

  playlist.forEach(async (songs) => {
    console.log(songs.title)
    // search for songs on Spotify API?
  });

  // return song url from spotify if available
}

getSongInformationFromSpotify(episodeUrl);