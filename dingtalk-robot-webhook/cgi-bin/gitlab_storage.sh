#!/bin/sh

echo "Content-Type:text/html"
echo ""
echo ""

cd /data/www/gm_static_storage

git pull

npm run deploy

echo "ok"