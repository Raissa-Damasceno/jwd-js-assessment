/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
    document.querySelector("#btnSubmit").disabled = false;
    document.getElementById("time").innerHTML = 1 + ":" + 00;
    startTimer();
  });

  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1,
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "The centre of a solar system is:",
      o: ["star", "planet", "moon", "you"],
      a: 0,
    },
    {
      q: "The estimated age of the universe is:",
      o: [
        "about 50 million years old",
        "between 7 and 20 million years old",
        "between 1 and 5 billion years old",
        "less than 1 billion years old",
      ],
      a: 1,
    },
  ];

  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  const calculateScore = () => {
    let score = 0;

    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        if (quizItem.a == i) {
          liElement.style.backgroundColor = "hsla(179, 94%, 21%, 0.5)";
          if (radioElement.checked) {
            score++;
          }
        }
      }
    });

    let scoreSpan = document.querySelector("#score");
    scoreSpan.innerHTML = `Score: ${score}/${quizArray.length}`;
    document.querySelector("#btnSubmit").disabled = true;
    clearTimeout(timerId);
  };

  let btnSubmit = document.querySelector("#btnSubmit");
  btnSubmit.addEventListener("click", calculateScore);

  function startTimer() {
    let cuurentTime = document.getElementById("time").innerHTML;
    
    let timeArray = cuurentTime.split(/[:]+/);
    let minute = timeArray[0];
    let second = timeArray[1] - 1;
    if (second < 0) {
      second = 59;
      minute -= 1;
    } else if (second < 10) {
      second = "0" + second;
    }

    document.getElementById("time").innerHTML = minute + ":" + second;

    if (minute === "0" && second === "00") {
      document.getElementById("time").style.color = "red";
      document.getElementById("time").innerHTML += ` Timer Expired!!`;
      calculateScore();
      return;
    }

    timerId = setTimeout(startTimer, 1000);
  }

  displayQuiz();

  document.getElementById("btnReset").addEventListener("click", () => {
    let liArray = document.getElementsByClassName("list-group-item");

    for (let li of liArray) {
      li.style.backgroundColor = "";
      li.childNodes[0].checked = false;
    }
    clearTimeout(timerId);
    document.getElementById("time").style.color = "";
    document.querySelector("#score").innerHTML = "";
    document.querySelector("#btnSubmit").disabled = false;
    document.querySelector("#quizBlock").style.display = "none";
    start.style.display = "block";
  });
});
