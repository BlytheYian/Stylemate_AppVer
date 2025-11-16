
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Request, ClothingItem } from '../types';
import { ArrowUturnLeftIcon, HandThumbDownIcon } from './Icons';

interface RequestDetailsScreenProps {
  request: Request;
  onBack: () => void;
  onProposeSwap: (requesterItem: ClothingItem) => void;
  onReject: () => void;
  onViewItemDetails: (item: ClothingItem) => void;
}

const ItemCard: React.FC<{item: ClothingItem, onProposeSwap: (item: ClothingItem) => void, onViewDetails: (item: ClothingItem) => void}> = ({ item, onProposeSwap, onViewDetails }) => (
    <View style={styles.itemCard}>
        <TouchableOpacity onPress={() => onViewDetails(item)}>
            <Image source={{uri: item.imageUrls[0]}} style={styles.itemImage}/>
        </TouchableOpacity>
        <View style={styles.itemInfo}>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemColor}>{item.color}</Text>
            <Text style={styles.itemPrice}>NT$ {item.estimatedPrice}</Text>
             <Text style={styles.itemDescription} numberOfLines={2}>{item.description || "未提供描述。"}</Text>
            <TouchableOpacity
                onPress={() => onProposeSwap(item)}
                style={styles.proposeButton}
            >
                <Text style={styles.proposeButtonText}>提議交換</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const RequestDetailsScreen: React.FC<RequestDetailsScreenProps> = ({ request, onBack, onProposeSwap, onReject, onViewItemDetails }) => {

  const renderClosetItem = ({ item }: { item: ClothingItem }) => (
      <ItemCard item={item} onProposeSwap={onProposeSwap} onViewDetails={onViewItemDetails} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onBack}>
              <ArrowUturnLeftIcon width={24} height={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>回應請求</Text>
        </View>
        <TouchableOpacity onPress={onReject} style={styles.rejectButton}>
            <HandThumbDownIcon width={20} height={20} color="#F87171" />
            <Text style={styles.rejectButtonText}>拒絕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={
            <>
                <View style={styles.interestContainer}>
                    <Text style={styles.interestTitle}>{request.requester.name} 喜歡您的...</Text>
                    <View style={styles.interestItemBox}>
                        <Image source={{ uri: request.itemOfInterest.imageUrls[0] }} style={styles.interestItemImage} />
                        <View>
                        <Text style={styles.interestItemCategory}>{request.itemOfInterest.category}</Text>
                        <Text style={styles.interestItemColor}>{request.itemOfInterest.color}</Text>
                        <Text style={styles.interestItemPrice}>NT$ {request.itemOfInterest.estimatedPrice}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.closetTitle}>選擇對方的一件物品來交換：</Text>
            </>
        }
        data={request.requester.closet}
        renderItem={renderClosetItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{request.requester.name} 的衣櫃是空的。</Text>
            </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, fontWeight: 'bold', color: 'white' },
  rejectButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  rejectButtonText: { fontFamily: 'Poppins-Regular', color: '#F87171', fontSize: 14, marginLeft: 8 },
  listContainer: { padding: 16 },
  interestContainer: { backgroundColor: '#1F2937', padding: 16, borderRadius: 12, marginBottom: 24 },
  interestTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#F472B6' },
  interestItemBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 8 },
  interestItemImage: { width: 80, height: 96, borderRadius: 8, marginRight: 16 },
  interestItemCategory: { fontFamily: 'Poppins-Bold', fontSize: 18, fontWeight: 'bold', color: 'white' },
  interestItemColor: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9CA3AF' },
  interestItemPrice: { fontFamily: 'Poppins-SemiBold', fontSize: 16, fontWeight: '600', color: '#F472B6', marginTop: 4 },
  closetTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 18, fontWeight: '600', marginBottom: 8, color: 'white' },
  itemCard: { flex: 1, backgroundColor: '#1F2937', borderRadius: 8, margin: 8 },
  itemImage: { width: '100%', height: 192, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  itemInfo: { padding: 12, flex: 1, justifyContent: 'space-between' },
  itemCategory: { fontFamily: 'Poppins-Bold', fontWeight: 'bold', color: 'white' },
  itemColor: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9CA3AF', marginBottom: 4 },
  itemPrice: { fontFamily: 'Poppins-SemiBold', fontSize: 14, fontWeight: '600', color: '#F472B6', marginBottom: 8 },
  itemDescription: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#9CA3AF', flexGrow: 1, marginBottom: 12 },
  proposeButton: { backgroundColor: '#EC4899', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  proposeButtonText: { fontFamily: 'Poppins-Bold', color: 'white', fontSize: 14, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { fontFamily: 'Poppins-Regular', color: '#9CA3AF' },
});

export default RequestDetailsScreen;
