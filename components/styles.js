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
    marginBottom: 17,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontFamily: 'Raleway-bold',
    fontSize: 40,
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
  touchableList: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // marginTop: 17,
    // marginHorizontal: 10,
    borderRadius: 100,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 17,
  },
  circleIcon: {
    fontFamily: 'Raleway-ExtraLight',
    fontSize: 16,
    marginLeft: 20,
    color: 'black',
  },
  checkCircleIcon: {
    fontFamily: 'Raleway-ExtraLight',
    fontSize: 16,
    marginLeft: 20,
    color: '#a3a3a3',
    textDecorationLine: 'line-through',
  },
});
