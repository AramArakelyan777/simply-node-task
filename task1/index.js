import { format } from "date-fns"
import { Writable, Readable, Transform } from "stream"
import fs from "fs"

const writeDateStream = fs.createWriteStream("task1/date.txt", {
    encoding: "utf8",
    flags: "a",
})

class DateReadableStream extends Readable {
    constructor() {
        super()
        this.interval = null
    }

    _read() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.push(format(new Date(), "yyyy-MM-dd HH:mm:ss") + "\n")
            }, 1000)
        }
    }
}

class DateWritableStream extends Writable {
    _write(chunk, encoding, callback) {
        writeDateStream.write(chunk, encoding, callback)
    }
}

class DateTransformStream extends Transform {
    _transform(chunk, encoding, callback) {
        this.push("Date now: " + chunk.toString())
        callback()
    }
}

export function task1() {
    const readableStream = new DateReadableStream()
    const writableStream = new DateWritableStream()
    const transformStream = new DateTransformStream()

    readableStream.pipe(transformStream).pipe(writableStream)
}
