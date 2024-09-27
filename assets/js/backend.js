
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
  // console.log("abc")
  
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
  // if(window.innerWidth < 668){
  //   left_changing_btn.classList.remove("fa-chevron-left");
  //   left_changing_btn.classList.add("fa-chevron-up")
  //   right_changing_btn.classList.remove("fa-chevron-right");
  //   right_changing_btn.classList.add("fa-chevron-down");
  // }
  // else{
  //   left_changing_btn.classList.remove("fa-chevron-up");
  //   left_changing_btn.classList.add("fa-chevron-left")
  //   right_changing_btn.classList.remove("fa-chevron-down");
  //   right_changing_btn.classList.add("fa-chevron-right");
  // }
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
    artist: "Hưng Cao ft. Khánh x Hoàng AT",
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
var mini_music_player_img = mini_music_player.querySelector('img');
var mini_music_player_control_btn = mini_music_player.querySelector('.control_btn');
var mini_music_player_close_btn = mini_music_player_control_btn.querySelector('.close_btn');
var mini_music_player_play_btn = mini_music_player_control_btn.querySelector('.play_btn');
var music_player_full_scr = $('#music_player');
var cur_song_audio = music_player_full_scr.querySelector("#audio");
var AudioIsRunning = false;
render_music_boxes(0);
/*Playlist changing */

var right_changing_btn = myplaylist.querySelector('.list_changing.right');
var left_changing_btn = myplaylist.querySelector('.list_changing.left');
console.log(left_changing_btn);
var idx = 0;
left_changing_btn.onclick = function() {
  idx--;
  if(idx < 0){
    idx = playlist.length + idx;
  }
  // console.log(idx);
  render_music_boxes(idx);
};
right_changing_btn.onclick = function () {
  idx++;
  if(idx === playlist.length){
    idx = 0;
  }
  // console.log(idx);
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
    music_box_play_btn.onclick = () =>{
      play_audio(cur_idx);
      // render_music_player(cur_idx);
    }
  });
}
/*Play audio*/
function play_audio(cur_idx) {
  if(cur_idx == playlist.length){
    cur_idx = 0;
  }
  if (cur_idx < 0){
    cur_idx = playlist.length - 1;
  }
  var song_audio_path = playlist[cur_idx].path;
  cur_song_audio.src = "./assets" + song_audio_path;
  cur_song_audio.play();
  console.log(music_player_full_scr.style.display);
  
  if(mini_music_player.style.display === 'flex'){
    render_mini_music_player(cur_idx);
  }
  else if(music_player_full_scr.style.display === 'block'){
    console.log("...");
    render_music_player(cur_idx);
  }
  else if(music_player_full_scr.style.display !== 'block' &&
          mini_music_player.style.display !== 'flex'
  ){
    render_music_player(cur_idx);
  }
}
/*Mini music player*/

mini_music_player_img.onclick = () => {
  // console.log(idx);
  mini_music_player.style.display = 'none';
  render_music_player(idx);
}
/*Close mini music player */
mini_music_player_close_btn.onclick = () =>{
  cur_song_audio.pause();
  mini_music_player.style.display = 'none';
};

/*Play/pause on mini music player */

