import type { UniversityConfig } from '../types/university';
import type { Allergen, Conversation, Dataset, DietTag, Meal, Roommate } from '../types/content';
import { getContent } from './index';
import { createRng } from '../utils/seed';
import { isoDate } from '../utils/format';

/** Fictional name pool — any resemblance to real people is coincidental. */
const NAMES = [
  'Zara Hussain', 'Leo Martins', 'Hana Kim', 'Omar Siddiqui', 'Chloé Bergeron', 'Marcus Grant', 'Ananya Iyer', 'Felix Wagner',
  'Isabella Rossi', 'Kwame Asante', 'Sofia Alvarez', 'Ryan Nakamura', 'Fatima Noor', 'Ben Cohen', 'Mei Lin', 'Tariq Malik',
  'Grace Oyelaran', 'Lucas Dubois', 'Nadia Karim', 'Theo Walsh', 'Amara Eze', 'Julian Park', 'Layla Haddad', 'Owen Fraser',
  'Riya Shah', 'Diego Morales', 'Emma Novak', 'Yusuf Demir', 'Ivy Zhang', 'Malik Johnson',
];
const CARS = ['Toyota Corolla', 'Honda Civic', 'Mazda 3', 'Hyundai Elantra', 'VW Golf', 'Kia Soul', 'Toyota RAV4', 'Honda Fit'];

const DISHES: [string, string, DietTag[], Allergen[], string, number][] = [
  ['Chicken Biryani', 'Fragrant homemade biryani with raita on the side. Made too much for the week!', ['Halal', 'Spicy'], ['Dairy'], '🍛', 32],
  ['Beef Nihari', 'Slow-cooked overnight. Comes with fresh naan.', ['Halal', 'Spicy'], ['Gluten'], '🍲', 18],
  ['Vegetarian Pasta', 'Creamy tomato penne with roasted vegetables.', ['Vegetarian'], ['Gluten', 'Dairy'], '🍝', 8],
  ['Homemade Cookies', 'Chocolate chip cookies, baked this morning.', ['Vegetarian'], ['Gluten', 'Dairy', 'Eggs', 'Nuts'], '🍪', 40],
  ['Pizza Slices', 'Leftover slices from a club meeting — cheese and veggie.', ['Vegetarian'], ['Gluten', 'Dairy'], '🍕', 4],
  ['Chana Masala', 'Chickpea curry with rice, fully vegan.', ['Vegan', 'Halal', 'Gluten-Free'], [], '🥘', 45],
];

