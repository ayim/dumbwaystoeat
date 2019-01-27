import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from "react-native-modal";
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import CameraScreen from './CameraScreen';

export default class HomeScreen extends React.Component {
  state = {
    isModalVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          {/* <View style={{
            flex:1, 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            }}>
            <Image 
            source={ require('../assets/images/stub_image.gif') 
            }
            style={styles.testImage} />
          </View> */}

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Hi Larryy
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.scanButtonContainer}>
        <TouchableOpacity onPress={this._handleScanButtonPressed}>
              <View style = {styles.scanButtonView}>
                    <Text style = {styles.scanButtonText}>FEED ME!</Text>
              </View>
        </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.scanModalContainer}>
            <View style={styles.scanModalTopBar}>
              <TouchableOpacity onPress={this._handleModalCancelButtonPressed}>
                <Image 
                source={ require('../assets/images/baseline_close_black_48dp.png') }
                style={ styles.scanModalCancelButton } />
              </TouchableOpacity>
              <Text style={styles.scanModalTopBarText}>SCAN</Text>
            </View>
            <CameraScreen style={{flex: 5}}/>
          </View>
        </Modal>

      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _handleScanButtonPressed = () => {
    this._toggleModal();
  }

  _handleModalCancelButtonPressed = () => {
    this._toggleModal();
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  scanButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 20
    // padding: 20,
  },
  scanButtonView: {
    width: 200,
    height: 60,
    backgroundColor:'#80cbc4',
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 12
  },
  scanButtonText: {
    fontSize: 16,
    color: '#ffffff'
  },
  scanModalContainer: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  scanModalTopBar: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  scanModalTopBarText: {
    fontSize: 20,
    marginLeft: 20
  },
  scanModalCancelButton: {
    marginLeft: 10,
    width: 30,
    height: 30
  },
  testImage: {
    height: 100
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
