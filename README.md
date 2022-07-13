# Random User Table

## Overview

Simple webpage to show random user data from [https://randomuser.me/](https://randomuser.me/) API using react js
  
## Requirement

To get started, you need to install [wnlijoan check [here](https://nodejs.org/en/) 
  
## Instalation

Lets begin installing the packagandowd running the project on your local machine:

1. Clone this repository: `git clone https://github.com/maulanaahmadarif/random-user-table.git`.

2.  `cd random-user-table`

3.  `npm install`

4. Start the project `npm run start`

5. It should running on your localhost with port `3000` `http://localhost:3000`


## How it works

The initial load will fetch the data from [https://randomuser.me/](https://randomuser.me/) API with the these query params:

| query | type | description |
|--|--|--|
| results | `Int` | How much data client needs from the server  |
| page | `Int` | Current pagination page |
| inc | `String` | Specify which fields to include |

Sometimes, you want some random names and not extraneous data such as location, phone, etc. Using the inc, you can specify which fields to include, in this case we are only need `gender,name,login,registered,email` to show to the table

Each columns can be sorted except for username `desc` or `asc` by clicking the up and down arrow in each column header, this sorting is not fetch from the API because by developing this webpage, the sort is not supported yet in the API, instead we are manipulating the fetched data using simple [localCompare](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) method

The filter function includes with two parameter, `search by username` and `gender`. This filter implements simple [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)  method to manipulate existing data, and for the input search by username its wrapped with debounce function using [loadash debounce](https://lodash.com/docs/4.17.15#debounce)

## Deployment

Github Action is implemented in this repository for merging and pull request, it then build and deploy to [firebase hosting](https://firebase.google.com/docs/hosting) with the production url: [https://random-user-table.web.app/](https://random-user-table.web.app/) 