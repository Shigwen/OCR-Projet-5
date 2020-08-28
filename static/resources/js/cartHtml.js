"use strict";   // passe en mode strict (rajoute des règles de js, voir doc)
{
	(async () => {  // fonction asynchrone anonyme auto-appelée, syntaxe évoluée des promesses

		const CART_CONTAINER = document.querySelector("cart-container");
		const TOTAL_PRICE = document.querySelector("total-price");

		function computePrice()
		{
			const SUM = Array.from(document.querySelectorAll("item-price")).reduce( // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce
				(sum, item_price) => // Le premier est argument est une fonction de callback qui utilise sum et item_price, et retourne sum 
				{
					sum += +item_price.textContent.substr(0, item_price.textContent.length - 2); // le deuxième "plus" transforme le résultat de l'ensemble de l'opération, d'une string à un nombre. Le "-2" retire l'espace et le symbole "euro" pour s'assurer que l'on ait bien que des nombres à additionner.
					return sum;
				},
				0 // Deuxième argument de la fonction reducde, qui est simplement la valeur de départ, ici 0
			).toFixed(2);
			TOTAL_PRICE.textContent = `${SUM} €`;
		};

		let my_cart = Cart.GetCurrentCart();
		await Promise.all(my_cart.items.map( // on utilise ici une promise et pas juste un foreach car on a besoin d'un contexte asynchrone pour le fetch de la const TEDDIES_RESPONSE
			async (cart_item) => 
			{
				const TEDDY_ID = cart_item.product_id.substr(0, cart_item.product_id.indexOf("$"));

				const COLOR_NAME = cart_item.product_id.substr(1 + cart_item.product_id.indexOf("$"));

				const TEDDIES_RESPONSE = await fetch("/api/teddies/"+TEDDY_ID);  // await, car il ne doit pas passer à la suite avant d'avoir récupéré les données des oursons
				const TEDDY = await TEDDIES_RESPONSE.json(); // On récupère toutes les infos du teddy qui a l'ID dans l'URL
	
				const CART_ITEM = document.createElement("cart-item");
				
                const IMAGE = document.createElement("img"); // <img src="" alt="" />
                IMAGE.src = TEDDY.imageUrl;
                IMAGE.alt = `Image of a teddy bear named ${TEDDY.name}`;

                // const CART_ITEM_CONTENT = document.createElement("card-content");

				const ITEM_NAME = document.createElement("item-name");
				ITEM_NAME.textContent = TEDDY.name;
				
                // const DESCRIPTION = document.createElement("span");
				// DESCRIPTION.textContent = TEDDY.description;

				const ITEM_PRICE = document.createElement("item-price");
				const NEW_PRICE = (TEDDY.price * cart_item.quantity / 100).toFixed(2);
				ITEM_PRICE.textContent = `${NEW_PRICE} €`;

				const ITEM_COLOR = document.createElement("item-color");
				ITEM_COLOR.textContent = `Couleur : ${COLOR_NAME}`;

				const LABEL = document.createElement("label");
				LABEL.insertAdjacentText("afterbegin", "Quantité : "); 

				const ITEM_QUANTITY = document.createElement("item-quantity");

				const INPUT = document.createElement("input");
				INPUT.type = "number";
				INPUT.min = 1;
				INPUT.defaultValue = cart_item.quantity;
				INPUT.addEventListener("input", () => 
					{
						my_cart.setProduct(cart_item.product_id, INPUT.value);
						my_cart.save();
						const NEW_PRICE = (TEDDY.price * INPUT.value / 100).toFixed(2);
						ITEM_PRICE.textContent = `${NEW_PRICE} €`;
						computePrice();
					}
				);

				const ITEM_DELETE = document.createElement("button");
				BUTTON.type = "button";
				BUTTON.textContent = "Supprimer";
				BUTTON.classList.add("btn");
				BUTTON.addEventListener(
					"click",
					() => {
						my-cart.removeProduct(TEDDY_ID);
						my_cart.save();
					}
				);
				
				
       			/* On définit les liens de parentée. On les définit en dernier quand le code est fini et propre pour éviter d'ajouter par erreur n'importe quoi au dom en cas de problème */

				CART_ITEM.appendChild(IMAGE);
				CART_ITEM.appendChild(ITEM_NAME);
				CART_ITEM.appendChild(ITEM_COLOR);
				CART_ITEM.appendChild(ITEM_QUANTITY);
				ITEM_QUANTITY.appendChild(LABEL);
				LABEL.appendChild(INPUT);
				CART_ITEM.appendChild(ITEM_PRICE);
				CART_ITEM.appendChild(ITEM_DELETE);
                CART_CONTAINER.appendChild(CART_ITEM);

            }    /* fermeture de la fonction de call back ayant pour paramètre : cart_item */
		));    /* fermeture de la map cart_item */
		computePrice();
	})();   /* fermeture de la fonction asynchrome auto-appelée : la fonction est entourée de parenthèses, et ouvre des parenthèses vide (puisqu'elle est anonyme) pour s'auto-appeler */
}
		
