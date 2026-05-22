"""CBSE curriculum knowledge base for RAG retrieval.
Currently covers Grade 1 (Maths, English, Hindi) from the official TOC.
Add more grades by extending CBSE_KB below.
"""

CBSE_KB = {
    "Grade 1": {
        "Maths": [
            {"ch": 1, "title": "Finding the Furry Cat!",
             "concepts": "Pre-Number Concepts: spatial vocabulary and relational logic like Inside-Outside, Top-Bottom, Near-Far, On-Under positions of objects."},
            {"ch": 2, "title": "What is Long? What is Round?",
             "concepts": "Shapes and Geometry: Understanding 3D spatial dimensions of daily objects, distinguishing straight versus curved items, basic shape identification."},
            {"ch": 3, "title": "Mango Treat",
             "concepts": "Numbers 1 to 9: Foundational counting, matching sets of physical items with numerical characters, number line tracing, recognizing digits."},
            {"ch": 4, "title": "Making 10",
             "concepts": "Numbers 10 to 20: Introducing base-10 system. Grouping single objects into a bundle of ten to learn place values (Tens and Ones)."},
            {"ch": 5, "title": "How Many?",
             "concepts": "Single-Digit Arithmetic: Simple addition and subtraction using real counters, fingers, pictorial storytelling, understanding zero."},
            {"ch": 6, "title": "Vegetable Farm",
             "concepts": "Arithmetic up to 20: Extended addition and subtraction, counting on from a given digit, reading basic visual word problems."},
            {"ch": 7, "title": "Lina's Family",
             "concepts": "Measurement: Introducing informal observation techniques for evaluating relative Lengths, Heights, Weights, and Fluid Capacities."},
            {"ch": 8, "title": "Fun with Numbers",
             "concepts": "Numbers 21 to 99: Expanding place values up to two-digits, counting forward and backward, determining greater-than or less-than."},
            {"ch": 9, "title": "Utsav",
             "concepts": "Patterns: Recognizing, repeating, and extending visual color, shape, and numerical sequences linked to festivals and designs."},
            {"ch": 10, "title": "How do I Spend my Day?",
             "concepts": "Time Chronology: Learning the sequence of routine events (Morning, Afternoon, Evening, Night), identifying days of the week."},
            {"ch": 11, "title": "How Many Times?",
             "concepts": "Early Multiplication: Introducing the foundational logic of multiplication through repetitive addition and structured skip counting."},
            {"ch": 12, "title": "How Much Can We Spend?",
             "concepts": "Money: Identifying Indian currency coins (Rs 1, Rs 2, Rs 5, Rs 10) and bills (Rs 10, Rs 20, Rs 50) for basic simulation buying."},
            {"ch": 13, "title": "So Many Toys",
             "concepts": "Data Handling: Collecting scattered data, sorting objects by categories, tallying totals, answering simple analytical questions."},
        ],
        "English": [
            {"ch": 1, "title": "Two Little Hands", "unit": "My family & Me",
             "concepts": "Body and Actions: Learning naming words for sensory parts (hands, legs, eyes), tracing rhythms, using repetitive vocabulary."},
            {"ch": 2, "title": "Greetings", "unit": "My family & Me",
             "concepts": "Social Literacy: Understanding formal social expressions like Good Morning, Afternoon, and Night; practicing polite daily phrases."},
            {"ch": 3, "title": "Picture Time", "unit": "Life Around Us",
             "concepts": "Observational Skills: Interpreting scenes, identifying domestic items, matching pictorial visuals with vocabulary words."},
            {"ch": 4, "title": "The Cap-seller and the Monkeys", "unit": "Life Around Us",
             "concepts": "Storytelling and Comprehension: Exploring narrative sequencing, understanding moral solutions, pronouncing simple consonant words."},
            {"ch": 5, "title": "A Farm", "unit": "Life Around Us",
             "concepts": "Living World: Building animal naming vocabularies, identifying sounds, learning basic farm animal habitats."},
            {"ch": 6, "title": "Fun with Pictures", "unit": "Food",
             "concepts": "Classification: Grouping objects, tracing words, identifying dietary elements, spelling three-letter phonetic groupings."},
            {"ch": 7, "title": "The Food We Eat", "unit": "Food",
             "concepts": "Health and Gratitude: Developing vocabulary around fruits, crops, grains, meals, practicing sentences about personal preferences."},
            {"ch": 8, "title": "The Four Seasons", "unit": "Seasons",
             "concepts": "Climatic Vocabulary: Naming Summer, Monsoon, Autumn, and Winter, along with matching adjustments in clothing and foods."},
            {"ch": 9, "title": "Anandi's Rainbow", "unit": "Seasons",
             "concepts": "Colors and Nature: Discovering properties of light colors, identifying environmental elements, simple descriptive writing."},
        ],
        "Hindi": [
            {"ch": 1, "title": "Meena ka Parivar (मीना का परिवार)", "unit": "Meena's Family",
             "concepts": "Home Identity: Vocabulary for family tree members (brother, sister, father, mother), talking about home structures."},
            {"ch": 2, "title": "Chanda Mama / Dada-Dadi (चंदा मामा / दादा-दादी)", "unit": "Meena's Family",
             "concepts": "Intergenerational Bonds: Developing emotional connection words, respecting grandparents, exploring simple poetic storytelling."},
            {"ch": 3, "title": "Reena ka Din (रीना का दिन)", "unit": "Meena's Family",
             "concepts": "Daily Schedule: Understanding morning-to-night habits, vocabulary for household tasks, basic verbs."},
            {"ch": 4, "title": "Rani Bhi (रानी भी)", "unit": "Meena's Family",
             "concepts": "Social Inclusivity: Reading short declarative scripts celebrating play, peer equality, and sharing hobbies."},
            {"ch": 5, "title": "Mithai (मिठाई)", "unit": "The Living World",
             "concepts": "Sensory and Taste Vocabulary: Associating actions with flavors, sweet configurations, recognizing basic shop interactions."},
            {"ch": 6, "title": "Teen Sathi (तीन साथी)", "unit": "The Living World",
             "concepts": "Friendship and Peer Play: Narrative comprehension emphasizing mutual group coordination, safety, and peer assistance."},
            {"ch": 7, "title": "Wah, Mere Ghode! (वाह, मेरे घोड़े!)", "unit": "The Living World",
             "concepts": "Rhyme and Movement: Chanting short rhythm lyrics to build cadence, clear oral articulation, learning names of dynamic actions."},
            {"ch": 8, "title": "Khatre Mein Saanp (खतरे में सांप)", "unit": "The Living World",
             "concepts": "Nature Safety: Conversing on natural habitats, learning animal reactions, understanding physical spaces in forests."},
            {"ch": 9, "title": "Aalu ki Sadak (आलू की सड़क)", "unit": "Our Food and Drink",
             "concepts": "Humorous Narratives: Fun stories with creative fictional routes, expanding adjectives, name variations for vegetables."},
            {"ch": 10, "title": "Jhulam-Jhuli (झूलम-झूली)", "unit": "Our Food and Drink",
             "concepts": "Physical Sports: Joyful action phrases linked with swings, playground behaviors, counting patterns."},
            {"ch": 11, "title": "Bhutte (भुट्टे)", "unit": "Our Food and Drink",
             "concepts": "Agricultural Harvests: Vocabulary related to fields, farm roasting traditions, family distributions, sharing snacks."},
            {"ch": 12, "title": "Phooli Roti (फूली रोटी)", "unit": "Our Food and Drink",
             "concepts": "Kitchen Processes: Identifying traditional culinary objects, sequence maps for baking food, using domestic action words."},
            {"ch": 13, "title": "Mela (मेला)", "unit": "Festivals and Fairs",
             "concepts": "Community Culture: Tracking public community setups, market stalls, public interactions, currency exchanges."},
            {"ch": 14, "title": "Barkha aur Megha (बरखा और मेघा)", "unit": "Festivals and Fairs",
             "concepts": "Weather Elements: Processing seasonal rain attributes, cloud systems, changes in nature, celebratory traditions."},
            {"ch": 15, "title": "Holi (होली)", "unit": "Festivals and Fairs",
             "concepts": "Colors and Festivals: Learning about historic community festivities, color matching variations, writing seasonal words."},
            {"ch": 16, "title": "Janmdivas par Ped Lagao (जन्मदिवस पर पेड़ लगाओ)", "unit": "Festivals and Fairs",
             "concepts": "Environmental Responsibility: Community development traits like planting trees, tracking botanical sprouts."},
            {"ch": 17, "title": "Hawa (हवा)", "unit": "The Green World",
             "concepts": "Invisible Elements: Tracing natural forces, feeling atmospheric shifts, understanding wind, breathing, flying."},
            {"ch": 18, "title": "Kitni Pyari Hai Ye Duniya (कितनी प्यारी है ये दुनिया)", "unit": "The Green World",
             "concepts": "Ecology Appreciation: Expressing aesthetic wonder, summarizing floral and faunal arrays, basic geography markers."},
            {"ch": 19, "title": "Chand ka Bachcha (चांद का बच्चा)", "unit": "The Green World",
             "concepts": "Creative Imagination: Abstract logic building, nighttime environment descriptions, interpreting short moral dreams."},
        ],
    },
}

