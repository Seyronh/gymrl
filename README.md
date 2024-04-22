# GymRL

![npm](https://img.shields.io/npm/v/gymrl?style=flat-square)
![Author](https://img.shields.io/badge/Author-Seyronh-red?logo=npm)

GymRL is a package that provides various environments for reinforcement learning. 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/download/)

## Installation

Install GymRL using npm:

```bash
$ npm install gymrl --save
```

## Environments

GymRL currently supports the following environments:

1. TwoThousandfortyeight
2. Fourinarow
3. Frozenlake
4. Snake
5. TicTacToe

You can import an environment as follows:

```js
const {Snake} = require("gymrl")
```
```js
const {TwoThousandfortyeight} = require("gymrl")
```

## Usage

Here is an example of how to use the Snake environment:

```js 
const {Snake} = require("gymrl")

let match = new Snake(10); // This creates a map of 10x10
let score = 0;
let done = false;

match.render();

let status = match.get_obs();

while(!done){
    let randomAction = Snake.sampleAction();
    let Stepinfo = match.step(randomAction);
    status = Stepinfo[0];
    let reward = Stepinfo[1];
    done = Stepinfo[2];
    let info = Stepinfo[3];
    score += reward;
    match.render();
}
```

## Methods

The following methods are available in all environments:

- **render()**: Creates a string representation of the environment and displays it in the console.
- **sampleAction()**: Returns a random action from the environment.
- **get_obs()**: Returns the current observations of the environment.
- **get_info()**: Returns additional information about the observations of the environment.
- **reset()**: Resets the environment.
- **step(action)**: Performs one step in the environment using the specified action and returns an array with four entries: [newStatus, Reward, Done, Info].

## More Info About the Environments

You can see more info about the enviroments in our [wiki](https://github.com/Seyronh/gymrl/wiki)

## Contributing to GymRL

If you want to contribute to GymRL, whether by adding a new environment or fixing bugs, please check out the [source code](https://github.com/Seyronh/gymrl) and submit a pull request or issue.