import { StyleSheet} from 'react-native';

const DARK_GRAY = '#C9C9C9';
const MID_GRAY = '#E4E4E4';
const LIGHT_GRAY = '#D7D7D7';


export const Styles = StyleSheet.create({
  hourTableContainer: {
    width: '100%'
  },
  hourTableRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { height: 9 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  boldText: {
    fontWeight: 'bold'
  },
  event: {
    backgroundColor: '#74b9ff',
    textAlign: 'center',
    padding: 5,
    margin: 5,
  },
  eventContaier: {
    display: 'flex',
    flexDirection: 'column'
  },
  timeCell: {
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15
  }
});