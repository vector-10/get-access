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

const slides: SlideData[] = [
  {
    image: "/event1.jpg",
    title: "OnChain Conference Lagos 2025",
    subtitle: "Join 1000+ Web3 builders"
  },
  {
    image: "/event2.jpg", 
    title: "Web3 Lagos Meetup",
    subtitle: "Network with crypto enthusiasts"
  },
  {
    image: "/event3.jpg",
    title: "Nigeria Blockchain Summit",
    subtitle: "Learn from industry leaders"
  }
]

export default function HeroCarousel() {
  return (
    <div className="w-full px-4 md:px-8">
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
              
              {/* Colorful smoke gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/80 via-pink-500/40 to-transparent" />
              
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