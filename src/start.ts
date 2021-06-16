import { ApiServer } from './server';

export const start = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const apiServer = new ApiServer();

    new Promise<void>(() => {
      apiServer.start();
    }).then(() => resolve())
      .catch(() => reject());

    const graceful = () => {
      new Promise<void>(() => {
        apiServer.stop();
      }).then(() => process.exit(0));
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
  });
};
