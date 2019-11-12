/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import axios from '../../utils/axios';
import {reduceCoin} from '../../actions/profileActions';

import BackgroundImage from '../../components/common/backgroundImage';
import GreenButton from '../../components/buttons/greenButton';
import Timer from '../../components/battle/timer';
import AnswerItems from '../../components/battle/answerItem';
import Options from '../../components/battle/option';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // eslint-disable-next-line no-bitwise
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

class Answer extends Component {
  state = {
    isLoading: true,
    activeStep: 0,
    selectedCategory: '',
    timer: 30,
    stopMode: true,
    timerIndex: uuidv4(),
    showAnswerHistoryStatus: false,
    doubleChanceStatus: false,
    removeTwoAnswersStatus: false,
    askAmertaStatus: false,
    question: [],
    selectedAnswer: [],
    usedChances: 1,
    disbaleQuestions: false,
    readyToAnswer: true,
  };

  componentDidMount() {
    this.fetchGameStatus(this.props.navigation.state.params.data.lastGameId);
  }

  fetchGameStatus = id => {
    axios
      .get(`/games/${id}`)
      .then(res => {
        this.setState({
          question: res.data.data.questions.map(item => {
            // eslint-disable-next-line dot-notation
            item['selectedAnswer'] = null;
            return item;
          }),
          isLoading: false,
          stopMode: false,
          selectedCategory: res.data.data.selectedCategory
            ? res.data.data.selectedCategory.title
            : '',
        });
      })
      .catch(() => {
        this.setState({isLoading: false});
        Alert.alert('There has been an error processing your request');
      });
  };

  onTimeFinished = () => {
    Alert.alert(
      'Times Up!',
      'Would you like to buy more time (15 Seconds) to answer this question?',
      [
        {
          text: 'No',
          onPress: () => {
            this.nextStep();
            return true;
          },
          style: 'cancel',
        },
        {text: '150 coin', onPress: () => this.buyTime()},
      ],
      {cancelable: true},
    );
  };

  buyTime = () => {
    if (this.props.profile.stats.coins >= 150) {
      this.props.reduceCoin(this.helpersCoins(5));
      this.setState({
        timer: 15,
        timerIndex: uuidv4(),
        timeExtenderHelperUsageCount:
          this.state.timeExtenderHelperUsageCount + 1,
      });
    } else {
      Alert.alert('Not enough coin');
    }
  };

  helpersCoins = type => {
    switch (type) {
      case 1:
        return 60;
      case 2:
        return 60;
      case 3:
        return 80;
      case 4:
        return 1000;
      case 5:
        return 150;
    }
  };

  helperAction = type => {
    if (this.props.profile.stats.coins >= this.helpersCoins(type)) {
      this.props.reduceCoin(this.helpersCoins(type));
      switch (type) {
        case 1:
          return this.showQuestionHistory();
        case 2:
          return this.doubleChances();
        case 3:
          return this.removeMultipleAnswers();
        case 4:
          return this.askAmerta();
      }
    } else {
      Alert.alert('Not enough coin');
    }
  };

  askAmerta = () => {
    if (!this.state.askAmertaStatus) {
      let question = this.state.question;
      question[this.state.activeStep].selectedAnswer =
        question[this.state.activeStep].correctAnswerNumber;
      this.setState({
        activeStep:
          this.state.activeStep !== 2
            ? this.state.activeStep + 1
            : this.state.activeStep,
        timerIndex: uuidv4(),
        question,
        askAmertaStatus: false,
        readyToAnswer: this.state.activeStep === 2,
      });
      if (this.state.activeStep === 2) {
        return this.sendAnswers();
      }
    }
  };

