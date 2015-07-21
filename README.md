EasyPaySane - registration easypay application for Travel Agency.

[Demo - Frontend](http://212.26.132.49:4200)

[Demo - Backend](http://212.26.132.49:1337/api/v1/payments)

Packages:

  1. Sane Stack => Sails.js, Ember-cli.
  2. Redis      => Save cache sessions and data.
  3. Ember Pods => Structuring project by feature.
  4. Git        => Repository.
  5. .... next ...

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

Oleg G.kapranov 21 July 2015.