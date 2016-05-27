# Administrative Guide

This document will walk you through installation of the application on the following platforms:

* Amazon Linux (EC2)
* Ubuntu (tested on 14.04)
* Apple OSX (instructions TBD)

*Don't use this guide if you're trying to develop. For that, see the README in project root.*

## Get Node.js

https://nodejs.org/en/download/package-manager/

### Amazon Linux

```
curl --silent --location https://rpm.nodesource.com/setup_5.x | sudo bash -
yum -y install nodejs gcc-c++ make
```

### Ubuntu

```
curl --silent --location https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -y nodejs build-essential
```

## Get PM2

PM2 is a production process manager for Node.js apps with a built-in load balancer. We use it in deployment.

```
npm install -g pm2
```

## Set PM2 to run on startup

### Amazon Linux

```
pm2 startup amazon
```

### Ubuntu

```
pm2 startup amazon
```

## Deploying locally with PM2

```
git clone https://github.com/kfatehi/dva
cd dva
npm install
pm2 start dva
```

## Deploying remotely with PM2

First, fork dva from https://github.com/kfatehi/dva to somewhere that you control.

## Get Nginx

We use nginx in front of dva as a reverse proxy primarily to separate the application itself from the web server exposed to the outside world. You can benefit from this separation in such ways as keeping TLS configuration logic outside of the app, allow nginx to bind to port 80 with a higher privilege user whilst the app itself runs as a lower privilege user using a higher port number, and others.

### Amazon Linux

```
yum -y install nginx
```

### Ubuntu

```
apt-get install nginx
```

## Configure Nginx

Find the empty `location / {}` and replace it with the following:

**/etc/nginx/nginx.conf**
```
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Apply the changes by restarting nginx

`/etc/init.d/nginx restart`

`dva` should now be accessible on port 80

# TODO

* note the dual data stores (sql for relational, rethink for data)
* explain how to setup rethinkdb
