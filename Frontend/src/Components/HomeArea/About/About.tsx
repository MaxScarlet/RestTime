import appConfig from "../../../Utils/AppConfig";
import "./About.css";

const websiteName = appConfig.WebSiteName;

function About(): JSX.Element {
  return (
    <div className="About">
      <section id="about-us">
        <h1>Welcome to {websiteName}: Your Passport to Extraordinary Journeys</h1>
        <p>
          Embark on a voyage of discovery with {websiteName}, where travel transcends
          ordinary experiences and ushers you into a world of unforgettable
          adventures. We are not just a travel agency; we're your dedicated
          companions on a global odyssey.
        </p>

        <h2>Our Vision</h2>
        <p>
          At {websiteName}, our vision is to ignite the wanderlust within you and
          transform your travels into soul-stirring narratives. We don't just
          offer destinations; we curate dreams, turning every voyage into a
          masterpiece of exploration and self-discovery.
        </p>

        <h2>Why Choose {websiteName}?</h2>
        <p>
          We believe travel is an art form. It's about weaving stories through
          every step of your journey, from the bustling streets of Tokyo to the
          serene landscapes of Patagonia. When you choose {websiteName}, you choose:
        </p>

        <ul>
          <li>Exquisite Destinations: Handpicked gems from around the world</li>
          <li>
            Cultural Immersion: Dive deep into diverse traditions and lifestyles
          </li>
          <li>Expert Guidance: Crafted itineraries and local insights</li>
          <li>Memories That Last: Experiences etched in your heart forever</li>
        </ul>

        <h2>Your Adventure Awaits</h2>
        <p>
          Whether you're a solo explorer, a couple seeking romance, or a family
          creating lifelong memories, {websiteName} has the perfect journey waiting
          for you. Join us in unraveling the world's mysteries, one destination
          at a time.
        </p>

        <h2>Let's Create Your Story</h2>
        <p>
          Let {websiteName} be your storyteller, your guide, and your confidant on
          this incredible voyage. Discover the world with us, and let's craft
          your narrative together.
        </p>
      </section>
    </div>
  );
}

export default About;
