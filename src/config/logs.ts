import consola from 'consola';

const getTimeStamp = (): string => new Date().toDateString();

const success = (message): void => {
  consola.success(`[${getTimeStamp()}] ${message}`);
};

const info = (message): void => {
  consola.info(`[${getTimeStamp()}] ${message}`);
};

const error = (message): void => {
  consola.error(`[${getTimeStamp()}] ${message}`);
};


export default { success, info, error }