import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  header: {
    backgroundColor: '#ffcfd9',
    paddingTop: 60,
    paddingBottom: 15,
    paddingHorizontal: 25,
    //   paddingBottom: 60,
    marginBottom: 3,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    //   shadowColor: 'rgb(0, 0, 0)',
    //   shadowOffset: {
    //     width: 1,
    //     height: 1,
    //   },
    //   shadowOpacity: 1,
    //   shadowRadius: 4,
    //   elevation: 2,
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderColor: '#636363',
    fontFamily: 'Raleway-ExtraLight',
    marginTop: 10,
    fontSize: 16,
    padding: 6,
  },
  button: {
    marginLeft: 'auto',
    marginTop: 14,
    // width: 60,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#8a162e',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Raleway-Bold',
  },
});
