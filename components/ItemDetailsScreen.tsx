
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ClothingItem } from '../types';
import { ArrowUturnLeftIcon, PencilIcon, TrashIcon } from './Icons';

interface ItemDetailsScreenProps {
  item: ClothingItem;
  onBack: () => void;
  onEdit: (item: ClothingItem) => void;
  onDelete: (item: ClothingItem) => void;
}

const ItemDetailsScreen: React.FC<ItemDetailsScreenProps> = ({ item, onBack, onEdit, onDelete }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>物品詳情</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrls[activeImageIndex] }} style={styles.mainImage} />
          {item.imageUrls.length > 1 && (
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailScroll}>
                {item.imageUrls.map((url, index) => (
                    <TouchableOpacity key={index} onPress={() => setActiveImageIndex(index)} style={[styles.thumbnailButton, activeImageIndex === index && styles.activeThumbnail]}>
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
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>
            
            <Text style={styles.descriptionHeader}>描述</Text>
            <Text style={styles.description}>{item.description || "未提供描述。"}</Text>
        </View>

        <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={() => onEdit(item)} style={[styles.actionButton, styles.editButton]}>
                <PencilIcon width={20} height={20} color="#A78BFA" />
                <Text style={[styles.actionButtonText, {color: "#A78BFA"}]}>編輯</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)} style={[styles.actionButton, styles.deleteButton]}>
                <TrashIcon width={20} height={20} color="#F87171" />
                <Text style={[styles.actionButtonText, {color: "#F87171"}]}>刪除</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)' },
  backButton: { marginRight: 16 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: 'white', fontWeight: 'bold' },
  scrollContainer: { padding: 16 },
  imageContainer: { marginBottom: 24 },
  mainImage: { width: '100%', aspectRatio: 1, backgroundColor: '#1F2937', borderRadius: 8, overflow: 'hidden', marginBottom: 8 },
  thumbnailScroll: { flexDirection: 'row' },
  thumbnailButton: { width: 64, height: 64, borderRadius: 6, overflow: 'hidden', marginRight: 8, opacity: 0.6 },
  activeThumbnail: { opacity: 1, borderWidth: 2, borderColor: '#F472B6' },
  thumbnailImage: { width: '100%', height: '100%' },
  detailsContainer: { flex: 1, marginBottom: 24 },
  category: { fontFamily: 'Poppins-Bold', fontSize: 24, fontWeight: 'bold', color: 'white' },
  color: { fontFamily: 'Poppins-Regular', fontSize: 18, color: '#9CA3AF' },
  price: { fontFamily: 'Poppins-SemiBold', fontSize: 20, color: '#F472B6', fontWeight: '600', marginTop: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 16 },
  tag: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  tagText: { fontFamily: 'Poppins-SemiBold', color: 'white', fontSize: 14, fontWeight: '600' },
  descriptionHeader: { fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 4, color: 'white' },
  description: { fontFamily: 'Poppins-Regular', color: '#D1D5DB', fontSize: 14, lineHeight: 20 },
  actionsContainer: { flexDirection: 'row', gap: 16 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 999 },
  editButton: { backgroundColor: 'rgba(91, 33, 182, 0.2)' },
  deleteButton: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  actionButtonText: { fontFamily: 'Poppins-Bold', fontWeight: 'bold', marginLeft: 8 },
});

export default ItemDetailsScreen;
