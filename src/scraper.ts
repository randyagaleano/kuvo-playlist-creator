import axios from "axios";
import "dotenv/config";
import * as cheerio from "cheerio";

async function scrapeSite() {
    // perform an HTTP GET request to the target page
    const baseURL = "https://www.kuvo.org/shows/268585/episodes/10432"
    axios.get(baseURL)
      .then(res => {
        const $ = cheerio.load(res.data)
        $('.card-track_card__DsvKd').each((index, element) => {
        // $('.episode-playlist_list__n3n04').each((index, element) => {
          // const songCard = $(element).find('.card-track_card__DsvKd').text()
          
          const songName = $(element).find('.card-track_topInfo__HiV_p').text()
          const artist = $(element).find('.card-track_artist__JLcd_').text()
          const release = $(element).find('.card-track_release__4pGxo').text()
          
          console.log(`
            Song Name: ${songName}\n
            Arist: ${artist}\n
            Release: ${release}\n
            `);
        })
      }).catch(err => console.log(err));

    
    // const response = await axios.get(baseURL)
    // // get the HTML from the server response
    // // and log it
    // const html = response.data
    // console.log(html)
  }
  
  scrapeSite()

async function getSongNames() {
  
}