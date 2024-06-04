#!/bin/bash
set -e

echo "Building frontend..."
cd frontend
yarn install
yarn run build
cd ..

echo "Frontend build complete. Checking files..."
ls frontend
ls -l frontend/dist

echo "Building backend..."
cd backend
yarn install
