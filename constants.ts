import { ClothingItem, Match, User, LikedItem, Request, Transaction } from './types';

export const AVATAR_OPTIONS = [
    'https://picsum.photos/seed/me/100/100',
    'https://picsum.photos/seed/avatar2/100/100',
    'https://picsum.photos/seed/avatar3/100/100',
    'https://picsum.photos/seed/avatar4/100/100',
];

export const MOCK_USER: User = {
    id: 'user-1',
    name: '',
    username: '@vibeseeker',
    avatar: AVATAR_OPTIONS[0],
    email: '',
    joinDate: '',
    phoneNumber: '',
};

export const MY_CLOSET: ClothingItem[] = [

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
];

export const INITIAL_LIKED_ITEMS: LikedItem[] = [
];

const USER_3_CLOSET: ClothingItem[] = [
];

export const INITIAL_REQUESTS: Request[] = [
];