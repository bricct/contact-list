#!/bin/bash
set -euo pipefail

dotnet publish \
/t:PublishContainer -c Release -r linux-arm64 --no-self-contained \
/p:ContainerImageTag=latest /p:ContainerBaseImage=mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim \
/p:ContainerUser=1001 /p:ContainerWorkingDirectory=/usr/bin/api \
/p:ContainerRepository=contact_list_api ../backend/ContactList/ContactListApi

cd ../frontend

docker build -t contact_list_frontend:latest -f ../build/Dockerfile.frontend .

cd ../postgres
oras pull quay.io/trey_b/contact_list:latest
tar -xzf datavol.tar.gz
rm datavol.tar.gz

cd ../build
docker-compose up -d

sleep 5

cd ../frontend
npx playwright test
