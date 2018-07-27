include test/.env

SHELL                := /bin/bash
DOCKER_COMPOSE       := /usr/local/bin/docker-compose
DOCKER_COMPOSE_BASE  := $(DOCKER_COMPOSE)
container=nightwatch_framework

ifdef PROJECT_NAME
DOCKER_COMPOSE_BASE  += -p $(PROJECT_NAME)
endif

TEST_TARGET ?= https://vacations-management.herokuapp.com/users/sign_in

.PHONY: default
default: run

.PHONY: docker-compose
docker-compose: $(DOCKER_COMPOSE)

$(DOCKER_COMPOSE): DOCKER_COMPOSE_VERSION := 1.14.0
$(DOCKER_COMPOSE):
	@if [ ! -w $(@D) ]; then echo 'No docker-compose found. Please run "sudo make docker-compose" to install it.'; exit 2; else true; fi
	@curl -L https://github.com/docker/compose/releases/download/$(DOCKER_COMPOSE_VERSION)/docker-compose-`uname -s`-`uname -m` > $@
	@chmod +x $@

.PHONY: build
build:
	$(DOCKER_COMPOSE_BASE) build

.PHONY: run
run:
	@mkdir -p videos screenshots reports
	@chown 1000:1000 videos screenshots reports
	$(DOCKER_COMPOSE_BASE) up -d hub chrome firefox
	@if [ $$browser = "Firefox" ]; then\
	    echo "Running Firefox browser ...";\
		$(DOCKER_COMPOSE_BASE) run --name $container -e FIREFOX=true --rm nightwatch;\
	fi
	@if [ $$browser = "Chrome" ]; then\
	    echo "Running Chrome browser ...";\
		$(DOCKER_COMPOSE_BASE) run --name $container -e FIREFOX=false --rm nightwatch;\
	fi

debug:
	@mkdir -p videos screenshots reports
	@chown 1000:1000 videos screenshots reports
	$(DOCKER_COMPOSE_BASE) up -d hub chrome-debug firefox-debug
	@if [ $$browser = "Firefox" ]; then\
	    echo "Running Firefox browser on debugging mode ...";\
		$(DOCKER_COMPOSE_BASE) run --name $container -e FIREFOX=true --rm nightwatch;\
	fi
	@if [ $$browser = "Chrome" ]; then\
	    echo "Running Chrome browser on debugging mode ...";\
		$(DOCKER_COMPOSE_BASE) run --name $container -e FIREFOX=false --rm nightwatch;\
	fi

.PHONY: clean
clean:
    # kills and removes docker containers
	$(DOCKER_COMPOSE_BASE) down -v
	$(DOCKER_COMPOSE_BASE) kill && $(DOCKER_COMPOSE_BASE) rm -vf
