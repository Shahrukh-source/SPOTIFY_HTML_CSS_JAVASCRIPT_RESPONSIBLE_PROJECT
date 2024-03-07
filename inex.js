async function getsong() {
  let a = await fetch("http://127.0.0.1:5501/songs");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;

  let data = div.getElementsByTagName("a");
  console.log(data);
  let songs = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }

  return songs;
}

const playMusic = (track) => {
  let audio = new Audio("/songs/" + track);
  audio.play();
};

async function main() {
  let currentSong;
  let songs = await getsong();
  console.log(songs);

  // var audio = new Audio(songs[3]);
  // audio.play;

  let songul = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songul.innerHTML =
      songul.innerHTML +
      `<li><img src="/music.svg" class="invert" alt="">
    <div class="info">
        <div>song name${song.slice(0, 5).replaceAll("%20", " ")}</div>
      
        <div>srk</div>

    </div>
    <div class="playnow">
        <div>play Now</div>
        <img src="play.svg" class="invert" alt="">
    </div>
</li>`;
  }

  Array.from(
    document.querySelector(".songlist").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click",element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML);
    });
    
  });
}
//   audio.addEventListener("loadeddata", () => {
//     let duration = audio.duration;
//     console.log(audio.duration, audio.currentSrc, audio.currentTime);
//     // The duration variable now holds the duration (in seconds) of the audio clip
//   });

// add event listner

main();
// playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
