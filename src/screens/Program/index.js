import React, {Component} from 'react';
import {BackHandler, Dimensions} from 'react-native';
import {Text, View, Button, TabBar, Carousel} from 'react-native-ui-lib';
import _ from 'lodash';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import SCREENS from './../../screens/screenNames';
import {EventsComponent} from '../Now/EventsComponent';
import {isRTL} from '../../utils/Strings';
import {backToNowTab} from '../../stores/appActions';

const {width} = Dimensions.get('window');


//todo: rang: get this info from json files, not hardcoded
const DAYS_EN = ['MON, 14', 'TUE, 15', 'WED, 16', 'THU, 17', 'FRI, 18', 'SAT, 19'];
const DAYS_HEB = ['שני, 14', 'שלישי, 15', 'רביעי, 16', 'חמישי, 17', 'שישי, 18', 'שבת, 19'];
const BUTTON_TYPE = {
  PREV: 'prev',
  CURRENT: 'current',
  NEXT: 'next'
};

class ProgramScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      currentDayIndex: 0,
      nextDayIndex: 1,
      prevDayIndex: -1
    };
    this.days = isRTL() ? DAYS_HEB: DAYS_EN;;
    this.carousel = undefined;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'filter_tags') {
        this.props.navigator.showModal({
          screen: SCREENS.FILTER_TAGS
        });
      }
    } else if (event.id === 'willAppear') {
      BackHandler.removeEventListener();
      BackHandler.addEventListener('hardwareBackPress', () => {
        return backToNowTab(this.props.navigator);
      });
    }
  }


  onEventPressed = (event) => {
    this.props.navigator.showModal({
      screen: SCREENS.EVENT_DETAILS,
      passProps: { event }
    });
  }



  onPageChanged = (newPageIndex) => {
    this.setState({currentDayIndex: newPageIndex, nextDayIndex: newPageIndex + 1, prevDayIndex: newPageIndex - 1})
  }

  _renderEventsComponent(giftsOfDay, i) {
    return (
      <View width={width} key={i}>
        {this._renderTopNextPrevStrip(i)}

        <EventsComponent gifts={giftsOfDay} />
      </View>
    );
  }


  onNextPressed = () => {
    this.carousel.goToPage(this.state.currentDayIndex + 1);
  }

  onPrevPressed = () => {
    this.carousel.goToPage(this.state.currentDayIndex - 1);
  }

  renderGiftsList(){
    return (
      <Carousel
        loop={false}
        onChangePage={this.onPageChanged}
        ref={(carousel) => (this.carousel = carousel)}
      >
        {_.map(this.props.gifts, (giftsOfDay, i) =>
          this._renderEventsComponent(giftsOfDay, i)
        )}

      </Carousel>
    );
  }

  getDayLabel(index, type) {

    if (type === BUTTON_TYPE.CURRENT) {
      return this.days[index];

    } else if (type === BUTTON_TYPE.NEXT && _.inRange(index+1, 0, this.days.length-1)) {
      const label = this.days[index+1];
      return  isRTL() ? `${label}` : `${label}>`

    } else if (type === BUTTON_TYPE.PREV && _.inRange(index-1, 0, this.days.length)) {
      const label = this.days[index-1];
      return isRTL() ? `${label}` : `<${label}`
    }
    return;
  }

  _renderTopNextPrevStrip(index) {
    return (
      <View row spread paddingV-8>
        <View flex>
          <Button link
                  label={this.getDayLabel(index, BUTTON_TYPE.PREV)}
                  onPress={this.onPrevPressed}
                  labelStyle={{writingDirection: isRTL() ? 'rtl' : 'ltr', fontWeight: '500', fontSize: 17}}
          />
        </View>
        <View center flex>
          <Text black text70 style={{fontWeight: '600'}}>{this.getDayLabel(index, BUTTON_TYPE.CURRENT)}</Text>
        </View>
        <View flex>
          <Button link
                  label={this.getDayLabel(index, BUTTON_TYPE.NEXT)}
                  onPress={this.onNextPressed}
                  labelStyle={{fontSize: 17, fontWeight: '500'}}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View flex>
        {this.renderGiftsList()}
      </View>
    );
  }
}


function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getChunkedGifts()
  };
}

export default connect(mapStateToProps)(ProgramScreen);

