import React from 'react';
import ActionSheetPicker from '@components/Forms/Fields/ActionSheetPicker';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PickerTheme = (props) => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.currentTheme);

    const options = [
        { label: "Sistema", value: Appearance.getColorScheme() },
        { label: "Claro", value: "light" },
        { label: "Escuro", value: "dark" },
        // Adicione outras opções conforme necessário
    ];

    const changeTheme = (value) => {
        dispatch({
            type: 'SET_THEME',
            payload: value,
        });

        AsyncStorage.setItem('appTheme', value).then(() => {
            console.log('Theme saved to AsyncStorage:', value);
        }
        ).catch((error) => {
           console.error('Error saving theme to AsyncStorage:', error);
        });
    }

    return (
        <ActionSheetPicker
        options={options}
        selectedValue={currentTheme}
        onValueChange={(value) => {
            changeTheme(value);            
        }}
        placeholder={''}
        label={''}
        customComponent={props.customComponent}
        />
    );
};

export default PickerTheme;