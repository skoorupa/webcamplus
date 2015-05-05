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
   
   c.mouseup(mouseup);
   c.mousedown(mousedown);
   c.click(function(){isclick(this);});
   
   var previewIMG = $("#preview");
   $("#kolor").val("black");
   
   img = $("#preview")[0]; 
});

function getStream(){
   if(!!navigator.UserMedia){
     navigator.UserMedia({video:true},function(stream){ // chcemy video w postaci stream
        waitingForStream=false;
        
        $("#screen2").fadeOut(1000, function(){
           $("#screen4").fadeIn(1000);
        });
        $("#video").attr("height","auto");
        $("#video").attr("width","auto");
        
        $("#video").attr("src",window.URL.createObjectURL(stream)); // wirtualny atrybut src dla video
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
}

var color;

var url,link,t,
    count = 3;// globalne zmienne, DO BOJU   
counting=false;
  
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
  
  wzdj = c[0].width; 
  hzdj = c[0].height; 
  
  ctx.drawImage(document.querySelector("#video"),0,0); // malujemy obraz
  
}
console.log("A kto ci tu pozwolił wchodzić? :D"); // fun

// rysowanie

function write(e){
  ctx.lineTo(e.pageX - c[0].offsetLeft,e.pageY - $("#screen")[0].offsetTop-c[0].offsetTop);
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
}

function mousedown(){
  c.mousemove(function(e){write(e);});
  ctx.beginPath();
}

function mouseup(){
  c.unbind('mousemove');
}

function isclick(e){
  ctx.beginPath();
  ctx.lineTo(e.pageX - c[0].offsetLeft,e.pageY - $("#screen")[0].offsetTop)-c[0].offsetTop;
  ctx.stroke();
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
}

function convert(){
  $("#kolor").val("black");   
  napiszrodlo = new Image();
  napiszrodlo.src = "zrodlo.png";
  napiszrodlo.onload = function () {
      ctx.drawImage(napiszrodlo,hzdj-100,wzdj-190);
  
      url = c[0].toDataURL('image/png');
      
      img.setAttribute("src",url);
    
      link = document.querySelector("#pobierz"); 
      link.setAttribute('href',url); 
      
      $("#scr5").hide();
      $("#scr0").show();
      $("#settings").hide("drop",function(){
         $("#superbar").show("drop");
      });
      $("#screen5").fadeOut(1000, function(){
         $("#screen6").fadeIn(1000);
      });
  };
}

function znowu(){
   $("#scr6").hide();
   $("#scr4").show();
   $("#settings").hide("drop",function(){
     $("#superbar").show("drop");
   });
   $("#screen6").fadeOut(1000, function(){
     $("#screen4").fadeIn(1000);
   });
}

function wroc(){
   $("#scr5").hide();
   $("#scr4").show();
   $("#settings").hide("drop",function(){
     $("#superbar").show("drop");
   });
   $("#screen5").fadeOut(1000, function(){
     $("#screen4").fadeIn(1000);
   });
}