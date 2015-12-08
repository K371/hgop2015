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

### Testing
##### Consider failure (illegal move) scenarios. Do not trust the clients to always do the right things in the right order.
Bönnuð aðgerð gæti verið að setja 'X' eða 'O' á stað þar sem 'X' eða 'O' er nú þegar.

Given [Placed(X,0,0)]
When [Placed(O,0,0)]
Then [PromptAgainForInput()]

Bönnuð aðgerð er að 'X' eða 'O' geri tvisvar í röð.

Given [Placed(X,0,0)]
When [Placed(X,0,1)]
Then [Error("Duplicate turns for player X")]


##### Consider winning scenarios. Hint: There are at least three winning scenarios that must be considered from a programming perspective.
Sama tag 'X' eða 'O' í sömu röð.
> Given [Placed(X,0,0) Placed(X,1,0) Placed(X,2,0)]

Sama tag 'X' eða 'O' í sama dálki.
> Given [Placed(X,0,0) Placed(X,0,1) Placed(X,0,2)]

Sama tag 'X' eða 'O' skáfellt niður hægri eða vinstri.
> Given [Placed(X,0,0) Placed(X,1,1) Placed(X,2,2)]

> Given [Placed(X,2,0) Placed(X,1,1) Placed(X,0,2)]

##### Consider draw scenarios.
> Given [AllPlaced()]
When [NoWinner()]
Then [Draw()]

Allir reitir fullir, enginn sigurvegari.
