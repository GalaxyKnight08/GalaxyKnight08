
/*Tab UI*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".sec_3 .tab-item");
const panes = $$(".sec_3 .tab-pane");

var tabActive = $(".sec_3 .tab-item.active");
const line = $(".sec_3 .tabs .line");
var slider = $("#slider");
var page_contents = $("#content");
var footer = $("#footer");
var sunset_img = $(".sunset");
requestIdleCallback(function () {
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
});

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".sec_3 .tab-item.active").classList.remove("active");
    $(".sec_3 .tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    pane.classList.add("active");
    tabActive = $(".sec_3 .tab-item.active");
  };
});
window.addEventListener('resize',() => {
  //console.log("abc")
  
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
  // console.log(tabActive.offsetLeft + "px");
  // console.log(tabActive);
  
  const tab_item_titles = $$(".sec_3 .tab-item p");
  tab_item_titles.forEach((tab_item_title) =>{
    if(window.innerWidth < 572){
      tab_item_title.style.display = "none";
    }
    else{
      tab_item_title.style.display = "block";
    }
  })
  if(window.innerWidth < 668){
    left_changing_btn.classList.remove("fa-chevron-left");
    left_changing_btn.classList.add("fa-chevron-up")
    right_changing_btn.classList.remove("fa-chevron-right");
    right_changing_btn.classList.add("fa-chevron-down");
  }
  else{
    left_changing_btn.classList.remove("fa-chevron-up");
    left_changing_btn.classList.add("fa-chevron-left")
    right_changing_btn.classList.remove("fa-chevron-down");
    right_changing_btn.classList.add("fa-chevron-right");
  }
});

/*Render Tab*/
/*Music player*/
const playlist = [
  {
    name: "Xe độ",
    artist: "Cậu Phát ft. CCMK",
    path: "/music/CẬU PHÁT - Xe Độ ft. CCMK - CHÁY PHỐ 7 TÌNH EP.mp3",
    img: "/music_img/xe độ.jpg" 
  },
  {
    name: "Dám",
    artist: "Hưng Cao ft. Khán x Hoàng AT",
    path: "/music/DÁM - HƯNG CAO ft Khánh x Hoàng AT.mp3",
    img: "/music_img/dám.jpg" 
  },
  {
    name: "Góc nhìn khác",
    artist: "Hazel",
    path:"/music/[DRILLINTHELIFE] 2. GÓC NHÌN KHÁC - HAZEL (Prod. Minh Vũ) - OFFICIAL LYRIC VIDEO.mp3",
    img: "/music_img/góc nhìn khác.jpg" 
  },
  {
    name: "Live while we're young",
    artist: "One Direction",
    path: "/music/One Direction - Live While We're Young (Audio).mp3",
    img: "/music_img/live while we re young.jpg" 
  },
  {
    name: "Souls",
    artist: "Datmaniac",
    path: "/music/Datmaniac - Souls.mp3",
    img: "/music_img/souls-datmaniac.jpg" 
  },
  {
    name: "New World",
    artist: "THIS IS JAPAN",
    path: "/music/THIS IS JAPANnew worldMV.mp3",
    img: "/music_img/no guns life.jpg" 
  }
]

var myplaylist = $('#myplaylist');
var music_boxes = myplaylist.querySelectorAll('.music_box');
var mini_music_player = myplaylist.querySelector('.mini_music_player');
var mini_music_player_control_btn = mini_music_player.querySelector('.control_btn');
var mini_music_player_close_btn = mini_music_player_control_btn.querySelector('.close_btn');
var music_player_full_scr = $('#music_player');
var cur_song_audio = music_player_full_scr.querySelector("audio");
render_music_boxes(0);
/*Playlist changing */

