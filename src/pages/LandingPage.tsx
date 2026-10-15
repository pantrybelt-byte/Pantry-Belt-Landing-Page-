import Hero from "../components/Hero";
import PromoSection from "../components/PromoSection";
import ValueProps from "../components/ValueProps";
import BrandStory from "../components/BrandStory";
import PioneersInAction from "../components/PioneersInAction";
import WaitlistForm from "../components/WaitlistForm";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <PromoSection />
      <ValueProps />
      <BrandStory />
      <PioneersInAction />
      <WaitlistForm />
    </>
  );
}
