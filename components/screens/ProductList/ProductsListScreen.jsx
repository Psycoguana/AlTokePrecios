import { useState, useEffect, useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import ProductListCard from './ProductListCard';
import { getProductByEAN, searchProduct } from '../../../features/API';
import Loading from '../../shared/Loading';
import ScannerFAB from '../../shared/FAB';
import Exception from '../../shared/Exception';
import AppContext from '../../../context/AppContext';
import { theme } from '../../../styles';

export default function ProductsListScreen({ route, navigation }) {
	const { query } = route.params;
	const [productSimpleInfo, setProductSimpleInfo] = useState(null);
	let { sucursales } = useContext(AppContext);

	useEffect(() => {
		searchProduct(query, sucursales.current).then((productInfo) => {
			setProductSimpleInfo(productInfo.productos);
			console.log(productInfo.productos);
		});
	}, []);

	if (productSimpleInfo === null) {
		return <Loading description={`Buscando ${query}...`}></Loading>;
	} else if (productSimpleInfo.length === 0) {
		return <Exception text="Producto no encontrado" icon="help" navigation={navigation} />;
	}

	return (
		<>
			<FlatList
				style={{ backgroundColor: theme.colors.primaryContainer }}
				data={productSimpleInfo}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate('Sucursales', { ean: item.id })}>
							<ProductListCard product={item}></ProductListCard>
						</TouchableOpacity>
					);
				}}
			></FlatList>
			<ScannerFAB navigation={navigation} />
		</>
	);
}
