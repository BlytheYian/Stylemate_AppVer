
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { ClothingItem } from '../types';
import { XMarkIcon } from './Icons';

interface ViewOnlyItemDetailsModalProps {
  item: ClothingItem;
  onClose: () => void;
}

const ViewOnlyItemDetailsModal: React.FC<ViewOnlyItemDetailsModalProps> = ({ item, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.headerUser}>
              <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
              <Text style={styles.headerTitle}>{item.userName} 的物品</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <XMarkIcon width={24} height={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrls[activeImageIndex] }} style={styles.mainImage}/>
              {item.imageUrls.length > 1 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailList}>
                      {item.imageUrls.map((url, index) => (
                          <TouchableOpacity key={index} onPress={() => setActiveImageIndex(index)} style={[styles.thumbnail, activeImageIndex === index && styles.activeThumbnail]}>
                              <Image source={{ uri: url }} style={styles.thumbnailImage} />
                          </TouchableOpacity>
                      ))}
                  </ScrollView>
              )}
            </View>
            
            <View style={styles.detailsContainer}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.color}>{item.color}</Text>
              <Text style={styles.price}>NT$ {item.estimatedPrice}</Text>
              
              <View style={styles.tagsContainer}>
                  {item.style_tags.map(tag => (
                      <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                  ))}
              </View>
              
              <Text style={styles.descriptionHeader}>描述</Text>
              <Text style={styles.description}>{item.description || "未提供描述。"}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalContainer: { backgroundColor: '#1F2937', borderRadius: 24, width: '100%', maxWidth: 500, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.3)', maxHeight: '90%' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  headerUser: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 12 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, fontWeight: 'bold', color: 'white' },
  scrollContainer: { padding: 24, },
  imageContainer: { marginBottom: 24, alignItems: 'center' },
  mainImage: { width: '100%', aspectRatio: 3/4, borderRadius: 12, backgroundColor: '#374151', marginBottom: 8 },
  thumbnailList: { marginTop: 8 },
  thumbnail: { width: 64, height: 80, borderRadius: 6, marginRight: 8, opacity: 0.6 },
  activeThumbnail: { opacity: 1, borderWidth: 2, borderColor: '#F472B6' },
  thumbnailImage: { width: '100%', height: '100%', borderRadius: 6 },
  detailsContainer: {},
  category: { fontFamily: 'Poppins-Bold', fontSize: 32, fontWeight: 'bold', color: 'white' },
  color: { fontFamily: 'Poppins-Regular', fontSize: 20, color: '#9CA3AF' },
  price: { fontFamily: 'Poppins-SemiBold', fontSize: 22, color: '#F472B6', fontWeight: '600', marginTop: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 16 },
  tag: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  tagText: { fontFamily: 'Poppins-SemiBold', color: 'white', fontSize: 14, fontWeight: '600' },
  descriptionHeader: { fontFamily: 'Poppins-Bold', fontSize: 18, marginBottom: 8, color: 'white' },
  description: { fontFamily: 'Poppins-Regular', color: '#D1D5DB', fontSize: 16, lineHeight: 24 },
});

export default ViewOnlyItemDetailsModal;