CBSE_KB["Grade 2"] = {
    "Maths": [
        {"ch": 1, "title": "A Day at the Beach", "concepts": "Counting in groups, comparison of quantities, larger/smaller numbers up to 100."},
        {"ch": 2, "title": "Shapes Around Us", "concepts": "2D shapes — circle, square, rectangle, triangle. Properties: sides, corners."},
        {"ch": 3, "title": "Fun with Numbers", "concepts": "Numbers up to 100. Place value (tens, ones). Number names and writing."},
        {"ch": 4, "title": "Addition and Subtraction", "concepts": "Adding and subtracting two-digit numbers with and without regrouping."},
        {"ch": 5, "title": "Time", "concepts": "Reading clocks (hour and half-hour). Days of the week, months of the year."},
        {"ch": 6, "title": "Measurement", "concepts": "Comparing length, weight, and capacity. Non-standard units like spans, steps."},
        {"ch": 7, "title": "Multiplication", "concepts": "Multiplication as repeated addition. Tables of 2, 3, 4, 5, 10."},
        {"ch": 8, "title": "Patterns", "concepts": "Number patterns, shape patterns, growing patterns and skip counting."},
        {"ch": 9, "title": "Data Handling", "concepts": "Tally marks, simple bar charts, sorting and grouping objects."},
    ],
    "English": [
        {"ch": 1, "title": "Mridu in Pampered", "concepts": "Reading comprehension, story sequencing, simple verbs and nouns."},
        {"ch": 2, "title": "Picture Reading", "concepts": "Vocabulary building, describing pictures, simple sentences."},
        {"ch": 3, "title": "I Am Lucky", "concepts": "Poetry, rhyming words, expressing feelings, gratitude vocabulary."},
        {"ch": 4, "title": "I Want", "concepts": "Articles a/an/the, wishes and wants, polite requests."},
        {"ch": 5, "title": "A Smile", "concepts": "Positive expressions, action words, simple poem comprehension."},
    ],
    "Hindi": [
        {"ch": 1, "title": "ऊँट चला", "concepts": "स्वर और व्यंजन, सरल शब्द बनाना, मात्राओं की पहचान।"},
        {"ch": 2, "title": "भालू ने खेली फुटबॉल", "concepts": "कहानी पढ़ना, क्रिया शब्द, चित्र वर्णन।"},
        {"ch": 3, "title": "म्याऊँ-म्याऊँ", "concepts": "जानवरों की आवाज़ें, संज्ञा, बहुवचन।"},
    ],
    "EVS": [
        {"ch": 1, "title": "My Family", "concepts": "Family members, relationships, family tree."},
        {"ch": 2, "title": "My Body", "concepts": "Parts of the body, sense organs, personal hygiene."},
        {"ch": 3, "title": "Food We Eat", "concepts": "Sources of food, healthy and junk food, food groups."},
        {"ch": 4, "title": "Clothes We Wear", "concepts": "Types of clothes, seasonal clothing, materials."},
    ],
}

CBSE_KB["Grade 3"] = {
    "Maths": [
        {"ch": 1, "title": "Where to Look From", "concepts": "Symmetry, mirror images, top/side/front views of 3D objects."},
        {"ch": 2, "title": "Fun with Numbers", "concepts": "Numbers up to 1000, place value (hundreds, tens, ones), expanded form."},
        {"ch": 3, "title": "Give and Take", "concepts": "Addition and subtraction of 3-digit numbers with regrouping."},
        {"ch": 4, "title": "Long and Short", "concepts": "Standard units of length — cm, m, km. Conversion and measurement."},
        {"ch": 5, "title": "Shapes and Designs", "concepts": "2D and 3D shapes, tiling patterns, edges/faces/vertices."},
        {"ch": 6, "title": "Fun with Give and Take", "concepts": "Word problems on addition and subtraction in real contexts."},
        {"ch": 7, "title": "Time Goes On", "concepts": "Reading clocks (quarter past/to), calendar reading, time intervals."},
        {"ch": 8, "title": "Who is Heavier?", "concepts": "Weight in grams and kilograms. Balance scale and weighing."},
        {"ch": 9, "title": "How Many Times?", "concepts": "Multiplication tables 2-10, multiplying 2-digit by 1-digit."},
        {"ch": 10, "title": "Play with Patterns", "concepts": "Patterns in numbers, letters, and shapes. Magic squares."},
        {"ch": 11, "title": "Jugs and Mugs", "concepts": "Capacity in litres and millilitres. Measuring liquids."},
        {"ch": 12, "title": "Can We Share?", "concepts": "Division as equal sharing and grouping. Simple division facts."},
        {"ch": 13, "title": "Smart Charts", "concepts": "Reading and making bar graphs and pictographs."},
        {"ch": 14, "title": "Rupees and Paise", "concepts": "Indian currency, addition/subtraction of money, making change."},
    ],
    "English": [
        {"ch": 1, "title": "Good Morning", "concepts": "Greetings, tense (present), simple sentences."},
        {"ch": 2, "title": "The Magic Garden", "concepts": "Reading comprehension, descriptive words, adjectives."},
        {"ch": 3, "title": "Bird Talk", "concepts": "Poetry comprehension, rhyme, dialogue writing."},
        {"ch": 4, "title": "Trains", "concepts": "Vocabulary on travel, prepositions, simple narration."},
        {"ch": 5, "title": "The Story of the Road", "concepts": "Narrative comprehension, sequencing events, paragraph writing."},
    ],
    "EVS": [
        {"ch": 1, "title": "Poonam's Day Out", "concepts": "Animals around us, animal habitats, observation."},
        {"ch": 2, "title": "The Plant Fairy", "concepts": "Plants — leaves, flowers, types of plants (herbs, shrubs, trees)."},
        {"ch": 3, "title": "Water O' Water", "concepts": "Sources of water, importance, water cycle (basic)."},
        {"ch": 4, "title": "Our First School", "concepts": "Family, home, neighbourhood, school as community."},
        {"ch": 5, "title": "Chhotu's House", "concepts": "Types of houses, materials, houses across regions."},
    ],
}

