const RxPlayer=(()=>{
  let n,e,t={};
  const o={zoom:!0};
  let i,a=!1;
  function s(){
    const{
      video:n,
      currentTime:e,
      duration:o,
      progressBar:i
    } = t;
    e.textContent=c(n.currentTime),
    o.textContent=c(n.duration),
    i.style.width=n.currentTime/n.duration*100+"%",
    function(){
      const { video:n }=t, e={ src:n.src, 
                               poster:n.poster,
                               ctime:n.currentTime
                             };
      localStorage.setItem("RxPlayerH",JSON.stringify(e))
    }()
  }
  
  function r(){
    t.duration.textContent=c(t.video.duration)
  }
  
  function c(n){
    const e=Math.floor(n/60), t=Math.floor(n%60);
    return`${e}:${t<10?"0":""}${t}`
  }
  
  function l(){
    const {
      video:n,
      playPauseIcon:e,
      playPauseIconC:o
    }=t;
    n.paused?(n.play(),d("pause")):(n.pause(),d("play_arrow"))
  }
  
  function d(n){
    t.playPauseIcon.textContent=n,
    t.playPauseIconC.textContent=n
  }
  
  function u(){
    const{video:n,muteIcon:e}=t;
    n.muted=!n.muted,
    e.textContent=n.muted?"volume_off":"volume_up"
  }
  
  function p(){
    const{videoPlayer:n,fullscreenIcon:e}=t;
    document.fullscreenElement?(document.exitFullscreen(),e.textContent="fullscreen"):(n.requestFullscreen(),e.textContent="fullscreen_exit")
  }
  
  function m(n){
    const{progressContainer:e,video:o}=t,
    i=e.getBoundingClientRect(),
    a=(n.clientX-i.left)/i.width*o.duration;o.currentTime=a
  }
  
  function h(){
    const{controls:e,overlay:o,video:i}=t;
    e.classList.add("show"),
    o.classList.add("show"),
    clearTimeout(n),
    n=setTimeout((()=>{i.paused||g()}),3e3)
  }
  
  function g(){
    t.controls.classList.remove("show"),
    t.overlay.classList.remove("show")
  }
  
  function f(){
    d("play_arrow"),
    t.video.playbackRate=1
  }
  
  return{
    init: function(n={}){
      const c={...o,...n};
      e=n.zin?n.zin:55550,
      
      function(){
        const n=document.createElement("div");
        n.className="player-container hidden",
        n.innerHTML='<div class="video-player" id="videoPlayer">\n         \x3c!-- <div class="zoom-layer"></div> --\x3e\n         <div class="overlay show">\n         <div class="player-title marquee">\n          <p class="playerTt"></p>\n      </div>\n      <button class="close-btn" onclick="RxPlayer.closePlayer()">×</button>\n       <div class="tap-zone left-zone" >\n              <span onclick="RxPlayer.skip(-10)" class="material-icons skipBs" >replay_1
