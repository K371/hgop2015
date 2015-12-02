#!/bin/bash
echo DevEnv - Vagrant Up
cd vagrant
vagrant up

vagrant ssh -c 'docker login --username=k371 --password=$DOCKER_PASS --email=$DOCKER_EMAIL && docker push k371/tictactoe 
exit'

cd ../../HGOP
vagrant up
vagrant ssh -c '(DOCKER=$(docker ps -q)
	if[ ! -z "$DOCKER" ]
	then docker kill $DOCKER
	fi && docker pull k371/tictactoe)
	docker run -p 8080:8080 -d -e "NODE_ENV=production" k371/tictactoe'
