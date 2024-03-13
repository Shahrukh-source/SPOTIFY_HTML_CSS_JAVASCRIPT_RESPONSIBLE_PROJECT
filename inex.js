let currentSong = new Audio();

function convertSecondsToMinuteSecond(seconds) {
  // Calculate minutes and remaining seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Format minutes and seconds with leading zeros if necessary
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

  // Combine minutes and seconds with a colon
  var formattedTime = formattedMinutes + ":" + formattedSeconds;

  return formattedTime;
}

// Example usage:
var totalSeconds = 72;
var formattedTime = convertSecondsToMinuteSecond(totalSeconds);
console.log(formattedTime); // Output: '01:12'

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

const playMusic = (track, pause = false) => {
  // let audio = new Audio("/songs/" + track);
  currentSong.src = "/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};

async function main() {
  let songs = await getsong();
  playMusic(songs[0], true);
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
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML);
    });
  });
}

play.addEventListener("click", () => {
  if (currentSong.paused) {
    currentSong.play();
    play.src = "pause.svg";
  } else {
    currentSong.pause();
    play.src = "play.svg";
  }
});

currentSong.addEventListener("timeupadate", () => {
  console.log(currentSong.currentTime, currentSong.duration);
  document.querySelector(
    ".songtime"
  ).innerHTML = `${convertSecondsToMinuteSecond(
    currentSong.currentTime
  )}/${convertSecondsToMinuteSecond(currentSong.duration)}
  `;
  document.querySelector(".circle").style.left =
    (currentSong.currentTime / currentSong.duration) * 100 + "%";
});

document.querySelector(".seekbar").addEventListener("click", (e) => {
  let percent =
    (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";
  document.querySelector(".circle").style.left = percent + "%";
  currentSong.currentTime = (currentSong.duration * percent) / 100;
});

document.querySelector(".flex").addEventListener("click", () => {
  document.querySelector(".left").style.left = 0;
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".left").style.left = "-120%"
})
main();
