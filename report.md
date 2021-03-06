# Report

### About Vagrant.
Vagrant er notað til þess að búa til heilsteypt þróunarumhverfi. Markmiðið með að nota Vagrant er að auka sjálfvirkni, lækka uppsetningartíma og auðvelda þróun í samstarfi við drefingu á hugbúnaði.

### VirtualBox
VirtualBox er hugbúnaður sem gerir manni kleift að sjá x86 vélbúnað fyrir sér, sértaklega fyrir vefþjóna og tölvur.

### Grunt
Grunt er notað til að auka sjálfvirkni með því að ef þarf að gera sama hlutinn til dæmis fyrir hvert *build* þá er hægt að gera það sjálfvirkt.

### npm
npm er pakkastjórnandi fyrir nodejs. npm hjálpar notendum að setja upp og gefa út pakka.

### nodejs
Nodejs er notað til að búa til skalanleg internet-forrit. Nodejs er ósamstilltur rammi sem byggist á atburðum.

### bower
Bower er notað til þess að ná í og setja upp pakka þar sem markmiðið er að þurfa ekki að leita út um allt internetið að pakka, heldur vera með þá á sama stað.

### Topology
Bæði þróunarvélin og prófunarvélin þurfa að vera í gangi til þess að build-a og deploy-a kerfinu okkar. Þróunarvélin gerir ráð fyrir að prófunarvélin sé í gangi. Þróunarvélin tengist prófunarvélinni með ssh á local-IP tölu prófunarvélarinnar sem er á "Private Network-i" þar sem búið er að gefa þróunarvélinni lykil til þess að tengjast prófunarvélinni án lykilorðs. Þróunarvélin uppfærir og endurkeyrir kerfið á prófunarvélinni.

### Load Tests
Er að ná 100 runs undir 7 sekúndum.

### Jenkins scripts / Wrap Up

#### Commit Stage
> export DISPLAY=:0

> npm install

> bower install

> ./dockerbuild.sh

#### Deployment Stage
> ./deploy.sh

#### Acceptance Test
> export DISPLAY=:0

> npm install

> ./acceptance.sh

#### Load Test / Capacity

> export DISPLAY=:0

> npm install

> ./loadTest.sh