CBSE_KB["Grade 4"] = {
    "Maths": [
        {"ch": 1, "title": "Building with Bricks", "concepts": "Patterns in 3D, perspectives, brick laying patterns."},
        {"ch": 2, "title": "Long and Short", "concepts": "Measurement of length, distance, conversions (cm/m/km)."},
        {"ch": 3, "title": "A Trip to Bhopal", "concepts": "Multiplication of larger numbers, real-life multiplication."},
        {"ch": 4, "title": "Tick-Tick-Tick", "concepts": "Time intervals, 24-hour clock, time zones (intro)."},
        {"ch": 5, "title": "The Way the World Looks", "concepts": "Maps, directions, scale, top view."},
        {"ch": 6, "title": "The Junk Seller", "concepts": "Multiplication, money, weight calculations in real contexts."},
        {"ch": 7, "title": "Jugs and Mugs", "concepts": "Capacity, conversion between litres and millilitres."},
        {"ch": 8, "title": "Carts and Wheels", "concepts": "Circles, radius, diameter, circular shapes."},
        {"ch": 9, "title": "Halves and Quarters", "concepts": "Fractions — half, quarter, three-quarters. Equivalent fractions."},
        {"ch": 10, "title": "Play with Patterns", "concepts": "Symmetry, tessellations, number and shape patterns."},
        {"ch": 11, "title": "Tables and Shares", "concepts": "Multiplication tables 11-20, division by 1-digit numbers."},
        {"ch": 12, "title": "How Heavy? How Light?", "concepts": "Weight in g, kg. Conversion and word problems."},
        {"ch": 13, "title": "Fields and Fences", "concepts": "Perimeter of squares, rectangles, irregular shapes."},
        {"ch": 14, "title": "Smart Charts!", "concepts": "Bar graphs, pictographs, data interpretation."},
    ],
    "English": [
        {"ch": 1, "title": "Wake Up!", "concepts": "Poetry, daily routine vocabulary, present continuous tense."},
        {"ch": 2, "title": "The Three Musketeers", "concepts": "Story comprehension, friendship, story sequencing."},
        {"ch": 3, "title": "Alice in Wonderland", "concepts": "Imagination, descriptive writing, dialogues."},
        {"ch": 4, "title": "Helen Keller", "concepts": "Biography, courage, vocabulary on senses."},
    ],
    "EVS": [
        {"ch": 1, "title": "Going to School", "concepts": "Different ways children reach school across India, geography awareness."},
        {"ch": 2, "title": "Ear to Ear", "concepts": "Animal ears, hearing, animal classification."},
        {"ch": 3, "title": "A Day with Nandu", "concepts": "Elephants, animal families, conservation."},
        {"ch": 4, "title": "The Story of Amrita", "concepts": "Chipko movement, environmental protection, courage."},
    ],
}

CBSE_KB["Grade 5"] = {
    "Maths": [
        {"ch": 1, "title": "The Fish Tale", "concepts": "Large numbers (lakhs, crores), multiplication, real-life problems."},
        {"ch": 2, "title": "Shapes and Angles", "concepts": "Types of angles — acute, obtuse, right. Measuring with protractor."},
        {"ch": 3, "title": "How Many Squares?", "concepts": "Area of squares and rectangles. Counting squares method."},
        {"ch": 4, "title": "Parts and Wholes", "concepts": "Fractions, equivalent fractions, addition/subtraction of like fractions."},
        {"ch": 5, "title": "Does It Look the Same?", "concepts": "Symmetry — line and rotational. Reflection."},
        {"ch": 6, "title": "Be My Multiple, I'll Be Your Factor", "concepts": "Multiples, factors, prime numbers, common factors."},
        {"ch": 7, "title": "Can You See the Pattern?", "concepts": "Number patterns, symmetric patterns, growing patterns."},
        {"ch": 8, "title": "Mapping Your Way", "concepts": "Map reading, scale, directions (N/S/E/W and intermediate)."},
        {"ch": 9, "title": "Boxes and Sketches", "concepts": "3D shapes, nets of cubes and cuboids, isometric drawing."},
        {"ch": 10, "title": "Tenths and Hundredths", "concepts": "Decimal numbers, place value of decimals, comparison."},
        {"ch": 11, "title": "Area and Its Boundary", "concepts": "Area vs perimeter, area of irregular shapes by counting."},
        {"ch": 12, "title": "Smart Charts", "concepts": "Bar graphs, pie charts (intro), data interpretation."},
        {"ch": 13, "title": "Ways to Multiply and Divide", "concepts": "Multiplication of larger numbers, long division, estimation."},
        {"ch": 14, "title": "How Big? How Heavy?", "concepts": "Volume, capacity, weight conversions. Density (intro)."},
    ],
    "English": [
        {"ch": 1, "title": "Ice-cream Man", "concepts": "Poetry, descriptive language, sensory details."},
        {"ch": 2, "title": "Wonderful Waste!", "concepts": "Story comprehension, recycling theme, paragraph writing."},
        {"ch": 3, "title": "Robinson Crusoe", "concepts": "Adventure story, survival vocabulary, first-person narration."},
        {"ch": 4, "title": "My Shadow", "concepts": "Poetry, similes, observation of nature."},
    ],
    "EVS": [
        {"ch": 1, "title": "Super Senses", "concepts": "Animal senses (echolocation, smell), how animals perceive."},
        {"ch": 2, "title": "A Snake Charmer's Story", "concepts": "Traditional occupations, snake biology, livelihoods."},
        {"ch": 3, "title": "From Tasting to Digesting", "concepts": "Digestive system basics, taste buds, food journey."},
        {"ch": 4, "title": "Mangoes Round the Year", "concepts": "Food preservation, seasons, cooking methods."},
        {"ch": 5, "title": "Seeds and Seeds", "concepts": "Seed dispersal, germination, types of seeds."},
    ],
}

