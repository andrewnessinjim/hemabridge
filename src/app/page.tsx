import CountStatistics from "@/components/Statistics";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Spacer from "@/components/Spacer";
import Books from "@/components/BooksSection";
import HowItWorksSection from "@/components/HowItWorksSection";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Spacer size={20} />
        <Hero />
        <Spacer size={32} />
        <HowItWorksSection />
        <Spacer size={32} />
        <Books />
        <Spacer size={32} />
        <CountStatistics />
      </main>
    </div>
  );
}

export default App;
