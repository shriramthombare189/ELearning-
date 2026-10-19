import Navbar from "./Navbar";
import AuroraHero from "./AuroraHero";
import CoursePlaylistCard from "./CoursePlaylistCard";
import About from "./About";
import Contact from "./Contact";
import FadeInSection from "./FadeInSection";

export default function Layout() {
  return (
    <>
      <Navbar />

      <section id="home">
        <FadeInSection>
          <AuroraHero />
        </FadeInSection>
      </section>

      <section id="courses" className="py-20 bg-black">
        <FadeInSection>
          <CoursePlaylistCard />
        </FadeInSection>
      </section>

      <section id="about" className="py-20 bg-black">
        <FadeInSection>
          <About />
        </FadeInSection>
      </section>

      <section id="contact" className="py-20 bg-black">
        <FadeInSection>
          <Contact />
        </FadeInSection>
      </section>
    </>
  );
}
