
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Match } from '../types';
import { SparklesIcon } from './Icons';

interface MatchModalProps {
  match: Match;
  onClose: () => void;
  onStartChat: (match: Match) => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ match, onClose, onStartChat }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.sparklesIcon}>
              <SparklesIcon width={96} height={96} color="#F472B6" />
          </View>
          <Text style={styles.title}>配對成功！</Text>
          <Text style={styles.subtitle}>您和 {match.user2.clothingItem.userName} 都喜歡對方的物品。</Text>
          
          <View style={styles.itemsContainer}>
            <View style={styles.itemWrapper}>
              <Image source={{uri: match.user1.clothingItem.imageUrls[0]}} style={styles.itemImage}/>
              <Text style={styles.itemLabel}>您的 {match.user1.clothingItem.category}</Text>
            </View>
            <Text style={styles.swapIcon}>&harr;</Text>
            <View style={styles.itemWrapper}>
              <Image source={{uri: match.user2.clothingItem.imageUrls[0]}} style={styles.itemImage}/>
              <Text style={styles.itemLabel}>{match.user2.clothingItem.userName}的 {match.user2.clothingItem.category}</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => onStartChat(match)} style={styles.chatButton}>
                  <Text style={styles.buttonText}>傳送訊息</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.continueButton}>
                  <Text style={styles.buttonText}>繼續滑動</Text>
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
  },
  modalContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 24,
    padding: 24,
    margin: 24,
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  sparklesIcon: {
      position: 'absolute',
      top: -48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F472B6',
    marginTop: 48,
    marginBottom: 8,
  },
  subtitle: {
    color: '#D1D5DB',
    marginBottom: 24,
    textAlign: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    fontSize: 12,
    textAlign: 'center'
  },
  swapIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F472B6',
    marginHorizontal: 8,
  },
  buttonContainer: {
    width: '100%',
  },
  chatButton: {
    width: '100%',
    backgroundColor: '#EC4899',
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: 12,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#374151',
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MatchModal;