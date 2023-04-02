import React, { useState } from 'react';

import { StyleSheet } from 'react-native';
import { Button, TextInput, Surface } from 'react-native-paper';

import ScannerFAB from '../../shared/FAB';

export default function HomeScreen({ navigation }) {
	const [query, setQuery] = useState(null);

	function handleSearch() {
		if (!query) {
			ToastAndroid.show("Query can't be empty", ToastAndroid.SHORT);
			return;
		}

		if (query.length === 13 && isFinite(query)) {
			navigation.push('Sucursales', { ean: query });
		} else {
			navigation.navigate('ProductsList', { query });
		}
	}

	return (
		<Surface style={styles.surface} elevation={4}>
			<TextInput
				mode="outlined"
				label="Busca un producto"
				placeholder="Coca"
				value={query}
				autoFocus={true}
				onSubmitEditing={handleSearch}
				onChangeText={(e) => {
					return setQuery(e);
				}}
			></TextInput>
			<Button style={styles.btn} icon="magnify" mode="contained" onPress={handleSearch}>
				Buscar
			</Button>
			<ScannerFAB navigation={navigation} />
		</Surface>
	);
}

const styles = StyleSheet.create({
	surface: {
		padding: '20%',
		height: '100%',
		width: '100%',
		justifyContent: 'center',
	},
	btn: {
		marginTop: '5%',
	},
});
