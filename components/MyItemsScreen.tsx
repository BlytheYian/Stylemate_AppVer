
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { ClothingItem } from '../types';
import { ArrowUturnLeftIcon } from './Icons';

interface MyItemsScreenProps {
  items: ClothingItem[];
  onBack: () => void;
  onItemClick: (item: ClothingItem) => void;
}

const MyItemsScreen: React.FC<MyItemsScreenProps> = ({ items, onBack, onItemClick }) => {

  const renderItem = ({ item }: { item: ClothingItem }) => (
    <TouchableOpacity onPress={() => onItemClick(item)} style={styles.itemButton}>
        <Image source={{ uri: item.imageUrls[0] }} style={styles.itemImage} />
        <View style={styles.itemOverlay} />
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{item.category}</Text>
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>我的物品 ({items.length})</Text>
      </View>

      <View style={styles.content}>
        {items.length > 0 ? (
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{ gap: 16 }}
                contentContainerStyle={{ gap: 16, padding: 16 }}
            />
        ) : (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>您還沒有上傳任何物品。</Text>
            </View>
        )}
      </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  itemButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 3/4,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  itemTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 8,
  },
  itemText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
  },
});

export default MyItemsScreen;