const host = "http://localhost:3000"

//const actualDate = new Date()

//let aactualMonth = actualDate.prototype.getMonth()
//let aactualDay = actualDate.prototype.getDay()


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

// Revisar

document.addEventListener('DOMContentLoaded', function () {
    loadCat()
})
