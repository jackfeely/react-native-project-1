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
// poster API key: 8cd0440c

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
    const searchResults = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      title: '',
      year: '',
      search: '',
      results: searchResults.cloneWithRows(['row 1', 'row 2']),
      poster: false,
      isLoading: false
    };
  }

  _handleListResponse(response) {
    console.log(response);
    theseResults = [];
    response.Search.forEach(function(movie) {
      // let thisMovie = {
      //   title: movie.Title,
      //   year: movie.Year,
      //   poster: movie.Poster
      // };
      let thisMovie = movie.Title;
      theseResults.push(thisMovie);
    });

    let testSearchResults = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let thisThang = testSearchResults.cloneWithRows(theseResults);
    this.setState({ results: thisThang });
  }

  _getSearchResults(searchText){
    console.log(searchText)
    this.setState({
      search: searchText
      // isLoading: true
    });
    let query = `https://www.omdbapi.com/?s=${this.state.search}`;
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleListResponse(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'OOPSIE DAISY' + error
        })
      );
  }

  render() {
    if (this.state.poster) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.text}
            onChangeText={(text) => this._getSearchResults(text)}
            placeholder='Search for a movie' />
          <Text>{this.state.title}</Text>
          <Text>{this.state.year}</Text>
          <Image
            source={{uri: this.state.poster}}
            style={{width:150, height: 232.5}} />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.text}
            onChangeText={(text) => this._getSearchResults(text)}
            placeholder='Search for a movie' />
          <ListView
            dataSource={this.state.results}
            renderRow={(rowData) => <Text>{rowData}</Text>} />
        </View>
      );
    }
  }
}

          // <ListView
          //   dataSource={this.state.results}
          //   renderRow={(rowData) => <Text>{rowData}</Text> />

AppRegistry.registerComponent('ReactNativeProject1', () => ReactNativeProject1);
