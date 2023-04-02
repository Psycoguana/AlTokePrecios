import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = '@Productos';

export async function saveToStorage(productData) {
	console.log('Saving: ', productData);
	// Get previous products and convert them to JSON.
	let previousArray = await AsyncStorage.getItem(storageKey);
	previousArray = JSON.parse(previousArray);

	let isNewProduct = true;
	let newArray = [];

	// If there are no previous products, push the product into the newArray.
	if (previousArray === null) {
		newArray.push(productData);
	} else {
		// If there are more products, check if the product is new and update the quantity accordingly.
		previousArray.some((oldProduct) => {
			if (oldProduct.sucursal.id === productData.sucursal.id && oldProduct.id === productData.id) {
				console.log('Adding moreeeee');
				oldProduct.quantity += productData.quantity;
				isNewProduct = false;
			}
		});

		// Now, the new array is equal to the previous array + the new product if the product is new. Otherwise it's equal to the previous array.
		newArray = isNewProduct ? [...previousArray, productData] : previousArray;
	}

	let stringifiedValue = JSON.stringify(newArray);
	await AsyncStorage.setItem(storageKey, stringifiedValue);
}

export async function getFromStorage() {
	let storedData = await AsyncStorage.getItem(storageKey);
	return JSON.parse(storedData);
}

export async function clearStorage() {
	await AsyncStorage.clear();
}
