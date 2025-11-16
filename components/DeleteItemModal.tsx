
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ExclamationTriangleIcon } from './Icons';

interface DeleteItemModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
                <ExclamationTriangleIcon width={32} height={32} color="#F87171" />
            </View>
          </View>
          <Text style={styles.title}>刪除物品？</Text>
          <Text style={styles.description}>您確定要永久刪除這件物品嗎？此操作無法復原。</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>刪除</Text>
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
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconBackground: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#374151',
  },
  confirmButton: {
    backgroundColor: '#DC2626', // red-600
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DeleteItemModal;
