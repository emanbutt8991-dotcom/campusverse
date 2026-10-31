import type { UniversityContent } from './types';

export const waterloo: UniversityContent = {
  programs: ['Computer Science', 'Software Engineering', 'Mechatronics Engineering', 'Mathematics', 'Systems Design', 'Accounting & Finance', 'Physics'],
  rides: [
    ['Toronto (Union Station)', 'Davis Centre loop', 'Union Station, Bay St. side', '17:00', 3, 18, 1, 'Priya Raman'],
    ['Toronto Pearson Airport', 'Student Life Centre', 'Terminal 1 departures', '06:00', 2, 25, 2],
    ['Hamilton (McMaster)', 'University Ave & Phillip St', 'Main St. West at campus', '14:30', 2, 15, 3],
    ['London (Richmond Row)', 'Dana Porter Library', 'Richmond St. & Dundas', '12:00', 1, 20, 4],
    ['Markham (Pacific Mall)', 'Waterloo GO Station', 'Pacific Mall north lot', '10:15', 3, 20, 2],
    ['Ottawa (Bank St)', 'Student Life Centre', 'Bank St. & Somerset', '08:00', 0, 50, 6],
  ],
  groups: [
    ['CS 135', 'Racket Rescue Squad', 'Working through assignment design recipes and tracing tricky recursion.', 'Monday', '7:00 PM', 'In Person', 'Davis Centre Library, 2nd floor', 3, 6],
    ['CS 136', 'Pointers & Memory', 'C memory models, pointer diagrams and midterm practice.', 'Tuesday', '6:30 PM', 'Online', 'Online (Discord)', 6, 10],
    ['MATH 135', 'Proof Grinders', 'Number theory proofs, one problem at a time.', 'Wednesday', '5:00 PM', 'In Person', 'Dana Porter Library, Room 329', 5, 5],
    ['MATH 137', 'Calc 1 Crunch', 'Assignment work sessions plus past-final practice before exams.', 'Thursday', '4:00 PM', 'In Person', 'Student Life Centre, Great Hall', 2, 8],
    ['CS 135', 'Co-op Interview + Coursework Combo', 'Half coursework, half leetcode-style warmups. Chill vibes.', 'Saturday', '1:00 PM', 'Online', 'Online (Google Meet)', 4, 8],
  ],
  housing: [
    ['University Avenue', 0.5, 780, 'Private room', 'Sep 1', 'Dec 31', 4, 'Fall-term room in a purpose-built student building. Gym and study rooms.'],
    ['Columbia Street', 1.1, 720, 'Private room', 'Jan 1', 'Apr 30', 4, 'Winter co-op sublet in a 5-bedroom townhouse with parking.'],
    ['Lester Street', 0.4, 850, 'Private room', 'Sep 1', 'Aug 31', 12, 'Furnished room with ensuite, closest building to campus on Lester.'],
    ['Northdale', 0.9, 640, 'Shared room', 'May 1', 'Aug 31', 4, 'Summer sublet sharing with one other student. Big kitchen.'],
    ['Uptown Waterloo', 2.6, 1250, 'Studio', 'Sep 1', 'Aug 31', 12, 'Modern studio near the ION LRT and Uptown restaurants.'],
  ],
  events: [
    ['Warriors Hockey Home Opener', 'Columbia Icefield', 2, '19:00', 250, 190, 'Black and gold out! Free foam fingers for the first 100 fans.'],
    ['Co-op Resume Critique Night', 'Davis Centre, DC 1302', 4, '18:00', 80, 66, 'Upper-years review your resume before the next co-op round.'],
    ['Engineering Society BBQ', 'Engineering 7 courtyard', 6, '12:00', 200, 120, 'Burgers, veggie options and lawn games between lectures.'],
    ['Waterloo Hackathon Kickoff', 'Student Life Centre, Great Hall', 11, '17:30', 150, 98, 'Team formation and sponsor talks for this term\'s student hackathon.'],
  ],
  posts: [
    ['Academics', 'CS 136 midterm next week… who wants to draw memory diagrams with me in DC tonight? 🧠', 'Computer Science'],
    ['Events', 'Warriors home opener this Friday! Grabbing a group from V1 to walk over to the Icefield 🏒', 'Mechatronics Engineering', 'event'],
    ['Buy & Sell', 'Selling my graphing calculator and a mechanical keyboard. Pickup at SLC. DM for prices.', 'Mathematics', 'sale'],
    ['Lost & Found', 'Found a black hoodie with a gold W in the Davis Centre library. Handed to the front desk.', 'Software Engineering'],
    ['Clubs', 'UW Formula Electric is hiring for the winter term! Design, software and business roles open.', 'Systems Design', 'study'],
    ['General', 'Geese spotted guarding the path by Dana Porter again 🪿 Stay safe out there.', 'Physics', 'campus'],
  ],
  ads: [
    ['Waterloo Student Coffee Deals', 'Co-op season caffeine', '2-for-1 lattes on University Ave every weekday before 10 AM.', 'View offer', 'coffee', '2-for-1 lattes before 10 AM'],
    ['Student Housing Near Campus', 'Fall 2027 units now listed', 'Tour furnished rooms on Lester, Columbia and University Ave.', 'Book a tour', 'housing', 'No application fee'],
    ['Exam Week Snack Specials', 'Fuel for finals', 'Discounted snack boxes delivered to residence during exam season.', 'Order now', 'food', '20% off snack boxes'],
  ],
  localDish: ['Engineering Late-Night Ramen', 'Big pot of homemade miso ramen, extra noodles available.', ['Vegetarian'], '🍜'],
};
