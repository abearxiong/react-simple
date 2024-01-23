# docker build . -t demo
FROM nginx

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p  /home/frontend/

COPY ./dist  /home/frontend/demo

ADD ./nginx/demo.conf /etc/nginx/conf.d/
