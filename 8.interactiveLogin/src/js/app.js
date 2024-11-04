var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var section3 = document.getElementById("section3");
var section4 = document.getElementById("section4");
var next1 = document.getElementById("nextBtn1");
var next2 = document.getElementById("nextBtn2");
var back1 = document.getElementById("backBtn1");
var back2 = document.getElementById("backBtn2");
var submit = document.getElementById("submitBtn");
var progress = document.getElementById("progress");

next1.onclick = function(){;
    section1.style.display = "none";
    section2.style.display = "flex";
    progress.style.width = "66%";
}

back1.onclick = function(){
    section2.style.display = "none";
    section1.style.display = "flex";
    progress.style.width = "33%";
}

next2.onclick = function(){
    section2.style.display = "none";
    section3.style.display = "flex";
    progress.style.width = "100%";
}

back2.onclick = function(){
    section3.style.display = "none";
    section2.style.display = "flex";
    progress.style.width = "66%";
}

submit.onclick = function(){
    section3.style.display = "none";
    section4.style.display = "flex";
    progress.style.width = "100%";
}