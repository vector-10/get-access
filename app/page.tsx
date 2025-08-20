import Hero from "@/components/Hero"
import Header from "@/components/Header"
import Events from "@/components/Events"
import Partners from "@/components/Partners";
import Process from  "@/components/Process"
import Footer from "@/components/Footer";
import Access from "@/components/Access";



export default function Home() {
  return (
    <div className="">
      <Header /> 
      <Hero />
      <Access /> 
      <Events />
      <Partners />
      <Process />
      <Footer />
    </div>
  );
}