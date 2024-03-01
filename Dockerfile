FROM j6wdev/rel:gpo-ticketing
COPY --chown=1001:0 . .
RUN composer update --no-dev --optimize-autoloader
RUN chmod 777 storage -R