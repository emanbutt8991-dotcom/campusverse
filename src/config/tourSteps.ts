/**
 * Guided walkthrough stops. Each step navigates to `route` and spotlights the
 * element tagged `data-tour={target}` (the matching nav item in the top bar on
 * desktop, or the bottom tab bar on phones).
 *
 * Copy describes what each area is for, never the exact clicks needed to finish
 * a usability task, so the tour stays a gentle nudge rather than an answer key.
 */
export interface TourStep {
  target: string;
  route: string;
  title: string;
  body: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    target: 'home',
    route: '/home',
    title: 'Home',
    body: 'Your campus dashboard: highlights, upcoming activity and shortcuts to every Verse service.',
  },
  {
    target: 'ride',
    route: '/ride',
    title: 'VerseRide',
    body: 'Carpool with fellow students. Browse rides going your way, or offer seats in your own car.',
  },
  {
    target: 'meals',
    route: '/meals',
    title: 'VerseMeals',
    body: 'Share extra food and discover affordable meals on and around campus.',
  },
  {
    target: 'connect',
    route: '/connect',
    title: 'VerseConnect',
    body: 'Posts, clubs and events from your campus community.',
  },
  {
    target: 'room',
    route: '/room',
    title: 'VerseRoom',
    body: 'Student housing, sublets and roommate matching near campus.',
  },
  {
    target: 'study',
    route: '/study',
    title: 'VerseStudy',
    body: 'Find classmates to study with by course, or start a group of your own.',
  },
  {
    target: 'messages',
    route: '/messages',
    title: 'Messages',
    body: 'Chat with drivers, roommates and study partners. You can reopen this tour any time from Help.',
  },
];
