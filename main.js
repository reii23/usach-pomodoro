const timerElement = document.getElementById("time");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTask");
const newTaskInput = document.getElementById("newTask");

let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

function updateTimer() {
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.textContent = "Pausar";
    timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = "Comenzar";
      } else {
        if (seconds === 0) {
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
        updateTimer();
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "Reanudar";
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.textContent = "Comenzar";
  minutes = 25;
  seconds = 0;
  updateTimer();
}

function addTask() {
  const taskText = newTaskInput.value;
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-task";
    deleteButton.addEventListener("click", () => {
      taskList.removeChild(taskItem);
    });
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    newTaskInput.value = "";
  }
}

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
addTaskButton.addEventListener("click", addTask);

updateTimer();
