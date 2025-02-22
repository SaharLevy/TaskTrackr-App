# ---------------------
# Stage 1: Build the backend (compile TypeScript)
# ---------------------
    FROM node:18-alpine AS builder

    # Set the working directory in the container
    WORKDIR /app
    
    # Copy package.json and package-lock.json into /app
    # (Since the build context is the backend folder, we can refer to the files directly.)
    COPY package*.json ./
    
    # Install all dependencies (development and production)
    RUN npm install
    
    # Copy the rest of the backend source code into /app
    COPY . .
    
    # Run the build script (e.g., tsc) to compile TypeScript to JavaScript.
    # This typically creates a "dist" folder with the compiled output.
    RUN npm run build
    
    # ---------------------
    # Stage 2: Create the production image
    # ---------------------
    FROM node:18-alpine
    
    # Set the working directory in the container
    WORKDIR /app
    
    # Copy only the compiled output from the builder stage into /app/dist
    COPY --from=builder /app/dist ./dist
    
    # Also copy package.json files so we can install production dependencies.
    COPY package*.json ./
    
    # Install only production dependencies
    RUN npm install --production
    
    # Expose the port that your backend listens on
    EXPOSE 5000
    
    # Start the server using the compiled file.
    CMD ["node", "dist/server.js"]
    