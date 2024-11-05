function init(){
  d=document.createElement("div");
  d.style="width:50vw;hight:50vh;position:fixed;top:10px;left:0px;background:black;color:white;overflow:scroll;";
  document.body.appendChild(d);
  ar=[];
  document.querySelectorAll("meta").forEach((e,i)=>{
    x=e.getAttribute("content");
    if(x!=null && x.includes("http")==true && x.includes("mp4")==true && ar.indexOf(x)==-1){
      console.log(x);
      alert(x);
      d.innerHTML+=`<a href="${x}">link: ${i}</a></br>`;
    }
  })
}
