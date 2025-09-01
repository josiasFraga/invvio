import { StyleSheet, View } from 'react-native';
import { Skeleton, useTheme } from '@rneui/themed';

const LoaderList = ({avatar, button, length = 15}) => {

    const { theme } = useTheme();
    const themedStyles = styles(theme);

    return (
        <View style={themedStyles.container}>

            {Array.from({ length: length }).map((_, index) => (
            <View style={themedStyles.row} key={'loading_' + index}>
                {avatar && 
                <View style={{marginRight: 10}}>
                    <Skeleton animation="wave" style={themedStyles.avatar} circle />
                </View>}
                <View style={{flex: 1}}>
                    <Skeleton animation="wave" style={themedStyles.title} />
                    <Skeleton animation="wave" style={themedStyles.content} />
                </View>
                {button && 
                <View style={{marginLeft: 10}}>
                    <Skeleton animation="wave" style={themedStyles.button} />
                </View>}
            </View>
            ))}
            
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    row: {
        backgroundColor: theme.colors.backgroundTerciary,
        paddingHorizontal: 25,
        paddingVertical: 7,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    avatar: {
        width: 60,
        height: 60,
    },
    title: {
        marginBottom: 7,
        height: 20
    },
    content: {
        height: 14
    },
    button: {
        height: 30,
        width: 60
    }
});

export default LoaderList;
