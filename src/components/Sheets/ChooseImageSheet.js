import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import { Icon, useTheme } from '@rneui/themed';
import AppTitle from '@components/Typography/AppTitle';
import globalStyles from '@styles/globalStyles';
import AppText from '@components/Typography/AppText';
import SafeAreaView from '@components/SafeAreaView';
import ConfirmButton from '@components/Buttons/ConfirmButton';

const ChooseImageSheet = ({ sheetId, payload }) => {
  const { theme } = useTheme();
  const themedStyles = styles(theme);
  const GlobalStyle = globalStyles(theme);

  return (
    <ActionSheet 
        defaultOverlayOpacity={0.8}
        containerStyle={themedStyles.actionSheetContainer}
        //useBottomSafeAreaPadding
        id={sheetId}
        //indicatorStyle={{ backgroundColor: '#000', padding: 20 }}
        gestureEnabled={true}
    >
    <View style={themedStyles.actionSheetContent}>
        <AppTitle style={themedStyles.sheetTitle}>O que deseja fazer?</AppTitle>

        <ConfirmButton
        onPress={()=> {
            SheetManager.hide(sheetId);
            payload.pickImageFunc();
        }}
        icon={<Icon name="camera" type="font-awesome" size={20} color={theme.colors.buttonText} />}
        buttonTitle=" Tirar Foto"
        />

        <View style={GlobalStyle.spaceSmall} />

        <ConfirmButton
        onPress={()=> {
            SheetManager.hide(sheetId);
            payload.chooseImageFunc();
        }}
        icon={<Icon name="image" type="font-awesome" size={20} color={theme.colors.buttonText} />}
        buttonTitle=" Escolher da Galeria"
        />

        <View style={GlobalStyle.spaceSmall} />
      
        {/* Botão de Cancelar */}
        <TouchableOpacity
            style={[themedStyles.sheetButton, themedStyles.cancelButton]}
            onPress={() => SheetManager.hide(sheetId)}
        >
            <AppText style={[themedStyles.sheetButtonText, themedStyles.backButtonText]}>
                Voltar
            </AppText>
        </TouchableOpacity>
    </View>
    <SafeAreaView style={{ backgroundColor: theme.colors.backgroundTerciary }} />
    </ActionSheet>
  );
};

const styles = (theme) => StyleSheet.create({
    actionSheetContainer: {
        backgroundColor: theme.colors.backgroundTerciary,
    },
    actionSheetContent: {
        paddingTop: 20,
        paddingHorizontal: 15
    },
    sheetTitle: {
        textAlign: 'center',
        marginBottom: 10,
        marginBottom: 25,
    },

    sheetButtonContainer: {
    },
    sheetButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		paddingVertical: 12,
		marginVertical: 5,
    },
    sheetButtonText: {
		fontSize: 16,
		fontWeight: '700',
		marginLeft: 8, // Espaço entre ícone e texto
        color: '#FFF'
    },
    cancelButton: {
		backgroundColor: theme.colors.backgroundSecondary,
		marginTop: 10,
    },
    backButtonText: {
        color: theme.colors.textPrimary,
        textAlign: 'center',
    }
});

export default ChooseImageSheet;
