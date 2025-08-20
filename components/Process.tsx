import React from 'react';
import { Shield, Search, Ticket, User, CheckCircle, ArrowRight } from 'lucide-react';

interface ProcessCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    feature: string;
    bgClass: string;
    hoverClass: string;
    decorations: React.ReactNode;
}

const Process = () => {
    const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, feature, bgClass, hoverClass, decorations }) => (
        <div className={`relative ${bgClass} ${hoverClass} rounded-3xl p-8 text-white overflow-hidden flex-shrink-0 transition-all duration-300 cursor-pointer`} 
             style={{ 
                 height: '627px',  
                 width: '541px'   
             }}>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-orange-100 mb-6 leading-relaxed">
                    {description}
                </p>
                
                <div className="flex items-center space-x-2 text-white/90">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">{feature}</span>
                </div>
            </div>
            {decorations}
        </div>
    );

    const cards = [
        
        {
            icon: Search,
            title: "Discover Events",
            description: "Browse verified Web3 events across Nigeria. Filter by location, date, and category to find your perfect match.",
            feature: "Verified organizers only",
            bgClass: "bg-gradient-to-br from-gray-700 to-gray-800",
            hoverClass: "hover:from-gray-800 hover:to-gray-900",
            decorations: (
                <>
                    <div className="absolute top-6 right-6">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="w-8 h-8 bg-orange-500/20 rounded-lg"></div>
                            <div className="w-8 h-8 bg-gray-600/30 rounded-lg"></div>
                            <div className="w-8 h-8 bg-gray-600/30 rounded-lg"></div>
                            <div className="w-8 h-8 bg-orange-500/20 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-6 right-6">
                        <div className="flex flex-col space-y-1">
                            <div className="w-16 h-2 bg-orange-500/30 rounded-full"></div>
                            <div className="w-12 h-2 bg-gray-600/30 rounded-full"></div>
                            <div className="w-20 h-2 bg-gray-600/30 rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-500/10 rounded-full"></div>
                </>
            )
        },
        {
            icon: Shield,
            title: "Verify ID",
            description: "Secure your identity with Civic Auth's blockchain-based verification system. One-time setup, lifetime trust.",
            feature: "Blockchain secured",
            bgClass: "bg-gradient-to-br from-orange-400 to-orange-500",
            hoverClass: "hover:from-orange-600 hover:to-orange-700",
            decorations: (
                <>
                    <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full"></div>
                    <div className="absolute bottom-4 left-4">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                            <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                            <div className="w-3 h-3 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <User className="h-12 w-12 text-white/20" />
                    </div>
                </>
            )
        },
        {
            icon: Ticket,
            title: "Secure Your Spot",
            description: "Get your blockchain-secured ticket and attend with confidence. No fraud, no fake tickets, just seamless entry.",
            feature: "Fraud-proof tickets",
            bgClass: "bg-gradient-to-br from-orange-300 to-amber-400",
            hoverClass: "hover:from-orange-500 hover:to-amber-600",
            decorations: (
                <>
                    <div className="absolute top-8 right-8">
                        <div className="w-20 h-24 bg-white/10 rounded-xl border-2 border-white/20">
                            <div className="p-3">
                                <div className="w-full h-3 bg-white/30 rounded mb-2"></div>
                                <div className="w-3/4 h-2 bg-white/20 rounded mb-1"></div>
                                <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                            </div>
                            <div className="mx-3 mb-2">
                                <div className="w-full h-8 bg-white/20 rounded flex items-center justify-center">
                                    <div className="grid grid-cols-4 gap-1">
                                        {[...Array(16)].map((_, i) => (
                                            <div key={i} className="w-1 h-1 bg-white/60 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 flex space-x-1">
                        <div className="w-2 h-8 bg-white/30 rounded-full"></div>
                        <div className="w-2 h-6 bg-white/20 rounded-full"></div>
                        <div className="w-2 h-10 bg-white/40 rounded-full"></div>
                        <div className="w-2 h-4 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full"></div>
                </>
            )
        }
    ];

    return (
        <section id="process" className="w-full py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">How Access Works</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Discover amazing events, Verify Identity and enjoy secure ticketing - all in three simple steps
                    </p>
                </div>

                <div className="mb-16">
                    <div className="hidden lg:flex lg:justify-center lg:space-x-8">
                        {cards.map((card, index) => (
                            <ProcessCard key={index} {...card} />
                        ))}
                    </div>

                    <div className="lg:hidden overflow-x-auto">
                        <div className="flex space-x-6 px-4" style={{ width: 'fit-content' }}>
                            {cards.map((card, index) => (
                                <ProcessCard key={index} {...card} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center py-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Experience Secure Event Ticketing?
                    </h3>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of Web3 enthusiasts who trust Access for verified, fraud-proof event experiences Globally!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-orange-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-800 transition-colors flex items-center space-x-2 shadow-lg">
                            <span>Find an Event</span>
                            <ArrowRight className="h-5 w-5" />
                        </button>
                        
                        <button className="text-orange-600 flex items-center justify-around px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-50 transition-colors border-2 border-orange-200">
                            <h2>Start Organizing Events</h2>   <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-6">
                        Powered by <a href="https://www.civic.com/" className='text-[#6b70fc]'>Civic Auth</a> • Trusted by 50,000+ users • 100% verified organizers
                    </p>
                </div>
                
            </div>
        </section>
    );
}

export default Process;