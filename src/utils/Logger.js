// @flow

export const Logger = {
    warning: (...os: any[]) => log(toMessage("WARNING", os)),
    error: (...os: any[]) => log(toMessage("ERROR", os)),
    info: (...os: any[]) => log(toMessage("INFO", os)),
    debug: (...os: any[]) => log(toMessage("DEBUG", os)),
}

const toMessage = (level: string, os: any[]): string => {
    const body = os
        .map(o => (typeof o === "string"
            ? o
            : JSON.stringify(o, null, 2)))
        .join(", ")

    return `${level}: ${body}`
}

const log = (m: string) => console.log(m)
