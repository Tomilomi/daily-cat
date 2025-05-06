
function loadTheme() {
    const darkmode = localStorage.getItem("darkmode")
    if (!darkmode){
        store(!false)
    }
    else if (darkmode === 'true'){
        body.classList.add("darkmode");
    }
}

function store(value) {
    localStorage.setItem("darkmode", value)
}


const darkModeBtn = document.querySelector("#darkModeBtn");
const lightModeBtn = document.querySelector("#lightModeBtn");
const body = document.querySelector("body");


darkModeBtn.addEventListener('click', () => {
    body.classList.add("darkmode")
    store(body.classList.contains("darkmode"))
});

lightModeBtn.addEventListener('click', () => {
    body.classList.remove("darkmode")
    store(body.classList.contains("darkmode"))
});

loadTheme()