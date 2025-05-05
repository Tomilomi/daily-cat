import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs/promises"
import dateDayNumber from "./utils.js"
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let manifest

const app = express()
const PORT = 3000

// considerar la opcion de hacer algo para poder ingresar un link y 
// que se descargue en mi carpeta public un gif

app.use(cors())



app.get("/app/cat", async (req, res) => {

    const totalCats = manifest.totalCats
    const claveRatio = totalCats / 365
    let catNumber
    if (req.query.catNumber === "undefined") {
        catNumber = Math.round(claveRatio * dateDayNumber(new Date()))
    }
    else {
        catNumber = req.query.catNumber
    }
    
// __**gracias fran por el algoritmo**__ Math.round(claveRatio * dateDayNumber(new Date()))

    if (catNumber !== "") {
        const pathFile = path.join(__dirname, "public", `g${catNumber}.gif`)
        try {
            res.sendFile(pathFile, (err) => {
                if (err) {
                    console.error("Error sending file...", err)
                    res.status(500).send("Something wrongt with server...")
                }
            }
            )
        }
        catch (error) {
            console.log("Failed to send file...", error)
            res.status(500).send("Internal error...")
        }
    }
    else {
        res.status(400).send("Cat number expected.")
    }
})


app.use((req, res) => {
    res.status(404).send("Not found.")
})


async function start() {


    const response = await fs.readFile(path.join(__dirname, "public", "manifest.json"), "utf-8")
    manifest = await JSON.parse(response) 
    


    app.listen(PORT, () => {
        console.log(`Listening in port: ${PORT}`)
    })
}

start()