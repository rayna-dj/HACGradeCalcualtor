//step 1
const isCurrFilled = () => {
  for (const input of currPts)
    if (input.value == '') return false;

  return true;
}

//step 2
var start = document.getElementById("top");
var cfuBtn = document.getElementById("CFU-choice");
var raBtn = document.getElementById("RA-choice");
var saBtn = document.getElementById("SA-choice");
var catBtn = document.querySelectorAll('.cat-button');
var currPts = document.querySelectorAll('#curr-points input');
var otherPts = 0.0;

function categoryClick(cat) {
  if (isCurrFilled()) {
    var catBtn = document.querySelectorAll('.cat-button');

    for (var i = 0; i < catBtn.length; i++){
      if (cat != i){
        catBtn[i].disabled = true;
        var point = parseFloat(currPts[i].value);
        console.log(point + " " + otherPts);
        otherPts += point;
      }
      else{
        catBtn[i].style.color = "#F0924E";
        catBtn[i].style.border = "2px solid #F0924E";
      }
    }
  }
  else
    alert('Fill the required fields with valid inputs');
}

//step 3
const isCatFilled = () => {
  var inputs = document.querySelectorAll('#category-points input');

  for (const input of inputs)
    if (input.value == '') return false;

  return true;
}

//step 4
var max;
var stu;
var w;
var pred;
var goals;
function checkSubmit() {
  if (isCurrFilled() && isCatFilled()) {
    stu = parseFloat(document.getElementById("stu-pts").value);
    max = parseFloat(document.getElementById("max-pts").value);
    w = parseFloat(document.getElementById("weight").value);
    pred = document.getElementById("predict").value;
    calculate();
  }
  else {
    alert('Fill the required fields with valid inputs');
  }
}

function calculate() {
  max = max + 100;

  goals = document.getElementsByClassName("grades");
  document.getElementById("explain").innerHTML = 'Minimum grade needed to maintain / achieve a(n): ';
  var goal = 89.5;
  for (var i = 0; i < goals.length; i++) {
    var grade = getGrade(goal);
    goals[i].innerHTML = goals[i].id + ': ' + grade + '%';

    if (grade > 100 )
      goals[i].innerHTML += ' (unachievable)';
    goal -= 10;
  }

  if (pred.length != 0)  {
    var finGrade = ((((stu + parseFloat(pred)) / max) * w) + otherPts).toFixed(2);
    document.getElementById("pred-grade").innerHTML = "Final grade with predicted grade: " + finGrade + '%';
  }
  else{
    document.getElementById("pred-grade").innerHTML  = "";
  }
 
}

function getGrade(goal) {
  return (max * ((goal - otherPts) / w) - stu).toFixed(2);
}

function reset(resetChoice) {
  if (resetChoice == "all"){
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    for (var j = 0; j < goals.length; j++) {
      goals[j].innerHTML = "";
    }
    document.getElementById("pred-grade").innerHTML = "";
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    document.getElementById("explain").innerHTML = "Submit the required fields to see the predictions";
  }

  for (const input of catBtn){
    input.disabled = false;
    input.style.color = "white";
    input.style.border = "0px";
  }
  otherPts = 0;
}

lines = document.querySelector(".three-lines");
lines.onclick = function(){
    pages = document.querySelector("#pages");
    pages.classList.toggle("active");
}