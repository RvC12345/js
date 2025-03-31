const RxPlayer=(()=>{
  let n,e,t={};
  const o={zoom:!0};
  let i,a=!1;
  let ResumeTime = 300;
  function s(){
    const{video:n,currentTime:e,duration:o,progressBar:i}=t;
    e.textContent=c(n.currentTime),
    o.textContent=c(n.duration),
    i.style.width=n.currentTime/n.duration*100+"%",
    
    function(){
      const{video:n}=t,
      e={
        src:n.src,
        poster:n.poster,
        ctime:n.currentTime
      };
      localStorage.setItem("RxPlayerH",JSON.stringify(e))
    }()
  }
  
  function r(){
    t.duration.textContent=c(t.video.duration)
  }
  
  function c_old(n){
    const e=Math.floor(n/60),
    t=Math.floor(n%60);
    return`${e}:${t<10?"0":""}${t}`
  }

  function c(seconds) {
    let hh = Math.floor(seconds / 3600);
    let mm = Math.floor((seconds % 3600) / 60);
    let ss = Math.floor(seconds % 60);

    if (hh > 0) {
        return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    } else {
        return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    }
  }
  
  function l(){
    const{video:n,playPauseIcon:e,playPauseIconC:o}=t;
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
  
  function p_old(){
    const{videoPlayer:n,fullscreenIcon:e}=t;
    document.fullscreenElement?(document.exitFullscreen(),e.textContent="fullscreen"):(n.requestFullscreen(),e.textContent="fullscreen_exit")
  }
  
  function p() {
    const { videoPlayer: n, fullscreenIcon: e } = t;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        // Exit full-screen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        e.textContent = "fullscreen";
    } else {
        // Request full-screen mode
        if (n.requestFullscreen) {
            n.requestFullscreen();
        } else if (n.webkitRequestFullscreen) { // Safari
            n.webkitRequestFullscreen();
        } else if (n.msRequestFullscreen) { // IE/Edge
            n.msRequestFullscreen();
        }
        e.textContent = "fullscreen_exit";
    }
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
    clearTimeout(n),n=setTimeout((()=>{i.paused||g()}),3e3)
  }
  
  function g(){
    t.controls.classList.remove("show"),
    t.overlay.classList.remove("show")
  }
  
  function f(){
    d("play_arrow"),t.video.playbackRate=1
  }
  return{
    init:function(n={}){
      const c={...o,...n};
      e=n.zin?n.zin:55550,
      
      function(){
        const n=document.createElement("div");
        n.className="player-container-rx hidden",
        n.innerHTML='<div class="video-player" id="videoPlayer">\n         \x3c!-- <div class="zoom-layer"></div> --\x3e\n         <div class="overlay show">\n         <div class="player-title marquee">\n          <p class="playerTt"></p>\n      </div>\n      <button class="close-btn" onclick="RxPlayer.closePlayer()">×</button>\n       <div class="tap-zone left-zone" >\n              <span onclick="RxPlayer.skip(-10)" class="material-icons skipBs" >replay_10</span>\n      </div>\n      <div class="tap-zone middle-zone">\n           <span onclick="RxPlayer.togglePlayPause()" class="material-icons skipBs" id="playPauseIcon">play_arrow</span>   \n      </div>\n      <div class="tap-zone right-zone" >\n              <span onclick="RxPlayer.skip(10)" class="material-icons skipBs" >forward_10</span>\n      </div>\n    \n    </div>\n    <div class="video-holder">\n       <video id="myVideo" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"></video>\n    </div>\n    <div class="controls show" id="controls-rx">\n      <button onclick="RxPlayer.togglePlayPause()">\n        <span class="material-icons" id="playPauseIcon_c">play_arrow</span>\n      </button>\n      <div class="time" id="currentTime-rx">0:00</div>\n      <div class="progress-container" onclick="RxPlayer.seek(event)">\n        <div class="progress-bar" id="progressBar"></div>\n      </div>\n      <div class="time" id="duration">0:00</div>\n      <button >\n        <span class="material-icons" id="muteIcon">volume_up</span>\n      </button>\n      <button >\n        <span class="material-icons" id="fullscreenIcon">fullscreen</span>\n      </button>\n    </div>\n    </div>',
        document.body.appendChild(n)
      }(),
        
      function(){
        const n=document.createElement("style");
        n.textContent=`
        .marquee {
  width: 100%;
  overflow: hidden;
  background: #121212;
  color: white;
}

.marquee p {
  display: inline-block;
  white-space: nowrap;
  padding-left: 100%;
  animation: marquee-animation 10s linear infinite;
  margin: 0px;
}

@keyframes marquee-animation {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.player-container-rx {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
}

.video-player {
  z-index: 106;
  position: relative;
  width: 100%;
  max-width: 800px;
  background: #181818;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f44336;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
  z-index: 107;
}

.close-btn:hover {
  background: #d32f2f;
}

.video-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

video {
  width: 100vw;
  height: 100vh;
  display: block;
}

.controls {
  display: flex;
  align-items: center;
  background: #000;
  padding: 10px 5px;
  position: absolute;
  bottom: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 107;
}

.controls.show {
  opacity: 1;
}

.controls button {
  background: none;
  color: #fff;
  border: none;
  font-size: 24px;
  margin: 0 5px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.controls button:hover {
  color: #f44336;
}

.time {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
}

.progress-container {
  flex: 1;
  height: 5px;
  background: #333;
  border-radius: 2.5px;
  cursor: pointer;
  margin: 0 10px;
  position: relative;
}

.progress-bar {
  width: 0%;
  height: 100%;
  background: #f44336;
  border-radius: 2.5px;
  position: absolute;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 105;
  display: flex;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay.show {
  opacity: 1;
}

.tap-zone {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  width: 33.3%;
  height: 100%;
}

.zoom-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 106;
}

.tap-zone div {
  width: 15vw;
  height: 10vh;
  background: green;
}

.left-zone {
  left: 0;
}

.right-zone {
  right: 0;
}

.tap-feedback {
  position: absolute;
  color: white;
  font-size: 20px;
  animation: fadeOut 1s ease-in-out;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.skipBs {
  font-size: 40px;
  font-weight: 500;
  color: white;
  padding: 5px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  user-select: none;
}

#playPauseIcon {
  padding: 10px;
}

.player-title {
  position: absolute;
  font-size: 20px;
  font-weight: 900;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  text-align: center;
  width: 100%;
}

.hidden {
  display: none;
}
        `;
        document.head.appendChild(n)
      }(),
      
      function(n){
        t={
          container:document.querySelector(".player-container-rx"),
          video:document.getElementById("myVideo"),
          playPauseIcon:document.getElementById("playPauseIcon"),
          playPauseIconC:document.getElementById("playPauseIcon_c"),
          muteIcon:document.getElementById("muteIcon"),
          fullscreenIcon:document.getElementById("fullscreenIcon"),
          currentTime:document.getElementById("currentTime-rx"),
          duration:document.getElementById("duration"),
          progressBar:document.getElementById("progressBar"),
          progressContainer:document.querySelector(".progress-container"),
          controls:document.getElementById("controls-rx"),
          overlay:document.querySelector(".overlay"),
          videoPlayer:document.getElementById("videoPlayer"),
          playerTitle:document.querySelector(".player-title"),
          playerTitleText:document.querySelector(".playerTt")
        };
        const{
          video:e,
          controls:o,
          overlay:c,
          videoPlayer:d
        }=t;
        
        function y(){
          var{video:n}=t;
          a=!1,i=setTimeout((()=>{
            a=!0,console.log("speed 2"),n.playbackRate=2}),500)
        }
        
        function v(){
          var{video:n}=t;
          clearTimeout(i),a&&(console.log("speed 1"),n.playbackRate=1)
        }
        
        e.addEventListener("timeupdate",s),
        e.addEventListener("loadedmetadata",r),
        e.addEventListener("ended",f),
        e.addEventListener("click",l),
        d.addEventListener("mousedown",y),
          
        d.addEventListener("mouseup",v),
        d.addEventListener("touchstart",y),
        d.addEventListener("touchend",v),
        t.videoPlayer.addEventListener("mousemove",h),
        t.progressContainer.addEventListener("click",m),
        t.muteIcon.addEventListener("click",u),
        t.fullscreenIcon.addEventListener("click",p),
        n.zoom && function(){
          var{overlay:n,video:e}=t;
          let o=1,i=!1,a=0,s=0,r=0,c=0,l=0,d=0;
          function u(n){
            if(i)o=1,r=0,c=0;
            else{
              o=2;
              const t=e.getBoundingClientRect(),
              i=n.changedTouches[0].clientX-t.left,a=n.changedTouches[0].clientY-t.top;r=-(i-t.width/2)*(o-1),c=-(a-t.height/2)*(o-1)}i=!i,m()
          }
          function p(n){
            const e=n[0].pageX-n[1].pageX,t=n[0].pageY-n[1].pageY;return Math.sqrt(e*e+t*t)
          }
          function m(){
            o>=1&&(e.style.transform=`scale(${o}) translate(${r/o}px, ${c/o}px)`)
          }
          n.addEventListener("touchend",(n=>{if(n.touches.length>0)return;const e=(new Date).getTime(),t=e-d;t<300&&t>0&&u(n),d=e})),
          n.addEventListener("touchstart",(n=>{if(2===n.touches.length)l=p(n.touches);else if(1===n.touches.length&&i){const e=n.touches[0];a=e.pageX-r,s=e.pageY-c}})),
          n.addEventListener("touchmove",(n=>{if(2===n.touches.length){const e=p(n.touches),t=e/l;o=Math.min(Math.max(o*t,1),3),l=e,m()}else if(1===n.touches.length&&i){n.preventDefault();const t=n.touches[0];r=t.pageX-a,c=t.pageY-s;const i=(o-1)*e.offsetWidth/2,l=(o-1)*e.offsetHeight/2;r=Math.max(-i,Math.min(i,r)),c=Math.max(-l,Math.min(l,c)),m()}})),
          n.addEventListener("touchend",(n=>{n.touches.length<2&&(l=0)}))}();
        o.addEventListener("mouseleave",g)
      }(c),
        
      function(){
        if(!document.querySelector('link[href*="material-icons"]')){
          const n=document.createElement("link");
          n.rel="stylesheet",
          n.href="https://fonts.googleapis.com/icon?family=Material+Icons",
          document.head.appendChild(n),
          console.log("Google Material Icons added to the document.")
        }
        let n=document.querySelector('meta[name="viewport"]');
        n?n.content.includes("user-scalable=no")?console.log('Meta viewport tag already contains "user-scalable=no".'):(n.content=n.content.replace(/user-scalable\s*=\s*yes|user-scalable\s*=\s*no/gi,"user-scalable=no"),n.content.includes("user-scalable")||(n.content+=", user-scalable=no"),console.log('Meta viewport tag updated with "user-scalable=no".')):(n=document.createElement("meta"),n.name="viewport",n.content="width=device-width, initial-scale=1, user-scalable=no",
                                                                                                                                                                                                                                                                                                                                                                   document.head.appendChild(n),console.log('Meta viewport tag added with "user-scalable=no".'))}(),
        document.body.style.margin="0px"
    },
    
    resume:function(){
      j=localStorage.getItem("RxPlayerH");
      if(j){
        try{
          pj=JSON.parse(j);
          if(pj.ctime>=ResumeTime){
            return pj;
          }else{
            return null
          }
        }catch(ee){
          console.log(`${ee}`);
          return null;
        }
      }else{
        return null;
      }
    },
    
    getlast:function(){
      j=localStorage.getItem("RxPlayerH");
      return j ? JSON.parse(j):null;
    },
    
    load:function({src:n,poster:e="",title:o="",currentTime:ct=0}){
      const{video:i,playerTitle:a,playerTitleText:s}=t;
      i.src=n,
      i.currentTime = ct,
      i.poster=e,
      s.textContent=o,
      a.style.display=o?"block":"none",
      f(),
      function(){
        var{container:n,video:e}=t;
        n.classList.remove("hidden")
      }(),
      i.load(),
      t.currentTime.textContent= ct ? ct:"0:00",
      t.progressBar.style.width="0%"
    },
    
    skip:function(n){
      t.video.currentTime+=n},togglePlayPause:l,seek:m,
    closePlayer:function(){
      var{container:n,video:e}=t;n.classList.add("hidden"),e.paused||e.pause()
    }
  }})();
