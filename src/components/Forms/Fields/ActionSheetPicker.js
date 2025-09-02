import React, { useState, useCallback, useMemo } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button, Icon, Image, useTheme } from '@rneui/themed';
import getButtonStyles from '@components/Buttons/buttonStyles';
import globalStyles from '@styles/globalStyles';
import AppTitle from '@components/Typography/AppTitle';
import AppText from '@components/Typography/AppText';

const ActionSheetPicker = ({
  options = [],
  selectedValue = null,   // array ou valor único
  onValueChange,
  placeholder = 'Selecione uma opção',
  title = 'Selecione uma opção',
  label = '',
  multiple = false,       // ativa seleção múltipla
  type = 'default',
  subtitle = '',
  disabled = false,
  customComponent = null,
}) => {
  const { theme } = useTheme();
  const themedStyles = type === 'filter' ? stylesFilter(theme) : styles(theme);
  const buttonStyles = getButtonStyles(theme, 'md');
  const GlobalStyle = globalStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);

  // Garante que sempre trabalhamos internamente com array de selecionados
  // Se for modo single, convertemos para array por conveniência
  const selectedValuesArray = useMemo(() => {
	if (multiple) {
	  return Array.isArray(selectedValue) ? selectedValue : [];
	} else {
	  return selectedValue != null ? [selectedValue] : [];
	}
  }, [selectedValue, multiple]);

  // Função para selecionar ou desmarcar um item
  const toggleOption = useCallback((option) => {
	let newSelected;
	if (multiple) {
	  const isSelected = selectedValuesArray.includes(option.value);
	  if (isSelected) {
		// Remove do array
		newSelected = selectedValuesArray.filter((val) => val !== option.value);
	  } else {
		// Adiciona no array
		newSelected = [...selectedValuesArray, option.value];
	  }
	} else {
	  // Se for single, definimos como array de 1 item
	  newSelected = [option.value];
	}
	// Dispara callback Formik
	// Se multiple, passamos array. Se single, passamos 1 item só
	onValueChange(multiple ? newSelected : newSelected[0] ?? null);

	// Se for modo single, fecha modal imediatamente
	if (!multiple) {
	  setModalVisible(false);
	}
  }, [onValueChange, multiple, selectedValuesArray]);

  // Função para fechar o modal ao finalizar (caso multiple)
  const handleDone = useCallback(() => {
	setModalVisible(false);
  }, []);

  // Monta rótulo de texto para o botão (pode ser a soma das opções no caso de multiple)
  const displayText = useMemo(() => {
	if (!selectedValuesArray.length) {
	  return placeholder;
	}
	const selectedLabels = options
	  .filter((opt) => selectedValuesArray.includes(opt.value))
	  .map((opt) => opt.label);

	if (multiple) {
	  // Ex: “Futebol, Padel”
	  return selectedLabels.join('\n');
	}
	// Single: retornamos apenas a primeira
	return selectedLabels[0] ?? placeholder;
  }, [options, selectedValuesArray, multiple, placeholder]);

  return (
	<View style={themedStyles.container}>
	  {label && <AppText style={GlobalStyle.label}>{label}</AppText>}

	  {/* Botão que abre o modal */}
	  {!customComponent && <TouchableOpacity
		style={[themedStyles.selectButton, disabled && { opacity: 0.5 }]}
		onPress={() => setModalVisible(true)}
		disabled={disabled}
	  >
		<AppText
		  style={[
			themedStyles.selectButtonText,
			selectedValuesArray.length === 0 && themedStyles.placeholderText,
		  ]}
		>
		  {displayText}
		</AppText>
		<Icon
		  name="chevron-down"
		  type="feather"
		  size={type === 'default' ? 20 : 16}
		  color={type === 'default' ? theme.colors.textPrimary : theme.colors.buttonText}
		  style={themedStyles.icon}
		/>
	  </TouchableOpacity>}

	  {customComponent && 
	 	<TouchableOpacity onPress={() => setModalVisible(true)}>{customComponent()}</TouchableOpacity> 
	  }

	  {/* Modal de opções */}
	  <Modal visible={modalVisible} transparent animationType="slide">
		<View style={themedStyles.modalContainer}>
		  <View style={themedStyles.modalContent}>
			<AppTitle style={themedStyles.modalTitle}>{title}</AppTitle>
			{subtitle && <AppText>{subtitle}</AppText>}

			{/* Lista de opções */}
			<FlatList
			  data={options}
			  style={{ marginBottom: 15 }}
			  keyExtractor={(item, index) => index + String(item.value)}
			  renderItem={({ item }) => {
				const isSelected = selectedValuesArray.includes(item.value);
				return (
				  <TouchableOpacity
					onPress={() => toggleOption(item)}
					style={themedStyles.optionButton}
				  >
					<View style={[GlobalStyle.row,{ flex: 1}]}>
					{item.image && (
					<Image
						source={item.image}
						style={{
						width: 30,
						height: 30,
						borderRadius: 30,
						resizeMode: 'cover',
						marginRight: 5,
						}}
					/>
					)}

					<AppText
					  style={[
						themedStyles.optionText,
						isSelected && themedStyles.selectedOptionText,
					  ]}
					>
					  {item.label}
					</AppText>
					</View>
					{isSelected && (
					  <Icon
						name="check"
						type="feather"
						color={theme.colors.textPrimary}
						style={{ marginLeft: 'auto' }}
					  />
					)}
				  </TouchableOpacity>
				);
			  }}
			/>

			{/* Botão de fechar (ou confirmar) - somente no multiple */}
			{multiple && (
			  <Button
				title="OK"
				onPress={handleDone}
				buttonStyle={buttonStyles.secondaryButton}
				titleStyle={buttonStyles.secondaryTitle}
			  />
			)}
			{!multiple && (
			  <Button
				title="Fechar"
				onPress={() => setModalVisible(false)}
				buttonStyle={buttonStyles.secondaryButton}
				titleStyle={buttonStyles.secondaryTitle}
			  />
			)}
		  </View>
		</View>
	  </Modal>
	</View>
  );
};

