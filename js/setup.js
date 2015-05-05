// setup.js
// webcam+ by Adam Skorupski

$(document).ready(function(){
   // variables setup
   var siteHeight=$(document).height();
   var siteWidth=$(document).width();
   var titleMargin=siteHeight/2-100;
   
   // setup
   $("#superbar").css("height",siteHeight);
   $("#settings").css("height",siteHeight);
   $("#title").css("marginTop",titleMargin);
});