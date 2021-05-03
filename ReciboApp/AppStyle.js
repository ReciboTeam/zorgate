import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: Platform.iOS? 20 : 0,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
});
  
export default styles
