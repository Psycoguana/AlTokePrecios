import * as Location from 'expo-location';

export async function getLocation() {
	let { status } = await Location.requestForegroundPermissionsAsync();
	console.log('Location Permission: ', status.toString());
	if (status !== 'granted') {
		console.log('Permission to access location was denied');
		return;
	}

	try {
		const location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Balanced,
			maximumAge: 10000,
		});
		return location;
	} catch (error) {
		console.log(error);
	}
}

export async function getLastLocation() {
	let { status } = await Location.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		console.log('Permission to access location was denied');
		return;
	}

	try {
		const location = await Location.getLastKnownPositionAsync();
		console.log(location);
		return location;
	} catch (e) {
		console.log(e);
	}
}