ActionSheetPicker.propTypes = {
  options: PropTypes.arrayOf(
	PropTypes.shape({
	  value: PropTypes.any.isRequired,
	  label: PropTypes.string.isRequired,
	})
  ).isRequired,
  selectedValue: PropTypes.any, // string|number|array
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  customComponent: PropTypes.func,
};

const styles = (theme) => StyleSheet.create({
  container: {
	marginBottom: 10,
  },
  selectButton: {
	flexDirection: 'row',
	alignItems: 'center',
	padding: 5,
	paddingHorizontal: 10,
	borderBottomColor: theme.colors.borderColor,
	borderBottomWidth: 1,
	justifyContent: 'space-between',
	minHeight: 50,
	backgroundColor: theme.colors.backgroundTerciary,
	borderRadius: theme.borderRadius.borderRadius,
  },
  selectButtonText: {
	fontSize: 14,
	color: theme.colors.textPrimary,
	fontWeight: 'bold',
	alignItems: 'center',
  },
  placeholderText: {
	color: theme.colors.textSecondary,
  },
  icon: {
	marginLeft: 10,
  },
  modalContainer: {
	flex: 1,
	justifyContent: 'flex-end',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
	backgroundColor: theme.colors.backgroundTerciary,
	padding: 20,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	maxHeight: '70%',
  },
  modalTitle: {
	textAlign: 'center',
	marginBottom: 10,
  },
  optionButton: {
	paddingVertical: 15,
	paddingHorizontal: 10,
	borderBottomWidth: 1,
	borderBottomColor: '#eee',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
  },
  optionText: {
	fontSize: 18,
	textAlign: 'left',
	color: theme.colors.textSecondary,
  },
  selectedOptionText: {
	fontWeight: 'bold',
	color: theme.colors.textPrimary,
  },
});

const stylesFilter = (theme) => StyleSheet.create({
  container: {
  },
  selectButton: {
	flexDirection: 'row',
	alignItems: 'center',
	padding: 5,
	backgroundColor: theme.colors.primary,
	marginRight: 15,
	borderRadius: 20,
	paddingHorizontal: 13,
  },
  selectButtonText: {
	fontSize: 12,
	color: theme.colors.buttonText,
	fontWeight: 'bold',
	alignItems: 'center',
  },
  placeholderText: {
	color: theme.mode === 'dark' ? theme.colors.textSecondary : '#f7f7f7',
  },
  icon: {
	marginLeft: 0,
  },
  modalContainer: {
	flex: 1,
	justifyContent: 'flex-end',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
	backgroundColor: theme.colors.backgroundTerciary,
	padding: 20,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	maxHeight: '70%',
  },
  modalTitle: {
	textAlign: 'center',
	marginBottom: 10,
  },
  optionButton: {
	paddingVertical: 15,
	paddingHorizontal: 10,
	borderBottomWidth: 1,
	borderBottomColor: '#eee',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
  },
  optionText: {
	fontSize: 18,
	textAlign: 'left',
  },
  selectedOptionText: {
	fontWeight: 'bold',
	color: theme.colors.primary,
  },
});

export default ActionSheetPicker;
