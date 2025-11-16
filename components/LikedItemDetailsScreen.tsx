
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LikedItem } from '../types';
import { ArrowUturnLeftIcon, TrashIcon } from './Icons';

interface LikedItemDetailsScreenProps {
  likedItem: LikedItem;
  onBack: () => void;
  onRemove: (likedItemId: string) => void;
}

const statusStyles: { [key in LikedItem['status']]: { text: string; bg: string; border: string; label: string; description: string; } } = {
  pending: { text: '#FDE047', bg: 'rgba(253, 224, 71, 0.2)', border: 'rgba(253, 224, 71, 0.3)', label: '等待中', description: "對方還沒看到您的喜歡。" },
  matched: { text: '#F472B6', bg: 'rgba(236, 72, 153, 0.2)', border: 'rgba(236, 72, 153, 0.3)', label: '配對成功！', description: "你們都喜歡對方的物品。快去完成交換吧！" },
  rejected: { text: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.2)', border: 'rgba(156, 163, 175, 0.3)', label: '已拒絕', description: "對方這次選擇跳過了。" },
};

const LikedItemDetailsScreen: React.FC<LikedItemDetailsScreenProps> = ({ likedItem, onBack, onRemove }) => {
  const item = likedItem.item;
  const statusInfo = statusStyles[likedItem.status];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>喜愛的物品詳情</Text>
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
            <View style={[styles.statusBox, {backgroundColor: statusInfo.bg, borderColor: statusInfo.border}]}>
                <Text style={[styles.statusLabel, {color: statusInfo.text}]}>{statusInfo.label}</Text>
                <Text style={styles.statusDescription}>{statusInfo.description}</Text>
            </View>
            <View style={styles.userRow}>
                <Image source={{ uri: item.userAvatar }} style={styles.userAvatar}/>
                <Text style={styles.userName}>{item.userName}</Text>
            </View>
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

        {(likedItem.status === 'pending' || likedItem.status === 'rejected') && (
            <TouchableOpacity onPress={() => onRemove(likedItem.id)} style={styles.removeButton}>
                <TrashIcon width={20} height={20} color="#F87171" />
                <Text style={styles.removeButtonText}>從喜愛中移除</Text>
            </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)' },
  backButton: { marginRight: 16 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: 'white', fontWeight: 'bold' },
  scrollContainer: { padding: 16, paddingBottom: 32 },
  imageContainer: { marginBottom: 24 },
  mainImage: { width: '100%', aspectRatio: 1, backgroundColor: '#1F2937', borderRadius: 8, overflow: 'hidden', marginBottom: 8 },
  thumbnailScroll: { flexDirection: 'row' },
  thumbnailButton: { width: 64, height: 64, borderRadius: 6, overflow: 'hidden', marginRight: 8, opacity: 0.6 },
  activeThumbnail: { opacity: 1, borderWidth: 2, borderColor: '#F472B6' },
  thumbnailImage: { width: '100%', height: '100%' },
  detailsContainer: { flex: 1 },
  statusBox: { padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 16 },
  statusLabel: { fontFamily: 'Poppins-Bold', fontWeight: 'bold', fontSize: 16 },
  statusDescription: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#D1D5DB' },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  userAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, borderWidth: 2, borderColor: '#A78BFA' },
  userName: { fontFamily: 'Poppins-Bold', fontSize: 18, fontWeight: 'bold', color: 'white' },
  category: { fontFamily: 'Poppins-Bold', fontSize: 24, fontWeight: 'bold', color: 'white' },
  color: { fontFamily: 'Poppins-Regular', fontSize: 18, color: '#9CA3AF' },
  price: { fontFamily: 'Poppins-SemiBold', fontSize: 20, color: '#F472B6', fontWeight: '600', marginTop: 4 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 16 },
  tag: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  tagText: { fontFamily: 'Poppins-SemiBold', color: 'white', fontSize: 14, fontWeight: '600' },
  descriptionHeader: { fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 4, color: 'white' },
  description: { fontFamily: 'Poppins-Regular', color: '#D1D5DB', fontSize: 14, lineHeight: 20 },
  removeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(239, 68, 68, 0.2)', paddingVertical: 12, borderRadius: 999, marginTop: 24 },
  removeButtonText: { fontFamily: 'Poppins-Bold', fontWeight: 'bold', color: '#F87171', marginLeft: 8 },
});

export default LikedItemDetailsScreen;
