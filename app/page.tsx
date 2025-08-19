import Hero from "@/components/Hero"
import Header from "@/components/Header"
import Events from "@/components/Events"
import Partners from "@/components/Partners";
import Process from  "@/components/Process"



export default function Home() {
  return (
    <div className="">
      <Header />  
      <Hero />
      <Events />
      <Partners />
      <Process />
    </div>
  );
}