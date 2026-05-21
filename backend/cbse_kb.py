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
