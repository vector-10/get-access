import React from 'react';
import { Shield, CheckCircle, Users, Ticket, ArrowRight } from 'lucide-react';
import Image from 'next/image'

const Access = () => {
    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Content Side */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Experience Events the 
                                <span className="text-orange-600"> Web3 Way</span>
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                The world's first event and ticketing platform built for Web3. Get verified once, 
                                access premium events for a life time. No more traffic, ticket fraud, or identity theft. <br/> <span className='text-orange-600'>Just a seamless experience.</span> 
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Shield className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Blockchain Secured
                                    </h3>
                                    <p className="text-gray-600">
                                        Powered by Civic Auth verification. Your identity remains secure and Attack proof.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        100% Verified Organizers
                                    </h3>
                                    <p className="text-gray-600">
                                        Every event organizer goes through our rigorous verification process. Only authentic events make it to our platform.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Ticket className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Fraud-Proof Tickets
                                    </h3>
                                    <p className="text-gray-600">
                                        Our auto-wallet feature ensures your identity is tied to a secure NFT which can only be assigned to each attendee. 
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 shadow-lg">
                                <span>Explore Events</span>
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-8 pt-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">10K+</div>
                                <div className="text-sm text-gray-600">Verified Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">500+</div>
                                <div className="text-sm text-gray-600">Events Hosted</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">100%</div>
                                <div className="text-sm text-gray-600">Fraud-Free</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Side */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative w-full h-80">
                            <Image 
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&crop=center"
                                alt="Premium event venue"
                                fill
                                className="object-cover rounded-2xl shadow-2xl"
                                quality={90}
                                priority
                            />
                        </div>

                        {/* Floating Cards */}
                        <div className="absolute -top-4 -right-4 w-32 h-20 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-20">
                            <div className="flex items-center space-x-2 mb-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs font-medium text-gray-700">Verified</span>
                            </div>
                            <div className="text-xs text-gray-600">Blockchain Secured</div>
                        </div>

                        <div className="absolute -bottom-4 -left-4 w-36 h-24 bg-white rounded-xl shadow-lg border border-gray-100 p-3 z-20">
                            <div className="flex items-center space-x-2 mb-2">
                                <Users className="h-4 w-4 text-orange-600" />
                                <span className="text-xs font-medium text-gray-700">Live Event</span>
                            </div>
                            <div className="text-xs text-gray-600">2,847 attending</div>
                            <div className="text-xs text-orange-600 font-medium">Join now →</div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute top-8 -right-8 w-32 h-32 bg-orange-100 rounded-full opacity-60 -z-10"></div>
                        <div className="absolute -bottom-8 left-8 w-24 h-24 bg-orange-200 rounded-full opacity-40 -z-10"></div>

                        {/* Additional Images */}
                        <div className="absolute top-16 right-16 w-24 h-16 z-5">
                            <Image 
                                src="https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=200&h=140&fit=crop&crop=center"
                                alt="Conference setup"
                                fill
                                className="object-cover rounded-lg shadow-md opacity-80"
                                quality={80}
                            />
                        </div>
                        
                        <div className="absolute bottom-20 left-20 w-28 h-18 z-5">
                            <Image 
                                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=200&h=140&fit=crop&crop=center"
                                alt="Party atmosphere"
                                fill
                                className="object-cover rounded-lg shadow-md opacity-75"
                                quality={80}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Access;