import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AddToCardDialog, PromoDialog } from '../../../features/Dialogs';

import { getDistance } from 'geolib';

import Card from '../../shared/Card';
import AppContext from '../../../context/AppContext';
import { saveToStorage } from '../../../features/Storage';

export default function SucursalCard({ sucursal, product }) {
	const [promosState, setPromosState] = useState([]);
	const [showAddToCardDialog, setShowAddToCardDialog] = useState(false);
	const [showPromoDialog, setShowPromoDialog] = useState(false);
	const { location } = useContext(AppContext);
	const distance = getSucursalDistance();

	useEffect(() => {
		const promosArray = [sucursal.preciosProducto.promo1, sucursal.preciosProducto.promo2];
		let goodPromos = [];

		promosArray.map((promo) => {
			if (promo.precio) {
				goodPromos.push(promo);
			}
		});

		setPromosState(goodPromos);
	}, []);

	function titleCase(str) {
		return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
	}

	function getSucursalDistance() {
		const dstLocation = { latitude: sucursal.lat, longitude: sucursal.lng };
		const currentLocation = { latitude: location.current.latitude, longitude: location.current.longitude };
		const distance = getDistance(dstLocation, currentLocation);
		return distance < 1000 ? `${distance} Mt` : `${(distance / 1000).toFixed(2)} Km`;
	}

	async function addToCart(quantity) {
		product['sucursal'] = sucursal;
		product.quantity = quantity;
		await saveToStorage(product);
	}

	return (
		<Card style={styles.card}>
			<View style={styles.cardView}>
				<View style={styles.logoView}>
					<Image
						style={styles.logo}
						source={{
							uri: `https://imagenes.preciosclaros.gob.ar/comercios/${sucursal.comercioId}-${sucursal.banderaId}.jpg`,
						}}
					/>
				</View>
				<View style={styles.cardTextView}>
					<Text>
						<MaterialCommunityIcon name="tag-outline" />{' '}
						<Text style={{ fontWeight: 'bold' }}>${sucursal.preciosProducto.precioLista}</Text>
						<Text> a {distance}</Text>
					</Text>

					<Text>
						<Ionicons name="location-outline" />
						{`${sucursal.direccion}, ${titleCase(sucursal.localidad)}`}
					</Text>
				</View>

				{/* Show add to chango */}
				<View>
					<TouchableOpacity onPress={() => setShowAddToCardDialog(true)}>
						<MaterialCommunityIcon style={styles.promoLogo} name="cart-plus" />
					</TouchableOpacity>
				</View>

				{promosState.length > 0 && (
					<View style={styles.promoView}>
						<TouchableOpacity
							onPress={() => {
								setShowPromoDialog(true);
							}}
						>
							<Image style={styles.promoLogo} source={require('../../../assets/promo_icon.png')} />
						</TouchableOpacity>
					</View>
				)}
			</View>

			{/* Ofertas Dialog */}
			<PromoDialog showDialog={showPromoDialog} setShowDialog={setShowPromoDialog} promosState={promosState} />
			<AddToCardDialog
				showDialog={showAddToCardDialog}
				setShowDialog={setShowAddToCardDialog}
				addToCart={addToCart}
			/>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: { marginStart: 0, marginVertical: 0 },
	cardView: { flexDirection: 'row', borderColor: 'red', alignItems: 'center' },

	logoView: {
		flex: 1,
		borderColor: 'green',
		borderWidth: 0,
		margin: 0,
		maxWidth: 70,
		borderRadius: 10,
	},
	cardTextView: { flex: 2, marginStart: 10, margin: 12.5, justifyContent: 'space-between' },
	promoView: {},

	logo: { width: 70, height: 70, borderBottomLeftRadius: 6, borderTopLeftRadius: 6 },
	promoLogo: { width: 40, height: 40, fontSize: 40 },
});
