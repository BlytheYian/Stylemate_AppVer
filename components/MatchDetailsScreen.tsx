
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Match, ClothingItem } from '../types';
import { ArrowUturnLeftIcon, ChatBubbleLeftRightIcon } from './Icons';

interface MatchDetailsScreenProps {
  match: Match;
  onBack: () => void;
  onOpenChat: (match: Match) => void;
}

const ItemDetailCard = ({ item, userLabel }: { item: ClothingItem, userLabel: string }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <View style={styles.itemCard}>
            <Image source={{ uri: item.imageUrls[activeImageIndex] }} style={styles.itemImage}/>
           
            {item.imageUrls.length > 1 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailScroll}>
                    {item.imageUrls.map((url, index) => (
                        <TouchableOpacity key={index} onPress={() => setActiveImageIndex(index)} style={[styles.thumbnailButton, activeImageIndex === index && styles.activeThumbnail]}>
                             <Image source={{uri: url}} style={styles.thumbnailImage} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            <Text style={styles.itemUserLabel}>{userLabel}</Text>
            <Text style={styles.itemInfo}>{item.category} &bull; {item.color}</Text>
            <Text style={styles.itemPrice}>NT$ {item.estimatedPrice}</Text>
            
            <View style={styles.tagsContainer}>
                {item.style_tags.map(tag => (
                    <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                ))}
            </View>
            <Text style={styles.descriptionHeader}>描述</Text>
            <Text style={styles.description}>{item.description || "未提供描述。"}</Text>
        </View>
    );
}


const MatchDetailsScreen: React.FC<MatchDetailsScreenProps> = ({ match, onBack, onOpenChat }) => {
  const myItem = match.user1.clothingItem;
  const theirItem = match.user2.clothingItem;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>配對詳情</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.matchDateText}>您在 {new Date(match.matchedAt).toLocaleDateString('zh-TW')} 與 <Text style={{fontWeight: 'bold', color: 'white'}}>{theirItem.userName}</Text> 配對成功</Text>
        <View style={styles.detailsContent}>
            <ItemDetailCard item={myItem} userLabel="您的物品" />
            <View style={styles.swapIconContainer}>
                <Text style={styles.swapIcon}>&harr;</Text>
            </View>
            <ItemDetailCard item={theirItem} userLabel={`${theirItem.userName}的物品`} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
          <TouchableOpacity onPress={() => onOpenChat(match)} style={styles.chatButton}>
              <ChatBubbleLeftRightIcon width={24} height={24} color="white" />
              <Text style={styles.chatButtonText}>進入聊天室</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#111827' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(17, 24, 39, 0.8)' },
    backButton: { marginRight: 16 },
    headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: 'white', fontWeight: 'bold' },
    scrollContainer: { paddingHorizontal: 8, paddingVertical: 16 },
    matchDateText: { textAlign: 'center', color: '#D1D5DB', marginBottom: 16, fontFamily: 'Poppins-Regular' },
    detailsContent: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch' },
    itemCard: { flex: 1, backgroundColor: '#1F2937', padding: 8, borderRadius: 16 },
    itemImage: { width: '100%', aspectRatio: 3/4, borderRadius: 12, marginBottom: 12, backgroundColor: '#374151' },
    thumbnailScroll: { flexGrow: 0, marginBottom: 12 },
    thumbnailButton: { width: 40, height: 40, borderRadius: 6, marginRight: 8 },
    activeThumbnail: { borderWidth: 2, borderColor: '#F472B6' },
    thumbnailImage: { width: '100%', height: '100%', borderRadius: 6 },
    itemUserLabel: { fontFamily: 'Poppins-Bold', fontSize: 18, fontWeight: 'bold', color: 'white' },
    itemInfo: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#9CA3AF', marginBottom: 4 },
    itemPrice: { fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#F472B6', fontWeight: '600', marginBottom: 8 },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
    tag: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
    tagText: { fontFamily: 'Poppins-SemiBold', color: 'white', fontSize: 10, fontWeight: '600' },
    descriptionHeader: { fontFamily: 'Poppins-Bold', fontSize: 12, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    description: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#D1D5DB' },
    swapIconContainer: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
    swapIcon: { fontSize: 32, fontWeight: 'bold', color: '#F472B6' },
    footer: { padding: 16, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    chatButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC4899', paddingVertical: 16, borderRadius: 999 },
    chatButtonText: { fontFamily: 'Poppins-Bold', color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 12 },
});


export default MatchDetailsScreen;
