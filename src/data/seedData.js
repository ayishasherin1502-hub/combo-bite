export const INITIAL_FOODS = [
  {
    id: "puttu",
    name: "Puttu",
    category: "Breakfast",
    isKeralaSpecial: true,
    image: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Puttu_-_Kerala_food.jpg&w=800&q=80",
    description: "Steamed cylinders of ground rice layered with fresh grated coconut."
  },
  {
    id: "porotta",
    name: "Malabar Porotta",
    category: "Bread",
    isKeralaSpecial: true,
    image: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Parotta_Beef-a_local_restaurant-Kerala.jpg&w=800&q=80",
    description: "Flaky, multi-layered golden flatbread made with kneaded dough."
  },
  {
    id: "pazham_pori",
    name: "Pazham Pori",
    category: "Snacks",
    isKeralaSpecial: true,
    image: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Pazham_Pori.jpg&w=800&q=80",
    description: "Crisp, golden batter-fried ripe Nendran banana fritters."
  },
  {
    id: "kappa",
    name: "Kappa (Tapioca)",
    category: "Rice & Grains",
    isKeralaSpecial: true,
    image: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/KAPPA_AND_MEEN_CURRY.jpg&w=800&q=80",
    description: "Mashed, seasoned boiled tapioca infused with turmeric, green chillies & curry leaves."
  },
  {
    id: "biriyani",
    name: "Thalassery Biriyani",
    category: "Rice & Grains",
    isKeralaSpecial: true,
    image: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Kerala_Chicken_biryani.jpg&w=800&q=80",
    description: "Fragrant short-grain Kaima rice dum biriyani infused with Malabar spices and fried shallots."
  },
  {
    id: "pizza",
    name: "Cheese Pizza",
    category: "Snacks",
    isKeralaSpecial: false,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    description: "Oven-baked flat dough crust topped with rich tomato sauce and bubbling cheese."
  }
];

