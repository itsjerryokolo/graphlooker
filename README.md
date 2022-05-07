# CosmoDapp


## Live application

Check out our live application : [here](https://cosmodapp.com/).


## Steps for installation 

How to fork subgraph-explorer

```
Step1:-
Open git bash or terminal 
$ git clone https://github.com/dapplooker/subgraph-explorer.git

Step2:-
Now move into the project
$ cd subgraph-explorer

Step3:-
Install the dependencies
$ npm install
```
## Run the application for development
```
$ npm start
```
## Simple build for production

```
$ npm run production
```


## Setup your enviornment

```
 Create .env file in the subgraph-explorer folder that includes:

     REACT_APP_BASE_URL_DEVELOPMENT = 'http://localhost:3000/explore?'
     (`you can change the domain according to your need`)

     REACT_APP_BASE_URL_PRODUCTION = 'https://cosmodapp.com/explore?'

     REACT_APP_ADDRESS_URL = 'https://etherscan.io/address'

     REACT_APP_TNX_URL = 'https://etherscan.io/tx/'
```


