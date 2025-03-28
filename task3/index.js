import { readdir } from "fs/promises"
import { resolve } from "path"

const directory = process.argv[2] ? resolve(process.argv[2]) : resolve("task3")

export async function task3() {
    try {
        const files = await readdir(directory)

        const publicFiles = files.filter((file) => !file.startsWith("."))
        const hiddenFiles = files.filter((file) => file.startsWith("."))

        console.log(
            `Public Files: ${
                publicFiles.length > 0 ? publicFiles.join(", ") : "None"
            }`
        )
        console.log(
            `Hidden Files: ${
                hiddenFiles.length > 0 ? hiddenFiles.join(", ") : "None"
            }`
        )
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`)
    }
}
