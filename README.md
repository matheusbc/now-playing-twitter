# now-playing-twitter

Single page that shows videos that near people are playing now. It also allows users to tweet what they are playing now.

- [Now Playing Twitter](#now-playing-twitter)
  - [Introduction](#introduction)
  - [Quick Start](#quick-start)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Simple React Full Stack](#simple-react-full-stack)
    - [Dependencies](#dependencies)
        - [React Twitter Embed](#react-twitter-embed)
        - [React Youtube](#react-youtube)

## Introduction

This project is a simple single page that shows the tweets from people near you that contains youtube videos and the hashtag #nowplaying. It also allows users to tweet what they are playing now.

It was used a boilerplate to build this full stack web application using React, Node.js, Express and Webpack.

## Quick Start

This project can be build in two perspectives: Development mode and Production mode.

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.


```bash
# Clone the repository
git clone https://github.com/matheusbc/now-playing-twitter

# Go inside the directory
cd now-playing-twitter

# Install dependencies
yarn (npm install)

## Development mode
# Start development server
yarn dev (npm run dev)

## Production mode
# Build for production
yarn build (npm run build)

# Start production server
yarn start (npm start)
```

## Documentation

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

### Simple React Full Stack

It is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API is written using Express. This application is configured with [Airbnb's ESLint rules](https://github.com/airbnb/javascript) and formatted through [prettier](https://prettier.io/).

In this link [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack) you can read the documentation of all the basic dependencies used to configure this full stack application. 

### Dependencies

Here is a list of the third-party libraries and components used to develop this project.

#### React Twitter Embed

This library provides components for [Twitter widgets](https://twitter.com/settings/widgets).

This project used the component for the Embedded Twitter widget that shows a tweet in a twitter-like component.

```typescript jsx
<TwitterTweetEmbed tweetId={'933354946111705097'}/>
```

#### React Youtube

This library provides a component to embed a youtube video player.

It was used to show the youtube videos of the tweets with the hashtag #nowplaying.

```typescript jsx
const opts = {
  height: '300',
  width: '500',
  playerVars: {
    autoplay: 0
  }
};

<YouTube
  videoId="4huh348FBF"
  opts={opts}
/>
```
