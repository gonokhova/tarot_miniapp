#!/bin/bash

# Сборка приложения
echo "Building the application..."
npm run build

# Создание архива
echo "Creating archive..."
zip -r deploy.zip build/

echo "Deployment package created: deploy.zip"
echo "Upload this file to your hosting provider"
echo "After uploading, your Web App URL will be: https://your-domain.com" 