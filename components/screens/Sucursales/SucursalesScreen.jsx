import { useEffect, useState, useContext } from 'react';
import { FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getProductByEAN } from '../../../features/API';
import ScannerFAB from '../../shared/FAB';

import ProductCard from './ProductCard';
import SucursalCard from './SucursalCard';
import Loading from '../../shared/Loading';
import Exception from '../../shared/Exception';
import AppContext from '../../../context/AppContext';

import { theme } from '../../../styles';

export default function SucursalesScreen({ navigation }) {
	const route = useRoute();
	const { ean } = route.params;
	const { sucursales } = useContext(AppContext);

	const [productInfo, setProductInfo] = useState({ sucursales: [] });
	const [product, setProduct] = useState({});

	useEffect(() => {
		getProductByEAN(ean, sucursales.current).then((data) => {
			setProductInfo(data);
			console.log(data);
			setProduct(data.producto);
		});
	}, []);

	// Set loading screen.
	if (productInfo && productInfo.total === 0) {
		return <Exception text="Producto no encontrado" icon="help" navigation={navigation} />;
	} else if (productInfo.sucursalesConProducto === 0) {
		return <Exception text="Ninguna sucursal con stock" icon="alert" navigation={navigation} />;
	} else if (productInfo.sucursales.length === 0) {
		return <Loading description={'Buscando Sucursales...'} />;
	}

	// Show a list of Sucursales with their price for this product.
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primaryContainer }}>
			<FlatList
				ListHeaderComponent={<ProductCard product={product} />}
				data={productInfo.sucursales.filter((producto) => producto['message'] === undefined)}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity onPress={() => console.log('Card pressed')}>
							<SucursalCard sucursal={item} product={product}></SucursalCard>
						</TouchableOpacity>
					);
				}}
			></FlatList>
			<ScannerFAB navigation={navigation} />
		</SafeAreaView>
	);
}
