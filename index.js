// Background Image from Unsplash
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscape"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

// Cryptocurrency Information
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
    document.getElementById("crypto").innerHTML += `
            <p>🎯: ₹${data.market_data.current_price.inr}</p>
            <p>👆: ₹${data.market_data.high_24h.inr}</p>
            <p>👇: ₹${data.market_data.low_24h.inr}</p>
        `;
  })
  .catch((err) => console.error(err));

// Digital Clock
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "medium" }
  );
}

// Update time every second
setInterval(getCurrentTime, 1000);

// Greeting based on time of day
function greetUser() {
  // Get the current hour
  const currentHour = new Date().getHours();

  // Greet the user based on the time of day
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 24) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  const storedName = localStorage.getItem("userName");
  let user = "guest";
  if (storedName) {
    user = storedName;
  } else {
    user = prompt("Please enter your name!!!");
    localStorage.setItem("userName", user);
  }

  function changeUserName() {
    user = prompt("Please provide your name!!");
    localStorage.setItem("userName", user);
    userEl.innerText = `${greeting}, ${user}!`;
  }

  // Display the greeting
  let greetString = `${greeting}, ${user}!`;
  const userEl = document.getElementById("greet");
  userEl.innerText = greetString;
  userEl.addEventListener("click", changeUserName);
}

// Call the function to greet the user
greetUser();

// Weather Information
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      enhanceWeatherDisplay(data);
    })
    .catch((err) => console.error(err));
});

// Enhanced Weather Display
function enhanceWeatherDisplay(data) {
  const weatherContainer = document.getElementById("weather");
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherContainer.innerHTML = `
        <img src=${iconUrl} alt="${data.weather[0].description}" />
        <div class="weather-info">
            <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
            <p class="weather-desc">${data.weather[0].description}</p>
            <p class="weather-city">${data.name}</p>
            <p class="weather-details">Humidity: ${
              data.main.humidity
            }% | Wind: ${Math.round(data.wind.speed * 3.6)} km/h</p>
        </div>
    `;
}

