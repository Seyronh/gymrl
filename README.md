![Author](https://img.shields.io/badge/Author-Seyronh-red?logo=npm)

# Install
Before installing it you need to install [Node.js](https://nodejs.org/en/download/)
The install is executed using the [npm install command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install gymrl --save
```

## Enviroments
We currently have 5 enviroments that you can use
1. TwoThousandfortyeight
2. Fourinarow
3. Frozenlake
4. Snake
5. TicTacToe

You can import an enviroment like this
```js
    const {Snake} = require("gymrl")
```
```js
    const {TwoThousandfortyeight} = require("gymrl")
```

## Usage example
Here is a Snake example that uses all the methods that this package contains
```js 
    const {Snake} = require("gymrl")
    let match = new Snake(10); //This creates a map of 10x10
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

This methods works in all enviroments

### render()

Creates a representation of the Enviroment in a string and displays it in the console

### sampleAction()

Returns a random action from that enviroment

### get_obs()

Returns the actual observations on the enviroment

### get_info()

Returns some extra info about the observations on the enviroment

### reset()

Resets the enviroment

### step(action)

Does one step in the enviroment using that action and returns an array with 4 entries [newStatus,Reward,Done,Info]

- newStatus is get_obs() after the action
- Reward is the reward gived by the enviroment to that action
- Done is a boolean that indicates if the enviroment has finished
- Info is get_info() after the action