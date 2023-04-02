import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { theme } from '../../styles';

export default function ScannerFAB({ navigation }) {
	return (
		<FAB
			icon="barcode-scan"
			color={theme.colors.primaryContainer}
			style={styles.fab}
			onPress={() => {
				navigation.navigate('Barcode Scanner');
			}}
		/>
	);
}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: theme.colors.primary,
	},
});
