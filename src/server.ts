import * as express from 'express';
import { BadRequestError, HttpError } from 'typescript-rest/dist/server/model/errors';
import { Server } from 'typescript-rest';
import { AddressInfo } from 'net';

import * as npmPackage from '../package.json';

import http = require('http');
import cors = require('cors');

const config = npmPackage.config || {
  protocol: 'http',
  host: 'localhost',
  port: 3001,
  contextRoot: '/api'
};
const configApiContext = config.contextRoot;
export class ApiServer {
  // private readonly app: express.Application;
  private server: http.Server = null;
  public PORT: number = +process.env.PORT || npmPackage.config.port;

  constructor(private readonly app: express.Application = express(), apiContext = configApiContext) {
    this.app.use(cors());


    if (process.env.NODE_ENV !== 'production') {
      require('dotenv').config();
    }

    const apiRouter: express.Router = express.Router();
    Server.loadServices(
      apiRouter,
      [
        'controllers/*',
      ],
      __dirname,
      );

      if (!apiContext || apiContext === '/') {
        this.app.use(apiRouter);
      } else {
        this.app.use(apiContext, apiRouter);
      }

      // format the errors sent by typescript-rest as json
      this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (err instanceof HttpError) {
          if (res.headersSent) { // important to allow default error handler to close connection if headers already sent
            return next(err);
          }
          res.set("Content-Type", "application/json")
          res.status(err.statusCode)
          res.json({error : err.message, code: err.statusCode});
        } else {
          next(err);
        }
      });
    }

  /**
   * Start the server
   * @returns {Promise<any>}
   */
  public async start(): Promise<ApiServer> {
    return new Promise<ApiServer>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, () => {
        const addressInfo = this.server.address() as AddressInfo;

        const address = addressInfo.address === '::' ? 'localhost' : addressInfo.address;

        // tslint:disable-next-line:no-console
        console.log(`Listening to http://${address}:${addressInfo.port}`);

        return resolve(this);
      });
    });
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public async stop(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(false);
      }
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