CBSE_KB["Grade 6"] = {
    "Maths": [
        {"ch": 1, "title": "Knowing Our Numbers", "concepts": "Large numbers, Indian and International number systems, estimation."},
        {"ch": 2, "title": "Whole Numbers", "concepts": "Number line, properties (closure, commutative, associative)."},
        {"ch": 3, "title": "Playing with Numbers", "concepts": "Factors, multiples, prime/composite, HCF, LCM."},
        {"ch": 4, "title": "Basic Geometrical Ideas", "concepts": "Points, lines, rays, angles, triangles, quadrilaterals, circles."},
        {"ch": 5, "title": "Understanding Elementary Shapes", "concepts": "Measuring line segments, angles. Types of triangles."},
        {"ch": 6, "title": "Integers", "concepts": "Positive and negative numbers, addition/subtraction on number line."},
        {"ch": 7, "title": "Fractions", "concepts": "Proper, improper, mixed fractions. Operations on fractions."},
        {"ch": 8, "title": "Decimals", "concepts": "Decimal place value, conversion fractions ↔ decimals, operations."},
        {"ch": 9, "title": "Data Handling", "concepts": "Tally marks, pictographs, bar graphs."},
        {"ch": 10, "title": "Mensuration", "concepts": "Perimeter and area of squares, rectangles, triangles."},
        {"ch": 11, "title": "Algebra", "concepts": "Variables, expressions, simple equations."},
        {"ch": 12, "title": "Ratio and Proportion", "concepts": "Comparing quantities, unitary method."},
        {"ch": 13, "title": "Symmetry", "concepts": "Lines of symmetry, reflection symmetry."},
        {"ch": 14, "title": "Practical Geometry", "concepts": "Construction of circles, line segments, perpendiculars."},
    ],
    "Science": [
        {"ch": 1, "title": "Food: Where Does it Come From?", "concepts": "Plant and animal sources of food, ingredients, edible parts."},
        {"ch": 2, "title": "Components of Food", "concepts": "Nutrients — carbohydrates, fats, proteins, vitamins, minerals. Deficiency diseases."},
        {"ch": 3, "title": "Fibre to Fabric", "concepts": "Natural and synthetic fibres, cotton, jute, weaving and knitting."},
        {"ch": 4, "title": "Sorting Materials into Groups", "concepts": "Material properties — soluble, transparent, hard/soft, lustre."},
        {"ch": 5, "title": "Separation of Substances", "concepts": "Handpicking, threshing, winnowing, sieving, filtration, evaporation."},
        {"ch": 6, "title": "Changes Around Us", "concepts": "Reversible and irreversible changes. Examples in daily life."},
        {"ch": 7, "title": "Getting to Know Plants", "concepts": "Types of plants, parts of a plant — roots, stem, leaves, flowers."},
        {"ch": 8, "title": "Body Movements", "concepts": "Joints, skeleton, locomotion in animals — fish, bird, snake."},
        {"ch": 9, "title": "The Living Organisms", "concepts": "Characteristics of living things, habitats, adaptation."},
        {"ch": 10, "title": "Motion and Measurement of Distances", "concepts": "Units of length, types of motion — rectilinear, circular, periodic."},
        {"ch": 11, "title": "Light, Shadows and Reflections", "concepts": "Luminous/non-luminous, transparent/opaque, pinhole camera, mirrors."},
        {"ch": 12, "title": "Electricity and Circuits", "concepts": "Electric cell, bulb, switch, conductors and insulators."},
        {"ch": 13, "title": "Fun with Magnets", "concepts": "Magnetic and non-magnetic materials, poles, attraction/repulsion."},
        {"ch": 14, "title": "Water", "concepts": "Water cycle, sources, conservation, rainwater harvesting."},
        {"ch": 15, "title": "Air Around Us", "concepts": "Composition of air, uses, oxygen for respiration, wind."},
        {"ch": 16, "title": "Garbage In, Garbage Out", "concepts": "Waste management, composting, biodegradable vs non-biodegradable."},
    ],
    "Social Science": [
        {"ch": 1, "title": "What, Where, How and When?", "concepts": "Sources of history, archaeology, manuscripts. Indian geography."},
        {"ch": 2, "title": "The Earliest Cities", "concepts": "Harappan civilization, town planning, trade, decline."},
        {"ch": 3, "title": "From Gathering to Growing Food", "concepts": "Neolithic revolution, domestication, early farming."},
        {"ch": 4, "title": "In the Earliest Cities", "concepts": "Urban culture, Indus Valley artefacts, scripts."},
        {"ch": 5, "title": "The Earth in the Solar System", "concepts": "Solar system, planets, Earth's position, satellites."},
        {"ch": 6, "title": "Globe: Latitudes and Longitudes", "concepts": "Equator, tropics, latitudes, longitudes, time zones."},
        {"ch": 7, "title": "Motions of the Earth", "concepts": "Rotation, revolution, day/night, seasons."},
    ],
    "English": [
        {"ch": 1, "title": "Who Did Patrick's Homework?", "concepts": "Fantasy fiction, dialogue, character traits."},
        {"ch": 2, "title": "How the Dog Found Himself a New Master!", "concepts": "Folk tale, narrative sequencing, moral."},
        {"ch": 3, "title": "Taro's Reward", "concepts": "Japanese folk tale, virtue, reward/consequence."},
        {"ch": 4, "title": "An Indian-American Woman in Space", "concepts": "Biography (Kalpana Chawla), achievement, vocabulary on space."},
    ],
}

CBSE_KB["Grade 7"] = {
    "Maths": [
        {"ch": 1, "title": "Integers", "concepts": "Properties of integers, multiplication and division of integers."},
        {"ch": 2, "title": "Fractions and Decimals", "concepts": "Multiplication and division of fractions and decimals."},
        {"ch": 3, "title": "Data Handling", "concepts": "Mean, median, mode, bar graphs, probability (intro)."},
        {"ch": 4, "title": "Simple Equations", "concepts": "Setting up and solving linear equations in one variable."},
        {"ch": 5, "title": "Lines and Angles", "concepts": "Pairs of angles, transversal, parallel lines, angle properties."},
        {"ch": 6, "title": "The Triangle and Its Properties", "concepts": "Angle sum property, exterior angle, Pythagoras theorem."},
        {"ch": 7, "title": "Congruence of Triangles", "concepts": "SSS, SAS, ASA, RHS criteria for congruence."},
        {"ch": 8, "title": "Comparing Quantities", "concepts": "Ratio, percentage, profit and loss, simple interest."},
        {"ch": 9, "title": "Rational Numbers", "concepts": "Rational numbers on number line, operations, equivalent forms."},
        {"ch": 10, "title": "Practical Geometry", "concepts": "Construction of triangles given various conditions."},
        {"ch": 11, "title": "Perimeter and Area", "concepts": "Area of parallelogram, triangle, circumference and area of circle."},
        {"ch": 12, "title": "Algebraic Expressions", "concepts": "Terms, factors, like/unlike terms, addition/subtraction."},
        {"ch": 13, "title": "Exponents and Powers", "concepts": "Laws of exponents, expressing large numbers in standard form."},
        {"ch": 14, "title": "Symmetry", "concepts": "Lines of symmetry, rotational symmetry, order of symmetry."},
    ],
    "Science": [
        {"ch": 1, "title": "Nutrition in Plants", "concepts": "Photosynthesis, autotrophic and heterotrophic nutrition."},
        {"ch": 2, "title": "Nutrition in Animals", "concepts": "Digestive system, types of teeth, digestion in ruminants."},
        {"ch": 3, "title": "Heat", "concepts": "Temperature, thermometer, conduction, convection, radiation."},
        {"ch": 4, "title": "Acids, Bases and Salts", "concepts": "Indicators, neutralization, common acids/bases."},
        {"ch": 5, "title": "Physical and Chemical Changes", "concepts": "Differences, rusting, crystallization."},
        {"ch": 6, "title": "Respiration in Organisms", "concepts": "Cellular respiration, breathing rate, respiration in animals/plants."},
        {"ch": 7, "title": "Transportation in Animals and Plants", "concepts": "Circulatory system, heart, xylem and phloem."},
        {"ch": 8, "title": "Reproduction in Plants", "concepts": "Sexual and asexual reproduction, parts of a flower, pollination."},
        {"ch": 9, "title": "Motion and Time", "concepts": "Slow/fast, speed, distance-time graph, simple pendulum."},
        {"ch": 10, "title": "Electric Current and Its Effects", "concepts": "Symbols of circuit elements, heating and magnetic effects."},
        {"ch": 11, "title": "Light", "concepts": "Reflection, plane and spherical mirrors, lenses, dispersion."},
    ],
    "English": [
        {"ch": 1, "title": "Three Questions", "concepts": "Tolstoy's tale, life lessons, narrative comprehension."},
        {"ch": 2, "title": "A Gift of Chappals", "concepts": "Indian family setting, characters, dialogue."},
        {"ch": 3, "title": "Gopal and the Hilsa Fish", "concepts": "Humour, folk tale, wit and intelligence."},
    ],
}

