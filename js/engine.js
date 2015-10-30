// engine.js
// for Webcam+
// developed by Adam Skorupski
// under the MIT License

// <3

$(document).ready(function(){
   // cross-browser getUserMedia
   navigator.UserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
   
   $("#zacznij-button").click(function(){ // start and run getUserMedia
      function complete(){
         $("#screen2").fadeIn(1000);
         waitingForStream=true;
         getStream();
         
         $(window).blur(function(){
            if(waitingForStream) getStream();
         });
      }
      $("#screen1").fadeOut(1000, complete);
   });
   
   cameraButton = $("#camera-button");
   cameraIcon   = $("#przyciskAparat");
   cameraCount  = $("#numerOdliczania");
   
   cameraButton.click(odliczanie); // on click it's counting
   
   $("#menuclick").click(function(){ // show settings
      $("#superbar").hide("drop",function(){
         $("#settings").show("drop");
      });
   });
   
   $(".navbar > i").click(function(){ // hide settings
      $("#settings").hide("drop",function(){
         $("#superbar").show("drop");
      });
   });
   
   c = $("#canvas");
   ctx = c[0].getContext('2d');
   
   previewIMG = $("#preview");
   $("#kolor").val("black");
   
   img = $("#preview")[0]; 
   $("input[type=checkbox]")[0].checked = true;
   
   watC = $("#watermarkCount");
});

function getStream(){
   if(navigator.UserMedia){
     navigator.UserMedia({video:true},function(stream){ // chcemy video w postaci stream
        waitingForStream=false;
        $("#screen3").hide();

        $("#screen2").fadeOut(1000, function(){
           $("#screen4").fadeIn(1000);
        });
        $("#video").attr("height","auto");
        $("#video").attr("width","auto");
        
        if(location.search!="?testmode") $("#video").attr("src",window.URL.createObjectURL(stream)); // wirtualny atrybut src dla video
        $("#video")[0].play(); // włączamy
        $("#video").attr("onclick","poo()");
        $("#scr0").hide();
        $("#scr4").show();
     },function(){
        // error
        waitingForStream=false;
        $("#screen2").fadeOut(1000, function(){
           $("#screen3").fadeIn(1000);
        });      
     });
  } else {
     alert("Niestety, twoja przeglądarka nie obsługuje navigator.getUserMedia");
     waitingForStream=false;
  }
  if(location.search=="?testmode"){
    waitingForStream=false;
    $("#screen3").hide();

    $("#screen2").fadeOut(1000, function(){
       $("#screen4").fadeIn(1000);
    });
    $("#video").attr("height","auto");
    $("#video").attr("width","auto");
    
    if(location.search!="?testmode") $("#video").attr("src",window.URL.createObjectURL(stream)); // wirtualny atrybut src dla video
    $("#video")[0].play(); // włączamy
    $("#video").attr("onclick","poo()");
    $("#scr0").hide();
    $("#scr4").show();
  }
}

var color="black";
var penSize=5;

var url,link,t,
    count = 3;// globalne zmienne, DO BOJU   
    
var counting=false;

var znakwodny = true;
  
function odliczanie(){
  counting=true;
  cameraButton.removeAttr("onclick","odliczanie()");
  cameraIcon.hide();
  cameraCount.show();
  $("#video").removeAttr("onclick","poo()");
  if(count>0){
    cameraCount.text(count);
    count--;
    setTimeout(odliczanie,1000);
  } else {
    cameraIcon.show();
    cameraCount.hide();
    count=3;
    $("#samowyzwalacz").val(3);
    cameraButton.attr("onclick","odliczanie()");
    $("#video").attr("onclick","poo()");
    counting=false;
    poo();
  }
}

function poo(){
  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
  clickSize = [];

  historia = new Array();
  historiaNumber = 0;
  
  $("#size").val(5); penSize = 5;
  $("#kolor").val("black"); color = "black";
  
  $("#screen4").fadeOut(1000, function(){
     $("#screen5").fadeIn(1000);
  });
  $("#scr4").hide();
  $("#scr5").show();
  $("#superbar").hide("drop",function(){
    $("#settings").show("drop");
  });
  
  c[0].width = document.querySelector("#video").videoWidth;
  c[0].height = document.querySelector("#video").videoHeight; // szerokosc i wysokosc canvasu = video
  
  if(location.search=="?testmode"){
    c[0].width = "640";
    c[0].height = "400";
  }

  wzdj = c[0].width; 
  hzdj = c[0].height; 
  
  ctx.drawImage(document.querySelector("#video"),0,0); // malujemy obraz
  if(location.search=="?testmode"){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,640,100);
    ctx.fillStyle="gray";
    ctx.fillRect(0,100,640,200);
    ctx.fillStyle="white";
    ctx.fillRect(0,200,640,300);
    ctx.fillStyle="red";
    ctx.fillRect(0,300,640,400);
  } 
  
  historia[historiaNumber] = c[0].toDataURL('image/png');
}
console.log("A kto ci tu pozwolił wchodzić? :D"); // fun

function menuedycja(v){
  switch(v){
    case "cofnij":
      back();
      break;
    case "ponow":
      prev();
      break;
  }

  $("#menuedycja").val("blank");
}

