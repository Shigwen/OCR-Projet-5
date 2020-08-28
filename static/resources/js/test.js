"use strict";   // passe en mode strict (rajoute des règles de js, voir doc)
{
	(async () => 
	{  // fonction asynchrone anonyme auto-appelée, syntaxe évoluée des promesses. IIFE : Immediatly Invoked Function Expression

        // TEDDIES
        
        const MAIN = document.querySelector("main");
        const TEDDIES_RESPONSE = await fetch("/api/teddies");  // await, car il ne doit pas passer à la suite avant d'avoir récupéré les données des oursons
		const TEDDIES = await TEDDIES_RESPONSE.json();     // de la même manière, on doit attendre d'en avoir fait un objet pour pouvoir l'utiliser par la suite
    
        TEDDIES.forEach(
			(teddy) => 
			{


				/* peut aussi s'écrire : (c'est la notation ES5, celle du dessus étant la notation ES6, plus courte, plus lisible, plus optimisée)

						const MAIN = document.querySelector("main");
				fetch("//localhost:3000/api/teddies").then(
					(response) => {
						response.json().then(
							(teddies) => {

								teddies.forEach(
									(teddy) => {
									}
								);
							}
						);
					}
				);
				*/


                /*
                    WORST
                */
						
				/*  ` Ce symbole permet de faire du templating en JS. C'est une côte spéciale qui permet d'insérer, entre autre, des variables */
				/* Cette méthode fait travailler inutilement le parser html, et est donc moins performante que les deux autres */

                // let content = `
                //     <product-card>
                //         <img src="${teddy.imageUrl}" alt="Image of a teddy bear named ${teddy.name}" />
                //         <card-content>
                //             <span data-name>${teddy.name}</span>
                //             <span data-description>${teddy.description}</span>
                //             <span data-price>${(teddy.price / 100).toFixed(2)} $</span>
                //             <span data-colors>${teddy.colors.join("<br />")}</span>
                //         </card-content>
                //     </product-card>
                // `;

                // MAIN.insertAdjacentHTML("beforeend", content);
                
                /*
                    AVERAGE
                */

				/* Fait appel au template que l'on a mis en commentaire dans le html, qu'il faut donc décommenter pour tester cette solution */
				/* Ne fait pas appel au parser html, puisque l'on a déjà créé le template dans le body du html */

                // const TEDDY_TEMPLATE = document.querySelector("template[data-teddy-row]");

                // const CONTENT = TEDDY_TEMPLATE.content.cloneNode(true);

                // const IMAGE = CONTENT.querySelector("img");
                // const NAME = CONTENT.querySelector("[data-name]");
                // const DESCRIPTION = CONTENT.querySelector("[data-description]");
                // const PRICE = CONTENT.querySelector("[data-price]");
                // const COLORS = CONTENT.querySelector("[data-colors]");

                // NAME.textContent = teddy.name;
                // DESCRIPTION.textContent = teddy.description;
                
                // IMAGE.src = teddy.imageUrl;
                // IMAGE.alt = `Image of a teddy bear named ${teddy.name}`;

                // PRICE.textContent = `${(teddy.price / 100).toFixed(2)} €`;
    
                // COLORS.innerHTML = teddy.colors.join("<br />"); // "Tan<br />Chocolate<br />Brown"
    
                // MAIN.appendChild(CONTENT);   /* rajoute tout ce noeud dans le body à la fin du contenu du main */


                /*
                    BEST
                */


				/* Tout est fait par le JS, y compris la création du tableau etc. Est une bonne pratique à adopter, même si moins facile à maîtriser au début */
				
                const CARD = document.createElement("product-card");
				
                const IMAGE = document.createElement("img"); // <img src="" alt="" />
                IMAGE.src = teddy.imageUrl;
                IMAGE.alt = `Image of a teddy bear named ${teddy.name}`;
				
                const CARD_CONTENT = document.createElement("card-content");
				
                const NAME = document.createElement("span");
                NAME.dataset.name = "";   /* Pas de valeur donnée aux datesets puisqu'ils doivent ici juste exister; on peut ainsi utiliser les querySelector ou le css dessus */
				// NAME.classList.add("my-class");    <= peut ajouter une classe dans la classlist d'un élément, comme s'il y avait class = "my-class", en plus des classes déjà existantes s'il y en a puisqu'il s'agit d'un ajout
				NAME.textContent = teddy.name;
				
                const DESCRIPTION = document.createElement("span");
				DESCRIPTION.dataset.description = "";
				DESCRIPTION.textContent = teddy.description;
				
                const PRICE = document.createElement("span");
				PRICE.dataset.price = "";
				PRICE.textContent = `${(teddy.price / 100).toFixed(2)} €`;
				
				const LINK = document.createElement("a");
				LINK.href = "/product.html?id="+teddy._id;

                CARD_CONTENT.appendChild(NAME);       /* On définit les liens de parentée. On les définit en dernier quand le code est fini et propre pour éviter d'ajouter par erreur n'importe quoi au dom en cas de problème */
                CARD_CONTENT.appendChild(DESCRIPTION);
                CARD_CONTENT.appendChild(PRICE);
                CARD.appendChild(IMAGE);
				CARD.appendChild(CARD_CONTENT);
				LINK.appendChild(CARD);
				MAIN.appendChild(LINK);
				
            }    /* fermeture de la fonction de call back ayant pour paramètre : teddy */
        );    /* fermeture du foreach teddy */


	})();   /* fermeture de la fonction asynchrome auto-appelée : la fonction est entourée de parenthèses, et ouvre des parenthèses vide (puisqu'elle est anonyme) pour s'auto-appeler */

	/* La fonction asynchrone peut aussi être écrite ainsi, et du coup être nommée test, et appelée par la suite :

    async function test(X)  { 
		...
		};
	test(X); 

	*/
}