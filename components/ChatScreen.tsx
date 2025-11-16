

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Match, Message, ClothingItem } from '../types';
import { ArrowUturnLeftIcon, PaperAirplaneIcon, TruckIcon } from './Icons';

interface ChatScreenProps {
  match: Match;
  currentUserId: string;
  onBack: () => void;
  onInitiateTransaction: () => void;
  onViewTransaction: () => void;
  onViewItemDetails: (item: ClothingItem) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ match, currentUserId, onBack, onInitiateTransaction, onViewTransaction, onViewItemDetails }) => {
  const otherUser = match.user2.clothingItem;
  const myItem = match.user1.clothingItem;
  const [messages, setMessages] = useState<Message[]>([
    { id: 'msg1', senderId: otherUser.userId, text: `嘿！很喜歡您的這件${match.user1.clothingItem.category}。想用我的${otherUser.category}跟您交換嗎？`, timestamp: '10:00 AM'},
    { id: 'msg2', senderId: currentUserId, text: `當然！您的那件也很棒。這週末有空見面嗎？`, timestamp: '10:01 AM'}
  ]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (newMessage.trim() === '' || match.status === 'completed') return;
    const msg: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const ItemDetailCard = ({ item, userLabel, isClickable = false, onClick }: { item: ClothingItem, userLabel: string, isClickable?: boolean, onClick?: () => void }) => {
    const content = (
        <View style={styles.itemDetailCard}>
            <Image source={{uri: item.imageUrls[0]}} style={styles.itemDetailImage}/>
            <View style={styles.itemDetailTextContainer}>
                <Text style={styles.itemDetailUserLabel}>{userLabel}</Text>
                <Text style={styles.itemDetailCategory}>{item.category}</Text>
                <Text style={styles.itemDetailColor}>{item.color}</Text>
                <Text style={styles.itemDetailPrice}>NT$ {item.estimatedPrice}</Text>
            </View>
        </View>
    );
    
    if (isClickable) {
        return <TouchableOpacity onPress={onClick} style={styles.itemDetailTouchable}>{content}</TouchableOpacity>
    }
    return <View style={styles.itemDetailTouchable}>{content}</View>;
  };

  const renderHeaderButton = () => {
    if (match.status === 'active') {
      return (
        <TouchableOpacity onPress={onInitiateTransaction} style={[styles.headerButton, {backgroundColor: 'rgba(236, 72, 153, 0.2)'}]} >
          <TruckIcon width={20} height={20} color="#F9A8D4" />
          <Text style={styles.headerButtonText}>安排取貨</Text>
        </TouchableOpacity>
      );
    }
    if (match.status === 'in-transaction') {
       return (
        <TouchableOpacity onPress={onViewTransaction} style={[styles.headerButton, {backgroundColor: 'rgba(59, 130, 246, 0.2)'}]}>
          <TruckIcon width={20} height={20} color="#93C5FD" />
          <Text style={styles.headerButtonText}>查看交易詳情</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Image source={{uri: otherUser.userAvatar}} style={styles.headerAvatar}/>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerName}>{otherUser.userName}</Text>
          <Text style={styles.headerStatus}>在線</Text>
        </View>
        {renderHeaderButton()}
      </View>
      
      <View style={styles.matchedItemsBanner}>
        <ItemDetailCard item={otherUser} userLabel={`${otherUser.userName}的物品`} isClickable={true} onClick={() => onViewItemDetails(otherUser)} />
        <Text style={styles.swapIcon}>&harr;</Text>
        <ItemDetailCard item={myItem} userLabel="您的物品" isClickable={true} onClick={() => onViewItemDetails(myItem)} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContainer}
        keyExtractor={item => item.id}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
            <View style={[styles.messageRow, item.senderId === currentUserId ? styles.myMessageRow : styles.theirMessageRow]}>
                {item.senderId !== currentUserId && <Image source={{uri: otherUser.userAvatar}} style={styles.messageAvatar} />}
                <View style={[styles.messageBubble, item.senderId === currentUserId ? styles.myMessageBubble : styles.theirMessageBubble]}>
                    <Text style={styles.messageText}>{item.text}</Text>
                </View>
            </View>
        )}
       />
      
      {match.status === 'completed' ? (
         <View style={styles.completedBanner}>
            <Text style={styles.completedText}>本次交換已完成。聊天室已封存。</Text>
         </View>
      ) : (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <TextInput 
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="輸入您的想法..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.textInput}
                />
                <TouchableOpacity 
                  onPress={handleSend} 
                  style={[styles.sendButton, !newMessage.trim() && styles.sendButtonDisabled]}
                  disabled={!newMessage.trim()}
                >
                    <PaperAirplaneIcon width={20} height={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1F2937' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)', zIndex: 10 },
    backButton: { marginRight: 16 },
    headerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    headerTextContainer: { flex: 1 },
    headerName: { color: 'white', fontWeight: 'bold' },
    headerStatus: { fontSize: 12, color: '#9CA3AF' },
    headerButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
    headerButtonText: { color: '#D1D5DB', marginLeft: 8, fontSize: 12 },
    matchedItemsBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'rgba(17, 24, 39, 0.5)', borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    itemDetailTouchable: { flex: 1, padding: 4, borderRadius: 8 },
    itemDetailCard: { flexDirection: 'row', alignItems: 'flex-start', },
    itemDetailImage: { width: 64, height: 80, borderRadius: 8, marginRight: 12 },
    itemDetailTextContainer: { flex: 1 },
    itemDetailUserLabel: { color: '#9CA3AF', fontSize: 12 },
    itemDetailCategory: { fontWeight: '600', fontSize: 14, color: 'white' },
    itemDetailColor: { color: '#9CA3AF', fontSize: 12 },
    itemDetailPrice: { color: '#9CA3AF', fontSize: 12, marginTop: 4 },
    swapIcon: { fontSize: 20, fontWeight: 'bold', color: '#F472B6', paddingHorizontal: 8 },
    messageList: { flex: 1, paddingHorizontal: 16, },
    messageListContainer: { paddingTop: 16 },
    messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 16 },
    myMessageRow: { justifyContent: 'flex-end' },
    theirMessageRow: { justifyContent: 'flex-start' },
    messageAvatar: { width: 24, height: 24, borderRadius: 12 },
    messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 20 },
    myMessageBubble: { backgroundColor: '#EC4899', borderBottomRightRadius: 4 },
    theirMessageBubble: { backgroundColor: '#374151', borderBottomLeftRadius: 4 },
    messageText: { fontSize: 14, color: 'white' },
    completedBanner: { padding: 16, backgroundColor: '#111827', alignItems: 'center' },
    completedText: { fontSize: 14, color: '#9CA3AF' },
    inputContainer: { padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)' },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#374151', borderRadius: 999, padding: 8 },
    textInput: { flex: 1, color: 'white', paddingHorizontal: 12 },
    sendButton: { backgroundColor: '#EC4899', padding: 8, borderRadius: 999 },
    sendButtonDisabled: { backgroundColor: '#6B7280' },
});

export default ChatScreen;