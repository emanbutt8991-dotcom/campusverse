import type { UniversityContent } from './types';

export const queens: UniversityContent = {
  programs: ['Computing', 'Commerce', 'Engineering', 'Health Sciences', 'Life Sciences', 'Concurrent Education', 'Political Studies'],
  rides: [
    ['Toronto (Union Station)', 'Stauffer Library', 'Union Station, Bay St.', '15:30', 3, 30, 1, 'Liam MacDonald'],
    ['Ottawa (Rideau Centre)', "Queen's Centre", 'Rideau Centre', '10:00', 2, 20, 2],
    ['Toronto Pearson Airport', 'University Avenue at Union St', 'Terminal 1 departures', '05:30', 2, 40, 3],
    ['Montréal (Downtown)', 'Grant Hall', 'Berri-UQAM area', '08:30', 1, 35, 4],
    ['Belleville (Quinte Mall)', 'Downtown Kingston — Princess St', 'Quinte Mall', '13:00', 3, 12, 2],
    ['Gananoque (1000 Islands)', 'Stauffer Library', 'Gananoque waterfront', '11:00', 0, 10, 6],
  ],
  groups: [
    ['CISC 121', 'Algorithms & Coffee', 'Sorting, searching and recursion practice for CISC 121.', 'Monday', '5:00 PM', 'In Person', 'Stauffer Library, Room 121', 3, 6],
    ['CISC 101', 'Intro Programming Circle', 'Assignment help and concept review for CISC 101.', 'Tuesday', '6:00 PM', 'Online', 'Online (Zoom)', 5, 10],
    ['MATH 121', 'Calc Gaels', 'Working through problem sets and past exams.', 'Wednesday', '4:00 PM', 'In Person', 'Jeffery Hall, Room 225', 6, 6],
    ['BIOL 102', 'Bio Review Squad', 'Weekly recap and practice MCQs.', 'Thursday', '3:30 PM', 'In Person', "Queen's Centre, Room 211", 2, 7],
    ['CISC 121', 'Lakeside Late Coders', 'Night-time online debug sessions.', 'Sunday', '8:00 PM', 'Online', 'Online (Discord)', 4, 9],
  ],
  housing: [
    ['University District (Aberdeen St)', 0.3, 780, 'Private room', 'Sep 1', 'Apr 30', 8, 'Classic limestone student house in the heart of the University District.'],
    ['Sydenham', 0.9, 820, 'Private room', 'Sep 1', 'Aug 31', 12, 'Heritage home near City Park with a big kitchen.'],
    ['Williamsville', 1.6, 690, 'Shared room', 'Jan 1', 'Apr 30', 4, 'Winter sublet shared with one other Queen\'s student.'],
    ['Downtown Kingston', 1.2, 950, 'Private room', 'May 1', 'Aug 31', 4, 'Summer sublet near the waterfront and Princess Street.'],
    ['Portsmouth Village', 2.5, 1300, 'Studio', 'Sep 1', 'Aug 31', 12, 'Waterfront studio with lake views near the sailing centre.'],
  ],
  events: [
    ['Gaels Homecoming Game', 'Richardson Stadium', 3, '13:00', 500, 450, 'Tricolour pride! Blue, gold and red in the stands.'],
    ['Grant Hall Fall Concert', 'Grant Hall', 5, '19:30', 300, 190, 'Student ensembles perform in the historic hall.'],
    ['Lake Ontario Waterfront Run', 'Breakwater Park', 7, '07:30', 40, 23, 'Easy group run along the lakeshore, coffee after.'],
    ['Stauffer Study Night', 'Stauffer Library', 10, '18:00', 100, 68, 'Group study with snacks and peer mentors.'],
  ],
  posts: [
    ['Academics', 'CISC 121 midterm next week. Anyone at Stauffer tonight to review sorting algorithms? 📚', 'Computing'],
    ['Events', 'Homecoming at Richardson this weekend! Tricolour everything 💙💛❤️', 'Commerce', 'event'],
    ['Buy & Sell', 'Selling engineering textbooks + a lab coat. Pickup at the ILC.', 'Engineering', 'sale'],
    ['Lost & Found', 'Found a tricolour scarf in Grant Hall after the concert. Left it at the front desk.', 'Political Studies'],
    ['Clubs', 'Queen\'s Sailing Club is hosting a beginner session on Lake Ontario this weekend!', 'Life Sciences', 'study'],
    ['General', 'The limestone buildings at golden hour… no other campus comes close 🏛️', 'Health Sciences', 'campus'],
  ],
  ads: [
    ['Princess Street Student Café', 'Lakeside lattes', 'Students save 20% on all drinks at this Princess St. café.', 'View offer', 'coffee', '20% off drinks'],
    ['Kingston Student Housing Showcase', 'University District rentals', 'Tour houses on Aberdeen, Earl and Johnson.', 'Learn more', 'housing', 'Free tours'],
    ['Waterfront Fish & Chips', 'Friday student special', 'Fish & chips + drink for $11 on the waterfront.', 'Get deal', 'food', '$11 Friday special'],
  ],
  localDish: ['Kingston Fish Tacos', 'Six homemade fish tacos with lime slaw.', ['Spicy'], '🌮'],
};
