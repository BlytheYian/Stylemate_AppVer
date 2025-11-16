
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Match, ClothingItem } from '../types';
import { ArrowUturnLeftIcon } from './Icons';

interface HistoryScreenProps {
  matches: Match[];
  onBack: () => void;
  onMatchClick: (match: Match) => void;
}

const statusLabels: { [key in Match['status']]: string } = {
  active: '可聊天',
  'in-transaction': '交易中',
  completed: '已完成',
};

const statusStyles: { [key in Match['status']]: { text: string; bg: string; } } = {
  active: { text: '#F472B6', bg: 'rgba(236, 72, 153, 0.2)' },
  'in-transaction': { text: '#60A5FA', bg: 'rgba(59, 130, 246, 0.2)' },
  completed: { text: '#4ADE80', bg: 'rgba(74, 222, 128, 0.2)' },
};

const ItemCard = ({ item, userLabel }: { item: ClothingItem, userLabel: string }) => (
    <View style={styles.itemCard}>
        <Image source={{uri: item.imageUrls[0]}} style={styles.itemImage} />
        <Text style={styles.itemUserLabel} numberOfLines={1}>{userLabel}</Text>
        <Text style={styles.itemCategory} numberOfLines={1}>{item.category} &bull; {item.color}</Text>
        <Text style={styles.itemPrice}>NT$ {item.estimatedPrice}</Text>
    </View>
);

const HistoryScreen: React.FC<HistoryScreenProps> = ({ matches, onBack, onMatchClick }) => {
  const sortedMatches = [...matches].sort((a, b) => new Date(b.matchedAt).getTime() - new Date(a.matchedAt).getTime());
  
  const renderItem = ({ item }: { item: Match }) => {
    const statusStyle = statusStyles[item.status];
    return (
      <TouchableOpacity 
        onPress={() => onMatchClick(item)}
        style={styles.matchCard}
      >
        <View style={styles.matchHeader}>
          <Text style={styles.matchUserText}>與 <Text style={{fontWeight: 'bold', color: 'white'}}>{item.user2.clothingItem.userName}</Text> 配對成功</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {statusLabels[item.status]}
            </Text>
          </View>
        </View>
        
        <View style={styles.separator} />

        <View style={styles.itemsContainer}>
            <ItemCard item={item.user1.clothingItem} userLabel={`您的 ${item.user1.clothingItem.category}`} />
            <Text style={styles.swapIcon}>&harr;</Text>
            <ItemCard item={item.user2.clothingItem} userLabel={`${item.user2.clothingItem.userName}的 ${item.user2.clothingItem.category}`} />
        </View>

        <View style={styles.separator} />
        
        <View style={styles.dateInfo}>
            <Text style={styles.dateText}>配對於: {new Date(item.matchedAt).toLocaleString('zh-TW')}</Text>
            {item.completedAt && <Text style={styles.dateText}>完成於: {new Date(item.completedAt).toLocaleString('zh-TW')}</Text>}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>配對歷史</Text>
      </View>
      
      {sortedMatches.length > 0 ? (
        <FlatList
          data={sortedMatches}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>您的配對歷史為空。</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#111827' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)' },
    backButton: { marginRight: 16 },
    headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: 'white', fontWeight: 'bold' },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { fontFamily: 'Poppins-Regular', color: '#9CA3AF' },
    matchCard: { width: '100%', padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, marginBottom: 16 },
    matchHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    matchUserText: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#D1D5DB' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
    statusText: { fontFamily: 'Poppins-SemiBold', fontSize: 12, fontWeight: '600' },
    separator: { height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginVertical: 8 },
    itemsContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch', marginVertical: 12 },
    itemCard: { flex: 1, backgroundColor: 'rgba(31, 41, 55, 0.5)', padding: 12, borderRadius: 8 },
    itemImage: { width: '100%', height: 128, borderRadius: 8, marginBottom: 8 },
    itemUserLabel: { fontFamily: 'Poppins-Bold', color: 'white', fontSize: 14, fontWeight: 'bold' },
    itemCategory: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
    itemPrice: { fontFamily: 'Poppins-Bold', fontSize: 12, color: '#D1D5DB', fontWeight: 'bold' },
    swapIcon: { alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: '#F472B6', marginHorizontal: 8 },
    dateInfo: { marginTop: 8 },
    dateText: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#9CA3AF' },
});

export default HistoryScreen;
