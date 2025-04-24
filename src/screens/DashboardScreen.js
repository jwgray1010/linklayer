import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';

const validators = [
  { id: '1', name: 'Validator One', staked: 1200 },
  { id: '2', name: 'Validator Two', staked: 850 },
  { id: '3', name: 'Validator Three', staked: 430 }
];

const DashboardScreen = () => {
  const [redeemModal, setRedeemModal] = useState(false);
  const [spendAmount, setSpendAmount] = useState('');
  const [code, setCode] = useState('');

  const handleStake = (name) => Alert.alert('Stake', `Staked with ${name}`);
  const handleUnstake = (name) => Alert.alert('Unstake', `Unstaked from ${name}`);

  const handleGenerateCode = () => {
    const amt = parseFloat(spendAmount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert('Invalid amount');
      return;
    }
    const generated = 'LLR' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setCode(generated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validator Leaderboard</Text>
      <FlatList
        data={validators}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.validatorRow}>
            <Text style={styles.validatorName}>{item.name}</Text>
            <Text style={styles.validatorStake}>{item.staked} LLR</Text>
            <View style={styles.validatorButtons}>
              <TouchableOpacity onPress={() => handleStake(item.name)} style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Stake</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUnstake(item.name)} style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Unstake</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.redeemTrigger} onPress={() => setRedeemModal(true)}>
        <Text style={styles.redeemTriggerText}>Redeem / Spend</Text>
      </TouchableOpacity>
      <Modal visible={redeemModal} transparent animationType="slide" onRequestClose={() => setRedeemModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Redeem LLR</Text>
            <TextInput
              style={styles.input}
              placeholder="Amount LLR"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={spendAmount}
              onChangeText={setSpendAmount}
            />
            <TouchableOpacity onPress={handleGenerateCode} style={styles.button}>
              <Text style={styles.buttonText}>Generate Code</Text>
            </TouchableOpacity>
            {code ? <Text style={styles.generatedCode}>{code}</Text> : null}
            <TouchableOpacity onPress={() => setRedeemModal(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#00FFAA', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  validatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  validatorName: { color: '#fff', fontSize: 16 },
  validatorStake: { color: '#00FFAA', fontSize: 16 },
  validatorButtons: { flexDirection: 'row' },
  smallButton: {
    backgroundColor: '#00FFAA',
    padding: 6,
    borderRadius: 6,
    marginLeft: 5
  },
  smallButtonText: { color: '#000', fontSize: 12 },
  redeemTrigger: {
    backgroundColor: '#00FFAA',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  redeemTriggerText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#000', padding: 20, borderRadius: 12, alignItems: 'center' },
  modalTitle: { color: '#00FFAA', fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 8, width: 120, marginBottom: 10 },
  button: { backgroundColor: '#00FFAA', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: '#000', fontWeight: 'bold' },
  generatedCode: { color: '#fff', fontSize: 18, marginVertical: 10 },
  closeButton: { marginTop: 10 },
  closeText: { color: '#fff', fontSize: 16 }
});
