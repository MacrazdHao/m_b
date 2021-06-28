FROM nginx
COPY ./dist /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/myfellas.conf /etc/nginx/conf.d/default.conf
EXPOSE 8004
CMD ["nginx","-g","daemon off;"]