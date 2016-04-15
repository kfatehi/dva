# Administrative Guide

This document will walk you through installation of the application on an Amazon Linux EC2 instance.

## Get Node.js

https://nodejs.org/en/download/package-manager/

```
curl --silent --location https://rpm.nodesource.com/setup_5.x | sudo bash -
sudo yum -y install nodejs
sudo yum install gcc-c++ make
```

## Get PM2

PM2 is a production process manager for Node.js apps with a built-in load balancer.

```
sudo npm install -g pm2
sudo pm2 startup amazon
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

## Configure the Reverse Proxy

We use nginx in front of dva as a reverse proxy primarily to separate the application itself from the web server exposed to the outside world. You can benefit from this separation in such ways as keeping TLS configuration logic outside of the app, allow nginx to bind to port 80 with a higher privilege user whilst the app itself runs as a lower privilege user using a higher port number, and others.

```
yum -y install nginx
```

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

`sudo /etc/init.d/nginx restart`

`dva` should now be accessible on port 80
