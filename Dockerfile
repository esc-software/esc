# syntax=docker/dockerfile:1

# ---- Build: install dependencies and generate the prerendered static site into /app/dist ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines VITE_* variables at build time. Pass them with --build-arg (see README).
ARG VITE_CONTACT_BASE_URL
ARG VITE_CHATBOT_BASE_URL
ENV VITE_CONTACT_BASE_URL=$VITE_CONTACT_BASE_URL \
    VITE_CHATBOT_BASE_URL=$VITE_CHATBOT_BASE_URL

RUN npm run build

# ---- Serve: static files behind nginx ----
FROM nginx:1.27-alpine AS serve
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
