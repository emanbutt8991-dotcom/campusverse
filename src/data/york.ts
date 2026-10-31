import type { UniversityContent } from './types';

export const york: UniversityContent = {
  programs: ['Computer Science', 'Schulich Business', 'Kinesiology', 'Psychology', 'Lassonde Engineering', 'Communications', 'Nursing'],
  rides: [
    ['Downtown Toronto (Union)', 'York University Station', 'Union Station, Bay St.', '17:15', 3, 8, 1, 'Jordan Mensah'],
    ['Toronto Pearson Airport', 'Vari Hall', 'Terminal 1 departures', '07:00', 2, 15, 2],
    ['Hamilton (McMaster)', 'Keele Campus — Ian MacDonald Blvd', 'Main St. West', '13:30', 2, 14, 3],
    ['Brampton (Bramalea City Centre)', 'The Quad', 'Bramalea City Centre', '16:45', 1, 10, 2],
    ['Markham (Markville)', 'Scott Library', 'Markville Mall', '18:30', 3, 9, 4],
    ['Barrie (Georgian College)', 'York University Station', 'Bayfield St. area', '10:00', 0, 18, 6],
  ],
  groups: [
    ['EECS 1012', 'Web Dev Fundamentals Group', 'Lab prep and JavaScript practice for EECS 1012.', 'Monday', '5:30 PM', 'In Person', 'Scott Library, 2nd floor', 3, 6],
    ['EECS 1022', 'Java + Android Lab Buddies', 'Working through labs and app assignments together.', 'Wednesday', '6:00 PM', 'Online', 'Online (Zoom)', 5, 9],
    ['MATH 1013', 'Calc Lions', 'Weekly WeBWorK and test prep.', 'Tuesday', '4:00 PM', 'In Person', 'Vari Hall, Room 1152', 6, 6],
    ['BIOL 1000', 'Bio 1000 Review', 'Lecture recap, practice MCQs and diagram drills.', 'Thursday', '3:00 PM', 'In Person', 'Steacie Science Library', 2, 8],
    ['EECS 1022', 'Debug Den', 'Late-night debugging help for assignments.', 'Sunday', '9:00 PM', 'Online', 'Online (Discord)', 4, 10],
  ],
  housing: [
    ['The Village (York U Heights)', 0.6, 750, 'Private room', 'Sep 1', 'Apr 30', 8, 'Room in a student house, five-minute walk to Keele Campus.'],
    ['Downsview', 2.3, 820, 'Private room', 'Sep 1', 'Aug 31', 12, 'Basement room near the subway, quiet and furnished.'],
    ['Jane & Finch area', 1.4, 600, 'Shared room', 'Jan 1', 'Apr 30', 4, 'Winter sublet shared with one other York student.'],
    ['Vaughan Metropolitan Centre', 3.8, 1450, 'Studio', 'Sep 1', 'Aug 31', 12, 'New-build studio at VMC, one subway stop from campus.'],
    ['Steeles West', 1.1, 710, 'Private room', 'May 1', 'Aug 31', 4, 'Summer sublet with parking spot included.'],
  ],
  events: [
    ['York Lions Basketball Night', 'Tait McKenzie Centre', 2, '19:00', 300, 220, 'Red out the gym and cheer on the Lions!'],
    ['Vari Hall Cultural Showcase', 'Vari Hall rotunda', 5, '12:00', 400, 260, 'Student clubs share food, music and dance from around the world.'],
    ['Lassonde Robotics Demo Day', 'Bergeron Centre', 8, '15:00', 120, 70, 'See student robotics projects in action.'],
    ['Scott Library Exam Prep Bash', 'Scott Library', 10, '17:00', 80, 51, 'Peer tutors, snacks and study zones.'],
  ],
  posts: [
    ['Academics', 'EECS 1022 lab 5 got me stuck on intents 😩 Anyone at Scott Library tonight?', 'Computer Science'],
    ['Events', 'Lions basketball Friday at Tait! Let\'s pack the stands 🦁', 'Kinesiology', 'event'],
    ['Buy & Sell', 'Selling a mini fridge and microwave before moving out of res. Pickup near The Quad.', 'Psychology', 'sale'],
    ['Lost & Found', 'Lost my red York lanyard with my keys near Vari Hall. Please message me if found!', 'Communications'],
    ['Clubs', 'York Debate Society is hosting a beginner tournament next week. Sign up at our booth in Vari!', 'Schulich Business', 'study'],
    ['General', 'Vari Hall at golden hour hits different. Lions, appreciate your campus today ❤️', 'Nursing', 'campus'],
  ],
  ads: [
    ['Keele Campus Eats', 'Student combo under $10', 'Burrito + drink deal for students near York Lanes.', 'View offer', 'food', '$9.50 student combo'],
    ['North York Student Housing', 'Rooms near Keele Campus', 'Browse furnished rooms within walking distance of York.', 'Learn more', 'housing', 'First month 10% off'],
    ['York Lanes Textbook Swap', 'Trade, don\'t pay full price', 'Swap textbooks with other York students every Thursday.', 'See details', 'books', 'Free to join'],
  ],
  localDish: ['Jamaican Patties', 'A dozen beef and veggie patties from a family recipe.', ['Spicy', 'Halal'], '🥟'],
};
