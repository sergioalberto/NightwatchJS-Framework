#
# Nightwatch.js Dockerfile
#

FROM sergiogq/js_automation_framework

# Install NodeJS:
RUN apt-get install -y nodejs \
    npm \
    curl \
    wget \
    build-essential

RUN npm install -g yarn
RUN npm install -g n
RUN n latest

RUN apt-get install -y \
    # Install ffmpeg for video recording:
    ffmpeg \
  && npm install -g \
    # Install Nightwatch.js:
    nightwatch

RUN npm i -g ntl && \
    npm i

ADD entrypoint.sh /entrypoint.sh
RUN chmod 755 /entrypoint.sh

ENV FIREFOX WAT

# Add node system user/group with uid/gid 1000.
# This is a workaround for boot2docker issue #581, see
# https://github.com/boot2docker/boot2docker/issues/581
RUN useradd -ms /bin/bash node

#RUN ln -s /usr/bin/nodejs /usr/bin/node
USER node

WORKDIR /home/node

#COPY wait-for.sh /usr/local/bin/wait-for
COPY entrypoint.sh /usr/local/bin/entrypoint

#ENTRYPOINT ["entrypoint"]
#RUN nightwatch

#CMD ["nightwatch"]
CMD ["yarn", "install"]
CMD ["npm", " i"]
#CMD ["ntl"]
#CMD ["npm", "run", "e2e-test"]
ENTRYPOINT ["/entrypoint.sh"]