var right_changing_btn = myplaylist.querySelector('.fa-chevron-right');
var left_changing_btn = myplaylist.querySelector('.fa-chevron-left');
var idx = 0;
left_changing_btn.onclick = function() {
  idx--;
  if(idx < 0){
    idx = playlist.length + idx;
  }
  console.log(idx);
  render_music_boxes(idx);
};
right_changing_btn.onclick = function () {
  idx++;
  if(idx === playlist.length){
    idx = 0;
  }
  console.log(idx);
  render_music_boxes(idx);
};
function render_music_boxes(idx){
  for(var i = 0; i < 3; i++){
    var idx_render_music_box = (i+idx) % playlist.length;
    music_boxes[i].innerHTML = `
      <div class="play_btn ${idx_render_music_box}">
        <div style="background-image: url('./assets${playlist[idx_render_music_box].img}')"></div>
        <i class="fa-regular fa-circle-play"></i>
      </div> 
      <h3 class="name">${playlist[idx_render_music_box].name}</h3>
      <h4 class="artist">${playlist[idx_render_music_box].artist}</h4>
    `
    // console.log(playlist[idx_render_music_box].img);
    // console.log(playlist[idx_render_music_box].name);
    // console.log(playlist[idx_render_music_box].artist);
  }
  music_boxes.forEach((music_box) => {
    var music_box_play_btn_wrapper = music_box.querySelector('.play_btn');
    var music_box_play_btn = music_box.querySelector('.play_btn i');
    var cur_idx = music_box_play_btn_wrapper.classList[music_box_play_btn_wrapper.classList.length - 1];
    // console.log(music_box_play_btn);
    music_box_play_btn.onclick = () => render_music_player(cur_idx);
  });
}
/*Mini music player*/


/*Close mini music player */
mini_music_player_close_btn.onclick = () =>{
  cur_song_audio.pause();
  mini_music_player.style.display = 'none';
};
/*Render mini_music_player */
function render_mini_music_player (cur_idx) {
      mini_music_player.style.display = 'flex';
      // console.log(playlist[cur_idx]);
      var name = playlist[cur_idx].name;
      var artist = playlist[cur_idx].artist;
      var img_url = playlist[cur_idx].img;
      mini_music_player.querySelector('.name').innerText = name;
      mini_music_player.querySelector('.artist').innerText = artist;
      mini_music_player.querySelector('img').src = './assets' + img_url;
};
/*Music player full scr*/
var music_player_full_scr_close_controller = music_player_full_scr.querySelector('.close_btn');
var music_player_full_scr_close_btn = music_player_full_scr_close_controller.querySelector('.fa-xmark');
var music_player_full_scr_minimize_btn = music_player_full_scr_close_controller.querySelector('.fa-chevron-down');
var music_player_full_scr_controller = music_player_full_scr.querySelector('.controller');
var music_player_full_scr_pause_btn = music_player_full_scr_controller.querySelector('.fa-pause');
var music_player_full_scr_changing_backward_btn = music_player_full_scr_controller.querySelector('.fa-backward-step');
var music_player_full_scr_changing_forward_btn = music_player_full_scr_controller.querySelector('.fa-forward-step');
var music_player_full_scr_replay_btn = music_player_full_scr_controller.querySelector('.fa-repeat');
var music_player_full_scr_shuffle_btn = music_player_full_scr_controller.querySelector('.fa-shuffle');
var music_player_full_scr_list_btn = music_player_full_scr_controller.querySelector('.fa-list-ul');
var music_player_full_scr_sublist = music_player_full_scr.querySelector('.sub-playlist');
var isShuffle = false;
var isReplay = false;
music_player_full_scr_list_btn.onclick = () => {
  music_player_full_scr_sublist.style.display = 'block';
}
// console.log(music_player_full_scr_minimize_btn);
music_player_full_scr_minimize_btn.onclick = () => {
  // console.log(music_player_full_scr.classList);
  var cur_idx_music_player_full_scr = music_player_full_scr.classList[music_player_full_scr.classList.length - 1];
  // console.log(cur_idx_music_player_full_scr);
  slider.style.display = "block";
  page_contents.style.display = "block";
  sunset_img.style.display = "block";
  footer.style.display = "block";
  render_mini_music_player(cur_idx_music_player_full_scr);
  music_player_full_scr.style.display = 'none';
}
music_player_full_scr_close_btn.onclick = () => {
  slider.style.display = "block";
  page_contents.style.display = "block";
  sunset_img.style.display = "block";
  footer.style.display = "block";
  cur_song_audio.pause();
  music_player_full_scr.style.display = 'none';
}
music_player_full_scr_pause_btn.onclick = () =>{
  console.log(music_player_full_scr_pause_btn.classList);
  if(music_player_full_scr_pause_btn.classList[music_player_full_scr_pause_btn.classList.length - 1]==='fa-pause'){
    cur_song_audio.pause();
    music_player_full_scr_pause_btn.classList.remove('fa-pause');
    music_player_full_scr_pause_btn.classList.add('fa-play');
  }
  else{
    cur_song_audio.play();
    music_player_full_scr_pause_btn.classList.remove('fa-play');
    music_player_full_scr_pause_btn.classList.add('fa-pause');
  }
}
// console.log(light_active);

