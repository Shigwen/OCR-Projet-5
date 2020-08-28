

class Cart
{
	static CurrentCart = null; //Renverra null au lieu d'undefined si on fait appel à cart.instance (l'espace mémoire est réservé)
	constructor()
	{
		this.items = [];  //crée un tableau qui contiendra nos paires clef valeur, ID du nounours et nombre à acheter)
	}

	_getProductIndex(product_id)  // Par convention, on note cette fonction à usage interne (private ou protected) avec un underscore
	{
		return this.items.findIndex(
			(item) =>
			{
				return item.product_id === product_id;		// On cherche un objet qui a le même ID que celui passé en paramètre de la fonction
			}
		);
	}


	/* on peut faire appel à la fonction qui suit de la sorte : cart.setProduct(teddy._id, 1); */
	setProduct(product_id, quantity) 
	{
		if (quantity < 1)
		{
			throw new Error("Quantity cannot be less than 1");
		}
		const index = this._getProductIndex(product_id); // On utilise notre fonction _getProductIndex pour obtenir l'index de notre objet en fonction de son ID
		
		if (index > -1) // Si l'objet existe déjà...
		{
			this.items[index].quantity = quantity; // ... on met à jour la quantité dans le tableau par celle qui est passée en paramètre de la fonction
		}
		else // Si au contraire il n'existe pas...
		{
			const item = { product_id, quantity }; // On crée un objet (item) qui a l'ID et la quantité que l'on a passé en paramètres
			this.items.push(item); // Ajoute l'objet créé (item) au tableau
		}
	}


	removeProduct(product_id)
	{
		const index = this._getProductIndex(product_id);
		if (index > -1)
		{
			this.items.splice(index, 1);  // retire un élément à partir de son index, donc retire le nounours qui a l'ID, et réarrange le tableau, contrairement à delete
		}
	}

		/* Permet par exemple, si un objet est déjà présent dans le panier, d'afficher sa carte produit différemment dans l'index.html */
	hasProduct(product_id)
	{
		const index = this._getProductIndex(product_id);
		return (index > -1) // Dans notre expression, l'opérateur fait appel à une "fonction secrète" qui renverra true ou false (boolean)
	}                     
	
	getProductQuantity(product_id)
	{
		const index = this._getProductIndex(product_id);
		if (index > -1)
		{
			return this.items[index].quantity;
		}
		else
		{
			return 0;
		}
	}

	getProductCount()
	{
		return this.items.length;
	}

	save()
	{
		localStorage.setItem("cart", JSON.stringify(this.items)); // On stringify notre array pour en faire une variable scalaire qui peut aller dans le localstorage
	}

	static GetCurrentCart()
	{
		if (!Cart.CurrentCart) // Si Cart.CurrentCart est falsy... (il peut exister et être falsey, ou ne pas exister (et être falsy aussi puisqu'undefined), mais ce n'est pas pareil)
		{
			const object = new Cart();   // On crée une constante object et on lui affecte une nouvelle instance de la classe Cart
			let data = localStorage.getItem("cart");  // On récupère la string qui est dans le local storage (qui sera une string vide si le LS était vide, ou [] si on a save un cart vide à un moment dans le local storage) et on le stoque dans data

			if (data) // Si data est vide car le localstorage était vide, data est falsey, et le contenu de ce if n'est pas appliqué
			{
				data = JSON.parse(data);		// On retransforme notre scalaire en json pour notre array
				object.items = data;   // Notre object étant une nouvelle instance de la classe cart, il contient par défaut un tableau items vide, que l'on remplit avec data     
			}	

			Cart.CurrentCart = object;  // propriété de la classe Cart qui permet de faire en sorte que l'instance en cours contienne bien l'objet qui a stocké le contenu du storage
		}

		return Cart.CurrentCart; // Ne pas oublier : Currentcart est une propriété statique de la classe cart.
	}
}


// let my_cart = Cart.GetCurrentCart();

// my_cart.items.forEach(
// 	(teddy) => 
// 	{

// 	}
// );