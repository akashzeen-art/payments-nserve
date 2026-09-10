import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CrossBorderVideo from '../components/CrossBorderVideo';
import WhyChooseUs from '../components/WhyChooseUs';
import CurrencyConverter from '../components/CurrencyConverter';
import GlobalMap from '../components/GlobalMap';
import ParallaxServices from '../components/ParallaxServices';
import RolloutTimeline from '../components/RolloutTimeline';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CrossBorderVideo />
        <WhyChooseUs />
        <CurrencyConverter />
        <GlobalMap />
        <ParallaxServices />
        <RolloutTimeline />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
