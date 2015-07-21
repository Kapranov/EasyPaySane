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

4. in the server folder:
   bash> cd EasyPaySane
   bash> cd server
   bash> npm install balderdashy/sails-hook-dev --save
5. bash> sane up

This will create two servers. On living on port 1337 on your localhost
and the other on port 4200. The port 1337 server is the Sails
application. It's where your REST API will live. You can bring it up
on your browser and you'll get a generic message welcoming you to the
backend. If you bring up the site on port 4200 you'll see the default
'Welcome to Ember.js message.

Now that we see it works, we can generate the REST APIs.
We'll be creating a basic model as if we were creating a blog
for post. It will consiste of a name, date, creator and content.

bash> sane generate resource payment
        contract:string
        surname:string
        sum:integer
        commissionOne:float
        commissionTwo:integer
        commission:float
        totalAmount:integer
        email:string
        telephone:string

Oleg G.kapranov 21 July 2015.
