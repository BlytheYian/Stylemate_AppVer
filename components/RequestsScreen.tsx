
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Request } from '../types';
import { ArrowUturnLeftIcon } from './Icons';

interface RequestsScreenProps {
  requests: Request[];
  onBack: () => void;
  onRequestClick: (request: Request) => void;
}

const RequestsScreen: React.FC<RequestsScreenProps> = ({ requests, onBack, onRequestClick }) => {

  const renderItem = ({ item }: { item: Request }) => (
    <TouchableOpacity onPress={() => onRequestClick(item)} style={styles.requestCard}>
      <Image source={{ uri: item.requester.avatar }} style={styles.avatar} />
      <View style={styles.detailsContainer}>
        <Text style={styles.requesterText}>
          <Text style={{fontWeight: 'bold'}}>{item.requester.name}</Text> 喜歡您的...
        </Text>
        <View style={styles.itemOfInterest}>
           <Image source={{ uri: item.itemOfInterest.imageUrls[0] }} style={styles.itemImage}/>
           <Text style={styles.itemText}>{item.itemOfInterest.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>交換請求</Text>
      </View>
      
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>目前沒有交換請求。</Text>
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
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  requesterText: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: 'white',
  },
  itemOfInterest: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemImage: {
    width: 32,
    height: 40,
    borderRadius: 4,
    marginRight: 8,
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#D1D5DB',
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

export default RequestsScreen;
