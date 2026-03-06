# Stage 1: Build assets dengan Node
FROM node:20 AS node-builder

WORKDIR /app

# Copy semua file konfigurasi
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.js ./  
COPY postcss.config.js ./   

# Copy source files
COPY resources ./resources
COPY public ./public

# Install dependencies dan build
RUN npm install && \
    npm run build

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

# Copy semua file PHP
COPY . .

# Copy assets yang sudah di-build dari node-builder
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