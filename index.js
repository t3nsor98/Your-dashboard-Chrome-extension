fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscape")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
        document.getElementById("author").textContent = `By: Dodi Achmad`
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: ₹${data.market_data.current_price.inr}</p>
            <p>👆: ₹${data.market_data.high_24h.inr}</p>
            <p>👇: ₹${data.market_data.low_24h.inr}</p>
        `
    })
    .catch(err => console.error(err))
// get the current time updating every second
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "medium" })
}

// lets greet the user
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
        user = prompt("Please provide your name!!")
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



setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}ºC</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

// get Quotes
async function fetchData() {
    try {
        // Make a GET request to a sample API endpoint
        const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness",
            { headers: { 'X-Api-Key': 'h/Ig48/zxpf083tO4DZgyg==eKkv49i06zx2Qm1f' } });

        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Display the data
        document.getElementById("quote").innerText = data[0].quote;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData();

// Goggle search

function performSearch() {
    // Get the value from the search input
    const searchTerm = document.getElementById('searchInput').value;

    // Redirect to the search results page (replace 'search-results.html' with your actual search page)
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
}

document.getElementById("searchBtn").addEventListener("click",performSearch);


