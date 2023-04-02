import React, { useState, useEffect, useRef } from 'react';
import { Button, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './components/screens/Home/HomeScreen';
import ChangoScreen from './components/screens/Chango/ChangoScreen';
import ScannerScreen from './components/screens/Scanner/ScannerScreen';
import SucursalesScreen from './components/screens/Sucursales/SucursalesScreen';
import ProductsListScreen from './components/screens/ProductList/ProductsListScreen';
import Exception from './components/shared/Exception';

import { theme } from './styles';

import { getSucursales } from './features/API';
import { getLocation } from './features/location';

import Loading from './components/shared/Loading';
import AppContext from './context/AppContext';

export default function App() {
	let sucursales = useRef(null);
	let location = useRef(null);
	const [sucursalesLoaded, setSucursalesLoaded] = useState(false);
	const [locationLoaded, setLocationLoaded] = useState(false);
	const [error, setError] = useState('');

	const Stack = createNativeStackNavigator();

	useEffect(() => {
		(async function () {
			if (!location.current) {
				updateLocation();
			}
		})();
	}, []);

	async function updateLocation() {
		const locationData = await getLocation();
		console.log('Location cargada');
		const { latitude, longitude } = locationData.coords;
		location.current = { latitude, longitude };
		setLocationLoaded(true);

		const sucursalesData = await getSucursales(location.current);
		console.log(sucursalesData);
		if ('errorMessage' in sucursalesData) {
			console.log(sucursalesData);
			if (sucursalesData.errorMessage.includes('Task timed out after')) {
				setError('Precios Claros no responde 😔\nSuele suceder a la mañana, vuelva a intentar pronto.');
			} else {
				setError(sucursalesData.errorMessage);
			}
			console.log(sucursalesData.errorMessage);
			return;
		}
		console.log('Sucursales cargadas');
		sucursales.current = sucursalesData.sucursales;
		setSucursalesLoaded(true);
	}

	function getNavigator() {
		return (
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerLargeStyle: {},
						headerStyle: {
							backgroundColor: theme.colors.primary,
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
					}}
				>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={({ navigation }) => ({
							headerRight: () => (
								<Ionicons
									onPress={() => navigation.navigate('Chango')}
									name="cart"
									style={{ fontSize: 35, color: theme.colors.background }}
								/>
							),
						})}
					/>
					<Stack.Screen
						name="ProductsList"
						component={ProductsListScreen}
						options={({ route }) => ({
							title: route.params.query,
							headerRight: () => (
								<Button
									onPress={() => {
										alert('Button Pressed');
									}}
									title="Search"
									color={theme.colors.primary}
								></Button>
							),
						})}
					/>
					<Stack.Screen name="Chango" component={ChangoScreen} />
					<Stack.Screen name="Sucursales" component={SucursalesScreen} />
					<Stack.Screen name="Barcode Scanner" component={ScannerScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

	function showException() {
		return (
			<>
				<Exception text={error} icon="alert-circle-outline" style={{ margin: 20, fontSize: '1rem' }} />
				<Button
					mode="contained"
					style={{ margin: 35 }}
					onPress={async () => {
						setError();
						updateLocation();
					}}
				>
					Reintentar
				</Button>
			</>
		);
	}

	function MainScreen() {
		if (error) {
			return showException();
		} else if (sucursalesLoaded) {
			return getNavigator();
		} else if (!locationLoaded) {
			return <Loading description={'Obteniendo ubicación...'} />;
		} else if (!sucursalesLoaded) {
			return <Loading description={'Buscando sucursales...'} />;
		}
	}

	return (
		<AppContext.Provider value={{ sucursales, location }}>
			<PaperProvider theme={theme}>
				<MainScreen />
			</PaperProvider>
		</AppContext.Provider>
	);
}
