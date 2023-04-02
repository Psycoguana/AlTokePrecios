import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Card, Title, Paragraph } from 'react-native-paper';

export default function ProductCard({ product }) {
	const [coverImage, setCoverImage] = useState('https://www.preciosclaros.gob.ar/img/no-image.png');

	useEffect(() => {
		// Wait until the product has finished loading.
		if (product) {
			setCoverImage(`https://imagenes.preciosclaros.gob.ar/productos/${product.id}.jpg`);
		}
	}, [product]);

	return (
		<Card style={styles.card}>
			<Card.Content style={styles.cardContent}>
				<Title style={styles.title}>{product.nombre}</Title>
				<Paragraph style={styles.paragraph}>
					${product.precioMin} - ${product.precioMax}
				</Paragraph>
				<Card.Cover
					style={styles.cardImage}
					source={{ uri: coverImage }}
					onError={() => setCoverImage('https://www.preciosclaros.gob.ar/img/no-image.png')}
				/>
			</Card.Content>
			<Paragraph style={styles.ean}>EAN: {product.id}</Paragraph>
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		marginVertical: 15,
		alignSelf: 'center',
		padding: 5,
		width: '90%',

		boxShadowColor: 'rgba(0, 0, 0, 0.2)',
		boxShadowOffset: { width: 2, height: 2 },
		boxShadowRadius: 10,
	},
	cardContent: {
		alignContent: 'center',
		marginBottom: 10,
	},
	cardImage: {
		width: 250,
		height: 250,
		alignSelf: 'center',
	},
	title: {
		// textShadowColor: 'rgba(0, 0, 0, 0.2)',
		// textShadowOffset: { width: 2, height: 2 },
		// textShadowRadius: 10,
	},
	paragraph: {
		fontSize: 17,
	},
	ean: {
		color: 'grey',
		margin: 7,
	},
});
