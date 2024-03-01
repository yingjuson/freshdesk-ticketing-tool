FROM j6wdev/rel:gpo-ticketing
COPY . .
RUN composer update
RUN chmod 777 storage -R