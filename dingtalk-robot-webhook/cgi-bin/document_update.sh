#!/bin/sh

echo "Content-Type:text/html"
echo ""
echo ""

cd /data/www/gm_static_document

git pull

npm run publish

echo "ok"