CBSE_KB["Grade 8"] = {
    "Maths": [
        {"ch": 1, "title": "Rational Numbers", "concepts": "Closure, commutative, distributive properties. Representation on number line."},
        {"ch": 2, "title": "Linear Equations in One Variable", "concepts": "Solving equations with variables on both sides, word problems."},
        {"ch": 3, "title": "Understanding Quadrilaterals", "concepts": "Polygons, sum of angles, parallelograms, rhombus, trapezium."},
        {"ch": 4, "title": "Practical Geometry", "concepts": "Construction of quadrilaterals when given various measurements."},
        {"ch": 5, "title": "Data Handling", "concepts": "Histograms, pie charts, probability of events."},
        {"ch": 6, "title": "Squares and Square Roots", "concepts": "Properties of squares, finding square roots by division and factorization."},
        {"ch": 7, "title": "Cubes and Cube Roots", "concepts": "Patterns in cubes, finding cube roots."},
        {"ch": 8, "title": "Comparing Quantities", "concepts": "Discount, tax, compound interest formula."},
        {"ch": 9, "title": "Algebraic Expressions and Identities", "concepts": "Multiplication of polynomials, standard identities (a+b)², (a-b)², (a+b)(a-b)."},
        {"ch": 10, "title": "Visualising Solid Shapes", "concepts": "3D shapes, Euler's formula, nets."},
        {"ch": 11, "title": "Mensuration", "concepts": "Area of trapezium, surface area and volume of cube, cuboid, cylinder."},
        {"ch": 12, "title": "Exponents and Powers", "concepts": "Negative exponents, laws of exponents, scientific notation."},
        {"ch": 13, "title": "Direct and Inverse Proportions", "concepts": "Recognizing and solving problems in direct and inverse proportion."},
        {"ch": 14, "title": "Factorisation", "concepts": "Factorising algebraic expressions using common factors and identities."},
        {"ch": 15, "title": "Introduction to Graphs", "concepts": "Reading and plotting graphs, linear graphs."},
        {"ch": 16, "title": "Playing with Numbers", "concepts": "Divisibility rules, generalised form of numbers."},
    ],
    "Science": [
        {"ch": 1, "title": "Crop Production and Management", "concepts": "Agricultural practices, irrigation, manure, fertilizers."},
        {"ch": 2, "title": "Microorganisms", "concepts": "Bacteria, virus, fungi. Useful and harmful microbes."},
        {"ch": 3, "title": "Synthetic Fibres and Plastics", "concepts": "Rayon, nylon, polyester. Thermoplastics and thermosetting plastics."},
        {"ch": 4, "title": "Materials: Metals and Non-metals", "concepts": "Physical and chemical properties, reactivity series."},
        {"ch": 5, "title": "Coal and Petroleum", "concepts": "Fossil fuels, refining, natural resources, conservation."},
        {"ch": 6, "title": "Combustion and Flame", "concepts": "Types of combustion, structure of flame, fire safety."},
        {"ch": 7, "title": "Conservation of Plants and Animals", "concepts": "Biodiversity, sanctuaries, national parks, biosphere reserves."},
        {"ch": 8, "title": "Cell Structure and Functions", "concepts": "Discovery of cell, plant vs animal cells, organelles."},
        {"ch": 9, "title": "Reproduction in Animals", "concepts": "Sexual/asexual reproduction, fertilisation, development of embryo."},
        {"ch": 10, "title": "Reaching the Age of Adolescence", "concepts": "Puberty, secondary sexual characters, hormones."},
        {"ch": 11, "title": "Force and Pressure", "concepts": "Types of forces, pressure, atmospheric pressure."},
        {"ch": 12, "title": "Friction", "concepts": "Types of friction, factors affecting friction, advantages/disadvantages."},
        {"ch": 13, "title": "Sound", "concepts": "Production, propagation, frequency, amplitude, noise pollution."},
        {"ch": 14, "title": "Chemical Effects of Electric Current", "concepts": "Electrolysis, electroplating."},
        {"ch": 15, "title": "Some Natural Phenomena", "concepts": "Lightning, earthquakes, charges and electric discharge."},
        {"ch": 16, "title": "Light", "concepts": "Reflection, multiple reflections, kaleidoscope, structure of the eye."},
    ],
}

