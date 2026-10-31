import type { AdKind, DietTag, MeetingFormat, PostCategory, PostImage, RoomType } from '../types/content';

/** [to, pickup, dropoff, time HH:MM, seats, price, dayOffset, driver?] */
export type RideSeed = [string, string, string, string, number, number, number, string?];
/** [course, name, description, day, time, format, location, members, max] */
export type GroupSeed = [string, string, string, string, string, MeetingFormat, string, number, number];
/** [neighbourhood, km, rent, roomType, leaseStart, leaseEnd, months, description] */
export type HousingSeed = [string, number, number, RoomType, string, string, number, string];
/** [title, location, dayOffset, time HH:MM, capacity, going, description] */
export type EventSeed = [string, string, number, string, number, number, string];
/** [category, content, program, image?] */
export type PostSeed = [PostCategory, string, string, PostImage?];
/** [brand, headline, description, cta, kind, offer] */
export type AdSeed = [string, string, string, string, AdKind, string];

/** Hand-written, university-specific content. Shared generators turn this into a full Dataset. */
export interface UniversityContent {
  rides: RideSeed[];
  groups: GroupSeed[];
  housing: HousingSeed[];
  events: EventSeed[];
  posts: PostSeed[];
  ads: AdSeed[];
  /** A local favourite added to the shared meal list: [dish, description, tags, emoji] */
  localDish: [string, string, DietTag[], string];
  programs: string[];
}
