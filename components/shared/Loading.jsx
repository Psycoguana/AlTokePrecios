import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../styles';

export default function Loading({ description }) {
	return (
		<View style={styles.view}>
			<View style={{ marginVertical: 250 }}>
				<ActivityIndicator
					size={100}
					animating={true}
					color={theme.colors.primary}
					style={styles.progressCircle}
				/>
				<Text style={styles.text}>{description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: theme.colors.primaryContainer,
	},
	progressCircle: {
		margin: 50,
	},
	text: { fontSize: 30 },
});