CBSE_KB["Grade 9"] = {
    "Maths": [
        {"ch": 1, "title": "Number Systems", "concepts": "Rational and irrational numbers, real numbers on number line, laws of exponents."},
        {"ch": 2, "title": "Polynomials", "concepts": "Polynomial in one variable, zeros, remainder theorem, factor theorem."},
        {"ch": 3, "title": "Coordinate Geometry", "concepts": "Cartesian plane, quadrants, plotting points."},
        {"ch": 4, "title": "Linear Equations in Two Variables", "concepts": "Solutions, graphical representation."},
        {"ch": 5, "title": "Introduction to Euclid's Geometry", "concepts": "Axioms, postulates, theorems."},
        {"ch": 6, "title": "Lines and Angles", "concepts": "Pairs of angles, parallel lines, angle sum of triangle."},
        {"ch": 7, "title": "Triangles", "concepts": "Congruence criteria, properties of isosceles triangle, inequalities."},
        {"ch": 8, "title": "Quadrilaterals", "concepts": "Properties of parallelograms, midpoint theorem."},
        {"ch": 9, "title": "Circles", "concepts": "Chords, angles subtended, cyclic quadrilaterals."},
        {"ch": 10, "title": "Heron's Formula", "concepts": "Area of triangle using sides, application to quadrilaterals."},
        {"ch": 11, "title": "Surface Areas and Volumes", "concepts": "Sphere, cone, cylinder, hemisphere."},
        {"ch": 12, "title": "Statistics", "concepts": "Mean, median, mode of grouped/ungrouped data, frequency distributions."},
    ],
    "Science": [
        {"ch": 1, "title": "Matter in Our Surroundings", "concepts": "States of matter, change of state, evaporation, latent heat."},
        {"ch": 2, "title": "Is Matter Around Us Pure?", "concepts": "Mixtures, solutions, colloids, separation techniques."},
        {"ch": 3, "title": "Atoms and Molecules", "concepts": "Laws of chemical combination, atomic mass, molecular mass, mole."},
        {"ch": 4, "title": "Structure of the Atom", "concepts": "Sub-atomic particles, models of atom, isotopes, electronic configuration."},
        {"ch": 5, "title": "The Fundamental Unit of Life", "concepts": "Cell, organelles, plant vs animal cells."},
        {"ch": 6, "title": "Tissues", "concepts": "Plant tissues — meristematic, permanent. Animal tissues — epithelial, connective, muscular, nervous."},
        {"ch": 7, "title": "Motion", "concepts": "Distance, displacement, speed, velocity, acceleration, equations of motion."},
        {"ch": 8, "title": "Force and Laws of Motion", "concepts": "Newton's three laws of motion, momentum, inertia."},
        {"ch": 9, "title": "Gravitation", "concepts": "Universal law, free fall, mass vs weight, buoyancy, Archimedes."},
        {"ch": 10, "title": "Work and Energy", "concepts": "Work done, kinetic and potential energy, conservation of energy, power."},
        {"ch": 11, "title": "Sound", "concepts": "Sound waves, characteristics, reflection, echo, ultrasound."},
        {"ch": 12, "title": "Improvement in Food Resources", "concepts": "Crop variety improvement, animal husbandry."},
    ],
    "Social Science": [
        {"ch": 1, "title": "The French Revolution", "concepts": "Causes, Estates, Reign of Terror, abolition of monarchy."},
        {"ch": 2, "title": "Socialism in Europe and Russian Revolution", "concepts": "October revolution, Lenin, USSR."},
        {"ch": 3, "title": "Nazism and Rise of Hitler", "concepts": "Weimar Republic, Holocaust, Nazi Germany."},
        {"ch": 4, "title": "India - Size and Location", "concepts": "Geographic boundaries, neighbours, Standard Meridian."},
        {"ch": 5, "title": "Physical Features of India", "concepts": "Himalayas, Plains, Plateau, Coastal Plains, Islands."},
        {"ch": 6, "title": "What is Democracy? Why Democracy?", "concepts": "Features of democracy, arguments for/against."},
        {"ch": 7, "title": "Constitutional Design", "concepts": "Making of Indian Constitution, Preamble, values."},
    ],
}

CBSE_KB["Grade 10"] = {
    "Maths": [
        {"ch": 1, "title": "Real Numbers", "concepts": "Euclid's division lemma, fundamental theorem of arithmetic, irrational numbers."},
        {"ch": 2, "title": "Polynomials", "concepts": "Zeros, relationship between zeros and coefficients, division algorithm."},
        {"ch": 3, "title": "Pair of Linear Equations in Two Variables", "concepts": "Graphical and algebraic methods (substitution, elimination, cross-multiplication)."},
        {"ch": 4, "title": "Quadratic Equations", "concepts": "Solving by factorisation, completing square, quadratic formula. Nature of roots."},
        {"ch": 5, "title": "Arithmetic Progressions", "concepts": "nth term, sum of n terms, applications."},
        {"ch": 6, "title": "Triangles", "concepts": "Similarity, criteria (AA, SSS, SAS), Basic Proportionality Theorem, Pythagoras."},
        {"ch": 7, "title": "Coordinate Geometry", "concepts": "Distance formula, section formula, area of triangle from coordinates."},
        {"ch": 8, "title": "Introduction to Trigonometry", "concepts": "Trigonometric ratios, standard angles (0°, 30°, 45°, 60°, 90°), identities."},
        {"ch": 9, "title": "Applications of Trigonometry", "concepts": "Heights and distances, angles of elevation and depression."},
        {"ch": 10, "title": "Circles", "concepts": "Tangents from external point, properties."},
        {"ch": 11, "title": "Areas Related to Circles", "concepts": "Area of sector, segment, combinations of shapes."},
        {"ch": 12, "title": "Surface Areas and Volumes", "concepts": "Combinations of solids, conversion of solids."},
        {"ch": 13, "title": "Statistics", "concepts": "Mean (direct, assumed mean, step deviation), median, mode of grouped data, ogives."},
        {"ch": 14, "title": "Probability", "concepts": "Theoretical probability, simple events, sample space."},
    ],
    "Science": [
        {"ch": 1, "title": "Chemical Reactions and Equations", "concepts": "Balancing equations, types — combination, decomposition, displacement, double displacement, redox."},
        {"ch": 2, "title": "Acids, Bases and Salts", "concepts": "Strong/weak, pH scale, salts in daily life, hydrated salts."},
        {"ch": 3, "title": "Metals and Non-metals", "concepts": "Physical/chemical properties, reactivity series, extraction of metals, corrosion."},
        {"ch": 4, "title": "Carbon and Its Compounds", "concepts": "Covalent bonding, hydrocarbons, functional groups, ethanol, ethanoic acid, soaps."},
        {"ch": 5, "title": "Life Processes", "concepts": "Nutrition, respiration, transportation, excretion in plants and animals."},
        {"ch": 6, "title": "Control and Coordination", "concepts": "Nervous system, reflex action, hormones in animals and plants."},
        {"ch": 7, "title": "How Do Organisms Reproduce?", "concepts": "Asexual/sexual reproduction, human reproductive system, contraception."},
        {"ch": 8, "title": "Heredity", "concepts": "Mendel's experiments, dominant/recessive traits, sex determination."},
        {"ch": 9, "title": "Light: Reflection and Refraction", "concepts": "Spherical mirrors, mirror formula, refraction, lenses, lens formula, power."},
        {"ch": 10, "title": "Human Eye and Colourful World", "concepts": "Defects of vision, dispersion, scattering, atmospheric refraction."},
        {"ch": 11, "title": "Electricity", "concepts": "Ohm's law, resistance, series and parallel circuits, heating effect, power."},
        {"ch": 12, "title": "Magnetic Effects of Electric Current", "concepts": "Magnetic field, electromagnetic induction, motor, generator."},
        {"ch": 13, "title": "Our Environment", "concepts": "Ecosystem, food chains, ozone depletion, waste management."},
    ],
    "Social Science": [
        {"ch": 1, "title": "Nationalism in India", "concepts": "Non-cooperation, Civil Disobedience, Salt March, Quit India."},
        {"ch": 2, "title": "The Making of a Global World", "concepts": "Globalization history, silk route, world wars, Bretton Woods."},
        {"ch": 3, "title": "Resources and Development", "concepts": "Classification, conservation, land/soil resources."},
        {"ch": 4, "title": "Water Resources", "concepts": "Scarcity, multi-purpose projects, rainwater harvesting."},
        {"ch": 5, "title": "Agriculture", "concepts": "Types of farming, cropping seasons, major crops, food security."},
        {"ch": 6, "title": "Power Sharing", "concepts": "Forms in modern democracies, Belgium and Sri Lanka examples."},
        {"ch": 7, "title": "Federalism", "concepts": "Features, Indian federalism, decentralization."},
        {"ch": 8, "title": "Development", "concepts": "Income criterion, HDI, sustainable development."},
        {"ch": 9, "title": "Sectors of the Indian Economy", "concepts": "Primary, secondary, tertiary; organised vs unorganised."},
    ],
    "English": [
        {"ch": 1, "title": "A Letter to God", "concepts": "Story by G.L. Fuentes, faith, irony, character analysis."},
        {"ch": 2, "title": "Nelson Mandela: Long Walk to Freedom", "concepts": "Biography excerpt, apartheid, freedom struggle."},
        {"ch": 3, "title": "Two Stories about Flying", "concepts": "Roald Dahl, courage, growing up."},
        {"ch": 4, "title": "From the Diary of Anne Frank", "concepts": "Diary writing, Holocaust, adolescence."},
    ],
}

