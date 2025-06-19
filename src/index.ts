// KUVO Jazz Scraper:

const songData: any = [];
const listItems = document.querySelectorAll('ul.episode-playlist_list__n3n04 li');

listItems.forEach(item => {
  const topInfoDiv = item.querySelector('.card-track_topInfo__HiV_p');
  const artistP = item.querySelector('p.card-track_artist__JLcd_');

  let name = '';
  if (topInfoDiv) {
    const pTags = topInfoDiv.querySelectorAll('p');
    if (pTags.length > 1) {
      name = pTags[1].textContent.trim();
    }
  }

  let artist = '';
  if (artistP) {
    artist = artistP.textContent.trim();
  }

  if (name || artist) { // Only add if we found either name or artist
    songData.push({ name: name, artist: artist });
  }
});

const data = { songData };

// {"songData”:[
// {
// "name":"Primos (with Hermanos Gutiérrez)”,
// "artist":"Adrian Quesada”
// },
// {
// "name":"Cumbia Caníbal”,
// "artist":”Eskorzo"
// },
// {"name":"Jaguar","artist":"QUITAPENAS"},{"name":"LAS FURIAS // NOS MIRAN (Tonga Conga Remix)","artist":"MIEL"},{"name":"Rompiendo Ciclos","artist":"Panther Panther!"},{"name":"Te Quedaste Aqui","artist":"Sonora Tukukuy"},{"name":"Masa","artist":"Jarina De Marco"},{"name":"Tu Fuego","artist":"Sonido Desconocido 2"},{"name":"Conocerla - Amantes Del Futuro Edit","artist":"Reyna Tropical"},{"name":"La Danza de la Dana","artist":"Sombra Alor"},{"name":"Tu Boca","artist":"Queralt Lahoz"},{"name":"Asereje - Remix","artist":"MËSTIZA"},{"name":"Kalemba (Wegue Wegue)","artist":"Buraka Som Sistema"},{"name":"HACER TEATRO","artist":"Sila Lua"},{"name":"If You Want Me","artist":"Michi"},{"name":"I Feel Everything","artist":"Ambar Lucid"},{"name":"Sapatinho - Poirier Remix","artist":"Boogát"},{"name":"Drum Machine (feat. Dragon Rojo) - Spanish Version","artist":"Lao Ra"},{"name":"Table For Two","artist":"June Freedom"},{"name":"Lluvia","artist":"mediopicky"},{"name":"Baile Do Stockholm","artist":"Tusabe/Mansa"},{"name":"Fuego en Animaná","artist":"J Güero"},{"name":"Cuando Canto Grito","artist":"Cerrero"},{"name":"Sola","artist":"Arca"},{"name":"It's Just Us","artist":"Kali Uchis"},{"name":"Queen Of The Barrio","artist":"Bobby Oroza"}]}



// With song name and artist name, search for correct song and grab id.

// Search for song
// Get “album” id
// Get Album Tracks
// Get Track ID from Album Tracks (store in array)


// Create Playlist and bulk add song ID’s





// Could post currently playing song from KUVO to Bluesky

// KUVO Jazz Scraper:

// const songData = [];
// const listItems = document.querySelectorAll('ul.episode-playlist_list__n3n04 li');

// listItems.forEach(item => {
//   const topInfoDiv = item.querySelector('.card-track_topInfo__HiV_p');
//   const artistP = item.querySelector('p.card-track_artist__JLcd_');

//   let name = '';
//   if (topInfoDiv) {
//     const pTags = topInfoDiv.querySelectorAll('p');
//     if (pTags.length > 1) {
//       name = pTags[1].textContent.trim();
//     }
//   }

//   let artist = '';
//   if (artistP) {
//     artist = artistP.textContent.trim();
//   }

//   if (name || artist) { // Only add if we found either name or artist
//     songData.push({ name: name, artist: artist });
//   }
// });

// const data = { songData };

// {"songData”:[
// {
// "name":"Primos (with Hermanos Gutiérrez)”,
// "artist":"Adrian Quesada”
// },
// {
// "name":"Cumbia Caníbal”,
// "artist":”Eskorzo"
// },
// {"name":"Jaguar","artist":"QUITAPENAS"},{"name":"LAS FURIAS // NOS MIRAN (Tonga Conga Remix)","artist":"MIEL"},{"name":"Rompiendo Ciclos","artist":"Panther Panther!"},{"name":"Te Quedaste Aqui","artist":"Sonora Tukukuy"},{"name":"Masa","artist":"Jarina De Marco"},{"name":"Tu Fuego","artist":"Sonido Desconocido 2"},{"name":"Conocerla - Amantes Del Futuro Edit","artist":"Reyna Tropical"},{"name":"La Danza de la Dana","artist":"Sombra Alor"},{"name":"Tu Boca","artist":"Queralt Lahoz"},{"name":"Asereje - Remix","artist":"MËSTIZA"},{"name":"Kalemba (Wegue Wegue)","artist":"Buraka Som Sistema"},{"name":"HACER TEATRO","artist":"Sila Lua"},{"name":"If You Want Me","artist":"Michi"},{"name":"I Feel Everything","artist":"Ambar Lucid"},{"name":"Sapatinho - Poirier Remix","artist":"Boogát"},{"name":"Drum Machine (feat. Dragon Rojo) - Spanish Version","artist":"Lao Ra"},{"name":"Table For Two","artist":"June Freedom"},{"name":"Lluvia","artist":"mediopicky"},{"name":"Baile Do Stockholm","artist":"Tusabe/Mansa"},{"name":"Fuego en Animaná","artist":"J Güero"},{"name":"Cuando Canto Grito","artist":"Cerrero"},{"name":"Sola","artist":"Arca"},{"name":"It's Just Us","artist":"Kali Uchis"},{"name":"Queen Of The Barrio","artist":"Bobby Oroza"}]}



// With song name and artist name, search for correct song and grab id.

// Search for song
// Get “album” id
// Get Album Tracks
// Get Track ID from Album Tracks (store in array)


// Create Playlist and bulk add song ID’s





// Could post currently playing song from KUVO to Bluesky

