
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ClothingItem } from '../types';
import ClothingCard from './ClothingCard';
import { HeartIcon, XMarkIcon, SparklesIcon } from './Icons';

interface SwipingScreenProps {
  deck: ClothingItem[];
  activeCardIndex: number;
  swipedDirection: 'left' | 'right' | null;
  handleSwipe: (direction: 'left' | 'right') => void;
  onNoMoreCardsUpload: () => void;
}

const SwipingScreen: React.FC<SwipingScreenProps> = ({ deck, activeCardIndex, swipedDirection, handleSwipe, onNoMoreCardsUpload }) => {

  const NoMoreCards = () => (
    <View style={styles.noMoreCardsContainer}>
        <SparklesIcon width={96} height={96} color="#F472B6" style={{marginBottom: 16}} />
        <Text style={styles.noMoreCardsTitle}>全部看完了！</Text>
        <Text style={styles.noMoreCardsSubtitle}>您已經看完了目前所有的風格。稍後再來看看，或上傳您自己的物品以獲得更多配對。</Text>
        <TouchableOpacity onPress={onNoMoreCardsUpload} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>上傳您的風格</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.deckContainer}>
            {activeCardIndex >= deck.length ? (
            <NoMoreCards />
            ) : (
            <>
                {deck.slice(activeCardIndex, activeCardIndex + 3).reverse().map((item, index) => {
                    const isTopCard = index === (deck.slice(activeCardIndex, activeCardIndex + 3).length - 1);
                    return (
                        <ClothingCard
                        key={item.id}
                        item={item}
                        isTopCard={isTopCard}
                        swipeDirection={isTopCard ? swipedDirection : null}
                        style={{
                            transform: `translateY(${-index * 12}px) scale(${1 - index * 0.05})`,
                            zIndex: 10 - index,
                        }}
                        />
                    );
                })}
            </>
            )}
        </View>
        
        {activeCardIndex < deck.length && (
            <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={() => handleSwipe('left')} style={styles.controlButton} accessibilityLabel="跳過">
                <XMarkIcon width={32} height={32} color="#F87171" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSwipe('right')} style={styles.controlButton} accessibilityLabel="喜歡">
                <HeartIcon width={32} height={32} color="#F472B6" />
            </TouchableOpacity>
            </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    deckContainer: {
        width: '100%',
        maxWidth: 384, // max-w-sm
        height: Dimensions.get('window').height * 0.65,
        position: 'relative',
    },
    noMoreCardsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    noMoreCardsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    noMoreCardsSubtitle: {
        color: '#9CA3AF',
        maxWidth: 300,
        textAlign: 'center',
    },
    uploadButton: {
        marginTop: 24,
        backgroundColor: '#EC4899',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 999,
    },
    uploadButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
        marginTop: 24,
    },
    controlButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 20,
        borderRadius: 999,
    }
});

export default SwipingScreen;