export const INITIAL_COMBINATIONS = [
  {
    id: "puttu-kadala",
    title: "Puttu + Kadala Curry",
    mainFoodId: "puttu",
    mainFoodName: "Puttu",
    comboFoodName: "Kadala Curry",
    category: "Breakfast",
    imageUrl: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Puttu_and_Kadala_Curry.jpg&w=1000&q=80",
    description: "The undisputed emperor of Kerala breakfasts. Earthy black chickpeas roasted in coconut and mustard seeds poured over hot steamed puttu.",
    whyLike: "Nothing on earth compares to crushing the steaming cylinder with roasted coconut chickpea gravy at 8:00 AM on Sunday.",
    weirdnessScore: 1,
    ratingAvg: 4.85,
    ratingCount: 482,
    reactions: { amazing: 390, good: 75, okay: 12, weird: 3, cursed: 2 },
    votesNormal: 472,
    votesCursed: 10,
    isKeralaSpecial: true,
    featured: true,
    trending: true,
    createdBy: "Rahul K.",
    createdAt: "2026-02-15T08:30:00Z",
    tags: ["Legendary", "Soul Food", "Breakfast"]
  },
  {
    id: "porotta-beef-fry",
    title: "Malabar Porotta + Beef Fry 👑",
    mainFoodId: "porotta",
    mainFoodName: "Malabar Porotta",
    comboFoodName: "Beef Dry Fry (BDF)",
    category: "Meat",
    imageUrl: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Parotta_Beef-a_local_restaurant-Kerala.jpg&w=1000&q=80",
    description: "The undisputed cultural ambassador of Kerala street gastronomy. Crushed flaky hot porotta torn and wrapped around peppery fried beef with fried curry leaves.",
    whyLike: "Not just food; it's an emotion, a religion, and the answer to every life dilemma.",
    weirdnessScore: 1,
    ratingAvg: 4.96,
    ratingCount: 940,
    reactions: { amazing: 890, good: 42, okay: 5, weird: 2, cursed: 1 },
    votesNormal: 935,
    votesCursed: 5,
    isKeralaSpecial: true,
    featured: true,
    trending: true,
    createdBy: "Fahad Faasil Fan",
    createdAt: "2026-02-24T19:00:00Z",
    tags: ["Emotion", "Street Food", "GOAT"]
  },
  {
    id: "pazham-pori-beef",
    title: "Pazham Pori + Beef Curry 🍌🥩",
    mainFoodId: "pazham_pori",
    mainFoodName: "Pazham Pori",
    comboFoodName: "Fiery Beef Curry",
    category: "Kerala Specials",
    imageUrl: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Pazham_pori_with_beef_roast.jpg&w=1000&q=80",
    description: "The Kottayam phenomenon that united sweet and savory extremists. Crunchy sweet caramelized banana fritter dunked into fiery, peppery beef gravy.",
    whyLike: "People thought we lost our minds until they took their first bite. The sweet-savoury contrast hits like lightning.",
    weirdnessScore: 3,
    ratingAvg: 4.65,
    ratingCount: 610,
    reactions: { amazing: 470, good: 95, okay: 25, weird: 15, cursed: 5 },
    votesNormal: 480,
    votesCursed: 130,
    isKeralaSpecial: true,
    featured: true,
    trending: true,
    createdBy: "Tony K. Chacko",
    createdAt: "2026-02-22T16:30:00Z",
    tags: ["Cult Classic", "Sweet & Savory", "Kottayam Pride"]
  },
  {
    id: "kappa-meen-curry",
    title: "Kappa + Meen Curry 🐟",
    mainFoodId: "kappa",
    mainFoodName: "Kappa (Tapioca)",
    comboFoodName: "Kudampuli Red Fish Curry",
    category: "Seafood",
    imageUrl: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/KAPPA_AND_MEEN_CURRY.jpg&w=1000&q=80",
    description: "Steamed, seasoned tapioca mashed with green chillies and coconut, flooded with sour, fiery crimson fish curry infused with smoky Malabar tamarind.",
    whyLike: "The toddy shop experience on a plate. The tang of the fish curry cutting through the rich starchy kappa is unmatched.",
    weirdnessScore: 1,
    ratingAvg: 4.88,
    ratingCount: 540,
    reactions: { amazing: 480, good: 48, okay: 8, weird: 3, cursed: 1 },
    votesNormal: 532,
    votesCursed: 8,
    isKeralaSpecial: true,
    featured: true,
    trending: false,
    createdBy: "Mathew Alex",
    createdAt: "2026-02-25T13:40:00Z",
    tags: ["Toddy Shop", "Spicy", "Seafood"]
  },
  {
    id: "biriyani-ketchup",
    title: "Dum Biriyani + Tomato Ketchup 💀",
    mainFoodId: "biriyani",
    mainFoodName: "Thalassery Biriyani",
    comboFoodName: "Tomato Ketchup",
    category: "Cursed Combos",
    imageUrl: "https://images.weserv.nl/?url=commons.wikimedia.org/wiki/Special:FilePath/Kerala_Chicken_biryani.jpg&w=1000&q=80",
    description: "Squeezing sweet processed red tomato ketchup all over fragrant, slow-cooked Kaima dum biriyani instead of raita.",
    whyLike: "My hostel warden only served dry biriyani and the ketchup bottle was right there. I have sinned, but I cannot stop.",
    weirdnessScore: 5,
    ratingAvg: 1.68,
    ratingCount: 890,
    reactions: { amazing: 20, good: 30, okay: 60, weird: 210, cursed: 570 },
    votesNormal: 65,
    votesCursed: 825,
    isKeralaSpecial: false,
    featured: true,
    trending: true,
    createdBy: "Anonymous Sinner",
    createdAt: "2026-03-06T11:00:00Z",
    tags: ["Straight To Jail", "Culinary Crime", "Extremely Cursed"]
  },
  {
    id: "pizza-gulab-jamun",
    title: "Cheese Pizza + Gulab Jamun 💀",
    mainFoodId: "pizza",
    mainFoodName: "Cheese Pizza",
    comboFoodName: "Warm Gulab Jamun",
    category: "Cursed Combos",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    description: "Placing warm, rosewater sugar-syrup dripping gulab jamuns on a slice of hot oregano-crusted pepperoni cheese pizza.",
    whyLike: "We wanted dessert and dinner at the exact same second. We created an abomination that haunts our family tree.",
    weirdnessScore: 5,
    ratingAvg: 1.42,
    ratingCount: 760,
    reactions: { amazing: 15, good: 22, okay: 43, weird: 180, cursed: 500 },
    votesNormal: 40,
    votesCursed: 720,
    isKeralaSpecial: false,
    featured: true,
    trending: true,
    createdBy: "Mad Scientist Chef",
    createdAt: "2026-03-08T22:15:00Z",
    tags: ["Call The Police", "Madness", "Cursed"]
  }
];

