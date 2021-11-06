#!/bin/sh
# vim:sw=4:ts=4:et

set -e

mkdir -p /etc/nginx/conf.d/

envsubst '${BACKEND_HOST},${HOST_NAME}' < /template/proxy.nginx.conf > /etc/nginx/conf.d/default.conf

echo "back set to $BACKEND_HOST with $HOST_NAME. Starting";

nginx -g 'daemon off;'
