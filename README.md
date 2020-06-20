### Deep Consulting - practical assignment task 2

Please note, in addition I created a dashboard to simplify usage.  
Navigate to [http://localhost:3000](http://localhost:3000) to view dashboard.

##### You can customize window frame, simply override .env.example file variables

![alt text](https://github.com/dmitrychurkin/dc-metric-node/blob/master/screens/Screenshot_1.png?raw=true)

Install the dependencies, build app and start the server.

```sh
$ git clone https://github.com/dmitrychurkin/dc-metric-node.git
$ cd dc-metric-node
$ npm install
$ npm run build && npm run serve
```

| API  | Endpoint              | Body              | Response  | Response Value    |
| ---- | --------------------- | ----------------- | --------- | ----------------- |
| POST | /api/metric/{key}     | { value: number } | 200 / 400 | {}                |
| GET  | /api/metric/{key}/sum |                   | 200       | { value: number } |

#### Demo:

[https://dc-metric-node.herokuapp.com](https://dc-metric-node.herokuapp.com)
