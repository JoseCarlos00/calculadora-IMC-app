import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function App() {
	const [medidas, setMedidas] = useState({ peso: '', altura: '' });
	const [IMC, setIMC] = useState('');

	const handleChangeInputWeight = (newValue) => {
		setMedidas({ ...medidas, peso: newValue });
	};

	const handleChangeInputHeight = (newValue) => {
		setMedidas({ ...medidas, altura: newValue });
	};

	const resetValues = () => {
		setMedidas({ peso: '', altura: '' });
		setIMC('');
	};

	const calculateIMC = () => {
		//  IMC = peso (kg) / [altura (m)]^2.
		const peso = parseFloat(medidas.peso);
		let altura = parseFloat(medidas.altura);

		if (Number.isInteger(altura)) {
			altura = altura / 100;
		}

		const imc = peso / altura ** 2;

		setIMC(imc.toFixed(2));
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={styles.title}>Calculadora del índice de masa corporal (IMC)</Text>

				<View style={styles.groupInputText}>
					<Text>Peso (kg):</Text>

					<TextInput
						style={styles.input}
						onChangeText={handleChangeInputWeight}
						value={medidas.peso}
						placeholder='30 kg'
						keyboardType='numeric'
					/>
				</View>

				<View style={styles.groupInputText}>
					<Text>Altura (cm, m):</Text>

					<TextInput
						style={styles.input}
						onChangeText={handleChangeInputHeight}
						value={medidas.altura}
						placeholder='171 m'
						keyboardType='numeric'
					/>
				</View>

				<View style={styles.buttonsGroupContainer}>
					<TouchableOpacity
						style={{ ...styles.button, backgroundColor: '#E11D1D' }}
						onPress={resetValues}
					>
						<Text style={styles.buttonText}>Borrar</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={calculateIMC}
					>
						<Text style={styles.buttonText}>Calcular</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.row}>
					<Text>IMC: {IMC}</Text>
				</View>

				<StatusBar style='auto' />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f6fc',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 30,
		marginBottom: 20,
		marginTop: 50,
		paddingInline: 20,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	button: {
		backgroundColor: '#29903B',
		borderRadius: 8,
		padding: 10,
	},
	buttonText: {
		color: '#f0f6fc',
	},
	buttonsGroupContainer: {
		flexDirection: 'row',
		gap: 20,
	},
	groupInputText: {
		fontSize: 18,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});
