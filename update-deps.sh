#!/bin/bash

# Backup current package.json
cp package.json package.json.backup

# Update packages to secure versions
npm install --save \
  react-scripts@latest \
  xlsx@latest \
  @tailwindcss/forms@latest \
  autoprefixer@latest \
  postcss@latest \
  tailwindcss@latest \
  axios@latest \
  framer-motion@latest \
  recharts@latest

# Update dev dependencies
npm install --save-dev vercel@latest

# Fix any remaining vulnerabilities
npm audit fix --force

# Clean up
rm -rf node_modules package-lock.json
npm install

echo "Dependencies have been updated. Please test your application thoroughly."
echo "A backup of your original package.json has been saved as package.json.backup"
