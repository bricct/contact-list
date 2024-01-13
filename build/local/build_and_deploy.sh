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

# Pull down prod data artifact and unpack
cd ../build/local
mkdir -p postgres
cd postgres
oras pull quay.io/trey_b/contact_list:prod
tar -xzf datavol.tar.gz
rm datavol.tar.gz
cd ..

# Start containers
docker-compose up -d
