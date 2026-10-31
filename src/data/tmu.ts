import type { UniversityContent } from './types';

export const tmu: UniversityContent = {
  programs: ['Computer Science', 'Media Production', 'Business Technology Management', 'Fashion', 'Nursing', 'Architectural Science', 'Journalism'],
  rides: [
    ['Ottawa (Rideau St)', 'Student Learning Centre', 'Rideau St. & Sussex', '14:00', 3, 35, 1, 'Aisha Rahman'],
    ['Toronto Pearson Airport', 'Kerr Hall, Gould St.', 'Terminal 3 departures', '06:15', 2, 20, 2],
    ['Mississauga (Square One)', 'College Station', 'Square One bus terminal', '17:30', 2, 12, 2],
    ['Waterloo (University Ave)', 'Yonge-Dundas area', 'University Ave & Phillip St', '09:45', 1, 18, 3],
    ['Niagara Falls', 'Toronto Metropolitan University Library', 'Clifton Hill area', '10:30', 3, 22, 5],
    ['Scarborough Town Centre', 'Student Learning Centre', 'STC bus terminal', '19:00', 0, 9, 4],
  ],
  groups: [
    ['CPS 109', 'Python Power Hour', 'Lab practice and debugging for CPS 109.', 'Monday', '5:00 PM', 'In Person', 'Student Learning Centre, Level 6', 3, 6],
    ['CPS 209', 'Java OOP Squad', 'Assignment help and OOP design practice.', 'Wednesday', '6:30 PM', 'Online', 'Online (Teams)', 5, 9],
    ['MTH 110', 'Discrete Math Drills', 'Logic, sets and proofs — weekly problem solving.', 'Tuesday', '3:30 PM', 'In Person', 'Kerr Hall, Room KHE 225', 6, 6],
    ['PCS 110', 'Physics Problem Crew', 'Working through assignments and lab write-ups.', 'Thursday', '4:00 PM', 'In Person', 'Toronto Metropolitan University Library, Group Room 3', 2, 7],
    ['CPS 109', 'Night Owl Coders', 'Late-night online sessions before deadlines.', 'Sunday', '8:30 PM', 'Online', 'Online (Discord)', 4, 10],
  ],
  housing: [
    ['Church-Wellesley', 0.8, 1150, 'Private room', 'Sep 1', 'Apr 30', 8, 'Room in a condo with a view, a short walk to Kerr Hall.'],
    ['Garden District', 0.4, 1300, 'Private room', 'Sep 1', 'Aug 31', 12, 'Steps from campus in a renovated walk-up.'],
    ['Cabbagetown', 1.6, 980, 'Shared room', 'Jan 1', 'Apr 30', 4, 'Winter sublet in a Victorian house, shared with one student.'],
    ['St. Lawrence Market area', 1.9, 1100, 'Private room', 'May 1', 'Aug 31', 4, 'Summer sublet near the market, furnished.'],
    ['Yonge & Bloor', 2.2, 1750, 'Studio', 'Sep 1', 'Aug 31', 12, 'High-rise studio with gym and rooftop access.'],
  ],
  events: [
    ['Bold Basketball at the MAC', 'Mattamy Athletic Centre', 2, '19:30', 450, 330, 'Blue and gold out at the historic Maple Leaf Gardens building!'],
    ['SLC Startup Mixer', 'Student Learning Centre', 4, '18:00', 120, 85, 'Meet student founders from campus incubators.'],
    ['Yonge-Dundas Photo Walk', 'Yonge-Dundas Square', 6, '16:00', 30, 19, 'Bring your phone or camera for a golden-hour photo walk downtown.'],
    ['Fashion Collective Pop-up', 'Kerr Hall Quad', 9, '12:00', 200, 110, 'Student designers sell their latest pieces.'],
  ],
  posts: [
    ['Academics', 'CPS 209 assignment 2 is wild. Anyone on SLC level 6 tonight to work through it? 💻', 'Computer Science'],
    ['Events', 'Bold basketball at the MAC this Friday! Who\'s coming? Let\'s fill the stands 💙💛', 'Business Technology Management', 'event'],
    ['Buy & Sell', 'Selling a used DSLR + lens kit — great for Media Production. DM for details!', 'Media Production', 'sale'],
    ['Lost & Found', 'Found a blue TMU tote bag outside Kerr Hall West. Gave it to campus security.', 'Journalism'],
    ['Clubs', 'TMU Fashion Collective is looking for models and photographers for our pop-up!', 'Fashion', 'study'],
    ['General', 'Nothing beats the energy of Gould Street at lunchtime. Downtown campus forever 🏙️', 'Architectural Science', 'campus'],
  ],
  ads: [
    ['Yonge-Dundas Student Eats', 'Bánh mì + drink $8', 'A Dundas St. spot with an all-day student combo.', 'View offer', 'food', '$8 student combo'],
    ['Downtown Student Living', 'Rooms in the Garden District', 'Furnished rooms minutes from campus. Flexible terms.', 'Learn more', 'housing', 'No fees for TMU students'],
    ['Gould St. Coffee Co.', 'Bold brew, bold savings', 'Buy 5 coffees, get the 6th free with your student card.', 'Get card', 'coffee', '6th coffee free'],
  ],
  localDish: ['Downtown Bánh Mì', 'Four homemade lemongrass tofu bánh mì sandwiches.', ['Vegan', 'Spicy'], '🥖'],
};
