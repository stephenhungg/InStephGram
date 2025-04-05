#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies for backend
cd backend
npm install

# Return to root and install frontend dependencies
cd ..
cd frontend
npm install

# Build frontend
npm run build

# Return to root 