export function buildDataset(u: UniversityConfig): Dataset {
  const { content, isSample } = getContent(u);
  const rng = createRng(u.id);
  const names = rng.shuffle(NAMES);
  let n = 0;
  const nextName = () => names[n++ % names.length];
  const program = () => rng.pick(content.programs);
  const campusName = u.isCustom ? `${u.shortName} Campus` : u.name;

  const rides = content.rides.map(([to, pickup, dropoff, time, seats, price, day, driver], i) => ({
    id: `${u.id}-ride-${i + 1}`,
    driver: driver ?? nextName(),
    program: program(),
    from: campusName,
    to,
    pickup,
    dropoff,
    date: isoDate(day),
    time,
    seats,
    price,
    car: rng.pick(CARS),
    notes: seats === 0 ? 'This ride is currently full.' : rng.pick([
      'Room for one carry-on bag each. Music requests welcome!',
      'Non-smoking car. I can make one quick stop on the way.',
      'Leaving on time — please be at the pickup spot 5 minutes early.',
      'Splitting gas evenly. Snacks provided 🍫',
    ]),
  }));

  const groups = content.groups.map(([course, name, description, day, time, format, location, members, max], i) => ({
    id: `${u.id}-group-${i + 1}`,
    course,
    name,
    description,
    day,
    time,
    format,
    location,
    members,
    max,
    organizer: nextName(),
  }));

  const pickups = u.campusLocations;
  const dishes = [...DISHES.slice(0, 5), [content.localDish[0], content.localDish[1], content.localDish[2], [] as Allergen[], content.localDish[3], 200] as (typeof DISHES)[number], DISHES[5]];
  const meals: Meal[] = dishes.map(([dish, description, tags, allergens, emoji, hue], i) => {
    const start = rng.pick([11, 12, 15, 17, 18]);
    return {
      id: `${u.id}-meal-${i + 1}`,
      dish,
      student: nextName(),
      description,
      pickup: pickups[i % pickups.length],
      window: `${i % 3 === 0 ? 'Today' : i % 3 === 1 ? 'Tomorrow' : 'Today'} · ${start > 12 ? start - 12 : start}:00–${start + 2 > 12 ? start + 2 - 12 : start + 2}:00 ${start + 2 >= 12 ? 'PM' : 'AM'}`,
      quantity: rng.int(1, 4),
      tags,
      allergens,
      distanceKm: Math.round((0.2 + (i % 5) * 0.7 + rng.next() * 0.4) * 10) / 10,
      emoji,
      hue,
    };
  });

  const posts = content.posts.map(([category, text, prog, image], i) => ({
    id: `${u.id}-post-${i + 1}`,
    author: nextName(),
    program: prog,
    minutesAgo: [12, 38, 75, 140, 260, 600][i] ?? 30 * i,
    content: text,
    category,
    likes: rng.int(4, 120),
    comments: i < 3 ? [{ id: `${u.id}-c-${i}`, author: nextName(), text: rng.pick(['Count me in!', 'Same here 😅', 'Thanks for sharing!', 'See you there!']) }] : [],
    image,
  }));

  const events = content.events.map(([title, location, day, time, capacity, going, description], i) => ({
    id: `${u.id}-event-${i + 1}`,
    title,
    location,
    date: isoDate(day),
    time,
    capacity,
    going,
    description,
    host: rng.pick(['Student Union', 'Campus Life', 'Student Clubs Network', `${u.shortName} Students`]),
  }));

  const housing = content.housing.map(([neighbourhood, km, rent, roomType, leaseStart, leaseEnd, months, description], i) => ({
    id: `${u.id}-home-${i + 1}`,
    rent,
    neighbourhood,
    distanceKm: km,
    leaseStart,
    leaseEnd,
    leaseMonths: months,
    roomType,
    description,
    lister: nextName(),
    amenities: rng.shuffle(['Wi-Fi included', 'In-house laundry', 'Furnished', 'Utilities included', 'Bike storage', 'Near bus stop', 'Backyard', 'Dishwasher']).slice(0, 4),
    hue: (i * 47 + rng.int(0, 30)) % 360,
  }));

  const ads = content.ads.map(([brand, headline, description, cta, kind, offer], i) => ({
    id: `${u.id}-ad-${i + 1}`,
    brand,
    headline,
    description,
    cta,
    kind,
    offer,
  }));

  const conversations: Conversation[] = [
    {
      id: `${u.id}-conv-1`,
      with: housing[0].lister,
      program: program(),
      topic: `Housing · ${housing[0].neighbourhood}`,
      messages: [
        { id: 'm1', from: 'them', text: `Hi Alex! Thanks for your interest in the room near ${housing[0].neighbourhood}.`, time: '10:12 AM' },
        { id: 'm2', from: 'me', text: 'Hi! Is it still available for September?', time: '10:15 AM' },
        { id: 'm3', from: 'them', text: 'Yes it is! Happy to set up a (simulated) viewing whenever works for you.', time: '10:18 AM' },
      ],
    },
    {
      id: `${u.id}-conv-2`,
      with: groups[0].organizer,
      program: program(),
      topic: `Study · ${groups[0].course}`,
      messages: [
        { id: 'm1', from: 'them', text: `Hey! Are you in ${groups[0].course} too? We have a few spots in our group.`, time: 'Yesterday' },
        { id: 'm2', from: 'me', text: 'I am! What do you usually cover?', time: 'Yesterday' },
        { id: 'm3', from: 'them', text: 'Past exam questions mostly. Feel free to request to join on VerseStudy 🙂', time: 'Yesterday' },
      ],
      unread: true,
    },
    {
      id: `${u.id}-conv-3`,
      with: rides[1].driver,
      program: rides[1].program,
      topic: `Ride · ${rides[1].to}`,
      messages: [
        { id: 'm1', from: 'me', text: 'Hi! Is there room for a small suitcase on your ride?', time: 'Mon' },
        { id: 'm2', from: 'them', text: 'For sure, the trunk has lots of space.', time: 'Mon' },
      ],
    },
  ];

  const roommates: Roommate[] = [
    { id: `${u.id}-rm-1`, name: nextName(), program: program(), budget: 800, sleep: 'Early bird', cleanliness: 'Very tidy', noise: 'Quiet', bio: 'Morning gym person, loves cooking on Sundays.' },
    { id: `${u.id}-rm-2`, name: nextName(), program: program(), budget: 700, sleep: 'Night owl', cleanliness: 'Tidy', noise: 'Moderate', bio: 'Gamer and late-night coder. Respectful of quiet hours.' },
    { id: `${u.id}-rm-3`, name: nextName(), program: program(), budget: 950, sleep: 'Flexible', cleanliness: 'Tidy', noise: 'Quiet', bio: 'Grad-school bound, mostly studying. Plant parent 🌿' },
    { id: `${u.id}-rm-4`, name: nextName(), program: program(), budget: 650, sleep: 'Night owl', cleanliness: 'Relaxed', noise: 'Lively', bio: 'Loves hosting game nights and trying new recipes.' },
    { id: `${u.id}-rm-5`, name: nextName(), program: program(), budget: 850, sleep: 'Early bird', cleanliness: 'Tidy', noise: 'Moderate', bio: 'Varsity athlete, early practices, chill otherwise.' },
  ];

  return { rides, groups, meals, posts, events, housing, ads, conversations, roommates, isSample };
}
