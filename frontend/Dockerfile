FROM node:20-alpine AS development
ENV NODE_ENV development

# Add a work directory
WORKDIR /usr/app

# Cache and Install dependencies
COPY package.json .
RUN yarn install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD [ "react-scripts", "start" ]
