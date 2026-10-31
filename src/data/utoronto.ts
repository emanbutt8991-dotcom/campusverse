import type { UniversityContent } from './types';

export const utoronto: UniversityContent = {
  programs: ['Computer Science', 'Life Sciences', 'Rotman Commerce', 'Engineering Science', 'Political Science', 'Architecture', 'Psychology'],
  rides: [
    ['Ottawa (Rideau Centre)', "King's College Circle", 'Rideau Centre, Mackenzie King bridge', '15:00', 3, 35, 1, 'Daniel Okafor'],
    ['Toronto Pearson Airport', 'Robarts Library, St. George St.', 'Terminal 3 departures', '05:30', 2, 22, 2],
    ['Waterloo (University Ave)', 'Annex — Bloor & Spadina', 'University Ave & King St', '17:45', 2, 20, 3],
    ['Hamilton (Westdale)', 'University College front lawn', 'Westdale village', '10:00', 1, 15, 2],
    ['Kingston (Princess St)', 'Union Station, York St. side', 'Princess St & Division', '08:15', 3, 30, 5],
    ['Montréal (Berri-UQAM)', 'Bloor & St. George', 'Berri-UQAM station area', '07:00', 0, 45, 6],
  ],
  groups: [
    ['CSC148H1', 'Recursion Roundtable', 'Tracing recursive functions on the whiteboard and prepping for term tests.', 'Tuesday', '6:00 PM', 'In Person', 'Robarts Library, 4th floor', 3, 6],
    ['CSC108H1', 'Python Basics Lab', 'Beginner-friendly practice for 108 exercises and lab prep.', 'Monday', '4:00 PM', 'Online', 'Online (Zoom)', 5, 10],
    ['MAT137Y1', 'Proof Club', 'We tackle problem sets together and practise writing clean epsilon-delta proofs.', 'Wednesday', '7:00 PM', 'In Person', 'Gerstein Library', 6, 6],
    ['BIO120H1', 'Ecology Exam Crew', 'Reviewing lecture slides and practice MCQs before midterms.', 'Thursday', '5:30 PM', 'In Person', 'University College, Junior Common Room', 2, 8],
    ['CSC148H1', 'Linked List Late Nighters', 'Night-owl session for assignment debugging. Cameras optional.', 'Sunday', '9:00 PM', 'Online', 'Online (Discord)', 4, 7],
  ],
  housing: [
    ['The Annex', 0.6, 1250, 'Private room', 'Sep 1', 'Apr 30', 8, 'Room in a Victorian Annex house, walking distance to Robarts.'],
    ['Kensington Market', 1.4, 1100, 'Private room', 'Sep 1', 'Aug 31', 12, 'Third-floor room above a café. Lively neighbourhood, great food.'],
    ['Harbord Village', 0.9, 980, 'Shared room', 'Jan 1', 'Apr 30', 4, 'Winter sublet sharing with a fellow U of T student.'],
    ['Chinatown — Spadina', 1.7, 1050, 'Private room', 'May 1', 'Aug 31', 4, 'Summer sublet steps from the streetcar. Furnished.'],
    ['Little Italy', 2.3, 1650, 'Studio', 'Sep 1', 'Aug 31', 12, 'Compact studio on College St. with in-suite laundry.'],
  ],
  events: [
    ['Varsity Blues Football Night', 'Varsity Stadium', 3, '19:00', 400, 312, 'Wear blue and white and cheer on the Blues under the lights.'],
    ["King's College Circle Fall Fair", "King's College Circle", 5, '12:00', 500, 280, 'Club booths, cider and live music on front campus.'],
    ['Robarts All-Nighter Study Social', 'Robarts Library', 8, '20:00', 60, 47, 'Snacks, quiet floors and accountability buddies for midterm season.'],
    ['Hart House Open Mic', 'Hart House', 10, '19:30', 120, 64, 'Poetry, music and comedy from students across all three campuses.'],
  ],
  posts: [
    ['Academics', 'MAT137 problem set 4 is humbling me. Anyone want to work through it at Gerstein tomorrow?', 'Computer Science'],
    ['Events', "Front campus fall fair is this Saturday — the apple cider stand at King's College Circle is elite 🍎", 'Political Science', 'event'],
    ['Buy & Sell', 'Selling a lightly used desk lamp + monitor stand, pickup in the Annex. $30 for both.', 'Architecture', 'sale'],
    ['Lost & Found', 'Lost a navy U of T scarf somewhere between UC and Sid Smith. Sentimental value, please DM!', 'Psychology'],
    ['Clubs', 'Hart House Debating Club meets Thursdays — beginners very welcome, no prep needed.', 'Rotman Commerce', 'study'],
    ['General', 'University College in the fog this morning looked like a movie set 📸', 'Life Sciences', 'campus'],
  ],
  ads: [
    ['Annex Study Café', 'Study late, sip cheap', 'Free refills on filter coffee for students after 6 PM on Bloor St.', 'View offer', 'coffee', 'Free refills after 6 PM'],
    ['Downtown Toronto Housing Fair', 'Rentals near St. George', 'Compare student-friendly rentals in the Annex, Harbord Village and Kensington.', 'Learn more', 'housing', 'Free entry'],
    ['Spadina Noodle Bar', 'Student lunch combo $9.99', 'Hand-pulled noodles and a drink, two blocks from campus.', 'Get combo', 'food', '$9.99 lunch combo'],
  ],
  localDish: ['Kensington Market Empanadas', 'Half a dozen homemade beef and veggie empanadas.', ['Spicy'], '🥟'],
};
