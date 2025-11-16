
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { ClothingItem } from '../types';

interface ProposeSwapModalProps {
  proposal: {
    myItem: ClothingItem;
    theirItem: ClothingItem;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

const ItemCard = ({ item, userLabel }: { item: ClothingItem, userLabel: string }) => (
    <View style={styles.itemWrapper}>
        <Image source={{uri: item.imageUrls[0]}} style={styles.itemImage}/>
        <Text style={styles.itemLabel} numberOfLines={2}>{userLabel}</Text>
        <Text style={styles.itemPrice}>NT$ {item.estimatedPrice}</Text>
    </View>
);

const ProposeSwapModal: React.FC<ProposeSwapModalProps> = ({ proposal, onConfirm, onCancel }) => {
  const { myItem, theirItem } = proposal;
  
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>確認交換提議</Text>
          <Text style={styles.description}>您確定要用您的物品交換 {theirItem.userName} 的物品嗎？</Text>
          
          <View style={styles.itemsContainer}>
            <ItemCard item={myItem} userLabel={`您的 ${myItem.category}`} />
            <Text style={styles.swapIcon}>&harr;</Text>
            <ItemCard item={theirItem} userLabel={`${theirItem.userName}的 ${theirItem.category}`} />
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>確認交換</Text>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
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
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 32,
  },
  itemWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  itemLabel: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
  itemPrice: {
    color: '#F472B6',
    fontWeight: '600',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  swapIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F472B6',
    marginHorizontal: 8,
    lineHeight: 160, // To center vertically with image
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
    backgroundColor: '#EC4899',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProposeSwapModal;
