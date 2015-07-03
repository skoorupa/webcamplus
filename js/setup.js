// setup.js
// webcam+ by Adam Skorupski

$(document).ready(function(){
   var bckgrnd = Math.floor(Math.random() * 4);
   $("body").css("backgroundImage","url(css/backgrounds/"+bckgrnd+".png)");
   // variables setup
   var siteHeight=$(document).height();
   var siteWidth=$(document).width();
   var titleMargin=siteHeight/2-100;
   
   // setup
   $("#superbar").css("height",siteHeight);
   $("#settings").css("height",siteHeight);
   $("#title").css("marginTop",titleMargin);
   
   $("#update").html(document.lastModified);
});