
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Transaction, Match } from '../types';
import { ArrowUturnLeftIcon } from './Icons';

interface OngoingTransactionsScreenProps {
  transactions: Transaction[];
  matches: Match[];
  onBack: () => void;
  onTransactionClick: (transaction: Transaction) => void;
}

const OngoingTransactionsScreen: React.FC<OngoingTransactionsScreenProps> = ({ transactions, matches, onBack, onTransactionClick }) => {
  const getMatchForTransaction = (transaction: Transaction) => {
    return matches.find(match => match.id === transaction.matchId);
  }

  const renderItem = ({ item }: { item: Transaction }) => {
    const match = getMatchForTransaction(item);
    if (!match) return null;
    
    const theirItem = match.user2.clothingItem;

    return (
      <TouchableOpacity 
        onPress={() => onTransactionClick(item)}
        style={styles.transactionCard}
      >
        <Image source={{ uri: theirItem.imageUrls[0] }} style={styles.itemImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>與 {theirItem.userName} 的交易</Text>
          <Text style={styles.subtitle}>正在交換您的 {match.user1.clothingItem.category}</Text>
          <Text style={styles.prompt}>點擊查看詳情</Text>
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
        <Text style={styles.headerTitle}>正在交易</Text>
      </View>
      
      {transactions.length > 0 ? (
        <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>目前沒有進行中的交易。</Text>
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
  transactionCard: {
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
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: 'white',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
  prompt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#60A5FA',
    marginTop: 4,
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

export default OngoingTransactionsScreen;