  removeMultipleAnswers = () => {
    if (!this.state.removeTwoAnswersStatus) {
      let question = this.state.question;
      let array = question[this.state.activeStep],
        chances = [1, 2, 3, 4].filter(
          item => item !== array.correctAnswerNumber,
        );
      let firstNumber = chances[Math.floor(Math.random() * chances.length)];
      chances = chances.filter(item => item !== firstNumber);
      let secondNumber = chances[Math.floor(Math.random() * chances.length)];
      // eslint-disable-next-line dot-notation
      array['disabledItem'] = [firstNumber, secondNumber];
      this.setState({question, removeTwoAnswersStatus: true});
    }
  };

  doubleChances = () => {
    let {
      doubleChanceStatus,
      removeTwoAnswersStatus,
      showAnswerHistoryStatus,
      askAmertaStatus,
    } = this.state;
    if (!doubleChanceStatus) {
      let question = this.state.question;
      question[this.state.activeStep].doubleChance = true;
      this.setState({question, doubleChanceStatus: true});
    }
  };

  showQuestionHistory = () => {
    if (!this.state.showAnswerHistoryStatus) {
      let question = this.state.question;
      question[this.state.activeStep].showHistory = true;
      this.setState({question, showAnswerHistoryStatus: true});
    }
  };

  checkAnswer = index => {
    let question = this.state.question;
    question[this.state.activeStep].selectedAnswer = index;
    if (
      question[this.state.activeStep].doubleChance &&
      question[this.state.activeStep].correctAnswerNumber !== index &&
      this.state.usedChances === 1
    ) {
      this.setState({usedChances: 2});
    } else {
      this.setState({
        question,
        askAmertaStatus: false,
        disbaleQuestions: true,
      });
      this.nextStep();
    }
  };

  nextStep = () => {
    if (this.state.activeStep !== 2) {
      // eslint-disable-next-line consistent-this
      let self = this;
      setTimeout(() => {
        return self.setState({
          activeStep: this.state.activeStep + 1,
          disbaleQuestions: false,
          timerIndex: uuidv4(),
          readyToAnswer: false,
          stopMode: true,
        });
      }, 400);
    }
    if (this.state.activeStep === 2) {
      return this.sendAnswers();
    }
  };

