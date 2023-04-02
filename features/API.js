import axios from 'axios';

import localSucursales from '../JSON_Responses/sucursales.json';
import localProductByEan from '../JSON_Responses/product_ean.json';
import localSimpleProduct from '../JSON_Responses/product.json';

// TODO: Add timeout.
const TEST = false;

function getSucursalesIds(sucursales) {
	return sucursales.map((sucursal) => sucursal.id);
}

export function getProductByEAN(ean, sucursales) {
	if (TEST) {
		return new Promise((resolve, reject) => {
			resolve(localProductByEan);
		});
	}

	const sucursalesIds = getSucursalesIds(sucursales);

	return axios
		.get('https://d3e6htiiul5ek9.cloudfront.net/prod/producto', {
			params: { id_producto: ean, array_sucursales: sucursalesIds.join(','), limit: 30 },
		})
		.then((response) => response.data)
		.catch((e) => {
			console.log(e);
		});
}

export function getSucursales(location) {
	if (TEST) {
		return new Promise((resolve, reject) => {
			resolve(localSucursales);
		});
	}

	return axios
		.get('https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales', {
			params: {
				lat: location.latitude,
				lng: location.longitude,
				offset: 0,
				limit: 30,
			},
		})
		.then((response) => response.data)
		.catch((e) => {
			console.log(e);
		});
}

export function searchProduct(query, sucursales) {
	if (TEST) {
		return new Promise((resolve, reject) => {
			resolve(localSimpleProduct);
		});
	}

	const sucursalesIds = getSucursalesIds(sucursales);

	return axios
		.get('https://d3e6htiiul5ek9.cloudfront.net/prod/productos', {
			params: {
				string: query,
				array_sucursales: sucursalesIds.join(','),
				offset: 0,
				limit: 50,
				sort: '-cant_sucursales_disponible',
			},
		})
		.then((response) => response.data)
		.catch((e) => {
			console.log(e);
		});
}
