"use client"
import React from 'react';

const Partners = () => {
    const partners = [
        "Binance", "Coinbase", "Polygon", "Chainlink", "Uniswap", "Solana",
        "OpenSea", "MetaMask", "Civic Auth", "Solana", "Ethereum Foundation"
    ];

    const duplicatedPartners = [...partners, ...partners];

    return (
        <section id="partners" className="w-full py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 text-center mb-8">
                        Powered by Civic Auth & Trusted by Industry Leaders
                    </h3>
                    
                    <div className="relative">
                        <div className="flex overflow-hidden">
                            <div className="flex animate-scroll space-x-24 whitespace-nowrap">
                                {duplicatedPartners.map((partner, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 text-2xl font-bold text-gray-600 hover:text-orange-600 transition-colors duration-300"
                                        style={{
                                            fontFamily: index % 4 === 0 ? 'Inter, sans-serif' : 
                                                      index % 4 === 1 ? 'Helvetica, sans-serif' :
                                                      index % 4 === 2 ? 'Arial, sans-serif' : 
                                                      'system-ui, sans-serif'
                                        }}
                                    >
                                        {partner}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
                    </div>
                </div>
                
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}

export default Partners;