import type { UniversityConfig } from '../types/university';
import type { UniversityContent } from './types';

/** Neutral, clearly-sample content for universities that are not in the registry. */
export function buildCustomContent(u: UniversityConfig): UniversityContent {
  const [centre, library, commons, science, downtown, transit] = u.campusLocations;
  const c = u.city;
  return {
    programs: ['Computer Science', 'Business', 'Life Sciences', 'Engineering', 'Psychology', 'Arts', 'Nursing'],
    rides: [
      [`Downtown ${c}`, centre, `Downtown ${c} core`, '16:30', 3, 8, 1, 'Sam Rivera'],
      [`${c} Airport`, library, 'Departures level', '06:30', 2, 20, 2],
      [`${c} Transit Terminal`, commons, transit, '13:00', 2, 6, 2],
      ['Regional Shopping Centre', science, 'Main entrance', '18:15', 1, 7, 3],
      ['Neighbouring City', centre, 'City hall area', '09:00', 3, 18, 4],
      ['Weekend Lake Trip', library, 'Beach parking lot', '10:00', 0, 12, 6],
    ],
    groups: [
      ['CS 101', 'Intro Programming Circle', 'Practising labs and assignments together. Beginners welcome.', 'Monday', '6:00 PM', 'In Person', library, 3, 6],
      ['CS 101', 'Online Code Clinic', 'Weekly online debugging and Q&A.', 'Wednesday', '7:00 PM', 'Online', 'Online (Video call)', 4, 8],
      ['MATH 110', 'Calculus Study Squad', 'Problem sets and past-exam practice.', 'Tuesday', '4:00 PM', 'In Person', commons, 6, 6],
      ['BIO 120', 'Biology Review Group', 'Lecture recap and practice quizzes.', 'Thursday', '3:30 PM', 'In Person', science, 2, 7],
      ['ENG 105', 'Essay Workshop', 'Peer feedback on drafts and citations.', 'Sunday', '2:00 PM', 'Online', 'Online (Video call)', 3, 8],
    ],
    housing: [
      ['Near Campus — North', 0.6, 750, 'Private room', 'Sep 1', 'Apr 30', 8, 'Sample listing: room in a shared student house close to campus.'],
      ['Near Campus — South', 1.1, 690, 'Private room', 'Sep 1', 'Aug 31', 12, 'Sample listing: quiet street, shared kitchen and laundry.'],
      [`Downtown ${c}`, 3.2, 880, 'Private room', 'Jan 1', 'Apr 30', 4, 'Sample listing: winter sublet near downtown transit.'],
      ['Student Village', 0.9, 590, 'Shared room', 'May 1', 'Aug 31', 4, 'Sample listing: summer shared room, utilities included.'],
      ['Riverside', 2.4, 1150, 'Studio', 'Sep 1', 'Aug 31', 12, 'Sample listing: self-contained studio apartment.'],
    ],
    events: [
      ['Campus Welcome Social', centre, 2, '18:00', 150, 92, 'Sample event: meet other students and discover clubs.'],
      ['Group Study Night', library, 4, '19:00', 60, 34, 'Sample event: quiet study with snacks and peer tutors.'],
      [`${c} Food Walk`, downtown, 6, '17:00', 30, 18, `Sample event: explore student-friendly food spots around ${c}.`],
      ['Intramural Sports Fair', commons, 9, '12:00', 200, 75, 'Sample event: sign up for intramural teams.'],
    ],
    posts: [
      ['Academics', 'Anyone want to form a study group for MATH 110 before the midterm? (sample post)', 'Life Sciences'],
      ['Events', `The campus welcome social is this week — who's going? (sample post)`, 'Business', 'event'],
      ['Buy & Sell', 'Selling a lightly used desk chair, pickup near campus. (sample post)', 'Engineering', 'sale'],
      ['Lost & Found', `Found a set of keys in the ${library}. Left them at the front desk. (sample post)`, 'Psychology'],
      ['Clubs', 'Our coding club is recruiting new members — no experience needed! (sample post)', 'Computer Science', 'study'],
      ['General', `Beautiful day on campus in ${c} today ☀️ (sample post)`, 'Arts', 'campus'],
    ],
    ads: [
      [`${c} Student Café`, 'Student coffee special', `Sample ad: a fictional café offering student drink discounts in ${c}.`, 'View offer', 'coffee', '15% off with student ID'],
      [`${c} Student Housing Fair`, 'Find a place near campus', 'Sample ad: compare fictional student rentals near campus.', 'Learn more', 'housing', 'Free entry'],
      [`${c} Textbook Exchange`, 'Save on course books', 'Sample ad: buy and sell used textbooks with other students.', 'Browse deals', 'books', 'Up to 40% off'],
    ],
    localDish: ['Homemade Soup', 'A big pot of vegetable soup, bring a container.', ['Vegan', 'Gluten-Free'], '🍲'],
  };
}
