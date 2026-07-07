import Hero from "../components/Hero/Hero";
import FeatureCards from "../components/FeatureCards/FeaturedCards";
import IndiaMap from "../components/IndianMap/IndianMap";
import CommunityPreview from "../components/CommunityPreview/CommunityPreview";
import "./Home.css";


export default function Home() {
  return (
    <main className="home">
      <Hero />
      <FeatureCards />
      <IndiaMap />
      <CommunityPreview />
    </main>
  );
}