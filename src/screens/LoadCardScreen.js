import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCodeDisplay from '../components/QRCodeDisplay';
import WalletConnectButton from '../components/WalletConnectButton';

const LoadCardScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balanceLLR, setBalanceLLR] = useState(187.54);
  const [usdPrice, setUsdPrice] = useState(0.5);
  const [topUpAmount, setTopUpAmount] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=linklayer&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        if (data.linklayer) setUsdPrice(data.linklayer.usd);
      })
      .catch(() => {});
  }, []);

  const handleConnect = () => {
    setWalletConnected(true);
    setWalletAddress('0x1234...ABCD');
  };

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid amount');
      return;
    }
    const usd = (amount * usdPrice).toFixed(2);
    Alert.alert('Top-Up Successful', `${amount} LLR ≈ $${usd} added to your card`);
    setTopUpAmount('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="qr-code-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <WalletConnectButton onPress={handleConnect} />
      </View>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.balance}>{balanceLLR.toFixed(2)} LLR</Text>
      <Text style={styles.usd}>≈ ${(balanceLLR * usdPrice).toFixed(2)} USD</Text>
      <View style={styles.topUpContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount LLR"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={topUpAmount}
          onChangeText={setTopUpAmount}
        />
        <TouchableOpacity style={styles.button} onPress={handleTopUp}>
          <Text style={styles.buttonText}>Top-Up Card</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Wallet QR</Text>
            <QRCodeDisplay value={walletConnected ? walletAddress : ''} />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoadCardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', paddingTop: 60 },
  topBar: { width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  logo: { width: 80, height: 80, marginBottom: 20, resizeMode: 'contain' },
  balance: { color: '#00FFAA', fontSize: 28, fontWeight: 'bold' },
  usd: { color: '#888', fontSize: 16, marginBottom: 20 },
  topUpContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  input: { backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 8, width: 120, marginRight: 10 },
  button: { backgroundColor: '#00FFAA', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: '#000', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#000', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalTitle: { color: '#00FFAA', fontSize: 18, marginBottom: 10 },
  closeButton: { marginTop: 20 },
  closeText: { color: '#fff', fontSize: 16 }
});
