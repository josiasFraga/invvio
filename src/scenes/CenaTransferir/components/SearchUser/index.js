import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import {  StyleSheet, View } from 'react-native';
import FieldTextInputNew from '@components/Forms/Fields/FieldTextInputNew';

import globalStyles from '@styles/globalStyles';

import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Results from './Results';


const SearchUser = ({formik, registerFieldRef, pageIndex}) => {
    const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);
    const themedStyles = styles(theme);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    // Debounce para atualizar search
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(formik.values.search);
        }, 1500);
        return () => {
            clearTimeout(handler);
        };
    }, [formik.values.search]);

    return (
        <View style={themedStyles.container}>
            <View>
                <FieldTextInputNew
                    formik={formik}
                    name="search"
                    labelText="Digite 3 caracteres do apelido do usuário"
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    referencia={(r) => {
                        registerFieldRef("search", pageIndex, r);
                    }}
                    forwardRef={true}
                />
            </View>
            <View style={{flex: 1}}>
                <Results search={search} formik={formik} />
            </View>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
});

export default SearchUser;