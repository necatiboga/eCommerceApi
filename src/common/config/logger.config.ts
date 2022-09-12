const { createLogger,transports,format } = require('winston');

const myFormatter = format((info) => {
  const {message} = info;

  if (info.data) {
    info.message = `${message} ${JSON.stringify(info.data)}`;
    delete info.data;
  }

  return info;
})();

export const logger = createLogger({
  transports:[new transports.File({
    filename:'error.log',
    level:'error',
    format:format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      myFormatter,
      format.simple(),
    )
  })]
})

