import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
} from 'react-native';

import ImageBarraIMC from './assets/barraimc_barras.png';
import ImageIndicator from './assets/trianguloblanco.png';

export default function App() {
	const [medidas, setMedidas] = useState({ peso: '', altura: '' });
	const [resultIMC, setResultIMC] = useState({ IMC: '', category: { label: '', left: 0 } });

	const handleChangeInputWeight = (newValue) => {
		setMedidas({ ...medidas, peso: newValue });
	};

	const handleChangeInputHeight = (newValue) => {
		setMedidas({ ...medidas, altura: newValue });
	};

	const resetValues = () => {
		setMedidas({ peso: '', altura: '' });
		setResultIMC('');
	};

	const getStateSalud = (IMC) => {
		if (!IMC) {
			return 'No calculado';
		}

		/**
		 * Propiedad `left`
		 * Bajo: 10
		 * Normal: 120
		 * Sobrepeso: 210
		 * Obesidad: 280
		 */

		if (IMC < 18.5) {
			return { label: 'Bajo peso', left: 0 };
		}

		if (IMC >= 18.5 && IMC < 25) {
			return { label: 'Normal', left: 120 };
		}

		if (IMC >= 25 && IMC < 30) {
			return { label: 'Sobrepeso', left: 210 };
		}

		if (IMC >= 30) {
			return { label: 'Obesidad', left: 280 };
		}
	};

	const calculateIMC = () => {
		//  IMC = peso (kg) / [altura (m)]^2.
		const peso = parseFloat(medidas.peso);
		let altura = parseFloat(medidas.altura);

		if (Number.isInteger(altura)) {
			altura = altura / 100;
		}

		let imc = peso / altura ** 2;
		const category = getStateSalud(imc);

		setResultIMC({ IMC: imc.toFixed(2), category });
		setMedidas({ peso: '', altura: '' });
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Text style={styles.title}>Calculadora del índice de masa corporal (IMC)</Text>

				<View style={styles.groupInputText}>
					<Text style={styles.groupInputTextLabel}>Peso (kg):</Text>

					<TextInput
						style={styles.input}
						onChangeText={handleChangeInputWeight}
						value={medidas.peso}
						placeholder='30 kg'
						keyboardType='numeric'
					/>
				</View>

				<View style={styles.groupInputText}>
					<Text style={styles.groupInputTextLabel}>Altura (cm, m):</Text>

					<TextInput
						style={styles.input}
						onChangeText={handleChangeInputHeight}
						value={medidas.altura}
						placeholder='171 m'
						placeholderTextColor='#000'
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

				<View style={resultStyles.resultContainer}>
					<View>
						<Text>IMC: {resultIMC.IMC}</Text>
						<Text>Estado de salud es de: {resultIMC.category.label}</Text>
					</View>

					<View style={{ position: 'relative' }}>
						<Image
							source={ImageBarraIMC}
							style={resultStyles.barraIMC}
							resizeMode='contain'
						/>

						<View style={resultStyles.resultText}>
							<Text>Bajo Peso</Text>
							<Text>Normal</Text>
							<Text>Sobrepeso</Text>
							<Text>Obesidad</Text>
						</View>

						<Image
							source={ImageIndicator}
							style={{ ...resultStyles.indicator, left: resultIMC.category.left }}
						/>
					</View>
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
		gap: 20,
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
		width: 150,
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		color: '#000',
		fontSize: 16,
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
	groupInputTextLabel: {
		fontSize: 18,
	},
});

const resultStyles = StyleSheet.create({
	resultContainer: {
		flex: 1,
		marginTop: 50,
	},
	barraIMC: {
		width: 383,
		height: 83,
		maxWidth: 383,
	},
	resultText: {
		position: 'absolute',
		display: 'flex',
		width: 383,
		borderTopColor: '#cccccc',
		borderTopWidth: 1,

		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingInline: 20,

		bottom: 0,
		height: 15,
	},
	indicator: {
		position: 'absolute',
		width: 38,
		height: 38,
		top: 12,
		left: 0,
	},
});
