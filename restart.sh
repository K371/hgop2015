#!/bin/bash
echo Restarting image on test machine...
ssh vagrant@192.168.33.10 'docker restart tictactoeContainer'