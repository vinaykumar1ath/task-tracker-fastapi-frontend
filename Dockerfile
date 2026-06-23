FROM node:24-alpine as build

WORKDIR /ttff

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25-alpine as ttff

RUN mkdir -p /etc/nginx/templates/ && cat <<'EOF' > /etc/nginx/templates/default.conf.template
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /auth {
    proxy_pass ${BACKEND_URL};
  }

  location /task {
    proxy_pass ${BACKEND_URL};
  }
}
EOF

COPY --from=build /ttff/dist/ /usr/share/nginx/html
