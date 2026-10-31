import type { UniversityContent } from './types';

export const laurier: UniversityContent = {
  programs: ['Business Administration', 'Computer Science', 'Music', 'Psychology', 'Communication Studies', 'Economics', 'Kinesiology'],
  rides: [
    ['Toronto (Union Station)', 'Fred Nichols Campus Centre', 'Union Station, Front St.', '15:45', 3, 18, 1, 'Maya Thompson'],
    ['Toronto Pearson Airport', 'Lazaridis Hall', 'Terminal 3 departures', '07:15', 2, 25, 2],
    ['Brantford (Laurier Brantford)', 'King Street North', 'Grand River Hall area', '09:00', 2, 10, 3],
    ['Guelph (Stone Rd Mall)', 'Uptown Waterloo — ION station', 'Stone Road Mall', '12:30', 1, 9, 2],
    ['Hamilton (Jackson Square)', 'Laurier Library', 'Jackson Square, King St.', '17:30', 3, 14, 4],
    ['London (Masonville)', 'Fred Nichols Campus Centre', 'Masonville Place', '11:00', 0, 20, 6],
  ],
  groups: [
    ['CP104', 'Intro Python Pals', 'Lab prep and practice problems for CP104. Total beginners welcome.', 'Monday', '5:00 PM', 'In Person', 'Laurier Library, Group Room 2', 3, 6],
    ['CP164', 'Data Structures Drop-In', 'Stacks, queues and linked lists — we code them together.', 'Wednesday', '6:00 PM', 'Online', 'Online (Teams)', 4, 8],
    ['BU111', 'Case Study Crew', 'Prepping case write-ups and presentations for BU111.', 'Tuesday', '3:00 PM', 'In Person', 'Lazaridis Hall, 2nd floor commons', 6, 6],
    ['MA103', 'Calc Hawks', 'Working through weekly assignments and practice tests.', 'Thursday', '7:00 PM', 'In Person', 'Fred Nichols Campus Centre', 2, 7],
    ['BU111', 'Midterm Flashcard Sprint', 'Fast-paced Kahoot-style review the week before midterms.', 'Sunday', '2:00 PM', 'Online', 'Online (Zoom)', 5, 10],
  ],
  housing: [
    ['King Street North', 0.4, 790, 'Private room', 'Sep 1', 'Apr 30', 8, 'Room in a student building right across from campus.'],
    ['Uptown Waterloo', 1.5, 980, 'Private room', 'Sep 1', 'Aug 31', 12, 'Upper unit near Waterloo Public Square, close to cafés and the ION.'],
    ['Bricker Avenue', 0.6, 710, 'Private room', 'Jan 1', 'Apr 30', 4, 'Winter sublet in a friendly 4-person house.'],
    ['Ezra Avenue area', 0.3, 650, 'Shared room', 'May 1', 'Aug 31', 4, 'Summer shared room, utilities and Wi-Fi included.'],
    ['Albert Street', 0.8, 1200, 'Studio', 'Sep 1', 'Aug 31', 12, 'Bright studio with private kitchen, walk to Lazaridis Hall.'],
  ],
  events: [
    ['Golden Hawks Homecoming Kickoff', 'Knight-Newbrough Field', 2, '13:00', 350, 290, 'Purple and gold everything. Pre-game music and food trucks.'],
    ['Lazaridis Hall Startup Pitch Night', 'Lazaridis Hall atrium', 5, '18:00', 120, 77, 'Student founders pitch ideas to local mentors.'],
    ['Faculty of Music Lunchtime Recital', 'Maureen Forrester Recital Hall', 7, '12:00', 90, 40, 'Free recital featuring student ensembles.'],
    ['Uptown Waterloo Food Crawl', 'Waterloo Public Square', 9, '17:00', 30, 22, 'Sample student-friendly spots around Uptown with a group.'],
  ],
  posts: [
    ['Academics', 'Anyone in CP164 want to practise linked lists before the quiz? Library group rooms are open Wednesday 💜', 'Computer Science'],
    ['Events', 'Homecoming week is HERE. Golden Hawks, where are we meeting before the game? 🦅', 'Kinesiology', 'event'],
    ['Buy & Sell', 'Selling BU111 textbook + calculator, pickup at the Concourse. $40 obo.', 'Business Administration', 'sale'],
    ['Lost & Found', 'Lost AirPods case (purple cover) near the Dining Hall. Please message me!', 'Music'],
    ['Clubs', 'Laurier Students\' Public Interest Research Group is hosting a volunteer info session Thursday.', 'Communication Studies', 'study'],
    ['General', 'The quad looks amazing with the leaves changing. Peak Laurier season 🍂', 'Psychology', 'campus'],
  ],
  ads: [
    ['Uptown Waterloo Student Café', 'Study spot with free Wi-Fi', 'Students get 15% off all drinks at this Uptown café.', 'View offer', 'coffee', '15% off with student ID'],
    ['Golden Hawk Student Specials', 'Game-day wings deal', 'Half-price wings at a King St. pub on Golden Hawks game nights.', 'See specials', 'food', 'Half-price wings on game days'],
    ['Student Housing Showcase', 'Rooms near King St. North', 'Tour student houses steps from Laurier\'s campus.', 'Learn more', 'housing', 'Free tours this weekend'],
  ],
  localDish: ['Uptown Waterloo Bubble Tea Kit', 'Homemade brown sugar boba kit for two.', ['Vegetarian', 'Gluten-Free'], '🧋'],
};
