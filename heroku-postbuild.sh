#!/bin/bash
cd frontend
yarn install
yarn run build
cd ..
cd backend
yarn install