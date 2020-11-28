const getTimeStamp = (): string => new Date().toDateString();

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        return console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }

    return console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        return console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    }

    return console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        return console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    }

    return console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        return console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    }

    return console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
};

export { info, warn, error, debug };
