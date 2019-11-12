/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import CountDown from 'react-native-countdown-component';

export default class TimerCounDown extends Component {
  state = {
    timer: this.props.timer,
  };

  render() {
    const {stopMode, onTimeFinished} = this.props;
    const {timer} = this.state;
    return (
      <CountDown
        until={timer}
        onFinish={() => onTimeFinished()}
        size={25}
        digitStyle={{
          backgroundColor: 'transparent',
        }}
        digitTxtStyle={{color: '#000'}}
        separatorStyle={{color: '#000'}}
        timeToShow={['S']}
        timeLabels={{m: null, s: null}}
        showSeparator
        running={!stopMode}
      />
    );
  }
}
