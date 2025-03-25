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
  
  function c(n){
    const e=Math.floor(n/60),t=Math.floor(n%60);return`${e}:${t<10?"0":""}${t}`
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
        n.className="player-container hidden",
        n.innerHTML='<div class="video-player" id="videoPlayer">\n         \x3c!-- <div class="zoom-layer"></div> --\x3e\n         <div class="overlay show">\n         <div class="player-title marquee">\n          <p class="playerTt"></p>\n      </div>\n      <button class="close-btn" onclick="RxPlayer.closePlayer()">×</button>\n       <div class="tap-zone left-zone" >\n              <span onclick="RxPlayer.skip(-10)" class="material-icons skipBs" >replay_10</span>\n      </div>\n      <div class="tap-zone middle-zone">\n           <span onclick="RxPlayer.togglePlayPause()" class="material-icons skipBs" id="playPauseIcon">play_arrow</span>   \n      </div>\n      <div class="tap-zone right-zone" >\n              <span onclick="RxPlayer.skip(10)" class="material-icons skipBs" >forward_10</span>\n      </div>\n    \n    </div>\n    <div class="video-holder">\n       <video id="myVideo" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"></video>\n    </div>\n    <div class="controls show" id="controls">\n      <button onclick="RxPlayer.togglePlayPause()">\n        <span class="material-icons" id="playPauseIcon_c">play_arrow</span>\n      </button>\n      <div class="time" id="currentTime">0:00</div>\n      <div class="progress-container" onclick="RxPlayer.seek(event)">\n        <div class="progress-bar" id="progressBar"></div>\n      </div>\n      <div class="time" id="duration">0:00</div>\n      <button >\n        <span class="material-icons" id="muteIcon">volume_up</span>\n      </button>\n      <button >\n        <span class="material-icons" id="fullscreenIcon">fullscreen</span>\n      </button>\n    </div>\n    </div>',
        document.body.appendChild(n)
      }(),
        
      function(){
        const n=document.createElement("style");
        n.textContent=`\n    .marquee {\n      width: 100%; /* Full width of the container */\n      overflow: hidden; /* Hide anything outside the container */\n      background: #121212; /* Background color */\n      color: white; /* Text color */\n    }\n    .marquee p {\n      display: inline-block;\n      white-space: nowrap; /* Prevent the text from wrapping */\n      padding-left: 100%; /* Start the text from outside the container */\n      animation: marquee-animation 10s linear infinite; /* Animation of the marquee */\n      margin:0px;\n    }\n\n    @keyframes marquee-animation {\n      0% {\n        transform: translateX(0%); /* Start off-screen to the right */\n      }\n      100% {\n        transform: translateX(-100%); /* Move the text off-screen to the left */\n       }\n    }\n\n    .player-container {\n      z-index:${e};\n      position:fixed;\n      top:0px;\n      left:0px;\n      margin: 0;\n      padding: 0;\n      height: 100%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: #121212;\n    }\n\n    /* Full-screen video player container */\n    .video-player {\n      z-index:${e+6};\n      position: relative;\n      width: 100%;\n      max-width: 800px;\n      background: #181818;\n      border-radius: 8px;\n      overflow: hidden;\n      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);\n    }\n\n    /* Close button */\n    .close-btn {\n      position: absolute;\n      top: 10px;\n      right: 10px;\n      background: #f44336;\n      color: #fff;\n      border: none;\n      border-radius: 50%;\n      width: 30px;\n      height: 30px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 16px;\n      cursor: pointer;\n      outline: none;\n      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n      transition: background 0.3s ease;\n      z-index: ${e+7};\n    }\n\n    .close-btn:hover {\n      background: #d32f2f;\n    }\n    .video-holder{\n        display:flex;\n        justify-content: center;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n    }\n    /* Video element */\n    video {\n      width: 100vw;\n      height: 100vh;\n      display: block;\n      \n    }\n\n    /* Controls container */\n    .controls {\n      display: flex;\n      align-items: center;\n      background: #000;\n      padding: 10px 5px;\n      position: absolute;\n      bottom: 0;\n      width: 100%;\n      opacity: 0;\n      transition: opacity 0.3s ease;\n      z-index: ${e+7};\n    }\n\n    .controls.show {\n      opacity: 1;\n    }\n\n    /* Buttons */\n    .controls button {\n      background: none;\n      color: #fff;\n      border: none;\n      font-size: 24px;\n      margin: 0 5px;\n      cursor: pointer;\n      transition: color 0.3s ease;\n    }\n\n    .controls button:hover {\n      color: #f44336;\n    }\n\n    /* Time display */\n    .time {\n      color: #fff;\n      font-size: 14px;\n      margin-left: 10px;\n      margin-right: 10px;\n    }\n\n    /* Progress bar */\n    .progress-container {\n      flex: 1;\n      height: 5px;\n      background: #333;\n      border-radius: 2.5px;\n      cursor: pointer;\n      margin: 0 10px;\n      position: relative;\n    }\n\n    .progress-bar {\n      width: 0%;\n      height: 100%;\n      background: #f44336;\n      border-radius: 2.5px;\n      position: absolute;\n    }\n    \n    .overlay {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      z-index: ${e+5};\n      display:flex;\n      opacity:0;\n      transition: opacity 0.3s ease;\n    }\n    \n    .overlay.show{\n        opacity:1;\n    }\n\n    .tap-zone {\n      /* position: absolute; */\n      display:flex;\n      justify-content:center;\n      align-items:center;\n      top: 0;\n      bottom: 0;\n      width: 33.3%;\n      height: 100%;\n      /* cursor: pointer; */\n    }\n    .zoom-layer{\n        position: absolute;\n        width:100%;\n        height:100%;\n        top:0px;\n        left:0px;\n        z-index:${e+6};\n    }\n    .tap-zone div{\n        width: 15vw;\n        height: 10vh;\n        background: green;\n        \n        \n    }\n    .left-zone {\n      left: 0;\n    }\n\n    .right-zone {\n      right: 0;\n    }\n\n     .tap-feedback {\n      position: absolute;\n      color: white;\n      font-size: 20px;\n      animation: fadeOut 1s ease-in-out;\n    }\n \n    @keyframes fadeOut {\n      from {\n        opacity: 1;\n      }\n      to {\n        opacity: 0;\n      }\n    }\n    .skipBs{\n        font-size:40px;\n        font-weight:500;\n        color:white;\n        padding:5px;\n        border-radius:50%;\n        /* background: #555; */\n        background:rgba(0, 0, 0, 0.5);\n        user-select: none;\n    }\n    #playPauseIcon{\n        padding:10px;\n    }\n    .player-title{\n        position:absolute;\n        font-size:20px;\n        font-weight:900;\n        color:white;\n        background:rgb(0,0,0,0.5);\n        padding:10px;\n        text-align:center;\n        width:100%;\n    }\n    .hidden{\n        display:none;\n    }\n    `,
        document.head.appendChild(n)
      }(),
      
      function(n){
        t={
          container:document.querySelector(".player-container"),
          video:document.getElementById("myVideo"),
          playPauseIcon:document.getElementById("playPauseIcon"),
          playPauseIconC:document.getElementById("playPauseIcon_c"),
          muteIcon:document.getElementById("muteIcon"),
          fullscreenIcon:document.getElementById("fullscreenIcon"),
          currentTime:document.getElementById("currentTime"),
          duration:document.getElementById("duration"),
          progressBar:document.getElementById("progressBar"),
          progressContainer:document.querySelector(".progress-container"),
          controls:document.getElementById("controls"),
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
