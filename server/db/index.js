const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/tripplanner', {
});

const Restaurant = conn.define('restaurant', {
  name: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.FLOAT)
});

const Reservation = conn.define('reservation', {
});

Reservation.belongsTo(Restaurant);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const restaurants = [
    {
      name: "Bouley",
      place: {
        address: "75 Wall St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.01394, 40.705137]
      },
      cuisine: "French",
      price: 4
    },
    {
      name: "Marc Forgione",
      place: {
        address: "134 Reade St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.009567, 40.716526]
      },
      cuisine: "Seafood",
      price: 3
    },
    {
      name: "Tamarind",
      place: {
        address: "99 Hudson St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.008929, 40.718977]
      },
      cuisine: "Indian",
      price: 3
    },
    {
      name: "Hop Lee Restaurant",
      place: {
        address: "16 Mott St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.998509, 40.71423]
      },
      cuisine: "Chinese",
      price: 2
    },
    {
      name: "Jungsik",
      place: {
        address: "2 Harrison St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.0089, 40.718679]
      },
      cuisine: "Korean",
      price: 4
    },
    {
      name: "The Capital Grille",
      place: {
        address: "120 Broadway",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.010846, 40.708475]
      },
      cuisine: "Steakhouses, American",
      price: 4
    },
    {
      name: "Pylos",
      place: {
        address: "128 E 7th St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.984152, 40.726096]
      },
      cuisine: "Greek",
      price: 3
    },
    {
      name: "Joe's Shanghai",
      place: {
        address: "9 Pell St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.997761, 40.714601]
      },
      cuisine: "Shanghainese, Dim Sum",
      price: 2
    },
    {
      name: "Cafe Katja",
      place: {
        address: "79 Orchard St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.990565, 40.717719]
      },
      cuisine: "German, Austrian",
      price: 2
    },
    {
      name: "Rosanjin",
      place: {
        address: "141 Duane St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.007724, 40.716403]
      },
      cuisine: "Japanese",
      price: 3
    },
    {
      name: "Kittichai",
      place: {
        address: "60 Thompson St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.003242, 40.724014]
      },
      cuisine: "Thai",
      price: 4
    },
    {
      name: "Bianca Restaurant",
      place: {
        address: "5 Bleecker St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.992662, 40.725495]
      },
      cuisine: "Italian",
      price: 2
    },
    {
      name: "Rayuela",
      place: {
        address: "165 Allen St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.989756, 40.721266]
      },
      cuisine: "Spanish, Latin American",
      price: 3
    },
    {
      name: "Mas Farmhouse",
      place: {
        address: "39 Downing St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-74.003875, 40.729269]
      },
      cuisine: "New American, French",
      price: 4
    },
    {
      name: "Xe Lua",
      place: {
        address: "86 Mulberry St",
        city: "New York",
        state: "NY",
        phone: "123-456-7890",
        location: [-73.998626, 40.716544]
      },
      cuisine: "Vietnamese",
      price: 1
    }
  ];

  const promises = restaurants.map( restaurant => Restaurant.create({
    name: restaurant.name,
    location: restaurant.place.location
  }));

  const [first, ...rest] = await Promise.all(promises);
  await Reservation.create({ restaurantId: first.id });


};


module.exports = {
  syncAndSeed,
  models: {
    Restaurant,
    Reservation
  }
};
