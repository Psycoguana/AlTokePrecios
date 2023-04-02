import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Image } from 'react-native-expo-image-cache';

import Card from '../../shared/Card';

export default function ProductListCard(props) {
	const { product } = props;

	function getProductImage() {
		const uri = `https://imagenes.preciosclaros.gob.ar/productos/${product.id}.jpg`;
		return (
			<Image
				defaultSource={{ uri: 'https://www.preciosclaros.gob.ar/img/no-image.png' }}
				style={styles.image}
				{...{ uri }}
			/>
		);
	}

	return (
		<Card style={styles.card}>
			<List.Item
				style={styles.listItem}
				title={product.nombre}
				titleNumberOfLines={2}
				titleStyle={{ fontSize: 20 }}
				description={`$${product.precioMin} - $${product.precioMax}`}
				descriptionStyle={{ fontSize: 15, marginTop: 15 }}
				left={() => getProductImage()}
			></List.Item>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: { marginStart: 0, marginVertical: 0 },
	image: { height: 100, width: 100, borderRadius: 100 },

	listItem: {
		marginStart: 0,
		marginVertical: 0,
		fontSize: '100rem',
	},
});
