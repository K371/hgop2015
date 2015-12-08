### Test Examples
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
> Given [Placed(X,0,0) Placed(X,1,0)]
> When [Placed(X,0,1)]
> Then [Xwins()]

Sama tag 'X' eða 'O' í sama dálki.
> Given [Placed(X,0,0) Placed(X,0,1)]
> When [Placed(X,0,2)]
> Then [Xwins()]

Sama tag 'X' eða 'O' skáfellt niður hægri eða vinstri.
> Given [Placed(X,0,0) Placed(X,1,1)]
> When [Placed(X,2,2)]
> Then [Xwins()]

> Given [Placed(X,2,0) Placed(X,1,1)]
> When [Placed(X,0,2)]
> Then [Xwins()]

##### Consider draw scenarios.
> Given [AllPlaced()]
When [NoWinner()]
Then [Draw()]

Allir reitir fullir, enginn sigurvegari.
