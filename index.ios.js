// STARTER CODE

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// export default class ReactNativeProject1 extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('ReactNativeProject1', () => ReactNativeProject1);

//-----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// MY CODE

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    borderColor: 'black',
    borderWidth: 2,
    height: 40,
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35
  }
});

class ReactNativeProject1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: '',
      isLoading: false,
      year: ''
    };
  }

  _executeQuery(query) {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'OOPSIE DAISY' + error
        })
      );
  }

  _handleResponse(response) {
    this.setState({
      year: response.Year
    })
  }

  getMovieTitle(title){
    this.setState({
      movie: title
    });
  }

  _findMovie(){
    this.setState({ isLoading: true });
    var query = `https://www.omdbapi.com/?t=${this.state.movie}`;
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'OOPSIE DAISY' + error
        })
      );
  }

  render() {
    let thing = this.state.year;
    return (
      <View style={styles.container}>
        <Text>Hello world!</Text>
        <TextInput
          style={styles.text}
          onChangeText={(text) => this.getMovieTitle(text)}
          placeholder='please work'
        />
        <Button
          title='Find movie'
          onPress={this._findMovie.bind(this)}
        />
        <Text>
          {thing}
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('ReactNativeProject1', () => ReactNativeProject1);
