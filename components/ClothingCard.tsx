
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Assuming expo or a similar gradient library is available
import { ClothingItem } from '../types';

interface ClothingCardProps {
  item: ClothingItem;
  isTopCard: boolean;
  swipeDirection: 'left' | 'right' | null;
  style?: any;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item, isTopCard, swipeDirection, style }) => {
  // A simple transform to move the card off-screen.
  // For smooth animation, Animated API should be used.
  const swipeTransform = swipeDirection === 'left' 
    ? { transform: [{ translateX: -Dimensions.get('window').width }, { rotate: '-30deg' }], opacity: 0 }
    : swipeDirection === 'right'
    ? { transform: [{ translateX: Dimensions.get('window').width }, { rotate: '30deg' }], opacity: 0 }
    : {};

  return (
    <View style={[styles.container, style, swipeDirection && swipeTransform]}>
      <Image source={{ uri: item.imageUrls[0] }} style={styles.image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />

      <View style={styles.infoContainer}>
        <View style={styles.userContainer}>
            <Image source={{uri: item.userAvatar}} style={styles.userAvatar}/>
            <View>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.itemPrice}>預估價值: NT$ {item.estimatedPrice}</Text>
            </View>
        </View>
        <View style={styles.tagsContainer}>
          <Text style={styles.tag}>{item.category}</Text>
          <Text style={styles.tag}>{item.color}</Text>
          {item.style_tags.map(tag => (
            <Text key={tag} style={styles.tag}>{tag}</Text>
          ))}
        </View>
      </View>
      
      {isTopCard && swipeDirection === 'left' && (
        <View style={[styles.swipeLabelContainer, styles.swipeLabelLeft]}>
            <Text style={[styles.swipeLabelText, { color: '#EF4444', borderColor: '#EF4444' }]}>跳過</Text>
        </View>
      )}
      {isTopCard && swipeDirection === 'right' && (
        <View style={[styles.swipeLabelContainer, styles.swipeLabelRight]}>
            <Text style={[styles.swipeLabelText, { color: '#F472B6', borderColor: '#F472B6' }]}>喜歡</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#1F2937',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#F472B6',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    itemPrice: {
        fontSize: 12,
        color: '#D1D5DB',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: 'hidden', // for rounded corners on android
    },
    swipeLabelContainer: {
        position: 'absolute',
        top: '25%',
        opacity: 0.8,
    },
    swipeLabelLeft: {
        left: 32,
        transform: [{ rotate: '-12deg' }],
    },
    swipeLabelRight: {
        right: 32,
        transform: [{ rotate: '12deg' }],
    },
    swipeLabelText: {
        fontSize: 48,
        fontWeight: 'bold',
        borderWidth: 4,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 8,
    },
});

export default ClothingCard;