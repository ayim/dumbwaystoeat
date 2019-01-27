import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

const baseUrl = 'test';

export default class App extends Component {
    state = {
        hasCameraPermission: null,
        barCodeScanned: false
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _toggleScanned = () => {
        this.setState({ barCodeScanned: !this.state.barCodeScanned });
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _delay = (time) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(), time);
        });
      }

    _handleBarCodeRead = async (scanRes) => {
        // Temp solution to handle multiple barcode reads.
        await this._delay(500);

        if (!this.state.barCodeScanned) {

            // Toggle to prevent additional scans during processing.
            this._toggleScanned();

            if (scanRes.data) {
                this._fetchFoodJson(scanRes.data);
            }
        }
    };

    _fetchFoodJson = async (data) => {
        try {
            let response = await fetch(baseUrl + data);
            let responseJson = await response.json();
            this._toggleScanned();
        } catch (err) {
            console.error(err);
            this._toggleScanned();
        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        ref={ref => {
                            this.camera = ref;
                        }}
                        onBarCodeRead={this._handleBarCodeRead}
                        style={{ height: 400 }}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={ {flex: 1}}>
                {this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                            ref={ref => {
                                this.camera = ref;
                            }}
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{ flex: 1 }}
                        />
        }
            </View>
        );
    }
}


// import React from 'react';
// import { Text, View, TouchableOpacity, Alert } from 'react-native';
// import { BarCodeScanner, Camera, Permissions } from 'expo';

// export default class CameraExample extends React.Component {
//     state = {
//         hasCameraPermission: null,
//         barcodeScanning: true,
//         type: Camera.Constants.Type.back,
//     };

//     async componentWillMount() {
//         const { status } = await Permissions.askAsync(Permissions.CAMERA);
//         this.setState({ hasCameraPermission: status === 'granted' });
//     }

//     _toggleBarcodeScanning = () => this.setState({ barcodeScanning: !this.state.barcodeScanning });

//     _getBarcodeTypes = {
//         barCodeTypes: [ BarCodeScanner.Constants.BarCodeType.ean13 ]
//     }

//     _takePicture = () => {
//         if (this.camera) {
//             console.log('Take picture pressed');
//             this.camera.takePictureAsync({ onPictureSaved: this._onPictureSaved });
//         }
//     };

//     _onPictureSaved = async photo => {
//         console.log(photo.uri);

//         // await FileSystem.moveAsync({
//         //   from: photo.uri,
//         //   to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
//         // });
//     }

//     _handleBarCodeRead = data => {
//         this.setState({ barcodeScanning: !this.state.barcodeScanning });
//         Alert.alert(
//             'Scan successful!',
//             JSON.stringify(data)
//         );
//     };

//     render() {
//         const { hasCameraPermission } = this.state;
//         if (hasCameraPermission === null) {
//             return <View />;
//         } else if (hasCameraPermission === false) {
//             return <Text>No access to camera</Text>;
//         } else {
//             return (
//                 <View style={{ flex: 1 }}>
//                     <Camera
//                         ref={ ref => {
//                             this.camera = ref;
//                         }}
//                         style={{ height: 400 }}
//                         type={ this.state.type }
//                         barCodeScannerSettings={{barCodeTypes: [ 
//                             BarCodeScanner.Constants.BarCodeType.ean13 
//                         ]}}
//                         onBarCodeScanned={ this._handleBarCodeRead }
//                     >
//                         <View
//                             style={{
//                                 flex: 1,
//                                 backgroundColor: 'transparent',
//                                 flexDirection: 'row',
//                             }}>
//                             <TouchableOpacity
//                                 style={{
//                                     flex: 1,
//                                     alignSelf: 'flex-end',
//                                     alignItems: 'center',
//                                 }}
//                                 onPress={ this._takePicture }>
//                                 <Text
//                                     style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                                     {' '}Take Picture{' '}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </Camera>
//                 </View>
//             );
//         }
//     }
// }