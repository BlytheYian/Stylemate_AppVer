
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Match } from '../types';
import { SparklesIcon, ChevronRightIcon ,TheIcon } from './Icons';

interface HomeScreenProps {
  matches: Match[];
  onStartSwiping: () => void;
  onOpenChat: (match: Match) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ matches, onStartSwiping, onOpenChat }) => {
  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <TheIcon width={96} height={96} color="#F472B6" />
        <Text style={styles.title}>歡迎來到 Stylemate</Text>
        <Text style={styles.subtitle}>透過交換您喜愛的衣物，發現新風格。</Text>
        <TouchableOpacity
          onPress={onStartSwiping}
          style={styles.swipeButton}
        >
          <Text style={styles.swipeButtonText}>開始滑動</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.matchesContainer}>
        <Text style={styles.matchesTitle}>您的配對</Text>
        {matches.length > 0 ? (
          <ScrollView style={styles.matchesScrollView}>
            {matches.map(match => (
              <TouchableOpacity key={match.id} onPress={() => onOpenChat(match)} style={styles.matchItem}>
                <Image source={{ uri: match.user2.clothingItem.userAvatar }} style={styles.matchAvatar} />
                <View style={styles.matchTextContainer}>
                  <Text style={styles.matchName}>{match.user2.clothingItem.userName}</Text>
                  <Text style={styles.matchStatus}>
                    {match.status === 'in-transaction' ? '正在安排取貨...' : `配對了對方的 ${match.user2.clothingItem.category}`}
                  </Text>
                </View>
                <ChevronRightIcon width={24} height={24} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noMatchesContainer}>
            <Text style={styles.noMatchesText}>還沒有配對。繼續滑動來尋找您的風格吧！</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        padding: 16,
    },
    heroContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        color: '#9CA3AF',
        maxWidth: 250,
        marginBottom: 32,
        textAlign: 'center',
    },
    swipeButton: {
        backgroundColor: '#EC4899', // Simplified gradient
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 999,
    },
    swipeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    matchesContainer: {
        flexShrink: 0,
        paddingBottom: 16,
    },
    matchesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingHorizontal: 8,
        color: 'white',
    },
    matchesScrollView: {
        maxHeight: 180,
    },
    matchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        marginBottom: 12,
    },
    matchAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16,
    },
    matchTextContainer: {
        flex: 1,
    },
    matchName: {
        fontWeight: '600',
        color: 'white',
    },
    matchStatus: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    noMatchesContainer: {
        paddingVertical: 24,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        alignItems: 'center'
    },
    noMatchesText: {
        color: '#9CA3AF',
    }
});

export default HomeScreen;