FROM j6wdev/rel:gpo-ticketing
COPY . .
RUN composer update
RUN chmod 777 storage -R
RUN apk add --no-cache nodejs npm
RUN npm install
RUN npm run build