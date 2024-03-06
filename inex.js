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

getsong();

async function main() {
  let songs = await getsong();
  console.log(songs);

  var audio = new Audio(songs[4]);
  audio.play;

  let songul = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songul.innerHTML =
      songul.innerHTML +
      `<li><img src="/music.svg" class="invert" alt="">
    <div class="info">
        <div>song name${song.slice(0, 5).replaceAll("%20", " ").replaceAll("%2", " ")}</div>
      
        <div>srk</div>

    </div>
    <div class="playnow">
        <div>play Now</div>
        <img src="play.svg" class="invert" alt="">
    </div>
</li>`;
  }

  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(audio.duration, audio.currentSrc, audio.currentTime);
    // The duration variable now holds the duration (in seconds) of the audio clip
  });
}

main();
