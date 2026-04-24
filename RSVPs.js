
const fetch = require('node-fetch');
setInterval(async ()=>{
  const id = Math.random() > 0.5 ? '1':'2';
  await fetch(`http://localhost:4000/events/${id}/rsvp`, { method: 'POST' });
  console.log('simulated rsvp for', id);
}, 8000);