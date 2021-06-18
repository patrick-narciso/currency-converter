<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#installation">Installation</a>
          <ul>
            <li><a href="#running-with-docker">Running with Docker</a></li>
            <li><a href="#running-locally">Running locally</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]

It's a simple project to convert currencies. The user should input the value to convert, the source currency (eg.: USD), and the destination currency (eg.: EUR). The value converted is showed, and the last ten conversions made by the user, too.

### Built With

* [React](https://reactjs.org/)
* [Typescript](https://www.typescriptlang.org/)
* [Node](https://nodejs.org/en/)
* [Ant Design](https://ant.design/)

<!-- GETTING STARTED -->
## Getting Started

This project use docker. If you want to run the project with him, just ensure that you have `Docker` and `docker-compose` installed in your local machine. Otherwise, ensure that you have `Node` and `npm` installed locally.
### Installation

1. Get a free API Key at [Open Exchange Rates](https://openexchangerates.org/)
2. Clone the repo
   ```sh
   git clone https://github.com/patrick-narciso/currency-converter.git
   ```
3. Creates an `.env` file in root directory with `OPEN_EXCHANGE_ID` and `OPEN_EXCHANGE_URL`. The `OPEN_EXCHANGE_ID` is the id obtained in open exchange rates website. The `OPEN_EXCHANGE_URL` is the open exchange rates url, in this case `https://openexchangerates.org/api`
4. Creates an `.env` file inside `./app` (front-end layer) with `SKIP_PREFLIGHT_CHECK=true` to avoid mistakes with jest and dependencies from react library

#### Running with Docker

To run the project using docker, just run the command
```sh
docker-compose up -d
```

With this, the front-end application will be available on `http://localhost:3000/` address, and the webservice will be available on `http://localhost:3001/`

#### Running locally

To run the project locally, follow the steps:

1. Install Back-end NPM packages
```sh
  npm install
```
2. Install Front-end NPM packages
```sh
  cd app/
  npm install
```
3. Run the webservice
```sh
  npm run start
```
4. Open another terminal and run the website
```sh
  npm run start
```
5. To execute automated tests, just run
```sh
  npm run test
```

[product-screenshot]: screenshot.png