// rysowanie

var clickX = [];
var clickY = [];
var clickDrag = [];
var clickColor = [];
var clickSize = [];
var paint;

var historia = new Array();
var historiaNumber = 0;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(color);
  clickSize.push(penSize);
}

$(document).ready(function(){
   $('#canvas').mousedown(function(e){
      var mouseX = e.pageX - c[0].offsetLeft - $("#screen")[0].offsetLeft;
      var mouseY = e.pageY - c[0].offsetTop - $("#screen")[0].offsetTop;
            
      paint = true;
      addClick(e.pageX - c[0].offsetLeft - $("#screen")[0].offsetLeft, e.pageY - c[0].offsetTop - $("#screen")[0].offsetTop);
      redraw();
   });
   
   $('#canvas').mousemove(function(e){
      if(paint){
         addClick(e.pageX - c[0].offsetLeft - $("#screen")[0].offsetLeft, e.pageY - c[0].offsetTop - $("#screen")[0].offsetTop, true);
         redraw();
      }
   });
   
   $('#canvas').mouseup(function(e){
      paint = false;

      historiaNumber++;
      historia[historiaNumber] = c[0].toDataURL('image/png');

      if(historiaNumber<historia.length) historia.splice(historiaNumber+1,historia.length);

      clickX = [];
      clickY = [];
      clickDrag = [];
      clickColor = [];
      clickSize = [];

      console.log(historia.length + "<- l, up, hN ->" + historiaNumber);
   });
   
   $('#canvas').mouseleave(function(e){
      paint = false;
   });
});

function back(){
  if(historiaNumber>0){
    historiaNumber--;
  
    var historiaimg = new Image();
    historiaimg.setAttribute("src",historia[historiaNumber]);
    ctx.drawImage(historiaimg,0,0);
    console.log(historia.length + "<- l, back, hN ->" + historiaNumber);
  }
}

function prev(){
  if(historiaNumber!=historia.length-1){
    historiaNumber++;
  
    var historiaimg = new Image();
    historiaimg.setAttribute("src",historia[historiaNumber]);
    ctx.drawImage(historiaimg,0,0);
    console.log(historia.length + "<- l, prev, hN ->" + historiaNumber);
  }
}

function redraw(){ 
  ctx.lineJoin = "round";
			
  for(var i=0; i < clickX.length; i++) {		
    ctx.beginPath();
    if(clickDrag[i] && i){
      ctx.moveTo(clickX[i-1], clickY[i-1]);
     } else {
       ctx.moveTo(clickX[i]-1, clickY[i]);
     }
     ctx.lineTo(clickX[i], clickY[i]);
     ctx.closePath();
     ctx.strokeStyle = clickColor[i];
     ctx.lineWidth = clickSize[i];
     ctx.stroke();
  }
}

var waiting = false;

function convert(){
   if(!waiting){
      $("#kolor").val("black");   
      napiszrodlo = new Image();
      napiszrodlo.src = "zrodlo.png";
      napiszrodlo.onload = function() {
         if(znakwodny)
            ctx.drawImage(napiszrodlo,hzdj-100,wzdj-190);
      
         url = c[0].toDataURL('image/png');
         
         img.setAttribute("src",url);
      
         link = document.querySelector("#pobierz"); 
         link.setAttribute('href',url); 
         
         if(znakwodny){
            $("#scr5").hide();
            $("#scr0").show();
            $("#settings").hide("drop",function(){
               $("#superbar").show("drop");
            });
            $("#screen5").fadeOut(1000, function(){
               $("#screen6").fadeIn(1000);
            });
         } else {
            countW = 15;
            waiting = true;
            koniec();
         }
      };
   }
}

function koniec(){
   if(countW>0&&waiting){
      watC.text(countW);
      countW--;
      setTimeout(koniec,1000);
   } else {
      countW = 0;
      watC.text("");
      
      if(waiting){
         $("#scr5").hide();
         $("#scr0").show();
         $("#settings").hide("drop",function(){
            $("#superbar").show("drop");
         });
         $("#screen5").fadeOut(1000, function(){
            $("#screen6").fadeIn(1000);
         });
      }
      waiting=false;
   }
}

function znowu(){
   $("#scr0").hide();
   $("#scr4").show();
   $("#settings").hide("drop",function(){
     $("#superbar").show("drop");
   });
   $("#screen6").fadeOut(1000, function(){
     $("#screen4").fadeIn(1000);
   });
}

function wroc(){
   waiting = false;
   $("#scr5").hide();
   $("#scr4").show();
   $("#settings").hide("drop",function(){
     $("#superbar").show("drop");
   });
   $("#screen5").fadeOut(1000, function(){
     $("#screen4").fadeIn(1000);
   });
}

function zmienznak(checkbox){
   if(!checkbox.checked){
      alert("Bardzo mi przykro, że nie chcesz wspierać Webcam+ :(\nJednak rozumiem ciebie, więc jedynie będziesz miał mały, 15 sekundowy odstęp czasu.");
      znakwodny=false;
   } else {
      znakwodny=true;
   }
}

// w webcam+ jest użyty kod z poradnika: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/#demo-simple
