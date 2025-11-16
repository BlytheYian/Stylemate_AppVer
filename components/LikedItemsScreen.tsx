
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { LikedItem } from '../types';
import { ArrowUturnLeftIcon } from './Icons';

interface LikedItemsScreenProps {
  likedItems: LikedItem[];
  onBack: () => void;
  onItemClick: (item: LikedItem) => void;
}

const statusLabels: { [key in LikedItem['status']]: string } = {
  pending: '等待中',
  matched: '已配對',
  rejected: '已拒絕',
};

const statusStyles: { [key in LikedItem['status']]: { text: string; bg: string; } } = {
  pending: { text: '#FDE047', bg: 'rgba(253, 224, 71, 0.2)' },
  matched: { text: '#F472B6', bg: 'rgba(236, 72, 153, 0.2)' },
  rejected: { text: '#9CA3AF', bg: 'rgba(156, 163, 175, 0.2)' },
};

const LikedItemsScreen: React.FC<LikedItemsScreenProps> = ({ likedItems, onBack, onItemClick }) => {

  const renderItem = ({ item }: { item: LikedItem }) => {
    const statusStyle = statusStyles[item.status];
    return (
      <TouchableOpacity 
        onPress={() => onItemClick(item)}
        style={styles.itemContainer}
      >
        <Image source={{uri: item.item.imageUrls[0]}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemCategory}>{item.item.category} 來自 {item.item.userName}</Text>
          <Text style={styles.itemColor}>{item.item.color}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
                {statusLabels[item.status]}
            </Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>喜愛的物品</Text>
      </View>
      
      {likedItems.length > 0 ? (
        <FlatList
          data={likedItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>您還沒有喜歡任何物品。</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 64,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemCategory: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: 'white',
  },
  itemColor: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
  },
});

export default LikedItemsScreen;
