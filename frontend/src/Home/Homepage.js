import React from 'react';
import './Home.css'

const HomePage = () => {
  return (
    <div className='container'>
      <section className="hero">
        <h2>Welcome to Our Website!</h2>
        <p>Discover amazing stories, testimonials, and more.</p>
        {/* Add hero section content here */}
      </section>

      <section className="hero">
        <h2>Stories</h2>
        <p>Here are some inspiring stories from our customers.</p>
        {/* Add stories content here */}
      </section>

      <section className="hero">
        <h2>Testimonials</h2>
        <p>Read what our customers have to say about us.</p>
        {/* Add testimonials content here */}
      </section>

      <section className="hero">
        <h2>About Us</h2>
        <p>Learn more about our company and mission.</p>
        {/* Add about content here */}
      </section>
    </div>
  );
};

export default HomePage;
