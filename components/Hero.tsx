'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface SlideData {
  image: string
  title: string
  subtitle: string
}

const slides = [
  {
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=400&fit=crop&crop=center",
    title: "OnChain Conference Lagos 2025",
    subtitle: "Join 1000+ Web3 builders"
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=400&fit=crop&crop=center",
    title: "Web3 Lagos Meetup",
    subtitle: "Network with crypto enthusiasts" 
  },
  {
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=400&fit=crop&crop=center",
    title: "Block Party 2025",
    subtitle: "Move Your Body"
  }
]


export default function HeroCarousel() {
  return (
    <div className="w-full px-[4rem] md:px-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="w-full h-[400px] rounded-2xl"
      >
        {slides.map((slide: SlideData, index: number) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative w-full h-full">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              
              
              {/* Text content */}
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}