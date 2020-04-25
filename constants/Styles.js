const tintColor = '#2f95dc';

import Colors from './Colors';

export default {
    fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      right: 20,
      bottom: 20,
      backgroundColor: Colors.primaryColor,
      borderRadius: 30,
      elevation: 8
    },
    roundedButton: {
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 50,
        marginBottom: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: Colors.primaryColor,
    },
    outlineButton: {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderWidth: 1,
      borderColor: Colors.darkColor
    },
    outlineButtonText: {
      fontSize: 15,
      color: Colors.darkColor
    },
    buttonText: {
      fontSize: 15,
      color: '#FFFFFF'
    },
    center: {
      flex:1,
      justifyContent:'center',
      alignItems: 'center'
    },
};