export const INITIAL_COMMENTS = {
  "puttu-kadala": [
    {
      id: "c1",
      userName: "Suresh Pillai",
      userAvatar: "👨‍🍳",
      content: "This is not just food; this is cultural heritage. The gravy must be dark and infused with roasted coconut paste.",
      createdAt: "2 days ago",
      likes: 48
    },
    {
      id: "c2",
      userName: "Parvathy M.",
      userAvatar: "👩‍🌾",
      content: "Add a pinch of sugar on the side for the ultimate contrast. 10/10 every single time.",
      createdAt: "1 day ago",
      likes: 24
    }
  ],
  "pazham-pori-beef": [
    {
      id: "c3",
      userName: "Rinshad Kottayam",
      userAvatar: "🚀",
      content: "People from other states mocked us for 5 years, now they visit Kottayam just for this. Absolute masterpiece.",
      createdAt: "3 days ago",
      likes: 62
    }
  ],
  "biriyani-ketchup": [
    {
      id: "c7",
      userName: "Kerala Police Cybercell",
      userAvatar: "👮",
      content: "Please stay right where you are. A team has been dispatched to your location.",
      createdAt: "1 day ago",
      likes: 154
    },
    {
      id: "c8",
      userName: "GuiltyEater",
      userAvatar: "🙈",
      content: "I do this when nobody is looking. The shame is real, but the tanginess slaps.",
      createdAt: "10 hours ago",
      likes: 7
    }
  ]
};

export const INITIAL_USERS = [
  {
    id: "user-1",
    name: "Rahul Kumar",
    handle: "@rahulkerala",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "Kerala Food Purist",
    combosAdded: 4,
    combosRated: 18,
    favorites: ["puttu-kadala", "porotta-beef-fry", "pazham-pori-beef"],
    badges: ["combo_hunter", "food_explorer"]
  },
  {
    id: "user-2",
    name: "Maya Shenoy",
    handle: "@mayabites",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    role: "Culinary Adventurer",
    combosAdded: 6,
    combosRated: 26,
    favorites: ["pazham-pori-beef", "kappa-meen-curry"],
    badges: ["combo_hunter", "food_explorer", "cursed_scientist"]
  },
  {
    id: "user-3",
    name: "Appu The Sinner",
    handle: "@appu_chaos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "Certified Cursed Food Scientist 💀",
    combosAdded: 7,
    combosRated: 35,
    favorites: ["biriyani-ketchup", "pizza-gulab-jamun"],
    badges: ["combo_hunter", "cursed_scientist", "no_fear"]
  }
];

export const BADGE_DEFINITIONS = {
  combo_hunter: {
    id: "combo_hunter",
    name: "Combo Hunter",
    emoji: "🏆",
    description: "Rated 10 or more food combinations"
  },
  food_explorer: {
    id: "food_explorer",
    name: "Food Explorer",
    emoji: "🔥",
    description: "Explored and interacted with 25+ food combinations"
  },
  cursed_scientist: {
    id: "cursed_scientist",
    name: "Cursed Food Scientist",
    emoji: "💀",
    description: "Submitted or favored 3+ cursed food combinations"
  },
  combo_master: {
    id: "combo_master",
    name: "Combo Master",
    emoji: "👑",
    description: "Submitted a combination with an average rating above 4.5"
  },
  no_fear: {
    id: "no_fear",
    name: "No Fear",
    emoji: "🤯",
    description: "Rated 5 or more combinations with a weirdness score above 4"
  }
};

export const CATEGORIES = [
  { id: "all", name: "All Combos", icon: "✨" },
  { id: "kerala", name: "Kerala Specials", icon: "🌴" },
  { id: "breakfast", name: "Breakfast", icon: "🥞" },
  { id: "meat", name: "Meat & Poultry", icon: "🥩" },
  { id: "seafood", name: "Seafood", icon: "🐟" },
  { id: "rice", name: "Rice & Grains", icon: "🍚" },
  { id: "snacks", name: "Snacks & Tea", icon: "🍟" },
  { id: "desserts", name: "Desserts & Sweet", icon: "🍰" },
  { id: "cursed", name: "Cursed Vault 💀", icon: "💀" }
];
