console.log("hellow");

async function getsongs() {
  let a = await fetch("http://127.0.0.1:5501/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  let data = div.getElementsByTagName("li");
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

async function main() {
  let songs = await getsongs();
  console.log(songs);

  let songUl = document
    .querySelector(".songlist")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML + `<li>
      
      <img src="/music.svg" class="invert" alt="">
                            <div class="info">
                                <div>  ${song.replaceAll("%20", " ")}</div>
                                <div>srk</div>
    
                            </div>
                          <div class="playnow">
                            <div>play Now</div>
                            <img src="play.svg" class="invert" alt="">
                          </div>

    </li>`;
  }

  var audio = new Audio(songs[0]);
  audio.play();
}
main();
