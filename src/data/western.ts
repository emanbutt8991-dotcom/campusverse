import type { UniversityContent } from './types';

export const western: UniversityContent = {
  programs: ['Computer Science', 'Ivey HBA', 'Medical Sciences', 'Engineering', 'Media & Information', 'Kinesiology', 'Music'],
  rides: [
    ['Toronto (Union Station)', 'University Community Centre', 'Union Station, Front St.', '16:00', 3, 25, 1, 'Olivia Chen'],
    ['Toronto Pearson Airport', 'Western Road at Sarnia Rd', 'Terminal 1 departures', '05:45', 2, 30, 2],
    ['Waterloo (University Ave)', 'Weldon Library', 'University Ave & Phillip St', '12:45', 1, 20, 3],
    ['Windsor (Downtown)', 'Richmond Street at University Gates', 'Ouellette Ave', '14:00', 2, 22, 4],
    ['Hamilton (Westdale)', 'London VIA Rail Station', 'Westdale village', '09:15', 3, 18, 2],
    ['Grand Bend Beach', 'University Community Centre', 'Main St. beach lot', '10:00', 0, 12, 6],
  ],
  groups: [
    ['CS 1026', 'Python Starters', 'Practising assignments and labs for CS 1026.', 'Monday', '6:00 PM', 'In Person', 'Weldon Library, 2nd floor', 3, 6],
    ['CS 1027', 'Java Data Structures Club', 'Stacks, queues and recursion — weekly practice.', 'Wednesday', '5:00 PM', 'Online', 'Online (Zoom)', 6, 9],
    ['MATH 1600', 'Linear Algebra Lab', 'Matrices, vectors and proof practice.', 'Tuesday', '4:30 PM', 'In Person', 'Middlesex College, Room 105', 5, 5],
    ['CALC 1000', 'Calc Mustangs', 'Assignment help and past-exam practice.', 'Thursday', '7:00 PM', 'In Person', 'University Community Centre, Room 315', 2, 8],
    ['CS 1027', 'Sunday Debug Session', 'Bring your bugs, leave with green tests.', 'Sunday', '3:00 PM', 'Online', 'Online (Discord)', 4, 10],
  ],
  housing: [
    ['Masonville', 2.4, 720, 'Private room', 'Sep 1', 'Apr 30', 8, 'Room in a student house near Masonville Place, direct bus to campus.'],
    ['Richmond Row', 2.8, 890, 'Private room', 'Sep 1', 'Aug 31', 12, 'Upper unit in a lively area near downtown nightlife.'],
    ['Broughdale', 0.6, 780, 'Private room', 'Sep 1', 'Apr 30', 8, 'Classic student house steps from the University Gates.'],
    ['Old North', 1.9, 650, 'Shared room', 'Jan 1', 'Apr 30', 4, 'Winter sublet in a quiet, tree-lined neighbourhood.'],
    ['Downtown London', 3.5, 1250, 'Studio', 'Sep 1', 'Aug 31', 12, 'Modern studio near Dundas Place.'],
  ],
  events: [
    ['Mustangs Homecoming Game', 'TD Stadium', 3, '13:00', 500, 420, 'Purple pride! The biggest game day of the year.'],
    ['UCC Purple Fest', 'University Community Centre atrium', 5, '12:00', 300, 180, 'Club fair, live DJ and free purple swag.'],
    ['Thames Valley Trail Run', 'Thames Valley Parkway at campus', 7, '08:00', 40, 22, 'Easy 5K group run along the river.'],
    ['Weldon Late Study Night', 'Weldon Library', 10, '19:00', 100, 66, 'Extended hours with peer tutors and coffee.'],
  ],
  posts: [
    ['Academics', 'CS 1027 assignment 3 is tough! Anyone studying at Weldon tonight? 📚', 'Computer Science'],
    ['Events', 'Homecoming this weekend!! Purple everything. Meeting at the UCC beforehand 💜🐎', 'Kinesiology', 'event'],
    ['Buy & Sell', 'Selling Ivey case books and a business calculator. Pickup on campus.', 'Ivey HBA', 'sale'],
    ['Lost & Found', 'Found a purple Western hoodie at the Rec Centre. It\'s at the front desk.', 'Medical Sciences'],
    ['Clubs', 'Western Engineering Robotics is recruiting first-years for our autonomous rover team!', 'Engineering', 'study'],
    ['General', 'Middlesex College tower in the morning mist… most beautiful campus in Canada, no debate 💜', 'Media & Information', 'campus'],
  ],
  ads: [
    ['Richmond Row Student Café', 'Study + sip', 'Free pastry with any coffee for students on weekdays.', 'View offer', 'coffee', 'Free pastry with coffee'],
    ['London Student Housing Fair', 'Broughdale & Masonville rentals', 'Meet local landlords and compare houses near campus.', 'Learn more', 'housing', 'Free entry'],
    ['Mustang Game Day Wings', 'Homecoming wing special', 'Half-price wings on Mustangs game days on Richmond Row.', 'See specials', 'food', 'Half-price wings'],
  ],
  localDish: ['Homemade Butter Tarts', 'A dozen classic Ontario butter tarts, no raisins.', ['Vegetarian'], '🥧'],
};
