const axios = require('axios');

const render = (restaurants, reservations)=> {
  const filtered = restaurants 
    .filter( restaurant => {
      return !reservations.find(reservation => reservation.restaurantId === restaurant.id)
    });
  let html = `
      <div>
        <h2>Restaurants (${ filtered.length })</h2>
        <select>
          <option value=''>Choose A Restaurant</option>
          ${
              filtered
              .map( restaurant => {
                return `
                  <option value='${restaurant.id}'>
                    ${ restaurant.name }
                  </option>
                `;
              }).join('')
          }
        </select>
      </div>
    `;

  const restaurantsPanel = document.querySelector('#restaurants');
  restaurantsPanel.innerHTML = html;

  html = ` 
      <div>
        <h2>Reservations</h2>
        <ul>
          ${
              reservations 
              .map( reservation => {
                const restaurant = restaurants.find(restaurant => restaurant.id === reservation.restaurantId);
                return `
                  <li data-id='${reservation.id}'>
                    ${ restaurant.name }
                  </li>
                `;
            }).join('')
          }
        </ul>
      </div>
    `;
  const reservationPanel = document.querySelector('#reservations');
  reservationPanel.innerHTML = html;
};


const init = async()=> {
  try {
    const response = await fetch('/api/data');
    let { restaurants, reservations } = await response.json();

    const restaurantsPanel = document.querySelector('#restaurants');
    const reservationsPanel = document.querySelector('#reservations');
    
    render(restaurants, reservations);

    restaurantsPanel.addEventListener('change', async(ev)=> {
      const reservation = await axios.post('/api/reservations', { restaurantId: ev.target.value })
      reservations.push(reservation.data);
      render(restaurants,reservations);
    });

    reservationsPanel.addEventListener('click', async(ev)=> {
      if(ev.target.tagName === 'LI'){
        const id = ev.target.getAttribute('data-id')*1;
        const reservation = await axios.delete(`/api/reservations/${id}`);
        reservations = reservations.filter(reservation => reservation.id !== id);
        render(restaurants, reservations);
      }
    });

  }
  catch(ex){
    console.log(ex);
  }
};

init();
