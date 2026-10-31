import { BookOpen, Car, Home, MessagesSquare, UtensilsCrossed, Users, BedDouble, type LucideIcon } from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  short: string;
  icon: LucideIcon;
  tagline?: string;
  description?: string;
}

export const MODULES: NavItem[] = [
  { to: '/ride', label: 'VerseRide', short: 'Ride', icon: Car, tagline: 'Find your next ride', description: 'Carpool home, to co-op or the airport with fellow students.' },
  { to: '/meals', label: 'VerseMeals', short: 'Meals', icon: UtensilsCrossed, tagline: 'Food tastes better together', description: 'Share extra food and discover affordable campus meals.' },
  { to: '/connect', label: 'VerseConnect', short: 'Connect', icon: Users, tagline: 'Your campus community', description: 'Posts, clubs and events from your campus.' },
  { to: '/room', label: 'VerseRoom', short: 'Room', icon: BedDouble, tagline: 'Find your next home', description: 'Student housing, sublets and roommate matching.' },
  { to: '/study', label: 'VerseStudy', short: 'Study', icon: BookOpen, tagline: 'Study better together', description: 'Find or start a study group for your course.' },
];

export const HOME_ITEM: NavItem = { to: '/home', label: 'Home', short: 'Home', icon: Home };
export const MESSAGES_ITEM: NavItem = { to: '/messages', label: 'Messages', short: 'Messages', icon: MessagesSquare };

