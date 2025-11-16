import { ClothingItem, Match, User, LikedItem, Request, Transaction } from './types';

export const AVATAR_OPTIONS = [
    'https://picsum.photos/seed/me/100/100',
    'https://picsum.photos/seed/avatar2/100/100',
    'https://picsum.photos/seed/avatar3/100/100',
    'https://picsum.photos/seed/avatar4/100/100',
];

export const MOCK_USER: User = {
    id: 'user-1',
    name: 'VibeSeeker',
    username: '@vibeseeker',
    avatar: AVATAR_OPTIONS[0],
    email: 'vibeseeker@email.com',
    joinDate: '2024年6月',
    phoneNumber: '0912345678',
};

export const MY_CLOSET: ClothingItem[] = [
  {
    id: 'my-item-1',
    userId: MOCK_USER.id,
    userName: MOCK_USER.name,
    userAvatar: MOCK_USER.avatar,
    imageUrls: ['https://picsum.photos/seed/mycloset1/400/600', 'https://picsum.photos/seed/mycloset1-2/400/600'],
    category: '連身裙',
    color: '花卉',
    style_tags: ['波西米亞風', '夏季', '休閒'],
    description: '一件輕盈的夏季連身裙，非常適合海灘出遊或悠閒的午後。',
    estimatedPrice: 800,
  },
  {
    id: 'my-item-2',
    userId: MOCK_USER.id,
    userName: MOCK_USER.name,
    userAvatar: MOCK_USER.avatar,
    imageUrls: ['https://picsum.photos/seed/mycloset2/400/600'],
    category: '夾克',
    color: '丹寧',
    style_tags: ['街頭風', '90年代', '寬鬆'],
     description: '一件復古風格的寬鬆丹寧夾克，百搭實穿。',
     estimatedPrice: 1200,
  }
];

export const INITIAL_DECK: ClothingItem[] = [
  {
    id: 'item-1',
    userId: 'user-2',
    userName: 'StyleMaven',
    userAvatar: 'https://picsum.photos/seed/user2/100/100',
    imageUrls: ['https://picsum.photos/seed/cloth1/400/600', 'https://picsum.photos/seed/cloth1-2/400/600', 'https://picsum.photos/seed/cloth1-3/400/600'],
    category: '外套',
    color: '米色',
    style_tags: ['極簡風', '簡約風', '時尚'],
    estimatedPrice: 1500,
  },
  {
    id: 'item-2',
    userId: 'user-3',
    userName: 'RetroKid',
    userAvatar: 'https://picsum.photos/seed/user3/100/100',
    imageUrls: ['https://picsum.photos/seed/cloth2/400/600'],
    category: 'T恤',
    color: '黑色',
    style_tags: ['Y2K', '圖案T恤', '復古'],
    description: '一件帶有復古樂團圖案的黑色棉質T恤，Y2K風格愛好者必備。',
    estimatedPrice: 600,
  },
  {
    id: 'item-3',
    userId: 'user-4',
    userName: 'GorpcoreGal',
    userAvatar: 'https://picsum.photos/seed/user4/100/100',
    imageUrls: ['https://picsum.photos/seed/cloth3/400/600'],
    category: '褲子',
    color: '卡其色',
    style_tags: ['Gorpcore', '機能風', '戶外'],
    estimatedPrice: 950,
  },
  {
    id: 'item-4',
    userId: 'user-5',
    userName: 'UrbanExplorer',
    userAvatar: 'https://picsum.photos/seed/user5/100/100',
    imageUrls: ['https://picsum.photos/seed/cloth4/400/600'],
    category: '帽T',
    color: '灰色',
    style_tags: ['街頭風', '舒適', 'Logo'],
    estimatedPrice: 1100,
  },
    {
    id: 'item-5',
    userId: 'user-6',
    userName: 'VintageFinds',
    userAvatar: 'https://picsum.photos/seed/user6/100/100',
    imageUrls: ['https://picsum.photos/seed/cloth5/400/600'],
    category: '毛衣',
    color: '多色',
    style_tags: ['針織', '80年代', '繽紛'],
    estimatedPrice: 750,
  },
];


export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match-initial-1',
    user1: {
      userId: MOCK_USER.id,
      clothingItem: MY_CLOSET[0], // My floral dress
    },
    user2: {
      userId: 'user-2',
      clothingItem: INITIAL_DECK[0], // StyleMaven's Beige Outerwear
    },
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    status: 'in-transaction', // Set to in-transaction for demo
  },
  {
    id: 'match-initial-2',
    user1: {
      userId: MOCK_USER.id,
      clothingItem: MY_CLOSET[1], // My Denim Jacket
    },
    user2: {
      userId: 'user-4',
      clothingItem: INITIAL_DECK[2], // GorpcoreGal's Khaki Pants
    },
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    status: 'completed',
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
    {
        id: 'txn-initial-1',
        matchId: 'match-initial-1',
        status: 'ongoing',
        parties: {
            'user-1': { // Our mock user
                phoneNumber: '0912345678',
                pickupMethod: '7-11',
                pickupLocation: '台北南港門市'
            }
            // user-2 has not submitted their details yet
        }
    }
];

export const INITIAL_LIKED_ITEMS: LikedItem[] = [
    {
        id: 'like-1',
        item: INITIAL_DECK[1], // RetroKid's T-Shirt
        status: 'pending',
    },
    {
        id: 'like-3',
        item: INITIAL_DECK[3], // UrbanExplorer's Hoodie
        status: 'rejected', // Simulating a rejection
    },
];

const USER_3_CLOSET: ClothingItem[] = [
    INITIAL_DECK[1], // Their T-shirt
    {
        id: 'user-3-item-2',
        userId: 'user-3',
        userName: 'RetroKid',
        userAvatar: 'https://picsum.photos/seed/user3/100/100',
        imageUrls: ['https://picsum.photos/seed/user3closet2/400/600'],
        category: '短褲',
        color: '水洗藍',
        style_tags: ['復古', '丹寧', '夏季'],
        description: '一條高腰水洗丹寧短褲，非常適合搭配圖案T恤。',
        estimatedPrice: 500,
    }
];

export const INITIAL_REQUESTS: Request[] = [
    {
        id: 'req-1',
        requester: {
            id: 'user-3',
            name: 'RetroKid',
            avatar: 'https://picsum.photos/seed/user3/100/100',
            closet: USER_3_CLOSET
        },
        itemOfInterest: MY_CLOSET[0] // My floral dress
    },
    {
        id: 'req-2',
        requester: {
            id: 'user-5',
            name: 'UrbanExplorer',
            avatar: 'https://picsum.photos/seed/user5/100/100',
            closet: [INITIAL_DECK[3]] // Just their hoodie
        },
        itemOfInterest: MY_CLOSET[1] // My denim jacket
    }
];