CBSE_KB["Grade 11"] = {
    "Maths": [
        {"ch": 1, "title": "Sets", "concepts": "Types of sets, operations, Venn diagrams, complement."},
        {"ch": 2, "title": "Relations and Functions", "concepts": "Cartesian product, types of functions, domain and range."},
        {"ch": 3, "title": "Trigonometric Functions", "concepts": "Radian measure, trigonometric identities, sum and product formulas."},
        {"ch": 4, "title": "Principle of Mathematical Induction", "concepts": "Proving statements true for all natural numbers."},
        {"ch": 5, "title": "Complex Numbers and Quadratic Equations", "concepts": "Imaginary numbers, modulus, argument, polar form."},
        {"ch": 6, "title": "Linear Inequalities", "concepts": "Solution sets, graphical solutions of one and two variables."},
        {"ch": 7, "title": "Permutations and Combinations", "concepts": "Factorial, nPr, nCr, applications."},
        {"ch": 8, "title": "Binomial Theorem", "concepts": "Expansion, general term, middle term."},
        {"ch": 9, "title": "Sequences and Series", "concepts": "Arithmetic, geometric, harmonic progressions, AM-GM inequality."},
        {"ch": 10, "title": "Straight Lines", "concepts": "Slope, various forms of equations, distance of point from line."},
        {"ch": 11, "title": "Conic Sections", "concepts": "Circle, parabola, ellipse, hyperbola — standard equations."},
        {"ch": 12, "title": "Introduction to 3D Geometry", "concepts": "Coordinate axes, distance, section formula in 3D."},
        {"ch": 13, "title": "Limits and Derivatives", "concepts": "Limit of function, derivatives from first principle, standard derivatives."},
        {"ch": 14, "title": "Mathematical Reasoning", "concepts": "Statements, logical operations, contrapositive."},
        {"ch": 15, "title": "Statistics", "concepts": "Measures of dispersion — range, mean deviation, variance, standard deviation."},
        {"ch": 16, "title": "Probability", "concepts": "Random experiments, axiomatic approach, conditional probability."},
    ],
    "Physics": [
        {"ch": 1, "title": "Units and Measurements", "concepts": "SI units, dimensional analysis, significant figures, errors."},
        {"ch": 2, "title": "Motion in a Straight Line", "concepts": "Kinematics, position-time graph, equations of motion."},
        {"ch": 3, "title": "Motion in a Plane", "concepts": "Vectors, projectile motion, uniform circular motion."},
        {"ch": 4, "title": "Laws of Motion", "concepts": "Newton's laws, friction, dynamics of circular motion."},
        {"ch": 5, "title": "Work, Energy and Power", "concepts": "Work-energy theorem, conservative forces, power."},
        {"ch": 6, "title": "Systems of Particles and Rotational Motion", "concepts": "Centre of mass, torque, angular momentum, moment of inertia."},
        {"ch": 7, "title": "Gravitation", "concepts": "Universal law, Kepler's laws, escape velocity, satellites."},
        {"ch": 8, "title": "Mechanical Properties of Solids", "concepts": "Stress, strain, Hooke's law, Young's modulus."},
        {"ch": 9, "title": "Thermal Properties of Matter", "concepts": "Temperature, expansion, calorimetry, heat transfer."},
        {"ch": 10, "title": "Thermodynamics", "concepts": "Laws of thermodynamics, heat engines, refrigerators."},
        {"ch": 11, "title": "Oscillations and Waves", "concepts": "SHM, energy in SHM, wave motion, superposition, beats."},
    ],
    "Chemistry": [
        {"ch": 1, "title": "Some Basic Concepts of Chemistry", "concepts": "Mole concept, stoichiometry, empirical and molecular formulas."},
        {"ch": 2, "title": "Structure of Atom", "concepts": "Bohr model, quantum numbers, electronic configuration."},
        {"ch": 3, "title": "Classification of Elements and Periodicity", "concepts": "Periodic table, trends in atomic radius, ionization, electronegativity."},
        {"ch": 4, "title": "Chemical Bonding and Molecular Structure", "concepts": "Ionic and covalent bonds, hybridization, VSEPR theory."},
        {"ch": 5, "title": "Thermodynamics", "concepts": "Internal energy, enthalpy, entropy, Gibbs free energy."},
        {"ch": 6, "title": "Equilibrium", "concepts": "Chemical equilibrium, Le Chatelier's principle, ionic equilibrium, pH."},
        {"ch": 7, "title": "Redox Reactions", "concepts": "Oxidation states, balancing redox equations, types."},
        {"ch": 8, "title": "Organic Chemistry: Basics", "concepts": "Nomenclature, isomerism, reaction mechanisms."},
        {"ch": 9, "title": "Hydrocarbons", "concepts": "Alkanes, alkenes, alkynes, aromatic compounds."},
    ],
    "Biology": [
        {"ch": 1, "title": "The Living World", "concepts": "Diversity, taxonomy, classification, nomenclature."},
        {"ch": 2, "title": "Biological Classification", "concepts": "Five kingdom classification, viruses, lichens."},
        {"ch": 3, "title": "Plant Kingdom", "concepts": "Algae, bryophytes, pteridophytes, gymnosperms, angiosperms."},
        {"ch": 4, "title": "Animal Kingdom", "concepts": "Classification of animals up to class level, characteristic features."},
        {"ch": 5, "title": "Cell: The Unit of Life", "concepts": "Cell theory, prokaryotic vs eukaryotic, organelles."},
        {"ch": 6, "title": "Photosynthesis", "concepts": "Light and dark reactions, factors affecting, C3 vs C4 pathway."},
        {"ch": 7, "title": "Human Physiology", "concepts": "Digestion, breathing, circulation, excretion, neural control."},
    ],
}

