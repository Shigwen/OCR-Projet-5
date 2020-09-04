"use strict";
{
	(async () => {
		const MAIN = document.querySelector("main");

		// Depuis cartHTML.js, on obtient ceci : FORM.action + "?id=" + ORDER.orderId + "&price=" + SUM

		//Le substr(1) retire le "?"" du début. Le split "&" va séparer chaque bout de string qui commence par un "&"
		const SEARCH_PARAMETERS = document.location.search.substr(1).split("&").reduce(
			(accumulator, item) => 
			{
				// On part du signe "=" de "&price=" comme index
				const INDEX = item.indexOf("=");
				// On récupère le texte du début jusqu'à l'index ("=")
				const NAME = item.substr(0, INDEX);
				// On récupère tout ce qu'il y a après l'index, en excluant l'index qui est inclu de base grâce au +1
				const VALUE = item.substr(1 + INDEX);
				// Affectation dynamique. La constante NAME contient le nom de la propriété à modifier.
				accumulator[NAME] = VALUE;
				return accumulator;
			},
			{}
		);

		const MY_ORDER_PRICE = SEARCH_PARAMETERS.price;
		const MY_ORDER_ID = SEARCH_PARAMETERS.id;

		const ORDER_PRICE = document.createElement("span");
		ORDER_PRICE.textContent = `Votre commande d'un montant total de ${MY_ORDER_PRICE} € a bien été validée.`;

		const ORDER_ID = document.createElement("span");
		ORDER_ID.textContent = `Référence de votre commande : ${MY_ORDER_ID}. Gardez la référence de votre commande, elle vous sera demandée en cas de problème.`;

		MAIN.appendChild(ORDER_ID);
		MAIN.appendChild(ORDER_PRICE);

		localStorage.clear();
	}
	)();
}