function render_music_player(cur_idx){

  if(cur_idx == playlist.length){
    cur_idx = 0;
  }
  if (cur_idx < 0){
    cur_idx = playlist.length - 1;
  }

  console.log(playlist[cur_idx]);
  slider.style.display = "none";
  page_contents.style.display = "none";
  sunset_img.style.display = "none";
  footer.style.display = "none";
  //console.log(cur_song_audio);
  var song_audio_path = playlist[cur_idx].path;
  cur_song_audio.src = "./assets" + song_audio_path;
  cur_song_audio.play();
  if(music_player_full_scr_pause_btn.classList[music_player_full_scr_pause_btn.classList.length - 1]==='fa-play'){
    music_player_full_scr_pause_btn.classList.remove('fa-play');
    music_player_full_scr_pause_btn.classList.add('fa-pause');
  }
  mini_music_player.style.display = 'none';
  music_player_full_scr.style.display = 'block';
  var name = playlist[cur_idx].name;
  var artist = playlist[cur_idx].artist;
  var img_url = playlist[cur_idx].img;
  if(!isNaN(music_player_full_scr.classList[music_player_full_scr.classList.length -1])){
    music_player_full_scr.classList.remove(music_player_full_scr.classList[music_player_full_scr.classList.length -1]);
  }
  music_player_full_scr.classList.add(`${cur_idx}`);
  music_player_full_scr.querySelector('.info .info_text').innerText = name + ' - ' +artist;
  // console.log(music_player_full_scr.querySelector('.img'));
  music_player_full_scr.querySelector('.img').style.backgroundImage = `url('./assets${img_url}')`;
  music_player_full_scr_shuffle_btn.onclick = () => {
    if(!isShuffle){
      music_player_full_scr_shuffle_btn.classList.add('light-active');
      isShuffle = true;
    }
    else{
      music_player_full_scr_shuffle_btn.classList.remove('light-active');
      isShuffle = false;
    }
    music_player_full_scr_mode(cur_idx);
  }
  music_player_full_scr_replay_btn .onclick = () => {
    if(!isReplay){
      music_player_full_scr_replay_btn.classList.add('light-active');
      isReplay = true;
    }
    else{
      music_player_full_scr_replay_btn.classList.remove('light-active');
      isReplay = false;
    }
    music_player_full_scr_mode(cur_idx);
  }  
  music_player_full_scr_mode(cur_idx);
  //cur_idx++;
  music_player_full_scr_changing_forward_btn.onclick = () => render_music_player(++cur_idx);
  music_player_full_scr_changing_backward_btn.onclick = () => render_music_player(cur_idx - 1);

}
function music_player_full_scr_mode(cur_idx){
  console.log(cur_idx);
  if(isReplay === true && isShuffle === false){
    console.log("replay");
    cur_song_audio.onended = () => render_music_player(cur_idx)
  }
  else if(isReplay === false && isShuffle === true){
    var old_cur_idx = cur_idx;
    do {
      cur_idx = Math.floor(Math.random() * playlist.length); // Generate a random index
    } while (old_cur_idx === cur_idx);
    console.log("shuffle " + cur_idx);
    cur_song_audio.onended = () => render_music_player(cur_idx);
  }
  else if(isReplay === true && isShuffle === true){
    console.log("shuffle n replay");
    cur_song_audio.onended = () => {
      cur_song_audio.play();
      var old_cur_idx = cur_idx;
      do {
        cur_idx = Math.floor(Math.random() * playlist.length); // Generate a random index
      } while (old_cur_idx === cur_idx);
      console.log("shuffle n replay " + cur_idx);
      cur_song_audio.onended = () => render_music_player(cur_idx);
    }
  }
  else{
    console.log("sequentially")
    cur_idx++;
    cur_song_audio.onended = () => render_music_player(cur_idx)
  }
}
/*Play music */

/*Close  */
/*Shuffle */
