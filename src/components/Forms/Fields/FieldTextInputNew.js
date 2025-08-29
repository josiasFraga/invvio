import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import { Input, Icon, useTheme } from '@rneui/themed';
import { getIn } from 'formik';


import { maskMoney, maskPhone, maskCPF, maskCNPJ, maskCEP, maskNumber, maskTime, maskCCExpiry, maskDecimal } from '@utils/inputMasksUtils';
import globalStyles from '@styles/globalStyles';
import AppText from '@components/Typography/AppText';

const FieldTextInputNew = (props) => {

    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);

    const [hidePass, setHidePass] = React.useState(true);

    const {
        formik,
        name,
        secureTextEntry,
        placeholder,
        keyboardType = 'default',
        maxLength,
        multiline,
        returnKeyType,
        referencia,
        autoCapitalize = 'none',
        autoCorrect = false,
        leftIcon,
        autoFocus = false,
        editable = true,
        labelText = null,
        mask = null,
        onSubmitEditing = null,
        forwardRef = false,
        onFocus = null,
        onBlur = null,
        onChangeCallback = null,
        helpText = null,
    } = props;

    const fieldValue = getIn(formik.values, name) || '';
    const fieldTouched = getIn(formik.touched, name) || false;
    const fieldError = getIn(formik.errors, name) || null

    const errorMessage = fieldTouched && fieldError ? fieldError : null;
  
    return (
    <>
    <View style={styles.inputContainer}>
        <View style={GlobalStyle.row}>
        {props.leftElement && (props.leftElement())}
        <Input
            style={[GlobalStyle.input, multiline ? {minHeight: 100} : {}]}
            containerStyle={{ paddingLeft: 0, paddingRight: 0, marginBottom: 0, marginTop: 0, paddingBottom: 0 }}
            inputContainerStyle={GlobalStyle.inputInner}
            labelStyle={GlobalStyle.label}
            errorStyle={GlobalStyle.errorValidation}
            placeholderStyle={GlobalStyle.placeholder}
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            keyboardType={keyboardType}
            maxLength={maxLength}
            multiline={multiline}
            returnKeyType={returnKeyType}
            onFocus={() => {
                formik.setFieldTouched(name, true);
                if (onFocus) {
                    onFocus();
                }
            }}
            onSubmitEditing={(e) => {
                if (onSubmitEditing) {
                    onSubmitEditing(e);
                } else {
                    e.preventDefault?.(); // previne propagação se for teclado físico
                    Keyboard.dismiss();   // força o teclado a fechar
                }
            }}
            keyboardAppearance={theme.mode}
            ref={referencia}
            forwardRef={forwardRef}
            placeholderTextColor={'#bbb'}
            onChangeText={text => {
                formik.setFieldTouched(name, true);
                if ( text == '' ) {
                    formik.setFieldValue(name, '');
                    return;
                }

                let formatted = text;
                if (mask === 'money') formatted = maskMoney(text);
                if (mask === 'phone') formatted = maskPhone(text);
                if (mask === 'cpf') formatted = maskCPF(text);
                if (mask === 'cnpj') formatted = maskCNPJ(text);
                if (mask === 'cep') formatted = maskCEP(text);
                if (mask === 'number') formatted = maskNumber(text);
                if (mask === 'time') formatted = maskTime(text);
                if (mask === 'cc_expiry') formatted = maskCCExpiry(text);
                if (mask === 'decimal') formatted = maskDecimal(text);

                formik.setFieldValue(name, formatted);
                onChangeCallback?.(formatted);

            }}
            name={name}
            value={fieldValue.toString()}
            secureTextEntry={secureTextEntry && hidePass}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            editable={editable}
            autoFocus={autoFocus}
            label={labelText}
            onBlur={() => {
                formik.setFieldTouched(name, true)
                if (onBlur) {
                    onBlur();
                }
            }}
            rightIcon={()=>{
                if ( !secureTextEntry )
                    return false;
                    return (
                    <Icon
                        name={hidePass ? 'eye' : 'eye-off'}
                        type='feather'
                        color={theme.colors.textSecondary}
                        onPress={() => setHidePass(!hidePass)}
                        containerStyle={{marginRight: 10}}
                    />
                )
            }}
            leftIcon={leftIcon}
            leftIconContainerStyle={{backgroundColor: theme.colors.backgroundTerciary, paddingLeft: 10, paddingRight: 0}}
            errorMessage={errorMessage}
            shake={fieldTouched && fieldError ? true : false}
            renderErrorMessage={(!helpText) ? true : false}
        />
        {props.rigthElement && (props.rigthElement())}
        </View>
        {helpText && !errorMessage && (
        <AppText style={[GlobalStyle.helpText, { color: '#888', marginTop: 4, marginBottom: 20 }]}>
            {helpText}
        </AppText>
        )}
    </View>
    </>
    );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  input: {
  },
});

export default FieldTextInputNew;
