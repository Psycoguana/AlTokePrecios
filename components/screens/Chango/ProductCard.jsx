import { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProductCard({ product }) {
	const sucursal = product.sucursal;
	const [productImage, setProductImage] = useState(
		`https://imagenes.preciosclaros.gob.ar/productos/${product.id}.jpg`
	);

	return (
		<>
			<View style={styles.cardView}>
				<View>
					<Image
						style={styles.logo}
						source={{
							uri: productImage,
						}}
						onError={() => setProductImage('https://www.preciosclaros.gob.ar/img/no-image.png')}
					/>
				</View>
				<View style={styles.cardTextView}>
					<Text>
						<MaterialCommunityIcon name="tag-outline" />{' '}
						<Text style={{ fontWeight: 'bold' }}>
							${sucursal.preciosProducto.precioLista} x{product.quantity} {'    ---->     '}$
							{sucursal.preciosProducto.precioLista * product.quantity}
						</Text>
						{/* <Text> a {distance}</Text> */}
					</Text>

					{/* <Text>
						<Ionicons name="location-outline" />
						{`${sucursal.direccion}, ${titleCase(sucursal.localidad)}`}
					</Text> */}
				</View>

				{/* TODO: Show remove from chango */}
				{/* <View>
					<TouchableOpacity onPress={() => setShowAddToCardDialog(true)}>
						<MaterialCommunityIcon style={styles.promoLogo} name="cart-plus" />
					</TouchableOpacity>
				</View> */}
			</View>
		</>
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
