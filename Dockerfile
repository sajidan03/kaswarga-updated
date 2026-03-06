# Stage 1: Build assets dengan Node
FROM node:20 AS node-builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY vite.config.js ./

# Install dependencies
RUN npm install

# Copy source files
COPY resources ./resources
COPY public ./public

# Build assets
RUN npm run build

# Stage 2: PHP dengan Apache
FROM php:8.3-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libxml2-dev libzip-dev libonig-dev \
    && apt-get clean

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring xml zip bcmath fileinfo gd opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy aplikasi PHP
COPY . .

# Copy assets yang sudah di-build dari stage node
COPY --from=node-builder /app/public/build ./public/build

# Install dependencies PHP
RUN composer install --no-dev --optimize-autoloader

# Cache Laravel
RUN php artisan config:cache || true
RUN php artisan route:cache || true
RUN php artisan view:cache || true

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Configure Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -i 's|/var/www/html|${APACHE_DOCUMENT_ROOT}|g' /etc/apache2/sites-available/000-default.conf \
    && a2enmod rewrite

EXPOSE 80