// Inspirational Quotes
async function fetchData() {
  try {
    // Make a GET request to a sample API endpoint
    const response = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=happiness",
      { headers: { "X-Api-Key": "h/Ig48/zxpf083tO4DZgyg==eKkv49i06zx2Qm1f" } }
    );

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Display the data
    document.getElementById("quote").innerText = data[0].quote;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchData();

// Google Search
function performSearch() {
  // Get the value from the search input
  const searchTerm = document.getElementById("searchInput").value;

  // Redirect to the search results page
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
    searchTerm
  )}`;
}

document.getElementById("searchBtn").addEventListener("click", performSearch);

// Keyboard shortcut for search
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

// Pomodoro Timer Implementation
function createPomodoroTimer() {
  // Create DOM elements
  const pomodoroContainer = document.createElement("div");
  pomodoroContainer.className = "pomodoro-container";

  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer-display";
  timerDisplay.textContent = "25:00";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "pomodoro-buttons";

  const startButton = document.createElement("button");
  startButton.className = "pomodoro-button";
  startButton.textContent = "Start";

  const pauseButton = document.createElement("button");
  pauseButton.className = "pomodoro-button";
  pauseButton.textContent = "Pause";

  const resetButton = document.createElement("button");
  resetButton.className = "pomodoro-button";
  resetButton.textContent = "Reset";

  const modeContainer = document.createElement("div");
  modeContainer.className = "pomodoro-modes";

  const pomodoroButton = document.createElement("button");
  pomodoroButton.className = "mode-button active";
  pomodoroButton.textContent = "Pomodoro";

  const shortBreakButton = document.createElement("button");
  shortBreakButton.className = "mode-button";
  shortBreakButton.textContent = "Short Break";

  const longBreakButton = document.createElement("button");
  longBreakButton.className = "mode-button";
  longBreakButton.textContent = "Long Break";

  // Append elements
  modeContainer.appendChild(pomodoroButton);
  modeContainer.appendChild(shortBreakButton);
  modeContainer.appendChild(longBreakButton);

  buttonContainer.appendChild(startButton);
  buttonContainer.appendChild(pauseButton);
  buttonContainer.appendChild(resetButton);

  pomodoroContainer.appendChild(modeContainer);
  pomodoroContainer.appendChild(timerDisplay);
  pomodoroContainer.appendChild(buttonContainer);

  // Insert after the greeting
  const greetElement = document.getElementById("greet");
  greetElement.parentNode.insertBefore(
    pomodoroContainer,
    greetElement.nextSibling
  );

  // Timer variables
  let timer;
  let timeLeft = 25 * 60; // 25 minutes in seconds
  let isRunning = false;
  let pomodoroCount = 0;

  // Timer settings
  const pomodoroTime = 25 * 60;
  const shortBreakTime = 5 * 60;
  const longBreakTime = 15 * 60;

  // Update timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.title = `${timerDisplay.textContent} - Dashboard`;
  }

  // Start timer
  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
          clearInterval(timer);
          isRunning = false;

          // Play notification sound
          const audio = new Audio(
            "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
          );
          audio.play();

          // Show notification
          if (Notification.permission === "granted") {
            new Notification("Pomodoro Timer", {
              body: pomodoroButton.classList.contains("active")
                ? "Time's up! Take a break."
                : "Break's over! Time to focus.",
              icon: "https://cdn-icons-png.flaticon.com/512/3572/3572104.png",
            });
          }

          // If pomodoro completed, increment count
          if (pomodoroButton.classList.contains("active")) {
            pomodoroCount++;
            // After 4 pomodoros, suggest a long break
            if (pomodoroCount % 4 === 0) {
              alert(
                "You've completed 4 pomodoros! Consider taking a long break."
              );
            }
          }
        }
      }, 1000);
    }
  }

  // Pause timer
  function pauseTimer() {
    if (isRunning) {
      clearInterval(timer);
      isRunning = false;
    }
  }

  // Reset timer
  function resetTimer() {
    pauseTimer();
    if (pomodoroButton.classList.contains("active")) {
      timeLeft = pomodoroTime;
    } else if (shortBreakButton.classList.contains("active")) {
      timeLeft = shortBreakTime;
    } else {
      timeLeft = longBreakTime;
    }
    updateTimerDisplay();
  }

  // Set active mode
  function setActiveMode(button, time) {
    // Remove active class from all buttons
    pomodoroButton.classList.remove("active");
    shortBreakButton.classList.remove("active");
    longBreakButton.classList.remove("active");

    // Add active class to clicked button
    button.classList.add("active");

    // Reset timer with new time
    pauseTimer();
    timeLeft = time;
    updateTimerDisplay();
  }

  // Event listeners
  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);

  pomodoroButton.addEventListener("click", () =>
    setActiveMode(pomodoroButton, pomodoroTime)
  );
  shortBreakButton.addEventListener("click", () =>
    setActiveMode(shortBreakButton, shortBreakTime)
  );
  longBreakButton.addEventListener("click", () =>
    setActiveMode(longBreakButton, longBreakTime)
  );

  // Request notification permission
  if (
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    Notification.requestPermission();
  }

  // Initial display update
  updateTimerDisplay();
}

// Todo List Implementation
function createTodoList() {
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-container";
  todoContainer.innerHTML = `
        <h3>Quick Tasks</h3>
        <div class="todo-input-container">
            <input type="text" id="todoInput" placeholder="Add a task...">
            <button id="addTodoBtn">Add</button>
        </div>
        <ul id="todoList"></ul>
    `;

  // Insert before the author credit
  const authorElement = document.getElementById("author");
  authorElement.parentNode.insertBefore(todoContainer, authorElement);

  // Load saved todos
  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  const todoList = todoContainer.querySelector("#todoList");

  // Render saved todos
  savedTodos.forEach((todo) => {
    addTodoToDOM(todo.text, todo.completed);
  });

  // Add new todo
  todoContainer.querySelector("#addTodoBtn").addEventListener("click", addTodo);
  todoContainer
    .querySelector("#todoInput")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTodo();
    });

  function addTodo() {
    const todoInput = todoContainer.querySelector("#todoInput");
    const todoText = todoInput.value.trim();

    if (todoText) {
      addTodoToDOM(todoText, false);

      // Save to localStorage
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      todos.push({ text: todoText, completed: false });
      localStorage.setItem("todos", JSON.stringify(todos));

      todoInput.value = "";
    }
  }

  function addTodoToDOM(text, completed) {
    const li = document.createElement("li");
    li.className = completed ? "completed" : "";

    li.innerHTML = `
            <span class="todo-text">${text}</span>
            <div class="todo-actions">
                <button class="complete-btn">${completed ? "↩️" : "✅"}</button>
                <button class="delete-btn">❌</button>
            </div>
        `;

    // Complete todo
    li.querySelector(".complete-btn").addEventListener("click", () => {
      li.classList.toggle("completed");

      // Update localStorage
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      const todoIndex = todos.findIndex((todo) => todo.text === text);
      if (todoIndex !== -1) {
        todos[todoIndex].completed = li.classList.contains("completed");
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      // Update button text
      li.querySelector(".complete-btn").textContent = li.classList.contains(
        "completed"
      )
        ? "↩️"
        : "✅";
    });

    // Delete todo
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();

      // Update localStorage
      const todos = JSON.parse(localStorage.getItem("todos") || "[]");
      const updatedTodos = todos.filter((todo) => todo.text !== text);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    });

    todoList.appendChild(li);
  }
}

// Add keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Alt+P to start/pause Pomodoro
  if (e.altKey && e.key === "p") {
    const startButton = document.querySelector(".pomodoro-button");
    if (startButton) startButton.click();
  }

  // Alt+R to reset Pomodoro
  if (e.altKey && e.key === "r") {
    const resetButton = document.querySelectorAll(".pomodoro-button")[2];
    if (resetButton) resetButton.click();
  }

  // Alt+T to focus on todo input
  if (e.altKey && e.key === "t") {
    const todoInput = document.getElementById("todoInput");
    if (todoInput) todoInput.focus();
  }

  // Alt+S to focus on search
  if (e.altKey && e.key === "s") {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.focus();
  }
});

// Initialize all new features
createPomodoroTimer();
createTodoList();
