import axios from "axios";
import "dotenv/config";
import * as cheerio from "cheerio";

async function scrapeSite() {
    // perform an HTTP GET request to the target page
    const baseURL = "https://www.kuvo.org/shows/268585/episodes/10432"
    axios.get(baseURL)
      .then(res => {
        const $ = cheerio.load(res.data)

        const cardTrack = `[class*="card-track`

        $(`${cardTrack}_card"]`).each((index, element) => {
          const songName = $(element).find(`${cardTrack}_topInfo"]`).text().replace(/^.*(AM|PM)/i, "");
          const artist = $(element).find(`${cardTrack}_artist"]`).text()
          const release = $(element).find(`${cardTrack}_release"]`).text()
          
          console.log(`
            Song Name: ${songName}
            Arist: ${artist}
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