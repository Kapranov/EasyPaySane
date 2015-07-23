EasyPaySane - application for Travel Agency.
-----------------------------------------------------------------

[Demo - Frontend](http://212.26.132.49:4200)

[Demo - Backend](http://212.26.132.49:1337/api/v1/payments)

#### Packages:


  * Sane Stack => Sails.js, Ember-cli.
  * Redis      => Save cache sessions and data.
  * Ember Pods => Structuring project by feature.
  * Git        => Repository.
  * Install packages and early removed all 3 packages
     with npm uninstall -g <package_name>

      npm install -g sails
      npm install -g ember-cli
      npm install -g sane-cli
  * .... next ...


 1. bash> sane --version

    => 0.0.24

 2. bash> ember -v

    => version: 1.13.1 node: 0.12.0 npm: 2.12.1

 3. bash> sane new EasyPaySane -d mongo

    bash> sane new EasyPaySane -d redis

 4. In the server folder:

    bash> cd EasyPaySane

    bash> cd server

    bash> npm install balderdashy/sails-hook-dev --save

 5. bash> sane up

    This will create two servers. One living on port 1337 on
    http://212.26.132.49 and the other on port 4200.
    The port 1337 server is the Sails application.
    It's where REST API will live. And you can see bring it up
    on your browser and you'll get a generic message welcoming
    you to the backend. If you bring up the site on port 4200
    you'll see the default 'Welcome to Ember.js' message.

 6. Now that we see it works, we can generate the REST API.
    We'll be creating model. It will consiste of some fields
    and we'll use Ember-Pods.

    bash> config/environment.js

      var ENV = {
        modulePrefix: 'client',
        podModulePrefix: 'client/pods',
        ...

    bash> sane generate resource payment
            contract:string
            surname:string
            sum:integer
            commissionOne:float
            commissionTwo:integer
            commission:float
            totalAmount:integer
            email:string
            telephone:string --pod

 7. edit client/app/pods/payment/template.hbs

    We added welcome string for check in.

    open browser on url http:212.26.132.49:4200/payment

    and you can see result.

 8. Save sessions to redis

    My current stack

  Node.js
  Heruku   <---> hosted on ...
  Sails.js <---> mongodb ... for models
           <---> in memory ... for the session & socket store

  and I want do next:

  Node.js
  Heruku    <---> hosted on ...
  Sails.js  <---> radis ... for models
            <---> redis ... for the sessions & socket store

  bash> cd server
  bash> npm install connect-redis@1.4.5
  bash> vim server/config/local.js
  for configuration of mongoDB or Redis uses local.js

  moving session and socket to redis ...

  bash> cd server
  bash> npm install sails-redis                                             *
  bash> vim server/config/connections.js

  redis: {
    adapter: 'sails-redis',
    port: 6379,
    host: '127.0.0.1',
    database: 1
  }


  bash> vim server/config/session.js

  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },

  adapter: 'redis',

  host: '127.0.0.1',
  port: 6379,
  ttl: 30,
  db: 2,
  pass: null,
  prefix: 'sess:',


  bash> redis-cli
  127.0.0.1:6379> config get databases

  127.0.0.1:6379> info keyspace

  db0:keys=2,expires=0,avg_ttl=0

  db1:keys=1,expires=0,avg_ttl=0

  db2:keys=1,expires=1,avg_ttl=16099

  127.0.0.1:6379> select 2

  bash> cd server
  bash> npm install socket.io-redis@0.1.4 --save
  bash> vim server/config/socket.js

  adapter: 'socket.io-redis',
  host: '127.0.0.1',
  port: 6379,
  db: 2,
  pass: null,
  origins: '*:*',
  heartbeats: true,
  'close timeout': 60,
  'heartbeat timeout': 60,
  'heartbeat interval': 25,
  'polling duration': 20,
  'flash policy port': 10843,
  'destroy buffer size': '10E7',
  'destroy upgrade': true,
  'browser client': true,
  'browser client cache': true,
  'browser client minification': false,
  'browser client etag': false,
  'browser client expires': 315360000,
  'browser client gzip': false,
  'browser client handler': false,
  'match origin protocol': false,
  store: undefined,
  logger: undefined,
  'log level': undefined,
  'log colors': undefined,
  'static': undefined,
  resource: '/socket.io',
  beforeConnect: function(handshake, cb) {
    authorization: false
  },
  transports: [
    "polling",
    "websocket",
    'htmlfile',
    'xhr-polling',
    'jsonp-polling'
  ]

  Start up and see result

  bash> sane up

 9. Add new record in redis

   you can use addons for firefox REST-Client or curl

   bash> curl -v -H "Content-Type: application/json" -X POST --data \
            "payments.json" http://212.26.132.49:1337/api/v1/payments

{
  "payment": {
    "contract": "A-999999",
    "surname": "Kapranov Oleg",
    "sum": 10235,
    "commissionOne": 1.5,
    "commissionTwo": 2,
    "commission": 153.52,
    "totalAmount": 10388,
    "email": "lugatex@yahoo.com",
    "telephone": "099-717-06-09"
  },
  {
    "contract": "T-999999",
    "surname": "Testing",
    "sum": 10235,
    "commissionOne": 1.5,
    "commissionTwo": 2,
    "commission": 153.52,
    "totalAmount": 10388,
    "email": "test@example.com",
    "telephone": "099-717-06-09"
  }
}


    and we can use url too for insert new record:

     /api/v1/payments?payment[contract]="T-999998"&payment[surname]="Arlynsky Dmitry"
        &payment[sum]="10235.00"&payment[commissionOne]="1.5"&payment[commissionTwo]="2"
        &payment[commission]="153.52"&payment[totalAmount]="10388.00"
        &payment[email]="kapranov.lugatex@gmail.com"&payment[telephone]="099-717-06-09"

 10. We need to do is make sure Ember can retrieve the data and display it.

    bash> cd client
    bash> ember g resource posts

    This will create a new payments route and template.

    When it asks you to overwrite the payment model make sure you type in 'N'.

    This was already generated earlier when we created the resource using Sane.

    Inside the payments route we'll add the model hook.

    bash> vim app/pods/payments/route.js

      import Ember from 'ember';

      export default Ember.Route.extend({

        model: function (){

          return this.store.find('payment');

        }

      });

    We need to do is update the payments template and display each payment.

      This is a list of all the payments

      <h1>Payments</h1>

      <ul>
      {{#each p in model }}
        <li>{{p.contract}}</li>
        <li>{{p.surname}}</li>
        <li>{{p.sum}}</li>
        <li>{{p.commissionOne}}</li>
        <li>{{p.commissionTwo}}</li>
        <li>{{p.commission}}</li>
        <li>{{p.totalAmount}}</li>
        <li>{{p.email}}</li>
        <li>{{p.telephone}}</li>
        <br>
        {{/each}}
      </ul>


http://discuss.emberjs.com/t/ember-js-1-13-nothing-displayed-on-each-even-though-i-can-see-it-on-the-ember-inspector/8237
http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_transition-to-the-new-jsonserializer-and-restserializer-apis
https://github.com/emberjs/data/blob/v1.13/packages/ember-data/lib/system/serializer.js#L28
http://emberjs.com/deprecations/v1.x/
https://github.com/emberjs/data/issues/3378
https://github.com/emberjs/data/issues/3404
https://github.com/emberjs/data/issues/3424
http://emberjs.jsbin.com/kokotigoso/edit?html,js,output
http://emberjs.jsbin.com/kubupaluma/edit?html,js,output

Oleg G.kapranov 23 July 2015.
