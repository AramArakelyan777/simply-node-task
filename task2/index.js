import fs from "fs"
import { Transform } from "stream"

class TransformStream extends Transform {
    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase())
        callback()
    }
}

const readableStream = fs.createReadStream("task2/input.txt", {
    encoding: "utf8",
    highWaterMark: 30,
})

const writableStream = fs.createWriteStream("task2/output.txt", {
    encoding: "utf8",
    flags: "w",
})

export function task2() {
    const transformStream = new TransformStream()

    readableStream
        .pipe(transformStream)
        .pipe(writableStream)
        .on("finish", () =>
            console.log("The file has been transformed and written.")
        )

    readableStream.on("error", (err) =>
        console.error("Error while reading:", err)
    )
    transformStream.on("error", (err) =>
        console.error("Error in transforming the stream:", err)
    )
    writableStream.on("error", (err) =>
        console.error("Error while writing:", err)
    )
}
