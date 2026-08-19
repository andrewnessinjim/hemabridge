import CountStatistics from "@/components/Statistics";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Spacer from "@/components/Spacer";
import Books from "@/components/BooksSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Spacer size={32} />
        <HowItWorksSection />
        <Spacer size={32} />
        <Books />
        <Spacer size={32} />
        <CountStatistics />
        <Spacer size={32} />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
