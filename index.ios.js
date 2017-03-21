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
import { AppRegistry, StyleSheet, Text, TextInput, View, Button, Image, ListView } from 'react-native';
// posterr API key: 8cd0440c

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
      title: '',
      year: '',
      search: '',
      results: [],
      poster: false,
      isLoading: false
    };
  }

  _executeQuery(query) {
    // console.log(query);
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
    console.log(response);
    console.log(response.Search[0]);
    this.setState({
      title: response.Search[0].Title,
      year: response.Search[0].Year,
      poster: response.Search[0].Poster
    })
  }

  getMovieTitle(thisSearch){
    this.setState({
      search: thisSearch
    });
  }

  _findMovie(){
    this.setState({ isLoading: true });
    // `https://img.omdbapi.com/?apikey=8cd0440c&`;
    // t=${this.state.search}
    var query = `https://www.omdbapi.com/?s=${this.state.search}`;
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
    let title = this.state.title;
    let year = this.state.year;
    let poster = this.state.poster;
    let results = this.state.results;
    if (poster) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.text}
            onChangeText={(text) => this.getMovieTitle(text)}
            placeholder='Search for a movie' />
          <Button
            title='Find movie'
            onPress={this._findMovie.bind(this)} />
          <Text>{title}</Text>
          <Text>{year}</Text>
          <Image
            source={{uri: poster}}
            style={{width:150, height: 232.5}} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.text}
            onChangeText={(text) => this.getMovieTitle(text)}
            placeholder='Search for a movie' />
          <Button
            title='Find movie'
            onPress={this._findMovie.bind(this)} />
        </View>
      );
    }
  }
}

          // <ListView
          //   dataSource={this.state.results}
          //   renderRow={(rowData) => <Text>{rowData}</Text> />

AppRegistry.registerComponent('ReactNativeProject1', () => ReactNativeProject1);
