
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { CheckBadgeIcon } from './Icons';

interface CompleteSwapModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const CompleteSwapModal: React.FC<CompleteSwapModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <CheckBadgeIcon width={32} height={32} color="#4ADE80" />
            </View>
          </View>
          <Text style={styles.title}>要完成這次交換嗎？</Text>
          <Text style={styles.description}>將交換標記為完成後，聊天室將被封存，且該配對將從您的列表中移除。此操作無法復原。</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>確認</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    padding: 12,
    borderRadius: 999,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#374151',
  },
  confirmButton: {
    backgroundColor: '#16A34A', // green-600
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CompleteSwapModal;
