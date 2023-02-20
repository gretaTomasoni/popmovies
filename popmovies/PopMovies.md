Professionista: Tomasoni Greta
Nome progetto: PopMovies

Descrizione
Realizzare una web app dove mostrare i film più popolari della storia del cinema.

Target
Utenti appassionati di cinema

Linee guida

Riferimento a Movie DB API:
https://developers.themoviedb.org/3/getting-started/search-and-query-for-details

Strumenti:
utilizza JSON Formatter per Chrome qualora non l’abbia installato in modo da
vedere il JSON formattato direttamente da Chrome.

Layout:
Il cliente ci ha richiesto un design molto simile ad Amazon Prime Video.

Richieste importanti da parte del nostro cliente:

- Dobbiamo creare una web app simile a Prime Video ma dal design rinnovato e accattivante, adatto ad una fascia di età compresa tra i 25 e i 45 anni.
- Vogliamo una separazione di genere mettendo in risalto queste categorie: commedia, thriller, horror. Poi vada per il resto delle categorie.
- Sarebbe possibile avere una sezione separata anche per i TOP rated magari raggiungibile da una voce di menu? Esiste un endpoint di MovieDB API che ci permette di avere i top rated?
- Sarebbe possibile per ogni card “Movie” avere al click l’apertura di una modal con i dettagli del film?
- Al cliente non interessano le serie TV ma solo i film quindi NON visualizziamo eventuali serie TV che l’endpoint potrebbe restituire. Prestiamo attenzione.
- Possiamo trovare un modo di stampare il vote_average per ogni movie attraverso la
  stampa di “n” stelle? Esempio: https://codepen.io/FredGenkin/pen/eaXYGV

Considerazioni importanti

- Bisogna trovare una strategie per capire quali sono i film più popolari sfruttando le API che abbiamo a disposizione. Ci sarà sicuramente qualche proprietà nell’oggetto movie che ci può far comprendere che un film è popolare, oppure potrebbe esistere un qualche endpoint che le API di MovieDB ci mettono a disposizione?
