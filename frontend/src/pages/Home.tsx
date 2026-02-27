import ContactBox from '../components/ContactBox/ContactBox';

const Home = () => {
  return (
    <main className='home'>
      <h1>Alternativ Grogrund</h1>
      <h2>
        Alternativ Grogrund är en idell förening som utforskar och implementerar
        strategier för att skapa en mer rättvis, hållbar och välmående värld.
      </h2>
      <blockquote>
        "Vi säger inte: gör såhär. Vi säger: såhär kan man också göra."
      </blockquote>
      <div>
        <div>
          <p>Kontakt: </p>
          <a href='mailto:info@alternativgrogrund.se'>
            info@alternativgrogrund.se
          </a>
        </div>
        <div>
          <p>Instagram:</p>
          <a
            href='https://www.instagram.com/alternativgrogrund/'
            target='_blank'
            rel='noopener noreferrer'
          >
            @alternativgrogrund
          </a>
        </div>
      </div>
      <ContactBox />
    </main>
  );
};

export default Home;
