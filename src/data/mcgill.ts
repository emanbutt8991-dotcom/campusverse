import type { UniversityContent } from './types';

export const mcgill: UniversityContent = {
  programs: ['Computer Science', 'Arts & Science', 'Management', 'Physiology', 'Political Science', 'Mechanical Engineering', 'Linguistics'],
  rides: [
    ['Ottawa (ByWard Market)', 'Roddick Gates, Sherbrooke St.', 'ByWard Market area', '16:00', 3, 22, 1, 'Camille Tremblay'],
    ['Montréal-Trudeau Airport (YUL)', 'Milton-Parc — Milton & Park Ave', 'YUL departures level', '06:30', 2, 20, 2],
    ['Québec City (Old Québec)', 'McLennan Library', 'Gare du Palais area', '09:00', 2, 35, 4],
    ['Toronto (Union Station)', 'Montréal Central Station', 'Union Station, Front St.', '07:30', 1, 45, 3],
    ['Mont-Tremblant', 'Sherbrooke Street at McTavish', 'Tremblant village', '08:00', 3, 28, 5],
    ['Sherbrooke (QC)', 'Redpath Library', 'Downtown Sherbrooke', '13:00', 0, 25, 6],
  ],
  groups: [
    ['COMP 250', 'Algorithms Après-Midi', 'Big-O, trees and graph traversals. We work through practice finals.', 'Monday', '4:30 PM', 'In Person', 'McLennan Library, 3rd floor', 3, 6],
    ['COMP 202', 'Java Foundations', 'Assignment help and concept review for COMP 202.', 'Tuesday', '6:00 PM', 'Online', 'Online (Zoom)', 7, 12],
    ['MATH 140', 'Calc 1 Collective', 'Practice problems and webwork help, bilingual group (EN/FR).', 'Wednesday', '5:00 PM', 'In Person', 'Burnside Hall, Room 1B', 4, 4],
    ['BIOL 111', 'Organisms Review', 'Weekly lecture recap and diagram quizzes.', 'Thursday', '3:00 PM', 'In Person', 'Redpath Library, Cyberthèque', 2, 6],
    ['COMP 250', 'Late Night Data Structures', 'Assignment debugging sessions for night owls.', 'Sunday', '8:00 PM', 'Online', 'Online (Discord)', 5, 9],
  ],
  housing: [
    ['Milton-Parc', 0.4, 850, 'Private room', 'Sep 1', 'Apr 30', 8, 'Classic Montréal walk-up with a balcony, five minutes from campus.'],
    ['The Plateau', 2.1, 790, 'Private room', 'Jul 1', 'Jun 30', 12, 'Bright room in a 5½ on a leafy Plateau street. Moving day: July 1st!'],
    ['Downtown — Peel St.', 0.7, 1150, 'Studio', 'Sep 1', 'Aug 31', 12, 'Compact studio in a high-rise near Peel metro.'],
    ['Mile End', 2.9, 720, 'Shared room', 'Jan 1', 'Apr 30', 4, 'Winter sublet near the bagel shops. Shared with one roommate.'],
    ['Concordia-Shaughnessy', 1.6, 990, 'Private room', 'May 1', 'Aug 31', 4, 'Summer sublet with air conditioning — rare find!'],
  ],
  events: [
    ['Redbirds Rugby Home Match', 'Molson Stadium', 3, '15:00', 300, 210, 'Red out! Cheer on the Redbirds on the slopes of Mount Royal.'],
    ['Mount Royal Sunset Hike', 'Peel Street stairs', 4, '17:30', 30, 18, 'Hike up to the Kondiaronk lookout as a group.'],
    ['Frosh Alumni Poutine Social', 'Lower Field', 7, '18:00', 150, 105, 'Free poutine (veggie gravy available) and live music.'],
    ['McLennan Silent Study Marathon', 'McLennan Library', 9, '10:00', 80, 56, 'Pomodoro sessions with coffee breaks every two hours.'],
  ],
  posts: [
    ['Academics', 'COMP 250 assignment 2 has me in shambles. Anyone studying at McLennan tomorrow? 🧩', 'Computer Science'],
    ['Events', 'Rugby at Molson Stadium Saturday! Who wants to meet at the Roddick Gates and walk up together?', 'Management', 'event'],
    ['Buy & Sell', 'Selling a winter coat (men\'s M) and a desk chair before I move to the Plateau. Pickup in Milton-Parc.', 'Political Science', 'sale'],
    ['Lost & Found', 'Found a student keychain with a little red bird charm near Leacock. At the Leacock front desk now.', 'Linguistics'],
    ['Clubs', 'McGill Outdoors Club is planning a trip to the Laurentians — sign-ups open this week!', 'Physiology', 'study'],
    ['General', 'Arts Building with the fall colours behind it today… Montréal, you\'re beautiful 🍁', 'Arts & Science', 'campus'],
  ],
  ads: [
    ['Montréal Student Café', 'Croissant + café au lait $5', 'A Milton-Parc café offering a student breakfast special all semester.', 'View offer', 'coffee', '$5 breakfast special'],
    ['McGill Area Housing Showcase', 'July 1st leases now listed', 'Browse student apartments in Milton-Parc, the Plateau and downtown.', 'Learn more', 'housing', 'Free tenant-rights workshop'],
    ['Student Book Deals', 'Used course packs & textbooks', 'Buy, sell and swap books with other Montréal students.', 'Browse deals', 'books', 'Up to 50% off used books'],
  ],
  localDish: ['Montréal-style Bagels', 'Dozen sesame bagels, still warm from the Mile End.', ['Vegetarian', 'Nut-Free'], '🥯'],
};
