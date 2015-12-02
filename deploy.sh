#!/bin/bash
echo Pushing to Docker
docker push k371/tictactoe

echo Stopping, removing, pulling and running TicTacToe
ssh vagrant@192.168.33.10 'docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker pull k371/tictactoe
docker run -p 9000:8080 -d -e "NODE_ENV=production" k371/tictactoe'
