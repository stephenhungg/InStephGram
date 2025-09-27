#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies for backend only (frontend will be deployed separately on Vercel)
cd backend
npm install

# Return to root 