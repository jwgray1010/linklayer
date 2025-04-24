import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeDisplay = ({ value }) => {
  return (
    <View style={styles.container}>
      <QRCode value={value || 'https://linklayer.app'} size={160} color="#00FFAA" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCodeDisplay;
