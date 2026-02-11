export type Category =
  | "Appetizers"
  | "Soups"
  | "Vegetarian"
  | "Chicken"
  | "Lamb & Seafood"
  | "Tandoor"
  | "Biryani"
  | "Breads"
  | "Accompaniments"
  | "Salads"
  | "Desserts"
  | "Beverages"
  | "Beers";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // public path
  category: Category;
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
};

export const categories: { key: Category; label: string }[] = [
  { key: "Appetizers", label: "Appetizers" },
  { key: "Vegetarian", label: "Vegetarian" },
  { key: "Chicken", label: "Chicken" },
  { key: "Breads", label: "Breads" },
  { key: "Lamb & Seafood", label: "Lamb & Seafood" },
  { key: "Tandoor", label: "Tandoor" },
  { key: "Biryani", label: "Biryani" },
  { key: "Desserts", label: "Desserts" },
  { key: "Beverages", label: "Beverages" },
  { key: "Accompaniments", label: "Accompaniments" },
  { key: "Salads", label: "Salads" },
  { key: "Beers", label: "Beers" },
];

export const menu: MenuItem[] = [
  // Appetizers (from menu PDF page 2)
  {
    id: "samosa",
    name: "Samosa",
    description: "Indian pastries stuffed with potatoes and peas.",
    price: 7.49,
    image: "/images/appetizers/samosa.png",
    category: "Appetizers",
    vegetarian: true,
    popular: true,
  },
  {
    id: "gobi-manchuria",
    name: "Gobi Manchuria",
    description: "Cauliflower fried with tempura batter cooked in Manchurian sauce.",
    price: 11.99,
    image: "/images/appetizers/appetizer-gobi-manchuria.png",
    category: "Appetizers",
    vegetarian: true,
  },
  {
    id: "chicken-65",
    name: "Chicken 65",
    description: "South Indian spicy signature dish recreated by the Chef.",
    price: 11.99,
    image: "/images/appetizers/appetizer-chicken-65.png",
    category: "Appetizers",
    spicy: true,
    popular: true,
  },
  {
    id: "paneer-pakora",
    name: "Paneer Pakora",
    description: "Homemade semi-soft cottage cheese cubes dipped in chickpea batter & deep fried.",
    price: 10.99,
    image: "/images/appetizers/appetizer-paneer-pakora.png",
    category: "Appetizers",
    vegetarian: true,
  },
  {
    id: "fish-pakora",
    name: "Fish Pakora",
    description: "Boneless fish marinated in yogurt & lemon juice, dipped in chickpea batter & deep fried.",
    price: 10.99,
    image: "/images/appetizers/appetizer-fish-pakora.png",
    category: "Appetizers",
  },

  // Soups (page 2)
  {
    id: "dal-soup",
    name: "Dal Soup",
    description: "Delicious lentil soup.",
    price: 4.49,
    image: "/images/menu-appetizers.png",
    category: "Soups",
    vegetarian: true,
  },
  {
    id: "tomato-soup",
    name: "Tomato Soup",
    description: "Classic tomato soup.",
    price: 4.49,
    image: "/images/menu-appetizers.png",
    category: "Soups",
    vegetarian: true,
  },

  // Vegetarian Specials (page 3)
  { id: "aloo-gobi", name: "Aloo Gobi", description: "Potatoes and cauliflower cooked with turmeric, cumin seeds and Indian spices.", price: 13.99, image: "/images/vegetarian_images/veg01.png", category: "Vegetarian", vegetarian: true },
  { id: "channa-masala", name: "Channa Masala", description: "Chickpeas, tomato, potatoes, onions with traditional Indian spices.", price: 13.99, image: "/images/vegetarian_images/veg02.png", category: "Vegetarian", vegetarian: true, popular: true },
  { id: "vegetable-chettinadu", name: "Vegetable Chettinadu", description: "Vegetables cooked in South Indian spicy sauce.", price: 13.99, image: "/images/vegetarian_images/veg03.png", category: "Vegetarian", vegetarian: true, spicy: true },
  { id: "tomato-dal", name: "Tomato Dal", description: "Lentils cooked with tomatoes and tempered with tadka.", price: 13.99, image: "/images/vegetarian_images/veg04.png", category: "Vegetarian", vegetarian: true },
  { id: "vegetable-jalfreizi", name: "Vegetable Jalfreizi", description: "Marinated vegetables cooked with bell peppers and tomatoes.", price: 13.99, image: "/images/vegetarian_images/veg05.png", category: "Vegetarian", vegetarian: true },
  { id: "bhindi-fry", name: "Bhindi Fry", description: "Okra stir-fried with onions in special herbs.", price: 13.99, image: "/images/vegetarian_images/veg06.png", category: "Vegetarian", vegetarian: true },
  { id: "aloo-mutter", name: "Aloo Mutter", description: "Potatoes and peas in tangy tomato cream sauce.", price: 14.99, image: "/images/vegetarian_images/veg07.png", category: "Vegetarian", vegetarian: true },
  { id: "mutter-paneer", name: "Mutter Paneer", description: "Green peas and cottage cheese in tangy tomato cream sauce.", price: 14.99, image: "/images/vegetarian_images/veg08.png", category: "Vegetarian", vegetarian: true, popular: true },
  { id: "sabzi-saag-malai", name: "Sabzi Saag Malai", description: "Mixed vegetables in silky spinach gravy.", price: 14.99, image: "/images/vegetarian_images/veg09.png", category: "Vegetarian", vegetarian: true },
  { id: "aloo-palak", name: "Aloo Palak", description: "Potatoes and spinach cooked with special spices.", price: 14.99, image: "/images/vegetarian_images/veg10.png", category: "Vegetarian", vegetarian: true },
  { id: "palak-paneer", name: "Palak Paneer", description: "Spinach and cottage cheese cooked with special spices.", price: 14.99, image: "/images/vegetarian_images/veg11.png", category: "Vegetarian", vegetarian: true },
  { id: "vegetable-khorma", name: "Vegetable Khorma", description: "Vegetables cooked in rich cashew nut gravy.", price: 14.99, image: "/images/vegetarian_images/veg12.png", category: "Vegetarian", vegetarian: true },
  { id: "paneer-tikka-masala", name: "Paneer Tikka Masala", description: "Cottage cheese cubes, onions, bell peppers in tomato gravy.", price: 14.99, image:"/images/vegetarian_images/veg13.png" , category:"Vegetarian" , vegetarian:true , popular:true},
  { id:"malai-kofta" , name:"Malai Kofta" , description:"Veg cheese ball dumplings in a special sauce." , price : 14.99 , image:"/images/vegetarian_images/veg14.png" , category:"Vegetarian" , vegetarian:true },

  // Chicken Entrees (page 4)
  { id: "chicken-curry", name: "Chicken Curry", description: "Prepared in rich, aromatic traditional Indian curry sauce.", price: 13.99, image: "/images/chicken_images/chk01.png", category: "Chicken" },
  { id: "chicken-vindaloo", name: "Chicken Vindaloo", description: "Chicken in tangy sauce and potatoes.", price: 13.99, image: "/images/chicken_images/chk02.png", category: "Chicken", spicy: true },
  { id: "chicken-chettinadu", name: "Chicken Chettinadu", description: "Chicken cooked in South Indian spicy sauce.", price: 13.99, image: "/images/chicken_images/chk03.png", category: "Chicken", spicy: true },
  { id: "ginger-chicken", name: "Ginger Chicken", description: "Cubes of chicken in spicy ginger sauce.", price: 13.99, image: "/images/chicken_images/chk04.png", category: "Chicken", spicy: true },
  { id: "karahi-chicken", name: "Karahi Chicken", description: "Chicken cooked with onions, peppers and tomatoes in gravy.", price: 13.99, image: "/images/chicken_images/chk05.png", category: "Chicken" },
  { id: "chicken-jalfreizi", name: "Chicken Jalfreizi", description: "Marinated chicken cooked with bell peppers and tomatoes.", price: 13.99, image: "/images/chicken_images/chk06.png", category: "Chicken" },
  { id: "chilli-chicken", name: "Chilli Chicken", description: "Marinated spicy chicken cooked in spicy Indo-Chinese sauce.", price: 14.99, image: "/images/chicken_images/chk07.png", category: "Chicken", spicy: true },
  { id: "saag-chicken", name: "Saag Chicken", description: "Boneless chicken cooked in creamy spinach sauce.", price: 14.99, image: "/images/chicken_images/chk08.png", category: "Chicken" },
  { id: "methi-chicken", name: "Methi Chicken", description: "Tender chicken cooked with fenugreek leaves.", price: 14.99, image: "/images/chicken_images/chk09.png", category: "Chicken" },
  { id: "chicken-tikka-masala", name: "Chicken Tikka Masala", description: "Grilled chicken breast cooked in rich creamy cashew-tomato sauce.", price: 14.99, image: "/images/chicken_images/chk10.png", category: "Chicken", popular: true },
  { id: "butter-chicken", name: "Butter Chicken", description: "Chicken in silky creamy tomato gravy.", price: 14.99, image: "/images/chicken_images/chk11.png", category: "Chicken", popular: true },
  { id: "chicken-korma", name: "Chicken Korma", description: "Chicken cooked in rich mild cashew sauce.", price: 14.99, image:"/images/chicken_images/chk12.png" , category:"Chicken" },

  // Lamb & Seafood (page 5)
  { id: "lamb-curry", name: "Lamb Curry", description: "Lamb cooked in rich, aromatic traditional Indian curry sauce.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood" },
  { id: "lamb-vindaloo", name: "Lamb Vindaloo", description: "Lamb cooked in tangy sauce and potatoes.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood", spicy: true },
  { id: "lamb-roganjosh", name: "Lamb Roganjosh", description: "A British favorite—lamb curry from Kashmir.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood" },
  { id: "lamb-saag", name: "Lamb Saag", description: "Lamb cooked in spinach sauce.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood" },
  { id: "lamb-tikka-masala", name: "Lamb Tikka Masala", description: "Lamb cooked in rich, creamy cashew-tomato sauce.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood" },
  { id: "lamb-khorma", name: "Lamb Khorma", description: "Lamb cooked in rich mild cashew sauce.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood" },

  { id: "fish-curry", name: "Fish Curry", description: "Fish cooked in traditional Indian tangy sauce.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood" },
  { id: "shrimp-vindaloo", name: "Shrimp Vindaloo", description: "Shrimp cooked in tangy sauce along with potatoes.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood", spicy: true },
  { id: "shrimp-malai-curry", name: "Shrimp Malai Curry", description: "Shrimp with enriched creamy sauce.", price: 16.99, image: "/images/placeholder.png", category: "Lamb & Seafood" },

  // Tandoori Specials (page 6)
  { id: "tandoori-chicken", name: "Tandoori Chicken", description: "Marinated diced chicken breast cooked in Indian clay oven and served on sizzler.", price: 17.99, image: "/images/tandoor/tnd01.png", category: "Tandoor", popular: true },
  { id: "boti-kabab", name: "Boti Kabab", description: "Cubes of boneless lamb cooked in Indian clay oven and served on sizzler.", price: 18.99, image: "/images/tandoor/tnd02.png", category: "Tandoor" },
  { id: "tandoori-shrimp", name: "Tandoori Shrimp", description: "Shrimp marinated with Indian spices and cooked in clay oven, served on sizzler.", price: 18.99, image: "/images/tandoor/tnd03.png", category: "Tandoor" },
  { id: "tandoori-mix-grill", name: "Tandoori Mix Grill", description: "Chicken, lamb & shrimp—marinated and cooked in clay oven, served in smoking sizzler.", price: 19.99, image: "/images/tandoor/tnd04.png", category: "Tandoor", popular: true },

  // Breads (page 6)
  { id: "naan", name: "Naan", description: "All-purpose flour bread cooked in tandoor oven.", price: 3.0, image: "/images/breads/brd01.png", category: "Breads", vegetarian: true },
  { id: "roti", name: "Roti", description: "Whole wheat flour bread.", price: 3.5, image: "/images/breads/brd02.png", category: "Breads", vegetarian: true },
  { id: "garlic-naan", name: "Garlic Naan", description: "All-purpose flour bread with garlic topping cooked in tandoor oven.", price: 3.99, image: "/images/breads/brd03.png", category: "Breads", vegetarian: true },
  { id: "onion-kulcha", name: "Onion Kulcha", description: "Naan stuffed with minced onions and spices.", price: 4.49, image: "/images/breads/brd04.png", category: "Breads", vegetarian: true },

  // Rice Specialties (page 7)
  { id: "veg-biryani", name: "Veg Biryani", description: "Long-grained basmati rice cooked with aromatic herbs and vegetables.", price: 13.99, image: "/images/biryani/bry01.png", category: "Biryani", vegetarian: true },
  { id: "veg-fried-rice", name: "Veg Fried Rice", description: "Long-grained basmati rice cooked with vegetables in Indo-Chinese style.", price: 13.99, image: "/images/biryani/bry02.png", category: "Biryani", vegetarian: true },
  { id: "chicken-biryani", name: "Chicken Biryani", description: "Long-grained basmati rice cooked with aromatic herbs and chicken.", price: 14.99, image: "/images/biryani/bry03.png", category: "Biryani", popular: true },
  { id: "lamb-biryani", name: "Lamb Biryani", description: "Long-grained basmati rice cooked with aromatic herbs and lamb.", price: 15.99, image: "/images/biryani/bry04.png", category: "Biryani" },
  { id: "shrimp-biryani", name: "Shrimp Biryani", description: "Long-grained basmati rice cooked with aromatic herbs and shrimp.", price: 15.99, image: "/images/biryani/bry05.png", category: "Biryani" },

  // Accompaniments / Salads / Desserts (page 8)
  { id: "papad", name: "Papad", description: "Crisp thin deep-fried wafers made of rice and lentil flour.", price: 2.99, image: "/images/accompaniments/acc01.png", category: "Accompaniments", vegetarian: true },
  { id: "raitha", name: "Raitha", description: "Homemade yogurt with cucumber, grated carrots and cilantro.", price: 2.99, image: "/images/accompaniments/acc02.png", category: "Accompaniments", vegetarian: true },
  { id: "pickles", name: "Pickles", description: "Chunks of vegetables/lemon/mango marinated in spicy masala.", price: 1.99, image: "/images/accompaniments/acc03.png", category: "Accompaniments", vegetarian: true, spicy: true },
  { id: "rice-steamed", name: "Rice", description: "Steamed basmati rice.", price: 3.99, image: "/images/accompaniments/acc04.png", category: "Accompaniments", vegetarian: true },

  { id: "chickpea-salad", name: "Chick Pea Salad", description: "Chickpeas with onions, cucumber, tomatoes and spices, garnished with cilantro.", price: 4.99, image: "/images/salads/sal01.png", category: "Salads", vegetarian: true },
  { id: "green-salad", name: "Green Salad", description: "Lightly seasoned tomatoes, onions and cucumbers.", price: 4.99, image: "/images/salads/sal02.png", category: "Salads", vegetarian: true },

  { id: "gulab-jamun", name: "Gulab Jamun", description: "Fried cheese ball soaked in sugar syrup.", price: 3.99, image: "/images/desserts/des01.png", category: "Desserts", vegetarian: true, popular: true },
  { id: "rice-kheer", name: "Rice Kheer", description: "Indian style rice pudding.", price: 3.99, image: "/images/desserts/des02.png", category: "Desserts", vegetarian: true },
  { id: "mango-fruit-custard", name: "Mango Fruit Custard", description: "Creamy mango custard with fruit.", price: 3.99, image: "/images/desserts/des03.png", category: "Desserts", vegetarian: true },

  // Beverages & Beers (page 9)
  { id: "lassi", name: "Lassi (Sweet / Salt)", description: "Refreshing yogurt drink, sweetened with rose water or salted with crushed cumin.", price: 5.5, image: "/images/beverages/bev01.png", category: "Beverages", vegetarian: true },
  { id: "mango-lassi", name: "Mango Lassi", description: "Mango yogurt drink.", price: 5.99, image: "/images/beverages/bev02.png", category: "Beverages", vegetarian: true, popular: true },
  { id: "indian-masala-tea", name: "Indian Masala Tea", description: "Hot milk with black tea and spices.", price: 2.99, image:"/images/beverages/bev03.png" , category:"Beverages" , vegetarian:true },
  { id: "soft-drink", name: "Soft Drinks (Coke)", description: "Soft drink.", price: 2.5, image: "/images/beverages/bev04.png", category: "Beverages", vegetarian: true },
  { id: "ice-tea", name: "Ice Tea (Sweet/Unsweet)", description: "Iced tea.", price: 2.99, image: "/images/beverages/bev05.png", category: "Beverages", vegetarian: true },

  { id: "domestic-beers", name: "Domestic Beers", description: "Bud and Bud Light.", price: 4.99, image: "/images/beers/beer01.png", category: "Beers" },
  { id: "imported-beers-12oz", name: "Imported Beers (12 oz)", description: "Imported beer (12 oz).", price: 5.99, image: "/images/beers/beer02.png", category: "Beers" },
  { id: "imported-beers-24oz", name: "Imported Beers (24 oz)", description: "Imported beer (24 oz).", price: 10.99, image: "/images/beers/beer03.png", category: "Beers" },
];

// export const favorites = menu.filter((m) => m.popular).slice(0, 4);

export const favorites = [
  menu.find((m) => m.id === "butter-chicken")!,
  menu.find((m) => m.id === "chicken-biryani")!,
  menu.find((m) => m.id === "samosa")!,
  menu.find((m) => m.id === "gobi-manchuria")!,
];
