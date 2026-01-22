FROM node:24-bullseye

# Set working directory
WORKDIR /wello

# Installing dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy necessary files
COPY app ./app/
COPY public ./public/
COPY tsconfig.json next-env.d.ts next.config.ts tailwind.config.ts postcss.config.mjs eslint.config.mjs ./

# Install dependencies
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

