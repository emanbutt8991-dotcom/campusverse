export interface Ride {
  id: string;
  driver: string;
  program: string;
  from: string;
  to: string;
  pickup: string;
  dropoff: string;
  /** ISO date yyyy-mm-dd */
  date: string;
  /** 24h HH:MM */
  time: string;
  seats: number;
  price: number;
  car: string;
  notes: string;
  userCreated?: boolean;
}

export type MeetingFormat = 'In Person' | 'Online';

export interface StudyGroup {
  id: string;
  course: string;
  name: string;
  description: string;
  day: string;
  time: string;
  format: MeetingFormat;
  location: string;
  members: number;
  max: number;
  organizer: string;
  userCreated?: boolean;
}

export type DietTag = 'Halal' | 'Vegetarian' | 'Vegan' | 'Spicy' | 'Gluten-Free' | 'Nut-Free';
export const DIET_TAGS: DietTag[] = ['Halal', 'Vegetarian', 'Vegan', 'Spicy', 'Gluten-Free', 'Nut-Free'];
export const ALLERGENS = ['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs'] as const;
export type Allergen = (typeof ALLERGENS)[number];

export interface Meal {
  id: string;
  dish: string;
  student: string;
  description: string;
  pickup: string;
  window: string;
  quantity: number;
  tags: DietTag[];
  allergens: Allergen[];
  distanceKm: number;
  emoji: string;
  hue: number;
  userCreated?: boolean;
}

export type PostCategory = 'Academics' | 'Events' | 'Clubs' | 'Buy & Sell' | 'Lost & Found' | 'General';
export const POST_CATEGORIES: PostCategory[] = ['Academics', 'Events', 'Clubs', 'Buy & Sell', 'Lost & Found', 'General'];
export type PostImage = 'campus' | 'food' | 'event' | 'study' | 'sale';

export interface Comment {
  id: string;
  author: string;
  text: string;
}

export interface Post {
  id: string;
  author: string;
  program: string;
  minutesAgo: number;
  content: string;
  category: PostCategory;
  likes: number;
  comments: Comment[];
  image?: PostImage;
  userCreated?: boolean;
  createdAt?: number;
}

export interface CampusEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  capacity: number;
  going: number;
  description: string;
  host: string;
}

export type RoomType = 'Private room' | 'Shared room' | 'Studio' | 'Entire unit';
export const ROOM_TYPES: RoomType[] = ['Private room', 'Shared room', 'Studio', 'Entire unit'];

export interface Housing {
  id: string;
  rent: number;
  neighbourhood: string;
  distanceKm: number;
  leaseStart: string;
  leaseEnd: string;
  leaseMonths: number;
  roomType: RoomType;
  description: string;
  lister: string;
  amenities: string[];
  hue: number;
  userCreated?: boolean;
}

export type AdKind = 'food' | 'coffee' | 'housing' | 'books' | 'fitness' | 'transit';

export interface Ad {
  id: string;
  brand: string;
  headline: string;
  description: string;
  cta: string;
  kind: AdKind;
  offer: string;
}

export interface Message {
  id: string;
  from: 'me' | 'them';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  with: string;
  program: string;
  topic: string;
  messages: Message[];
  unread?: boolean;
}

export interface Roommate {
  id: string;
  name: string;
  program: string;
  budget: number;
  sleep: 'Early bird' | 'Night owl' | 'Flexible';
  cleanliness: 'Very tidy' | 'Tidy' | 'Relaxed';
  noise: 'Quiet' | 'Moderate' | 'Lively';
  bio: string;
}

export interface Dataset {
  rides: Ride[];
  groups: StudyGroup[];
  meals: Meal[];
  posts: Post[];
  events: CampusEvent[];
  housing: Housing[];
  ads: Ad[];
  conversations: Conversation[];
  roommates: Roommate[];
  /** true when content is auto-generated for an unlisted university */
  isSample: boolean;
}

export type ActivityType = 'ride' | 'study' | 'meal' | 'event' | 'housing' | 'post' | 'listing';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  subtitle: string;
  status: string;
  link: string;
  createdAt: number;
}

export interface AppNotification {
  id: string;
  type: ActivityType;
  text: string;
  createdAt: number;
  read: boolean;
}
