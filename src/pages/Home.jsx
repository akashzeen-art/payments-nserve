import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CrossBorderVideo from '../components/CrossBorderVideo';
import CurrencyConverter from '../components/CurrencyConverter';
import GlobalMap from '../components/GlobalMap';
import SecuritySection from '../components/SecuritySection';
import ParallaxServices from '../components/ParallaxServices';
import RolloutTimeline from '../components/RolloutTimeline';
import ResourcesSection from '../components/ResourcesSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CrossBorderVideo />
        <CurrencyConverter />
        <GlobalMap />
        <SecuritySection />
        <ParallaxServices />
        <RolloutTimeline />
        <ResourcesSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
