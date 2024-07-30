#! /bin/bash

echo "Pulling latest"
git pull

echo "Building"
docker compose up -d