require("dotenv/config");
const mongoose = require("mongoose");

const Hobbies = require("../models/Hobbies.model");

const HobbiesArr = [
  {
    name: "Climbing / Bouldering",
    location: "Berlin",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/122/847/original/climber-silhouette-vectors.jpg",
    description:
      "Bouldering is a form of free climbing that is performed on small rock formations or artificial rock walls without the use of ropes or harnesses.",
  },
  {
    name: "Slacklining",
    location: "Berlin",
    image:
      "https://i.pinimg.com/originals/51/4e/4d/514e4d3abd46651e23dda47df8a3f177.png",
    description:
      "Slacklining refers to the act of walking, running or balancing along a suspended length of flat webbing that is tensioned between two anchors. ",
  },
  {
    name: "Biking",
    location: "Berlin",
    image:
      "https://www.netclipart.com/pp/m/388-3882634_style-cycling-spoke-road-bike-vector-silhouette.png",
    description:
      "Cycling, also called bicycling or biking, is the use of bicycles for transport, recreation, exercise or sport. ",
  },

  {
    name: "Skating",
    location: "Berlin",
    image: "https://svgsilh.com/svg_v2/3385370.svg",
    description:
      "Skateboarding is an action sport originating in the United States that involves riding and performing tricks using a skateboard, as well as a recreational activity, an art form, an entertainment industry job, and a method of transportation.",
  },
  {
    name: "Running",
    location: "BerlinRun Lola Run ",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/096/135/original/running-silhouette-vectors.jpg",
  },
  {
    name: "Yoga",
    location: "Berlin",
    image:
      "https://res.cloudinary.com/dzxo1mr9i/image/upload/v1623017021/download_ks1jfu.png",
    description:
      "Yoga literally means 'union', it is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India.",
  },
  {
    name: "Urban Explore",
    location: "Berlin",
    image:
      "https://t3.ftcdn.net/jpg/01/96/93/14/500_F_196931449_GpQ57k1HYOCWHWD4kIvbFi07A58251hB.jpg",
    description:
      "Urban Exploration (also known as urbex) is the city dwellers version of charting unknown forests and delving down mysterious caves.",
  },
  {
    name: "Painting",
    location: "Berlin",
    image: "https://cdn.onlinewebfonts.com/svg/img_532767.png",
    description:
      "Painting is the practice of applying paint, pigment, color or other medium to a solid surface.",
  },
  {
    name: "Music",
    location: "Berlin",
    image: "https://designlooter.com/images/music-notes-svg-10.jpg",
    description:
      "Music is the art of arranging sounds in time to produce a composition through the elements of melody, harmony, rhythm, and timbre. It is one of the universal cultural aspects of all human societies. ",
  },
  {
    name: "Street Photography",
    location: "Berlin",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/141/691/non_2x/free-photography-and-camera-icons-vector.jpg",
    description:
      "Street photography is the rich tradition of using the vibrant tapestry of public spaces to create beautiful photos.",
  },
  {
    name: "Writing",
    location: "Berlin",
    image:
      "https://img.pngio.com/writing-free-vector-17087-free-icons-and-png-backgrounds-writing-vector-png-512_331.png",
    description:
      "Writers produce different forms of literary art and creative writing such as novels, short stories, books, poetry, plays, screenplays, teleplays, songs, and essays as well as other reports and news articles that may be of interest to the public",
  },
  {
    name: "Book Club",
    location: "Berlin",
    image:
      "https://www.creativefabrica.com/wp-content/uploads/2019/02/So-many-books-so-little-time.jpg",
    description:
      "A book club is a group of people who meet to discuss a book or books that they have read and express their opinions, likes, dislikes, etc.",
  },
  {
    name: "Graffiti",
    location: "Berlin",
    image: "https://clipground.com/images/street-art-clipart-5.jpg",
    description:
      "Graffiti is writing or drawings made on a wall or other surface, usually without permission and within public view. ",
  },
  {
    name: "Juggling",
    location: "Berlin",
    image:
      "https://res.cloudinary.com/dzxo1mr9i/image/upload/v1623018718/Juggling-01_rnnkn3.jpg",
    description:
      "Juggling is a physical skill, performed by a juggler, involving the manipulation of objects for recreation, entertainment, art or sport. The most recognizable form of juggling is toss juggling. ",
  },

  {
    name: "Foodie",
    location:
      "BerlinA foodie is a person who has an ardent or refined interest in food and who eats food not only out of hunger but due to their interest or hobby and is passionate about food. ",
    image:
      "https://signmax.us/AchatEnLigne/logos/Images/foodies-10-19-2016.jpg",
    description: "",
  },
  {
    name: "Board Games",
    location:
      "BerlinBoard games are tabletop games that typically use pieces moved or placed on a pre-marked board and often include elements of table, card, role-playing, and miniatures games as well. Most feature a competition between two or more players.",
    image: "https://cdn.onlinewebfonts.com/svg/img_561222.png",
    description: "",
  },
  {
    name: "Gaming",
    location:
      "BerlinA gamer is a person who plays interactive games, especially video games, tabletop role-playing games, and skill-based card games, and who plays for usually long periods of time. ",
    image:
      "https://www.creativefabrica.com/wp-content/uploads/2018/03/I-dont-get-older-I-level-up.jpg",
    description: "",
  },
  {
    name: "Coding",
    location:
      "BerlinCoding is the process of using a programming language to get a computer to behave how you want it to.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Code.svg/1200px-Code.svg.png",
    description: "",
  },
  {
    name: "Meditation",
    location: "Berlin",
    image: "https://clipartart.com/images/clipart-meditation-4.jpg",
    description:
      "Meditation is a practice where an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state",
  },
  {
    name: "Parkour",
    location: "Berlin",
    image:
      "https://images.creativemarket.com/0.1.0/ps/4147348/3640/3640/m1/fpnw/wm1/parkour-silhouette_1_18-03-11-.jpg?1521302672&s=b5193a28bb52d1bd8847d5f32e5b5dc0",
    description:
      "Parkour is a training discipline where practitioners aim to get from one point to another in a complex environment, without assisting equipment and in the fastest and most efficient way possible.",
  },
];

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/URBAN_HOBBIES")
  .then(() => {
    console.log("CONNECTED WITH STUFF");
    Hobbies.insertMany(HobbiesArr).then(() => {
      console.log("ADDED STUFF");
      mongoose.disconnect();
      console.log("DISCONNECTED STUFF");
    });
  });
