FROM microbox/scratch:node

# Create non-root user
RUN adduser -D -h /home/one -s /bin/sh one
RUN mkdir -p /home/one/{tmp,app} && chown -R one:one /home/one
ENV HOME /home/one
ENV TMPDIR /home/one/tmp

# Add existing file to docker images
ADD .   /home/one/app

# setup workdir
WORKDIR /home/one/app

CMD ["bin/standalone"]
