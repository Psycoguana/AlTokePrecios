export function getTotalPrice(products) {
	let price = 0;

	if (products.length === 0) return price;

	products.forEach((product) => {
		price += product.sucursal.preciosProducto.precioLista * product.quantity;
	});

	return price;
}
