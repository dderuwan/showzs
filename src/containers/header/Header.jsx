import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './header.css';
import { FaBook } from 'react-icons/fa'; 
import banner from '../../assest/banner.jpg';
import ticket from '../../assest/ticket.jpg';

const Header = () => {
  const [movie, setMovie] = useState(null);
  const [event, setEvent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const movieResponse = await axios.get('http://127.0.0.1:8000/api/movie');
        const eventResponse = await axios.get('http://localhost:8000/api/live-events/showLastEvent');
        setMovie(movieResponse.data);
        setEvent(eventResponse.data);
      } catch (error) {
        console.error('Failed to fetch latest data:', error);
      }
    };

    fetchLatestData();
  }, []);

  const handleBookNowMovie = () => {
    navigate('/Movies');
  };

  const handleBookNowEvent = () => {
    navigate('/LiveEvents');
  };

  const handleWatchNowMovie = () => {
    setSelectedItem(movie);
    setIsPopupOpen(true);
  };

  const handleWatchNowEvent = () => {
    setSelectedItem(event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className='header'>
      <div className='header-container'>
        <div className="overlay"></div>
        <img src={banner} alt="Banner" />
        <div className="card-overlay">
          {movie && (
            <div className="card">
              <img src={movie.picture} alt={movie.title} />
              <button className="book-now" onClick={handleBookNowMovie}>
                <FaBook /> Book Now
              </button>
            </div>
          )}
          {event && (
            <div className="card">
              <img src={event.coverImage} alt={event.title} />
              <button className="book-now" onClick={handleBookNowEvent}>
                <FaBook /> Book Now
              </button>
            </div>
          )}
        </div>
        <div className='additional-content'>
          <div className='card-description'>
            <div className='card-details'>
              <button className='watch-now' onClick={handleWatchNowMovie}>
                Watch Now
              </button>
            </div>
            <div className='ticket'>
              <img src={ticket} alt='Ticket for Movie 1'/>
            </div>
          </div>
          <div className='card-description'>
            <div className='card-details'>
              <button className='watch-now' onClick={handleWatchNowEvent}>
                Watch Now
              </button>
            </div>
            <div className='ticket'>
              <img src={ticket} alt='Ticket for Event 2'/>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Box */}
      {isPopupOpen && selectedItem && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.description}</p>
            <p>Category: {selectedItem.category}</p>
            <p>Ticket Price: {selectedItem.ticketPrice}</p>
            <button onClick={closePopup} className="close-popup">Buy Ticket</button>
          </div>
        </div> 
      )}
    </section>
  );
}

export default Header;