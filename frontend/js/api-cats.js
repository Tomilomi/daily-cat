
const host = "http://localhost:3000"

function clock() {
    let date = new Date()
    let endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    let remaining = endOfDay - date

    let rHours = Math.floor(remaining / 1000 / 60 / 60)
    let rMinutes = Math.floor((remaining / 1000 / 60) % 60)
    let rSeconds = Math.floor((remaining / 1000) % 60)

    document.getElementById("clock").innerHTML = 
        `${rHours}h ${rMinutes}m ${rSeconds}s`
}


async function loadCat(event, catNumber) {
    if (event) {
        event.preventDefault()
    }

    const params = new URLSearchParams()
    params.append("catNumber", catNumber)

    console.log(params.toString())

    const url = `${host}/app/cat?${params.toString()}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error en el servidor")
        }
        const cat = await response.blob()
        renderingCat(cat)
    }

    catch (error) {
        console.log('error')
    }

}

async function renderingCat(cat) {
    const url = blobToUrl(cat)
    const catImageContainer = document.getElementById("cat-container")
    catImageContainer.innerHTML = ""
    catImageContainer.innerHTML = `
    <h1 class="mb-4">Your daily cat:</h1>
    <img src=${url} id="catGif" class="img-fluid rounded shadow" alt="Today's Cat GIF"/>
    <p class="mt-3 text-muted">Come back tomorrow for a new cat!</p>
    `
}


function blobToUrl(blob) {
    return blolbResource = URL.createObjectURL(blob)
}


document.addEventListener('DOMContentLoaded', function () {
    loadCat()
})

setInterval(clock, 1000)
