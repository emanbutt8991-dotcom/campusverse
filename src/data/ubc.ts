import type { UniversityContent } from './types';

export const ubc: UniversityContent = {
  programs: ['Computer Science', 'Forestry', 'Sauder Commerce', 'Biology', 'Engineering', 'Land & Food Systems', 'Oceanography'],
  rides: [
    ['Whistler Village', 'UBC Nest bus loop', 'Whistler Village gateway', '07:30', 3, 30, 1, 'Ethan Lee'],
    ['Vancouver Airport (YVR)', 'University Boulevard', 'YVR domestic departures', '05:45', 2, 18, 2],
    ['Downtown Vancouver (Waterfront)', 'Koerner Library', 'Waterfront Station', '18:00', 3, 10, 1],
    ['Burnaby (Metrotown)', 'Irving K. Barber Learning Centre', 'Metrotown mall', '16:15', 1, 12, 3],
    ['Seattle (University District)', 'Vancouver Campus — Thunderbird Blvd', 'U-District, Seattle', '08:00', 2, 40, 5],
    ['Horseshoe Bay Ferry Terminal', 'UBC Nest bus loop', 'Horseshoe Bay terminal', '10:30', 0, 15, 4],
  ],
  groups: [
    ['CPSC 110', 'Design Recipe Dojo', 'Practising systematic program design and worked examples for CPSC 110.', 'Monday', '6:00 PM', 'In Person', 'Irving K. Barber Learning Centre, Room 185', 3, 6],
    ['CPSC 121', 'Logic & Proofs Pod', 'Truth tables, circuits and proofs — weekly problem set group.', 'Tuesday', '5:30 PM', 'Online', 'Online (Zoom)', 6, 9],
    ['MATH 100', 'Diff Calc Crew', 'WeBWorK help and midterm practice.', 'Wednesday', '4:00 PM', 'In Person', 'Koerner Library, 3rd floor', 5, 5],
    ['BIOL 112', 'Cell Bio Study Circle', 'Reviewing slides with diagrams and mnemonic battles.', 'Thursday', '3:30 PM', 'In Person', 'UBC Nest, Room 2306', 2, 7],
    ['CPSC 110', 'Rainy Day Racket', 'Online problem lab for when you don\'t want to leave res.', 'Sunday', '7:00 PM', 'Online', 'Online (Discord)', 4, 10],
  ],
  housing: [
    ['Wesbrook Village', 1.2, 1350, 'Private room', 'Sep 1', 'Apr 30', 8, 'Modern 3-bed apartment on campus with views of the forest.'],
    ['Kitsilano', 5.5, 1200, 'Private room', 'Sep 1', 'Aug 31', 12, 'Room in a heritage house, five minutes from Kits Beach. 99 B-Line to campus.'],
    ['Point Grey', 3.2, 1050, 'Shared room', 'Jan 1', 'Apr 30', 4, 'Winter sublet in a basement suite, shared with one student.'],
    ['Dunbar', 4.1, 980, 'Private room', 'May 1', 'Aug 31', 4, 'Summer sublet with garden access. Quiet neighbourhood.'],
    ['Hampton Place', 1.8, 1900, 'Studio', 'Sep 1', 'Aug 31', 12, 'Furnished studio near Pacific Spirit Park.'],
  ],
  events: [
    ['Thunderbirds Soccer Showcase', 'Thunderbird Stadium', 2, '18:00', 400, 260, 'Navy out! Cheer on the T-Birds at their home field.'],
    ['Pacific Spirit Forest Walk', 'Pacific Spirit Park trailhead', 4, '10:00', 25, 15, 'Guided group walk through the old-growth trails beside campus.'],
    ['UBC Farm Harvest Market', 'UBC Farm', 6, '11:00', 200, 132, 'Student-grown produce, cider and music.'],
    ['Koerner Exam Jam', 'Koerner Library', 10, '18:00', 100, 72, 'Group study sessions with free tea and snacks.'],
  ],
  posts: [
    ['Academics', 'CPSC 110 problem set 6 is no joke. Studying at IKB tonight if anyone wants to pair up 🌧️', 'Computer Science'],
    ['Events', 'T-Birds soccer under the lights Friday! Meet at the Nest at 5:30 and we\'ll walk over ⚽', 'Engineering', 'event'],
    ['Buy & Sell', 'Selling a rain jacket (size S) and a pair of hiking boots. Pickup at the Nest.', 'Forestry', 'sale'],
    ['Lost & Found', 'Found a navy UBC umbrella in Buchanan D. Left it with security.', 'Oceanography'],
    ['Clubs', 'UBC Varsity Outdoor Club is running a beginner hiking trip this weekend — gear available to borrow!', 'Biology', 'study'],
    ['General', 'Sunset from Wreck Beach stairs today was unreal. Pacific coast, you win 🌅', 'Sauder Commerce', 'campus'],
  ],
  ads: [
    ['Vancouver Student Meal Specials', '$10 poke bowls', 'A University Village spot offering student poke bowls every weekday.', 'View offer', 'food', '$10 poke bowls weekdays'],
    ['UBC Area Housing Expo', 'Kits, Point Grey & Wesbrook', 'Meet landlords with units along the 99 B-Line corridor.', 'Learn more', 'housing', 'Free entry · raffle'],
    ['Campus Coffee Week', 'Rainy day lattes', 'Bring a reusable cup and get $1 off any drink this week.', 'See details', 'coffee', '$1 off with reusable cup'],
  ],
  localDish: ['Homemade Sushi Rolls', 'Two trays of salmon and avocado rolls, made this afternoon.', ['Gluten-Free'], '🍣'],
};
