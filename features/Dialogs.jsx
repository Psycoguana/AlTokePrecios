import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';

export function PromoDialog({ showDialog, setShowDialog, promosState }) {
	return (
		<Portal>
			<Dialog
				visible={showDialog}
				onDismiss={() => {
					setShowDialog(false);
				}}
			>
				<Dialog.Title>Ofertas</Dialog.Title>

				{promosState.map((promo, index) => {
					return (
						<Dialog.Content key={index}>
							<Paragraph>{promo.descripcion}</Paragraph>
							<Paragraph>${promo.precio}</Paragraph>
						</Dialog.Content>
					);
				})}
				<Dialog.Actions>
					<Button mode="contained" onPress={() => setShowDialog(false)} style={{ margin: 10, marginTop: 0 }}>
						Ok
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

export function AddToCardDialog({ showDialog, setShowDialog, addToCart }) {
	const [quantity, setQuantity] = useState('1');

	return (
		<Portal>
			<Dialog
				visible={showDialog}
				onDismiss={() => {
					setShowDialog(false);
				}}
			>
				<Dialog.Title>Agregar al Chango</Dialog.Title>

				<Dialog.Content>
					<TextInput
						mode="outlined"
						label="Cantidad"
						defaultValue={quantity}
						keyboardType="numeric"
						style={styles.surface}
						onChangeText={(value) => setQuantity(value)}
					/>
				</Dialog.Content>

				<Dialog.Actions>
					<Button
						onPress={() => {
							setShowDialog(false);
						}}
					>
						Cancelar
					</Button>
					<Button
						mode="contained"
						onPress={() => {
							addToCart(parseInt(quantity));
							setShowDialog(false);
						}}
					>
						Agregar
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

export function ClearCartDialog({ showDialog, setShowDialog, onAccept }) {
	return (
		<Portal>
			<Dialog
				visible={showDialog}
				onDismiss={() => {
					setShowDialog(false);
				}}
			>
				<Dialog.Title>Seguro que deseas eliminar la lista de compras?</Dialog.Title>

				<Dialog.Actions>
					<Button onPress={() => setShowDialog(false)} style={{ margin: 10, marginTop: 0 }}>
						No
					</Button>
					<Button
						mode="contained"
						onPress={() => {
							onAccept();
							setShowDialog(false);
						}}
						style={{ margin: 10, marginTop: 0 }}
					>
						Si
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

const styles = StyleSheet.create({
	surface: {},
	btn: {
		marginTop: '5%',
	},
});
