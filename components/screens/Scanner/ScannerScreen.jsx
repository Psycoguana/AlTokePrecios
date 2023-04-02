import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import { Camera } from 'expo-camera';

export default function ScannerApp({ navigation }) {
	const isFocused = useIsFocused();
	const [hasPermission, setHasPermission] = useState(null);
	const [flashOn, setFlashOn] = useState(false);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = ({ data }) => {
		navigation.push('Sucursales', { ean: data });
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	function getCamera() {
		return (
			<Camera
				ratio="16:9"
				flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
				style={[StyleSheet.absoluteFill, styles.container]}
				onBarCodeScanned={handleBarCodeScanned}
				barCodeScannerSettings={{
					barCodeTypes: ['ean13'],
				}}
				onMountError={(err) => console.log(err)}
			/>
		);
	}

	return (
		<View style={styles.container}>
			{isFocused && getCamera()}
			<View style={styles.layerTop}></View>
			<View style={styles.layerCenter}>
				<View style={styles.layerLeft} />
				<View style={styles.focused} />
				<View style={styles.layerRight} />
			</View>
			<View style={styles.layerBottom}>
				{/* <IconButton
					mode="contained-tonal"
					icon="flash"
					color="red"
					containerColor="red"
					size={40}
					onPress={() => {
						console.log('pressed');
						setFlashOn((oldStatus) => !oldStatus);
					}}
				/> */}
				<Icon
					color="white"
					size={40}
					style={styles.icon}
					name={`${flashOn ? 'flash' : 'flash-outline'}`}
					onPress={() => setFlashOn((oldStatus) => !oldStatus)}
				/>
			</View>
		</View>
	);
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	layerTop: {
		flex: 2,
		backgroundColor: opacity,
	},
	layerCenter: {
		flex: 1,
		flexDirection: 'row',
	},
	layerLeft: {
		flex: 1,
		backgroundColor: opacity,
	},
	focused: {
		flex: 10,
	},
	layerRight: {
		flex: 1,
		backgroundColor: opacity,
	},
	layerBottom: {
		flex: 2,
		backgroundColor: opacity,
	},
	icon: {
		position: 'absolute',
		bottom: 10,
		margin: 15,
		alignSelf: 'center',
	},
});
