"use strict";
(async () => 
	{ 
		const MAIN = document.querySelector("main");

		// Cette méthode va nous éviter d'avoir à faire appel inutilement au local storage, ou de créer une page par produit. 
		// Inconvénient : on ne peut arriver à cette page produit que depuis la liste de produits ou en connaissant déjà l'ID du produit et en la mettant dans l'URL.
		
		const TEDDY_ID = document.location.search.substr(4); // On récupère l'ID dans l'URL, sans les 4 symboles ?id=
		const TEDDIES_RESPONSE = await fetch("/api/teddies/"+TEDDY_ID);  // await, car il ne doit pas passer à la suite avant d'avoir récupéré les données des oursons
		const TEDDY = await TEDDIES_RESPONSE.json(); // On récupère toutes les infos du teddy qui a l'ID dans l'URL

		const CARD = document.createElement("product-card");
				
		const IMAGE = document.createElement("img"); // <img src="" alt="" />
		IMAGE.src = TEDDY.imageUrl;
		IMAGE.alt = `Image of a TEDDY bear named ${TEDDY.name}`;
		
		const CARD_CONTENT = document.createElement("card-content");
		
		const NAME = document.createElement("span");
		NAME.dataset.name = "";
		// NAME.classList.add("my-class");    <= peut ajouter une classe dans la classlist d'un élément, comme s'il y avait class = "my-class", en plus des classes déjà existantes s'il y en a puisqu'il s'agit d'un ajout
		NAME.textContent = TEDDY.name;
		
		const DESCRIPTION = document.createElement("span");
		DESCRIPTION.textContent = TEDDY.description;
		
		const PRICE = document.createElement("span");
		PRICE.dataset.price = "";
		PRICE.textContent = `${(TEDDY.price / 100).toFixed(2)} €`;
		
		const COLORS = document.createElement("select");
		COLORS.required = true;
		{
			const OPTION = document.createElement("option");  /* Parce qu'il faut cette ligne en plus de celles des couleurs */
			OPTION.textContent = "Choisissez une couleur";
			OPTION.defaultSelected = true;
			OPTION.disabled = true;
			OPTION.hidden = true;
			COLORS.appendChild(OPTION);
		}
		TEDDY.colors.forEach(
			(color) => 
			{
				const OPTION = document.createElement("option");
				OPTION.value = color;
				OPTION.textContent = color;
				COLORS.appendChild(OPTION);
			}
		);
		
		const BUTTON = document.createElement("button");
		BUTTON.type = "submit";
		BUTTON.textContent = "Ajouter au panier";
		BUTTON.classList.add("btn");
		BUTTON.dataset.id = TEDDY_ID;


		const ADD_PRODUCT_FORM = document.createElement("form");
		ADD_PRODUCT_FORM.method = "GET";
		ADD_PRODUCT_FORM.action = "/cart.html";
		ADD_PRODUCT_FORM.addEventListener("submit", (event) => 
		{
			const PRODUCT_ID = TEDDY_ID + "$" + COLORS.value;
			let my_cart = Cart.GetCurrentCart();
			let teddyQuantity = my_cart.getProductQuantity(PRODUCT_ID);	
			++teddyQuantity;
			my_cart.setProduct(PRODUCT_ID, teddyQuantity)
			my_cart.save();
		});

	/* On définit les liens de parentée. On les définit en dernier quand le code est fini et propre pour éviter d'ajouter par erreur n'importe quoi au dom en cas de problème */
		
		CARD_CONTENT.appendChild(NAME);  
		CARD_CONTENT.appendChild(DESCRIPTION);
		CARD_CONTENT.appendChild(PRICE);
		CARD_CONTENT.appendChild(ADD_PRODUCT_FORM);
		ADD_PRODUCT_FORM.appendChild(COLORS);
		ADD_PRODUCT_FORM.appendChild(BUTTON);
		CARD.appendChild(IMAGE);
		CARD.appendChild(CARD_CONTENT);
		MAIN.appendChild(CARD);
		
	}
)();		

