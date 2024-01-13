#!/bin/bash
set -euo pipefail

# Create image for API and push to local daemon
dotnet publish \
/t:PublishContainer -c Release -r linux-arm64 --no-self-contained \
/p:ContainerImageTag=latest /p:ContainerBaseImage=mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim \
/p:ContainerUser=1001 /p:ContainerWorkingDirectory=/usr/bin/api \
/p:ContainerRepository=contact_list_api ../../backend/ContactListApi

# Create image for frontend and push to local daemon
cd ../../frontend
docker build -t contact_list_frontend:latest -f ../build/Dockerfile.frontend .

# Pull down test data artifact and unpack
cd ../build/test
mkdir -p postgres
cd postgres
oras pull quay.io/trey_b/contact_list:latest
tar -xzf datavol.tar.gz
rm datavol.tar.gz
cd ..

# Start containers
docker-compose up -d

# Wait for API to be ready
until curl --output /dev/null --silent --fail http://localhost:5080/contacts; do
    printf '.'
    sleep 2
done

# Run tests
cd ../../frontend
npx playwright test

# Tear down containers
cd ../build/test
docker-compose down