  sendAnswers = () => {
    this.setState({isLoading: true});
    let answers = [];
    this.state.question.forEach(item => {
      answers.push({
        questionId: item.id,
        selectedAnswer: item.selectedAnswer === null ? 0 : item.selectedAnswer,
        usedRemoveTwoAnswersHelper: this.state.removeTwoAnswersStatus,
        usedAnswersHistoryHelper: this.state.showAnswerHistoryStatus,
        usedAskMergenHelper: false,
        timeExtenderHelperUsageCount: this.state.timeExtenderHelperUsageCount,
        usedDoubleChanceHelper: this.state.doubleChanceStatus,
      });
    });
    axios
      .post(
        `/games/${this.props.navigation.state.params.data.lastGameId}/answers`,
        {
          answers,
        },
      )
      .then(() => {
        this.setState({stopMode: true});
        this.props.navigation.navigate('GameStats', {
          id: this.props.navigation.state.params.data.id,
        });
      })
      .catch(() => {
        this.setState({isLoading: false, stopMode: true});
      });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  render() {
    const {
      isLoading,
      timer,
      stopMode,
      activeStep,
      timerIndex,
      selectedCategory,
      showAnswerHistoryStatus,
      doubleChanceStatus,
      removeTwoAnswersStatus,
      askAmertaStatus,
      question,
      disbaleQuestions,
      readyToAnswer,
    } = this.state;
    const {stats} = this.props.profile;
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundImage type={2} />
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRowContainer}>
            <Image
              source={require('../../assets/images/general/profile/coin.png')}
              style={styles.iconContainer}
              resizeMode="contain"
            />
            <View style={styles.boxContainer}>
              <Text style={styles.boxText}>{stats.coins.toLocaleString()}</Text>
            </View>
          </View>
          <View style={[styles.headerRowContainer, {flexDirection: 'column'}]}>
            <View style={styles.timerContainer}>
              <Timer
                timer={timer}
                stopMode={stopMode}
                index={timerIndex}
                key={timerIndex}
                onTimeFinished={this.onTimeFinished}
              />
            </View>
            <Text style={styles.headerTitle}>{selectedCategory}</Text>
          </View>
          <View style={styles.headerRowContainer}>
            <View style={[styles.bulletItem, {backgroundColor: '#72D317'}]} />
            <View
              style={[
                styles.bulletItem,
                {backgroundColor: '#D4D4D4', marginHorizontal: 10},
              ]}
            />
            <View style={[styles.bulletItem, {backgroundColor: '#D31717'}]} />
          </View>
        </View>
        {/* ANSWERS */}
        <ScrollView
          contentContainerStyle={{
            padding: 10,
            flex: 1,
            justifyContent: 'center',
          }}>
          <View style={styles.asnwersContainer}>
            {isLoading && <ActivityIndicator color="#fff" />}
            {!readyToAnswer && (
              <GreenButton
                type={1}
                onPress={() =>
                  this.setState({readyToAnswer: true, stopMode: false})
                }>
                <Text style={styles.buttonText}>Next Question</Text>
              </GreenButton>
            )}
            {question.length > 0 && !isLoading && readyToAnswer ? (
              <Fragment>
                <Text style={styles.questionTitle}>
                  {question[activeStep].body}
                </Text>
                <AnswerItems
                  title={question[activeStep].answer1}
                  history={question[activeStep].answer1ChooseHistory}
                  question={question[activeStep]}
                  index={1}
                  label={'A'}
                  onPress={() =>
                    !disbaleQuestions ? this.checkAnswer(1) : null
                  }
                />
                <AnswerItems
                  title={question[activeStep].answer2}
                  history={question[activeStep].answer2ChooseHistory}
                  question={question[activeStep]}
                  index={2}
                  label={'B'}
                  onPress={() =>
                    !disbaleQuestions ? this.checkAnswer(2) : null
                  }
                />
                <AnswerItems
                  title={question[activeStep].answer3}
                  history={question[activeStep].answer3ChooseHistory}
                  question={question[activeStep]}
                  index={3}
                  label={'C'}
                  onPress={() =>
                    !disbaleQuestions ? this.checkAnswer(3) : null
                  }
                />
                <AnswerItems
                  title={question[activeStep].answer4}
                  history={question[activeStep].answer4ChooseHistory}
                  question={question[activeStep]}
                  index={4}
                  label={'D'}
                  onPress={() =>
                    !disbaleQuestions ? this.checkAnswer(4) : null
                  }
                />
              </Fragment>
            ) : null}
          </View>
        </ScrollView>
        {/* FOOTER */}
        <View style={styles.optionContainer}>
          <Options
            title={`Answer ${'\n'}History`}
            coin={60}
            type={1}
            active={showAnswerHistoryStatus}
            onPress={this.helperAction}
          />
          <Options
            title={`Double ${'\n'}Chance`}
            coin={60}
            type={2}
            active={doubleChanceStatus}
            onPress={this.helperAction}
          />
          <Options
            title={`Remove ${'\n'}2 Answers`}
            coin={80}
            type={3}
            active={removeTwoAnswersStatus}
            onPress={this.helperAction}
          />
          <Options
            title={`Ask ${'\n'}AMERTA`}
            coin={1000}
            type={4}
            active={askAmertaStatus}
            onPress={this.helperAction}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginHorizontal: 5,
  },
  boxText: {fontSize: 13, color: '#ffffff'},
  bulletItem: {width: 20, height: 20, borderRadius: 10},
  timerContainer: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: 'rgb(112,112,112)',
    backgroundColor: '#fff',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  asnwersContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(2,176,191,0.69)',
    backgroundColor: 'rgba(0,39,54,0.83)',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    paddingTop: 30,
  },
  questionTitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {reduceCoin})(Answer);
