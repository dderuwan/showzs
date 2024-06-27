import React from 'react';
import event1 from '../../assest/youth.jpg'; 
import event2 from '../../assest/youth.jpg'; 
import event3 from '../../assest/youth.jpg'; 
import './events.css';

const Events = () => {
  return (
    <section className="live-events">
      <div className="live-events-container">
        <h1>Live Events</h1>
        <div className="event-container">
          <div className="event">
            <img src={event1} alt="Event 1" />
            <button className="watch-now">Watch Now</button>
          </div>
          <div className="event">
            <img src={event2} alt="Event 2" />
            <button className="watch-now">Watch Now</button>
          </div>
          <div className="event">
            <img src={event3} alt="Event 3" />
            <button className="watch-now">Watch Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
