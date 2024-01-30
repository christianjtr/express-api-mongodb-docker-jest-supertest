/* eslint-disable no-console */
const errorLoggerHandler = (error) => {
  console.error(new Error(error.message));
};

export default errorLoggerHandler;
