import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Match, PickupMethod, TransactionPartyDetails, User } from '../types';
import { XMarkIcon } from './Icons';

interface TransactionFormModalProps {
  match: Match;
  user: User;
  onClose: () => void;
  onCreateTransaction: (details: TransactionPartyDetails) => void;
}

const convenienceStores: PickupMethod[] = ['7-11', 'FamilyMart', 'OK Mart', '萊爾富'];
const otherMethods: PickupMethod[] = ['Home Delivery', '面交'];
const allMethods = [...convenienceStores, ...otherMethods];

const storeBranches: { [key: string]: string[] } = {
  '7-11': ['台北南港門市', '台中西屯門市', '高雄左營門市'],
  'FamilyMart': ['新北板橋門市', '桃園中壢門市', '台南東區門市'],
  'OK Mart': ['基隆仁愛門市', '新竹東區門市', '嘉義西區門市'],
  '萊爾富': ['基隆仁愛門市', '新竹東區門市', '嘉義西區門市']
};

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({
  match,
  user,
  onClose,
  onCreateTransaction,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [pickupMethod, setPickupMethod] = useState<PickupMethod>('7-11');
  const [pickupLocation, setPickupLocation] = useState('');
  const [error, setError] = useState('');
  const [showPicker, setShowPicker] = useState(false); // 新增 picker modal 狀態

  const handleSubmit = () => {
    if (!phoneNumber.trim() || !pickupLocation.trim()) {
      setError('所有欄位皆為必填。');
      return;
    }
    setError('');
    onCreateTransaction({
      phoneNumber,
      pickupMethod,
      pickupLocation,
    });
  };

  const renderLocationInput = () => {
    if (pickupMethod === 'Home Delivery' || pickupMethod === '面交') {
      return (
        <TextInput
          style={styles.input}
          value={pickupLocation}
          onChangeText={setPickupLocation}
          placeholder={
            pickupMethod === 'Home Delivery'
              ? '請輸入完整宅配地址'
              : '請輸入建議的面交地點'
          }
          placeholderTextColor="#9CA3AF"
        />
      );
    }

    // 便利商店情況 → 顯示自訂下拉 modal
    return (
      <>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.pickerText}>
            {pickupLocation || '選擇門市'}
          </Text>
        </TouchableOpacity>

        <Modal transparent animationType="fade" visible={showPicker}>
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>選擇門市</Text>
              <ScrollView>
                {storeBranches[pickupMethod]?.map((branch) => (
                  <TouchableOpacity
                    key={branch}
                    style={styles.pickerItem}
                    onPress={() => {
                      setPickupLocation(branch);
                      setShowPicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{branch}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  return (
    <Modal transparent animationType="fade" visible>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <XMarkIcon width={24} height={24} color="#9CA3AF" />
          </TouchableOpacity>
          <Text style={styles.title}>安排取貨資訊</Text>

          <ScrollView>
            <Text style={styles.label}>聯絡電話</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="您的手機號碼"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>取貨方式</Text>
            <View style={styles.methodGrid}>
              {allMethods.map((method) => (
                <TouchableOpacity
                  key={method}
                  onPress={() => {
                    setPickupMethod(method);
                    setPickupLocation('');
                  }}
                  style={[
                    styles.methodButton,
                    pickupMethod === method && styles.activeMethodButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.methodButtonText,
                      pickupMethod === method && styles.activeMethodButtonText,
                    ]}
                  >
                    {method === 'Home Delivery' ? '宅配' : method}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>
              {pickupMethod === 'Home Delivery'
                ? '宅配地址'
                : pickupMethod === '面交'
                ? '面交地點'
                : '取貨門市'}
            </Text>
            {renderLocationInput()}

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>確認並送出</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalContainer: { backgroundColor: '#1F2937', borderRadius: 24, padding: 24, width: '100%', maxWidth: 400, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.3)', maxHeight: '80%' },
  closeButton: { position: 'absolute', top: 16, right: 16 },
  title: { fontFamily: 'Poppins-Bold', fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 16 },
  label: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9CA3AF', marginBottom: 4, marginTop: 16 },
  input: { width: '100%', backgroundColor: '#374151', padding: 12, borderRadius: 8, color: 'white', fontFamily: 'Poppins-Regular', justifyContent: 'center' },
  pickerText: { color: 'white', fontFamily: 'Poppins-Regular' },
  methodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  methodButton: { flex: 1, minWidth: '45%', backgroundColor: '#374151', padding: 12, borderRadius: 8, alignItems: 'center' },
  activeMethodButton: { backgroundColor: '#EC4899' },
  methodButtonText: { fontFamily: 'Poppins-Regular', fontSize: 14, color: 'white' },
  activeMethodButtonText: { fontFamily: 'Poppins-Bold', fontWeight: 'bold' },
  errorText: { fontFamily: 'Poppins-Regular', color: '#F87171', fontSize: 14, textAlign: 'center', marginTop: 16 },
  submitButton: { width: '100%', backgroundColor: '#EC4899', paddingVertical: 12, borderRadius: 999, alignItems: 'center', marginTop: 16 },
  submitButtonText: { fontFamily: 'Poppins-Bold', color: 'white', fontWeight: 'bold' },

  // picker modal styles
  pickerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  pickerContainer: { backgroundColor: '#1F2937', padding: 20, borderRadius: 16, width: '80%', maxHeight: '60%' },
  pickerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  pickerItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#374151' },
  pickerItemText: { color: 'white', fontSize: 16, textAlign: 'center' },
  cancelButton: { marginTop: 12, backgroundColor: '#374151', padding: 10, borderRadius: 8 },
  cancelButtonText: { color: '#9CA3AF', textAlign: 'center', fontSize: 14 },
});

export default TransactionFormModal;
