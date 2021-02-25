FROM php:7.3-apache
COPY config/php.ini  /usr/local/etc/php/php.ini
RUN apt-get update && apt-get install -y libc-client-dev libfreetype6-dev libmcrypt-dev libpng-dev libjpeg-dev libldap2-dev zlib1g-dev libkrb5-dev libtidy-dev libzip-dev libsodium-dev libpq-dev && rm -rf /var/lib/apt/lists/* \
	&& docker-php-ext-configure gd --with-freetype-dir=/usr/include/  --with-png-dir=/usr --with-jpeg-dir=/usr \
	&& docker-php-ext-install gd mysqli pdo pdo_mysql pdo_pgsql opcache zip iconv tidy \
    && docker-php-ext-configure ldap --with-libdir=lib/$(gcc -dumpmachine)/ \
    && docker-php-ext-install ldap \
    && docker-php-ext-configure imap --with-imap-ssl --with-kerberos \
    && docker-php-ext-install imap \
    && docker-php-ext-install sodium \
    && pecl install mcrypt-1.0.3 \
    && docker-php-ext-enable mcrypt \
    && docker-php-ext-install exif

RUN apt-get update && apt-get install -y ffmpeg    

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && a2enmod rewrite && a2enmod headers && service apache2 restart
