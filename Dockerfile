# Stage 1: Build assets dengan Node
FROM node:20 AS node-builder

WORKDIR /app

# Copy file konfigurasi satu per satu (tanpa || true)
COPY package.json ./
COPY package-lock.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.js ./

# Copy source files
COPY resources ./resources
COPY public ./public

# Install dependencies
RUN npm install

# Build assets
RUN npm run build

# Stage 2: PHP dengan Apache
FROM php:8.3-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libxml2-dev libzip-dev libonig-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    xml \
    zip \
    bcmath \
    fileinfo \
    gd \
    opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy semua file PHP
COPY . .

# Copy built assets dari node-builder
COPY --from=node-builder /app/public/build /var/www/html/public/build

# Install dependencies PHP
RUN composer install --no-dev --optimize-autoloader

# Setup Laravel
RUN php artisan config:cache || true \
    && php artisan route:cache || true \
    && php artisan view:cache || true

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Configure Apache
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf \
    && a2enmod rewrite

EXPOSE 80