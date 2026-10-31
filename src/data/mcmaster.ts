import type { UniversityContent } from './types';

export const mcmaster: UniversityContent = {
  programs: ['Software Engineering Tech', 'Health Sciences', 'Commerce', 'Life Sciences', 'Computer Science', 'Kinesiology', 'Engineering I'],
  rides: [
    ['Toronto (Union Station)', 'McMaster University Student Centre', 'Union Station, Front St. entrance', '16:30', 3, 15, 1, 'Sarah Ahmed'],
    ['Toronto Pearson Airport', 'Main Street West at Forsyth Ave', 'Terminal 1 departures', '06:45', 2, 25, 2],
    ['Waterloo (University Ave)', 'Thode Library loop', 'University Ave & Phillip St', '13:15', 1, 18, 3],
    ['Mississauga (Square One)', 'Westdale village', 'Square One bus terminal', '18:00', 2, 12, 2],
    ['Toronto (Yorkdale)', 'Hamilton GO Centre', 'Yorkdale Mall, north lot', '09:30', 3, 16, 4],
    ['Niagara Falls', 'McMaster University Student Centre', 'Clifton Hill area', '11:00', 0, 14, 5],
  ],
  groups: [
    ['SFWRTECH 3RQ3', 'Exam Prep Crew', 'Working through past requirements-spec questions and quizzing each other before the exam. Bring your notes!', 'Monday', '6:00 PM', 'In Person', 'Mills Memorial Library', 4, 6],
    ['SFWRTECH 3RQ3', 'Weekly Problem Sets', 'We split up the weekly problem set, then regroup on a call to compare use cases and requirement tables.', 'Wednesday', '3:30 PM', 'Online', 'Online (Teams call)', 5, 8],
    ['SFWRTECH 3RQ3', 'Midterm Review', 'Relaxed review of task hierarchies, usability requirements and prototyping. All levels welcome.', 'Thursday', '7:00 PM', 'In Person', 'Campus Commons', 2, 5],
    ['COMPSCI 1MD3', 'Python Practice Pod', 'Weekly coding drills and lab walkthroughs for 1MD3.', 'Tuesday', '5:00 PM', 'In Person', 'Thode Library, Room 107', 3, 6],
    ['BIOLOGY 1A03', 'Bio Flashcard Club', 'Quizlet battles and diagram drills before each test.', 'Friday', '2:00 PM', 'Online', 'Online (Discord)', 8, 8],
    ['MATH 1ZA3', 'Calc Survivors', 'Working through assignment problems together — no judgement, just limits and derivatives.', 'Sunday', '4:00 PM', 'In Person', 'McMaster University Student Centre', 4, 7],
  ],
  housing: [
    ['Westdale', 1.2, 750, 'Private room', 'Sep 1', 'Apr 30', 8, 'Bright room in a 4-bedroom house with a big backyard. Walk to campus through the village.'],
    ['Ainslie Wood', 0.8, 680, 'Private room', 'Sep 1', 'Aug 31', 12, 'Quiet student house on a residential street. Shared kitchen and two bathrooms.'],
    ['Downtown Hamilton', 3.5, 820, 'Private room', 'Jan 1', 'Apr 30', 4, 'Winter-term sublet near James St. North with quick bus access along Main St.'],
    ['Main Street West', 1.6, 595, 'Shared room', 'May 1', 'Aug 31', 4, 'Summer sublet sharing with one other student. Utilities included.'],
    ['Kirkendall', 2.4, 1150, 'Studio', 'Sep 1', 'Aug 31', 12, 'Self-contained basement studio with private entrance near Locke St.'],
    ['Westdale', 1.0, 905, 'Private room', 'Sep 1', 'Apr 30', 8, 'Renovated room with ensuite bathroom, steps from Westdale cafés.'],
  ],
  events: [
    ['Marauders Homecoming Tailgate', 'Ron Joyce Stadium lot', 2, '12:00', 300, 248, 'Maroon face paint, snacks and school spirit before the big game.'],
    ['Nihari Night at MUSC', 'McMaster University Student Centre', 4, '18:30', 60, 52, 'The Pakistani Students Association hosts a community dinner. Bring a friend!'],
    ['Cootes Paradise Sunrise Hike', 'Cootes Paradise trailhead', 6, '07:00', 25, 14, 'A relaxed group hike through the trails behind campus. Coffee after.'],
    ['Hack the Hammer Info Night', 'Thode Library Makerspace', 9, '17:00', 80, 41, 'Learn about the upcoming student hackathon and form teams.'],
  ],
  posts: [
    ['Academics', 'Anyone have tips for the SFWRTECH 3RQ3 usability requirements section? Trying to make mine actually measurable 📏', 'Software Engineering Tech'],
    ['Events', 'Homecoming this weekend!! Who is going to the tailgate? Looking for people to walk over with from Westdale 🏈', 'Kinesiology', 'event'],
    ['Lost & Found', 'Found a maroon water bottle with a Marauders sticker on the 2nd floor of Mills. Left it at the front desk.', 'Health Sciences'],
    ['Buy & Sell', 'Selling my BIOLOGY 1A03 textbook + lab coat, both barely used. $45 for both, pickup at MUSC.', 'Life Sciences', 'sale'],
    ['Clubs', 'McMaster Robotics is recruiting first-years! No experience needed — come to our open lab on Thursday.', 'Engineering I', 'study'],
    ['General', 'The leaves by University Hall right now are unreal 🍁 Fall at Mac hits different.', 'Commerce', 'campus'],
  ],
  ads: [
    ['Westdale Student Café', 'Flat whites, flat prices', 'Show your student card for $2 drip coffee all week at this cozy village café.', 'View offer', 'coffee', '$2 drip coffee with student ID'],
    ['Hamilton Student Housing Expo', 'Find your 2027 lease early', 'Meet local landlords and compare student rentals near Westdale and Ainslie Wood.', 'Learn more', 'housing', 'Free entry · door prizes'],
    ['Campus Textbook Deals', 'Up to 40% off used textbooks', 'Buy and sell course textbooks with other Hamilton students.', 'Browse deals', 'books', 'Extra 10% off first order'],
  ],
  localDish: ['Hamilton-style Shawarma Wraps', 'Two extra chicken shawarma wraps from a Main St. spot — still warm.', ['Halal', 'Spicy'], '🌯'],
};
