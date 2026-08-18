import CountStatistics from "@/components/Statistics";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Spacer from "@/components/Spacer";
import Books from "@/components/BooksSection";

function App() {
  return (
    <div>
      <Header />
      <Spacer size={20} />
      <Hero />
      <Spacer size={32} />
      <CountStatistics />
      <Spacer size={32} />
      <Books />
    </div>
  );
}

export default App;
