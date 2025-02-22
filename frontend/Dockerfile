# ---------------------
# Stage 1: Build the frontend
# ---------------------
    FROM node:18-alpine AS builder

    # Set the working directory inside the container
    WORKDIR /app

    # Declare a build argument for the API URL
    ARG REACT_APP_API_URL
    # Set it as an environment variable for the build
    ENV REACT_APP_API_URL=$REACT_APP_API_URL
    
    # Copy package.json and package-lock.json into /app
    COPY package*.json ./
    
    # Install all frontend dependencies
    RUN npm install
    
    # Copy the entire frontend source code into /app
    COPY . .
    
    # Run the build script which produces the production-ready static files
    # (Typically outputting to a "build" folder)
    RUN npm run build
    
    # ---------------------
    # Stage 2: Create the production image using Nginx
    # ---------------------
    FROM nginx:stable-alpine
    
    # Copy the static build output from the builder stage into Nginx's serving directory
    COPY --from=builder /app/build /usr/share/nginx/html
    
    # Expose port 80 for HTTP traffic
    EXPOSE 80
    