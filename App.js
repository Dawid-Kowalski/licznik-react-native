import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      running: false,
      display: 0,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    }
  }

  start = () => {
    if(!this.state.running) {
      this.setState({ running : true });
      this.watch = setInterval(() => this.step(), 10);
    }
  }



  step = () => {
    if(!this.state.running) return;
      this.calculate();
      this.print();
  }

  calculate = () => {
    this.setState({ miliseconds : this.state.miliseconds + 1});
      if (this.state.miliseconds >= 100) {
        this.setState({seconds : this.state.seconds + 1})
        this.setState({miliseconds : 0})
    }
      if (this.state.seconds >= 60) {
        this.setState({minutes : this.state.minutes + 1})
        this.setState({seconds : 0})
    }
  }

  format = (minutes, seconds, miliseconds) => {
    return `${this.add0(minutes)}:${this.add0(seconds)}:${this.add0(miliseconds)}`
  }

  print = () => {
    this.setState({ display : this.format(this.state.minutes, this.state.seconds, this.state.miliseconds)});
  }

  stop = () => {
    this.setState({ running : false });
    clearInterval(this.watch);
  }

  add0 = (value) => {
  let result = value.toString();
    if(result.length <2) {
      result = "0" + result;
    }
    return result;
  }

  reset = () => {
    this.stop();
    this.setState({ display : 0 });
    this.setState({ minutes : 0 });
    this.setState({ seconds : 0 });
    this.setState({ miliseconds : 0 });
  }
  
  render() {
    return (
      <View>
        <Text style={styles.counterText}>Licznik</Text>
        <Button style={styles.counterButton} title='start' onPress={this.start}></Button>
        <Button style={styles.counterButton} title='stop' onPress={this.stop}></Button>
        <Button style={styles.counterButton} title='reset' onPress={this.reset}></Button>
        <Text style={styles.counterText}>{this.state.display}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  counterText: {
    textAlign: 'center'
  },
  counterButton: {
    margin: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF'
  }
});