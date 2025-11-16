
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Transaction, Match, ClothingItem, TransactionPartyDetails } from '../types';
import { ArrowUturnLeftIcon, ChatBubbleLeftRightIcon, CheckBadgeIcon, XMarkIcon } from './Icons';

interface TransactionDetailsScreenProps {
  transaction: Transaction;
  match: Match;
  currentUserId: string;
  onBack: () => void;
  onOpenChat: (match: Match) => void;
  onComplete: (transactionId: string) => void;
  onCancel: (transactionId: string) => void;
}

const PartyInfoCard = ({ item, details, label }: { item: ClothingItem, details?: TransactionPartyDetails, label: string }) => (
    <View style={styles.partyCard}>
        <View style={styles.itemInfoSection}>
            <Image source={{ uri: item.imageUrls[0] }} style={styles.itemImage}/>
            <View>
                <Text style={styles.partyLabel}>{label}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemColor}>{item.color}</Text>
                <Text style={styles.itemPrice}>NT$ {item.estimatedPrice}</Text>
            </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.detailsSection}>
             <Text style={styles.detailsHeader}>取貨資訊</Text>
             {details ? (
                <>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>聯絡電話</Text><Text style={styles.detailValue}>{details.phoneNumber}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>取貨方式</Text><Text style={styles.detailValue}>{details.pickupMethod}</Text></View>
                    <View style={styles.detailRow}><Text style={styles.detailLabel}>地點</Text><Text style={[styles.detailValue, {textAlign: 'right'}]}>{details.pickupLocation}</Text></View>
                </>
            ) : (
                <View style={styles.waitingContainer}><Text style={styles.waitingText}>等待對方提供...</Text></View>
            )}
        </View>
    </View>
  );

const TransactionDetailsScreen: React.FC<TransactionDetailsScreenProps> = ({ transaction, match, currentUserId, onBack, onOpenChat, onComplete, onCancel }) => {
  const myUserId = currentUserId;
  const theirUserId = match.user1.userId === myUserId ? match.user2.userId : match.user1.userId;
  
  const myItem = match.user1.userId === myUserId ? match.user1.clothingItem : match.user2.clothingItem;
  const theirItem = match.user1.userId === myUserId ? match.user2.clothingItem : match.user1.clothingItem;

  const myDetails = transaction.parties[myUserId];
  const theirDetails = transaction.parties[theirUserId];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>交易詳情</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <PartyInfoCard item={theirItem} details={theirDetails} label={`${theirItem.userName}的物品`} />
        <PartyInfoCard item={myItem} details={myDetails} label="您的物品" />
      </ScrollView>

      <View style={styles.footer}>
         <TouchableOpacity onPress={() => onOpenChat(match)} style={styles.chatButton}>
            <ChatBubbleLeftRightIcon width={20} height={20} color="white" />
            <Text style={styles.actionButtonText}>進入聊天室</Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => onCancel(transaction.id)} style={[styles.actionButton, styles.cancelButton]}>
                <XMarkIcon width={20} height={20} color="#F87171" />
                <Text style={[styles.actionButtonText, { color: '#F87171'}]}>取消交易</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onComplete(transaction.id)} style={[styles.actionButton, styles.completeButton]}>
                <CheckBadgeIcon width={20} height={20} color="#4ADE80" />
                <Text style={[styles.actionButtonText, { color: '#4ADE80'}]}>完成交易</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#111827' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)' },
    backButton: { marginRight: 16 },
    headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, fontWeight: 'bold', color: 'white' },
    scrollContainer: { padding: 16, gap: 16 },
    partyCard: { backgroundColor: '#1F2937', borderRadius: 16, padding: 16, gap: 12 },
    itemInfoSection: { flexDirection: 'row', gap: 16 },
    itemImage: { width: 96, height: 128, borderRadius: 8 },
    partyLabel: { fontFamily: 'Poppins-Bold', fontSize: 18, fontWeight: 'bold', color: 'white' },
    itemCategory: { fontFamily: 'Poppins-Regular', fontSize: 16, color: '#D1D5DB' },
    itemColor: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9CA3AF' },
    itemPrice: { fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#F472B6', fontWeight: '600', marginTop: 4 },
    separator: { height: 1, backgroundColor: '#374151' },
    detailsSection: { gap: 8 },
    detailsHeader: { fontFamily: 'Poppins-Bold', fontSize: 16, fontWeight: 'bold', color: '#E5E7EB', marginBottom: 4 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    detailLabel: { fontFamily: 'Poppins-Regular', color: '#9CA3AF', fontSize: 14, flexShrink: 1, marginRight: 8 },
    detailValue: { fontFamily: 'Poppins-Regular', color: 'white', fontSize: 14, flex: 1 },
    waitingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
    waitingText: { fontFamily: 'Poppins-Regular', color: '#6B7280' },
    footer: { padding: 16, borderTopWidth: 1, borderColor: '#374151', gap: 12 },
    chatButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#374151', paddingVertical: 12, borderRadius: 999 },
    buttonRow: { flexDirection: 'row', gap: 12 },
    actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 999 },
    cancelButton: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
    completeButton: { backgroundColor: 'rgba(74, 222, 128, 0.2)' },
    actionButtonText: { fontFamily: 'Poppins-Bold', fontWeight: 'bold', marginLeft: 8, color: 'white' },
});

export default TransactionDetailsScreen;
