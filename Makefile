install: build up status

up:

		docker-compose up -d

stop:

		docker-compose stop

rm: stop

		docker-compose rm

build:

		docker-compose build

status:

		docker-compose ps

test_behat:

		docker-compose run --rm web vendor/bin/behat .