mini_music_player_play_btn.onclick = () => {
  // console.log(mini_music_player_play_btn);
  if(mini_music_player_play_btn.classList[mini_music_player_play_btn.classList.length - 1]==='fa-pause'){
    cur_song_audio.pause();
    mini_music_player_play_btn.classList.remove('fa-pause');
    mini_music_player_play_btn.classList.add('fa-play');
    music_player_full_scr_pause_btn.classList.remove('fa-pause');
    music_player_full_scr_pause_btn.classList.add('fa-play');
  }
  else{
    cur_song_audio.play();
    mini_music_player_play_btn.classList.remove('fa-play');
    mini_music_player_play_btn.classList.add('fa-pause');
    music_player_full_scr_pause_btn.classList.remove('fa-play');
    music_player_full_scr_pause_btn.classList.add('fa-pause');
  }
}
/*Render mini_music_player */
function render_mini_music_player (cur_idx) {
  if(cur_idx == playlist.length){
    cur_idx = 0;
  }
  if (cur_idx < 0){
    cur_idx = playlist.length - 1;
  }
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
/*Music_player_full_scr_close_controller */
music_player_full_scr_list_btn.onclick = () => {

  if(music_player_full_scr_list_btn.classList
    [music_player_full_scr_list_btn.classList.length - 1] !== "light-active"){
    music_player_full_scr_sublist.style.display = 'block';
    music_player_full_scr_list_btn.classList.add('light-active');
    let sub_playlist_content_item = document.querySelector('.sub-playlist-content .list-item');
    if(!sub_playlist_content_item){
      render_sub_playlist();
    }
    active_vinyl(idx);
    var song_sub_playlist = document.querySelectorAll('.sub-playlist-content li');
    song_sub_playlist.forEach((song, sub_idx) => {
      song.onclick = () => {
        play_audio(sub_idx);
        idx = sub_idx;
      }
    })
  }
  else{
    music_player_full_scr_sublist.style.display = 'none';
    music_player_full_scr_list_btn.classList.remove('light-active');
  }
}
function render_sub_playlist () {
  playlist.forEach((song) => {
    var sub_playlist_content = document.querySelector('.sub-playlist-content');
    var newSongHTML = `
        <li class="list-item">
            <div class="img" style="background-image: url('./assets${song.img}')"></div>
            <div class="text_content">
                <h3 class="name height_50_percent ">${song.name}</h3>
                <h4 class="artist height_50_percent">${song.artist}</h4>
            </div>
        </li>
    `
    sub_playlist_content.insertAdjacentHTML('beforeend',newSongHTML);
  })
}
function active_vinyl(cur_idx){
  var active_vinyl = document.querySelector('.list-item .img.active_animation');
  if(active_vinyl !== null){
    active_vinyl.style.transform = `rotate(0deg)`
    active_vinyl.classList.remove('active_animation');
  }
  var vinyls = document.querySelectorAll('.list-item .img');
  vinyls[cur_idx].classList.add('active_animation');
  // console.log(vinyls);
}
music_player_full_scr_minimize_btn.onclick = () => {
  var cur_idx_music_player_full_scr = music_player_full_scr.classList[music_player_full_scr.classList.length - 1];
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
/*Music_player_full_scr_controller */
music_player_full_scr_pause_btn.onclick = () =>{
  // console.log(music_player_full_scr_pause_btn.classList);
  var active_vinyl = document.querySelector('.list-item .img.active_animation');
  if(music_player_full_scr_pause_btn.classList[music_player_full_scr_pause_btn.classList.length - 1]==='fa-pause'){
    cur_song_audio.pause();
    music_player_full_scr_pause_btn.classList.remove('fa-pause');
    music_player_full_scr_pause_btn.classList.add('fa-play');
    if(active_vinyl !== null){
      active_vinyl.style.animationPlayState = 'paused';
    }
  }
  else{
    cur_song_audio.play();
    music_player_full_scr_pause_btn.classList.remove('fa-play');
    music_player_full_scr_pause_btn.classList.add('fa-pause');
    if(active_vinyl !== null){
      active_vinyl.style.animationPlayState = 'running';
    }
  }
}
// console.log(light_active);
// console
function render_music_player(cur_idx){
  console.log(cur_idx);
  if(cur_idx == playlist.length){
    cur_idx = 0;
  }
  if (cur_idx < 0){
    cur_idx = playlist.length - 1;
  }
  if(music_player_full_scr_sublist.style.display === 'block'){
    active_vinyl(cur_idx);
  }
  // console.log(playlist[cur_idx]);
    slider.style.display = "none";
    page_contents.style.display = "none";
    sunset_img.style.display = "none";
    footer.style.display = "none";
    music_player_full_scr.style.display = 'block';
  if(music_player_full_scr_pause_btn.classList[music_player_full_scr_pause_btn.classList.length - 1]==='fa-play'){
    music_player_full_scr_pause_btn.classList.remove('fa-play');
    music_player_full_scr_pause_btn.classList.add('fa-pause');
  }
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
  music_player_full_scr_changing_forward_btn.onclick = () => {
    idx = ++cur_idx;
    play_audio(idx);
    // render_music_player(idx);
  }
  music_player_full_scr_changing_backward_btn.onclick = () => {
    idx = cur_idx - 1; 
    play_audio(idx);
    // render_music_player(idx);
  }
  boxWidth = progress_line_box.offsetWidth - 4; // Get the width of the progress bar container 
}
function music_player_full_scr_mode(cur_idx){
  // console.log(cur_idx);
  if(isReplay === true && isShuffle === false){
    // console.log("replay");
    cur_song_audio.onended = () => {
      
      idx = cur_idx; 
      play_audio(cur_idx);
    }
  }
  else if(isReplay === false && isShuffle === true){
    var old_cur_idx = cur_idx;
    do {
      cur_idx = Math.floor(Math.random() * playlist.length); // Generate a random index
    } while (old_cur_idx === cur_idx);
    // console.log("shuffle " + cur_idx);
    cur_song_audio.onended = () => {
     
      idx = cur_idx; 
      play_audio(cur_idx);
    }
  }
  else if(isReplay === true && isShuffle === true){
    // console.log("shuffle n replay");
    cur_song_audio.onended = () => {
      cur_song_audio.play();
      var old_cur_idx = cur_idx;
      do {
        cur_idx = Math.floor(Math.random() * playlist.length); // Generate a random index
      } while (old_cur_idx === cur_idx);
      // console.log("shuffle n replay " + cur_idx);
      cur_song_audio.onended = () => {
       
        idx = cur_idx; 
        play_audio(cur_idx);
      }
    }
  }
  else{
    // console.log("sequentially")
    cur_idx++;
    cur_song_audio.onended = () => {
      
      idx = cur_idx; 
      play_audio(cur_idx);  
    }
  }
}
/*Progress-line */
var progress_line_box = document.querySelector('.progress-line-box');
var progress_line = document.querySelector('.progress-line');
var progress_dot = document.querySelector('.progress-dot');
var timePassed = document.querySelector('.time-passed');
var timeTotal = document.querySelector('.time-total');
var boxWidth = progress_line_box.offsetWidth - 4;
// console.log(progress_line_box);
// Set initial width of progress line and position of progress dot
progress_line.style.width = '0px';
progress_dot.style.left = '0px';

var isDragging = false; // Flag to track dragging state
// Update total duration display when cur_song_audio metadata is loaded
cur_song_audio.onloadedmetadata = function() {
    var duration = cur_song_audio.duration;
    timeTotal.textContent = formatTime(duration);
};

// Update progress line and time display as cur_song_audio plays
cur_song_audio.ontimeupdate = function() {
    if (!isDragging) {
        var currentTime = cur_song_audio.currentTime;
        var duration = cur_song_audio.duration;
        var percentage = currentTime / duration;
        var cur_width = boxWidth * percentage;
        // console.log(percentage);
        // console.log(cur_width);
        progress_line.style.width = cur_width + "px";
        progress_dot.style.left = cur_width + "px";
        timePassed.textContent = formatTime(currentTime);
    }
    var active_vinyl = document.querySelector('.list-item .img.active_animation');
    if(active_vinyl){
      var cur_angle = 16 * 360 * (cur_song_audio.currentTime / cur_song_audio.duration);
      // console.log(cur_angle);
      active_vinyl.style.transform = `rotate(${cur_angle}deg)`
    }
};

// Format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to update the progress line width and seek cur_song_audio position
function updateProgressLine(event) {
    var rect = progress_line_box.getBoundingClientRect();
    var x = event.clientX - rect.left; // Calculate x relative to the container
    // Ensure x does not exceed the width of the container
    if (x >= boxWidth) {
        x = boxWidth;
    }

    // Calculate the new time and update cur_song_audio
    var newTime_percent = x / boxWidth;
    // console.log(newTime_percent); // Set the new current time for the cur_song_audio
    // console.log(x);
    // console.log(boxWidth);
    newTime = cur_song_audio.duration * newTime_percent;
    cur_song_audio.currentTime = newTime;
    // Update the width of the progress line and position of the dot
    progress_line.style.width = x + "px";
    progress_dot.style.left = x + "px";
    
    timePassed.textContent = formatTime(newTime);
}
window.onresize = () => {
    boxWidth = progress_line_box.offsetWidth - 4;
    // console.log(boxWidth);
    progress_line.style.width = boxWidth * (cur_song_audio.currentTime / cur_song_audio.duration) + "px";
    progress_dot.style.left = boxWidth * (cur_song_audio.currentTime / cur_song_audio.duration) + "px";
}
// Handle mousedown event on progress_line_box to start dragging
progress_line_box.addEventListener('mousedown', function(event) {
    isDragging = true; // Set dragging flag to true
    updateProgressLine(event); // Update progress line on initial click
});

// Handle mousemove event on progress_line_box to continue dragging
progress_line_box.addEventListener('mousemove', function(event) {
    if (isDragging) { // Only update if dragging
        updateProgressLine(event);
    }
});

// Handle mouseup event on progress_line_box to stop dragging
document.addEventListener('mouseup', function() {
    isDragging = false; // Set dragging flag to false
});

// Handle mouseleave event on progress_line_box to stop dragging when mouse leaves the box
// progress_line_box.addEventListener('mouseleave', function() {
//     isDragging = false; // Set dragging flag to false
// });

/*Send email */
let name_field = document.querySelector('.contact_box.message .Guest_name');
let email_field = document.querySelector('.contact_box.message .Guest_email');
let message_field = document.querySelector('.contact_box.message .Guest_message'); 
function send_email() {
  // Kiểm tra nếu trình duyệt hỗ trợ Geolocation API
 
  if (navigator.geolocation) {
    // Lấy vị trí hiện tại với hàm callback lỗi
    navigator.geolocation.getCurrentPosition(
      function (position) { // Hàm callback khi lấy vị trí thành công
        let message_cell = {
          name: name_field.value,
          email: email_field.value,
          message: message_field.value,
          Lat: position.coords.latitude,
          Long: position.coords.longitude,
        };
        console.log(message_cell);
        if(message_cell.name === '' 
          || message_cell.email === ''
          || message_cell.message === ''
        ){
          toast_notif("FAILED!","All the field must be filled!","error");
        }
        // Gửi email
        else{
          emailjs
            .send("service_b9kuwgs", "template_d8pz6ey", message_cell)
            .then(
              function (response) {
                // console.log("SUCCESS!", response.status, response.text);
                toast_notif("SUCCESS!", "Your message've been sent successfully!", "success");
                name_field.value = '';
                email_field.value = '';
                message_field.value = '';
              },
              function (error) {
                // console.log("FAILED...", error);
                toast_notif("FAILED!", "Error!", "error");
              }
            );
        }
      },
      function (error) { // Hàm callback khi có lỗi
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast_notif("FAILED!","Permission to position've been denied!", "error");
            break;
          case error.POSITION_UNAVAILABLE:
            toast_notif("FAILED!", "Position is unavailable!", "error");
            break;
          case error.TIMEOUT:
            toast_notif("FAILED!","Request time out!", "error");
            break;
          case error.UNKNOWN_ERROR:
            toast_notif("FAILED!","Unknown error!", "error");
            break;
        }
      }
    );
  } else {
    toast_notif("FAILED!","Your brownser doesn't support Geolocation.", "error");
  }
}
function toast_notif(title, notif, type, duration = 3500){
  var toast_container = document.querySelector('.toasts');
  var toast = document.createElement('div'); // Tạo thẻ toast bằng createElement
  toast.className = `toast toast__${type}`; //all type = {error, success}
  
  toast.innerHTML = `
    <div class="toast_icon">
      <i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i>
    </div>
    <div class="toast_body">
      <h3 class="toast_title">${title}</h3>
      <p class="toast_message">${notif}</p>
    </div>
    <div class="toast_close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;
  
  // Thêm vào container
  toast_container.appendChild(toast);

  // Sau 3 giây, xóa thẻ toast đi
  setTimeout(() => {
    toast.remove(); // Xóa thẻ toast
  }, duration);
  
  // Thêm sự kiện để xóa toast khi click vào nút đóng
  const closeButton = toast.querySelector('.toast_close');
  closeButton.onclick = () => {
    toast.remove();
  };
}

const submit_email_btn = document.querySelector('.submit_btn');
// console.log(submit_email_btn);
submit_email_btn.onclick = () => send_email();


/*validator */

function Validator(option){
  var formElement = document.querySelector(option.form);
  console.log(formElement);
  option.rules.forEach(function(rule) {
      // console.log(rule);
      var inputDiv = formElement.querySelector(rule.selector);
      var inputElement = inputDiv.querySelector('textarea');
      const const_placeholder = inputElement.placeholder;
      if(inputElement){
          inputElement.onblur = () => {
              // console.log('blur ' + inputElement.value);
              var errorMessage = rule.condition(inputElement.value);
              if(errorMessage){
                  inputDiv.classList.add('invalid');
                  console.log(inputDiv.classList);
                  console.log(inputDiv);
                  inputElement.placeholder = errorMessage;
                  inputElement.value = '';
              }
          }
          inputElement.onmousedown = () => {
              var invalid_input_div = formElement.querySelector(rule.selector + '.invalid')
              console.log(invalid_input_div);
              if(invalid_input_div){
                  invalid_input_div.classList.remove('invalid');
                  inputElement.placeholder = const_placeholder;
              }
          }
      }
      
  });
}

Validator.isRequired = (selector, errorMessage = 'Please fill this blank') => {
  return{
      selector: selector,
      condition: function(value) {
          return value ? undefined : errorMessage;
      }
  }
}

Validator.isEmail = (selector, errorMessage) => {
  return{
      selector: selector,
      condition: function(value) {
          var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          return regex.test(value) ? undefined : errorMessage;
      }
  }
}
Validator.MaxLength = (selector, length ,errorMessage) => {
  return{
    selector: selector,
    condition: function(value){
      return value.length >= length ? toast_notif(`Error!`,`Chỉ nhập tối đa ${length} kí tự`, "error") : undefined
    }
  }
}
/*char counter */
let char_counter = $('.char_count');
message_field.oninput = function() {
  char_counter.innerText = `${this.value.length}/1000`;
  if(this.value.length === 1000){
    char_counter.style.color = `#ff0000`;
  }
  else{
    char_counter.style.color = `#aaa`;
  }
} 
// console.log(char_counter);
