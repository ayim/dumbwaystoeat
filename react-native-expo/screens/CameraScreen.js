import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner, Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
    barcodeTypes = {
        barCodeTypes: [ BarCodeScanner.Constants.BarCodeType.ean13 ]
    };

    state = {
        hasCameraPermission: null,
        barcodeScanning: true,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    _toggleBarcodeScanning = () => this.setState({ barcodeScanning: !this.state.barcodeScanning });

    _getBarcodeTypes = {
        barCodeTypes: [ BarCodeScanner.Constants.BarCodeType.ean13 ]
    }

    _takePicture = () => {
        if (this.camera) {
            console.log('Take picture pressed');
            this.camera.takePictureAsync({ onPictureSaved: this._onPictureSaved });
        }
    };

    _onPictureSaved = async photo => {
        console.log(photo.uri);

        // await FileSystem.moveAsync({
        //   from: photo.uri,
        //   to: `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`,
        // });
    }

    _handleBarCodeRead = data => {
        this.setState({ barcodeScanning: !this.state.barcodeScanning });
        Alert.alert(
            'Scan successful!',
            JSON.stringify(data)
        );
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }} onLayout={this._test}>
                    <Camera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}
                        barCodeScannerSettings={ this.barcodeTypes }
                        onBarCodeScanned={ this._handleBarCodeRead }
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={ this._takePicture }>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Take Picture{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}