CBSE_KB["Grade 12"] = {
    "Maths": [
        {"ch": 1, "title": "Relations and Functions", "concepts": "Types of relations, functions, composition, inverse."},
        {"ch": 2, "title": "Inverse Trigonometric Functions", "concepts": "Definition, domain, range, properties, principal value."},
        {"ch": 3, "title": "Matrices", "concepts": "Types, operations, transpose, symmetric and skew-symmetric."},
        {"ch": 4, "title": "Determinants", "concepts": "Properties, area of triangle, adjoint, inverse, system of equations."},
        {"ch": 5, "title": "Continuity and Differentiability", "concepts": "Continuity, differentiability, chain rule, implicit differentiation."},
        {"ch": 6, "title": "Applications of Derivatives", "concepts": "Rate of change, increasing/decreasing, maxima/minima, tangent/normal."},
        {"ch": 7, "title": "Integrals", "concepts": "Indefinite and definite integrals, methods of integration, fundamental theorem."},
        {"ch": 8, "title": "Applications of Integrals", "concepts": "Area under curves, between curves, area of regions."},
        {"ch": 9, "title": "Differential Equations", "concepts": "Order, degree, solution methods — separable, linear, homogeneous."},
        {"ch": 10, "title": "Vectors", "concepts": "Vector algebra, dot product, cross product, scalar triple product."},
        {"ch": 11, "title": "Three Dimensional Geometry", "concepts": "Direction cosines, equation of line and plane, distance, angles."},
        {"ch": 12, "title": "Linear Programming", "concepts": "Mathematical formulation, graphical solution, optimization."},
        {"ch": 13, "title": "Probability", "concepts": "Conditional probability, Bayes' theorem, probability distributions, binomial distribution."},
    ],
    "Physics": [
        {"ch": 1, "title": "Electric Charges and Fields", "concepts": "Coulomb's law, electric field, dipole, Gauss's law."},
        {"ch": 2, "title": "Electrostatic Potential and Capacitance", "concepts": "Potential, equipotential surfaces, capacitors in series/parallel."},
        {"ch": 3, "title": "Current Electricity", "concepts": "Ohm's law, resistivity, Kirchhoff's laws, Wheatstone bridge."},
        {"ch": 4, "title": "Moving Charges and Magnetism", "concepts": "Magnetic force, Biot-Savart law, Ampere's law, cyclotron."},
        {"ch": 5, "title": "Magnetism and Matter", "concepts": "Bar magnet, Earth's magnetism, dia/para/ferromagnetic."},
        {"ch": 6, "title": "Electromagnetic Induction", "concepts": "Faraday's law, Lenz's law, self and mutual inductance, AC generator."},
        {"ch": 7, "title": "Alternating Current", "concepts": "AC circuits, RLC circuit, resonance, transformer."},
        {"ch": 8, "title": "Electromagnetic Waves", "concepts": "EM spectrum, Maxwell's equations (qualitative)."},
        {"ch": 9, "title": "Ray Optics", "concepts": "Reflection, refraction, lens maker formula, optical instruments."},
        {"ch": 10, "title": "Wave Optics", "concepts": "Huygens principle, interference (Young's), diffraction, polarization."},
        {"ch": 11, "title": "Dual Nature of Radiation and Matter", "concepts": "Photoelectric effect, de Broglie wavelength, Davisson-Germer."},
        {"ch": 12, "title": "Atoms", "concepts": "Rutherford model, Bohr model, hydrogen spectrum."},
        {"ch": 13, "title": "Nuclei", "concepts": "Composition, mass-energy, radioactivity, fission, fusion."},
        {"ch": 14, "title": "Semiconductors and Electronics", "concepts": "p-n junction, diode, transistor, logic gates."},
    ],
    "Chemistry": [
        {"ch": 1, "title": "Solutions", "concepts": "Concentration units, Raoult's law, colligative properties."},
        {"ch": 2, "title": "Electrochemistry", "concepts": "Electrochemical cells, Nernst equation, conductance, batteries."},
        {"ch": 3, "title": "Chemical Kinetics", "concepts": "Rate of reaction, order, molecularity, Arrhenius equation."},
        {"ch": 4, "title": "The d- and f-Block Elements", "concepts": "Transition elements, lanthanoids, actinoids, oxidation states."},
        {"ch": 5, "title": "Coordination Compounds", "concepts": "Werner's theory, nomenclature, bonding, isomerism."},
        {"ch": 6, "title": "Haloalkanes and Haloarenes", "concepts": "Nomenclature, preparation, reactions, mechanisms."},
        {"ch": 7, "title": "Alcohols, Phenols and Ethers", "concepts": "Nomenclature, preparation, reactions."},
        {"ch": 8, "title": "Aldehydes, Ketones and Carboxylic Acids", "concepts": "Nomenclature, preparation, reactions, mechanisms."},
        {"ch": 9, "title": "Amines", "concepts": "Primary, secondary, tertiary; preparation, reactions."},
        {"ch": 10, "title": "Biomolecules", "concepts": "Carbohydrates, proteins, nucleic acids, vitamins, hormones."},
    ],
    "Biology": [
        {"ch": 1, "title": "Reproduction in Organisms", "concepts": "Asexual/sexual reproduction, life span, modes."},
        {"ch": 2, "title": "Sexual Reproduction in Flowering Plants", "concepts": "Flower structure, pollination, fertilization, seed development."},
        {"ch": 3, "title": "Human Reproduction", "concepts": "Male/female reproductive system, gametogenesis, menstrual cycle, pregnancy."},
        {"ch": 4, "title": "Reproductive Health", "concepts": "RCH programmes, contraception, STDs, infertility."},
        {"ch": 5, "title": "Principles of Inheritance and Variation", "concepts": "Mendel's laws, linkage, sex determination, mutations, genetic disorders."},
        {"ch": 6, "title": "Molecular Basis of Inheritance", "concepts": "DNA structure, replication, transcription, translation, genetic code, Human Genome Project."},
        {"ch": 7, "title": "Evolution", "concepts": "Origin of life, Darwin, evidences, Hardy-Weinberg principle, human evolution."},
        {"ch": 8, "title": "Human Health and Diseases", "concepts": "Common diseases, immunity, AIDS, cancer, drug abuse."},
        {"ch": 9, "title": "Biotechnology and Its Applications", "concepts": "Recombinant DNA, GM crops, gene therapy, transgenic animals."},
        {"ch": 10, "title": "Ecosystems", "concepts": "Components, productivity, food chains, ecological pyramids, biogeochemical cycles."},
    ],
}


STOP_WORDS = {"the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
              "to", "of", "in", "on", "at", "by", "for", "with", "about", "as",
              "i", "you", "he", "she", "it", "we", "they", "what", "where", "when",
              "why", "how", "which", "who", "this", "that", "these", "those",
              "and", "or", "but", "if", "then", "so", "than", "do", "does", "did",
              "have", "has", "had", "can", "could", "will", "would", "should", "may",
              "me", "my", "your", "his", "her", "us", "them", "explain", "tell",
              "give", "show", "please", "can you", "kya", "hai", "ki", "ka", "ke"}


def _tokenize(text):
    text = text.lower()
    words = "".join(c if c.isalnum() or c.isspace() else " " for c in text).split()
    return {w for w in words if len(w) > 2 and w not in STOP_WORDS}


def retrieve_context(query, grade, subject, top_k=3):
    """Return top-k most relevant CBSE chapters as a formatted context string."""
    chapters = CBSE_KB.get(grade, {}).get(subject, [])
    if not chapters:
        return ""

    q_tokens = _tokenize(query)
    if not q_tokens:
        return ""

    scored = []
    for ch in chapters:
        text = ch["title"] + " " + ch["concepts"]
        ch_tokens = _tokenize(text)
        score = len(q_tokens & ch_tokens)
        if score > 0:
            scored.append((score, ch))

    scored.sort(key=lambda x: x[0], reverse=True)
    top = scored[:top_k]
    if not top:
        return ""

    lines = [f"Relevant CBSE {grade} {subject} curriculum context:"]
    for _, ch in top:
        unit = f" (Unit: {ch['unit']})" if "unit" in ch else ""
        lines.append(f"- Chapter {ch['ch']}: {ch['title']}{unit} — {ch['concepts']}")
    return "\n".join(lines)
