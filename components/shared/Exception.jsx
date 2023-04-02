import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import ScannerFAB from './FAB';

export default function Exception({ navigation, text, icon, style }) {
	return (
		<View style={[styles.view, style]}>
			<View style={{ marginVertical: 250 }}>
				<Avatar.Icon style={styles.icon} size={100} icon={icon} />

				<Text style={styles.text}>{text}</Text>
			</View>
			{navigation && <ScannerFAB navigation={navigation} />}
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
	},
	icon: {
		margin: 50,
		alignSelf: 'center',
	},
	text: { fontSize: 30 },
});
