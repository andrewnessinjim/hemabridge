import CountStatistics from "@/components/Statistics";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Spacer from "@/components/Spacer";
import Books from "@/components/BooksSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";
import TunicaDivider from "@/components/TunicaDivider";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <TunicaDivider mode="top" />
        <Spacer size={32} />
        <HowItWorksSection />
        <Spacer size={32} />
        <Books />
        <Spacer size={32} />
        <CountStatistics />
        <Spacer size={32} />
        <CallToActionSection />
      </main>
      <Spacer size={32} />
      <TunicaDivider mode="bottom" />
      <Spacer size={32} />
      <Footer />
    </div>
  );
}

export default App;
