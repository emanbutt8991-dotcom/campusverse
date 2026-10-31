import type { UniversityContent } from './types';

export const brock: UniversityContent = {
  programs: ['Computer Science', 'Goodman Business', 'Oenology & Viticulture', 'Kinesiology', 'Child & Youth Studies', 'Biological Sciences', 'Dramatic Arts'],
  rides: [
    ['Toronto (Union Station)', 'Brock University Student Centre', 'Union Station, Front St.', '15:00', 3, 18, 1, 'Noah Patel'],
    ['Toronto Pearson Airport', 'Schmon Tower loop', 'Terminal 3 departures', '06:00', 2, 30, 2],
    ['Hamilton (McMaster)', 'Glenridge Avenue', 'Main St. West', '11:30', 2, 12, 3],
    ['Niagara Falls (Clifton Hill)', 'James A. Gibson Library', 'Clifton Hill area', '17:00', 1, 8, 2],
    ['Buffalo (Elmwood Village)', 'Downtown St. Catharines', 'Elmwood Ave', '09:00', 3, 25, 5],
    ['Niagara-on-the-Lake', 'Brock University Student Centre', 'Queen St. heritage district', '10:30', 0, 10, 4],
  ],
  groups: [
    ['COSC 1P02', 'Java Jumpstart', 'Labs and assignment practice for COSC 1P02.', 'Monday', '5:30 PM', 'In Person', 'James A. Gibson Library, Room 302', 3, 6],
    ['COSC 1P03', 'Data Structures Den', 'Linked lists, stacks and recursion practice.', 'Wednesday', '6:00 PM', 'Online', 'Online (Teams)', 5, 9],
    ['MATH 1P66', 'Logic & Proof Group', 'Weekly problem set collaboration.', 'Tuesday', '4:00 PM', 'In Person', 'Mackenzie Chown Complex, A Block', 6, 6],
    ['BIOL 1P91', 'Bio Badgers', 'Lecture recap and practice quizzes.', 'Thursday', '3:00 PM', 'In Person', 'Brock University Student Centre, Room 208', 2, 7],
    ['COSC 1P03', 'Escarpment Late Coders', 'Online debugging sessions before deadlines.', 'Sunday', '8:00 PM', 'Online', 'Online (Discord)', 4, 10],
  ],
  housing: [
    ['Glenridge Avenue area', 0.7, 650, 'Private room', 'Sep 1', 'Apr 30', 8, 'Student house a short walk up the hill to campus.'],
    ['Thorold (Confederation Heights)', 2.1, 600, 'Private room', 'Sep 1', 'Aug 31', 12, 'Quiet student neighbourhood with a direct bus to campus.'],
    ['Downtown St. Catharines', 3.4, 780, 'Private room', 'Jan 1', 'Apr 30', 4, 'Winter sublet near the Meridian Centre.'],
    ['Merritton', 2.8, 560, 'Shared room', 'May 1', 'Aug 31', 4, 'Summer shared room, utilities included.'],
    ['Port Dalhousie', 6.0, 1100, 'Studio', 'Sep 1', 'Aug 31', 12, 'Lakeside studio near the beach and carousel.'],
  ],
  events: [
    ['Badgers Wrestling Showcase', 'Bob Davis Gymnasium', 2, '18:00', 250, 170, 'Red out for one of Brock\'s most successful varsity programs!'],
    ['Niagara Wine Country Info Session', 'Cool Climate Oenology Institute', 5, '16:00', 60, 38, 'Learn about Oenology & Viticulture student research (19+ tasting portion separate).'],
    ['Escarpment Trail Hike', 'Bruce Trail access at campus', 7, '10:00', 30, 17, 'Group hike along the Bruce Trail right behind campus.'],
    ['Gibson Library Study Jam', 'James A. Gibson Library', 10, '18:00', 80, 52, 'Group study night with peer tutors.'],
  ],
  posts: [
    ['Academics', 'COSC 1P03 assignment 2… anyone at Gibson Library tonight? Let\'s debug together 🦡', 'Computer Science'],
    ['Events', 'Badgers wrestling Friday at Bob Davis! Come cheer on the team ❤️', 'Kinesiology', 'event'],
    ['Buy & Sell', 'Selling a bike — perfect for getting up the escarpment hill (with effort). $80.', 'Goodman Business', 'sale'],
    ['Lost & Found', 'Found a red Brock water bottle in the Schmon Tower elevator. Left at security.', 'Biological Sciences'],
    ['Clubs', 'Brock Dramatic Arts Club is holding auditions for our fall play! No experience needed.', 'Dramatic Arts', 'study'],
    ['General', 'The view from the top of Schmon Tower over Niagara today was amazing 🌄', 'Child & Youth Studies', 'campus'],
  ],
  ads: [
    ['Downtown St. Catharines Café', 'Student coffee + muffin $4', 'A St. Paul St. café with an all-day student special.', 'View offer', 'coffee', '$4 coffee + muffin'],
    ['Niagara Student Housing Expo', 'Glenridge & Thorold rentals', 'Compare houses near campus from local landlords.', 'Learn more', 'housing', 'Free entry'],
    ['Niagara Textbook Exchange', 'Save on course books', 'Buy and sell used textbooks with other Brock students.', 'Browse deals', 'books', 'Up to 40% off'],
  ],
  localDish: ['Niagara Peach Cobbler', 'Homemade cobbler with local peaches, serves six.', ['Vegetarian'], '🍑'],
};
