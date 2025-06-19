import axios from "axios";
import "dotenv/config";
import * as cheerio from "cheerio";

const episode = "https://www.kuvo.org/shows/268585/episodes/10432"

async function getPlaylist(baseUrl: string): Promise<SongInformation[]> {
  try {
    const res = await axios.get(baseUrl);
    const $ = cheerio.load(res.data);
    const cardTrack = `[class*="card-track`;
  
    const songs = [...$(`${cardTrack}_card"]`)].map(element => ({
      title: $(element).find(`${cardTrack}_topInfo"]`).text().replace(/^.*(AM|PM)/i, ""),
      artist: $(element).find(`${cardTrack}_artist"]`).text(),
      release: $(element).find(`${cardTrack}_release"]`).text().replace(/^.*from/, ""),
    }));
    return songs;
  } catch (error) {
    console.error("Error fetching playlist: ", error);
    throw error;
  }    
}

async function getSongInformation() {
  const playlist: SongInformation[] = await getPlaylist(episode);
  playlist.forEach(async (songs) => {
    console.log(songs.title)
    // search for songs on Spotify API?
  });
}

getSongInformation();

interface SongInformation {
  title: string,
  artist: string,
  release: string
}
