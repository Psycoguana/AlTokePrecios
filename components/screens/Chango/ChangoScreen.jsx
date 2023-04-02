import { useEffect, useState } from 'react';
import { FlatList, ToastAndroid, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { getFromStorage, clearStorage } from '../../../features/Storage';
import { ClearCartDialog } from '../../../features/Dialogs';
import Card from '../../shared/Card';
import Exception from '../../shared/Exception';
import ProductCard from './ProductCard';
import { theme } from '../../../styles';
import { getTotalPrice } from './index';

export default function ChangoScreen() {
	const [products, setProducts] = useState([]);
	const [showClearCartDialog, setShowClearCartDialog] = useState(false);

	useEffect(() => {
		async function init() {
			const storedProducts = await getFromStorage();
			if (storedProducts) setProducts(storedProducts);
		}

		init();
	}, []);

	async function borrarChango() {
		await clearStorage();
		setProducts([]);
		ToastAndroid.show('List de compras eliminada', ToastAndroid.SHORT);
	}

	function showLista() {
		return (
			<>
				<Text variant="headlineLarge" style={styles.precio}>
					Precio Total: ${getTotalPrice(products)}
				</Text>

				<FlatList
					data={products}
					style={{ flex: 0.9 }}
					// We have to use both ids, cause we might have multiple products from one store,
					// or multiple products from different stores.
					keyExtractor={(item) => `${item.sucursal.id}${item.id}`}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity>
								<Card>
									<View>
										<ProductCard product={item} />
									</View>
								</Card>
							</TouchableOpacity>
						);
					}}
				></FlatList>

				<Button
					mode="elevated"
					uppercase
					buttonColor={theme.colors.primary}
					textColor={theme.colors.onPrimary}
					style={styles.removeBtn}
					onPress={() => setShowClearCartDialog(true)}
				>
					Borrar Chango
				</Button>

				<ClearCartDialog
					showDialog={showClearCartDialog}
					setShowDialog={setShowClearCartDialog}
					onAccept={async () => await borrarChango()}
				/>
			</>
		);
	}

	if (products.length > 0) {
		return showLista();
	} else {
		return <Exception text="Lista vacía" icon="playlist-remove" />;
	}
}

const styles = StyleSheet.create({
	precio: { justifyContent: 'center', alignSelf: 'center', margin: 15, marginTop: 1 },
	prodList: { marginBottom: 0 },
	btn: {
		marginTop: '5%',
	},
	removeBtn: {
		margin: 5,

		buttonColor: theme.colors.primary,
	},
});
