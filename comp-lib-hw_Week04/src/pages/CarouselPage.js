// CarouselPage.jsx - Clean and simple implementation

import React from 'react';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';

const CarouselPage = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Carousel Component Demo
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                    Interactive carousel with expandable pill-shaped cards using Framer Motion for smooth animations.
                </p>
            </div>

            {/* Component Demo Section */}
            <div className="bg-white rounded-lg  p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                    Interactive Carousel
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 md:mb-6">
                    Tap any card thumbnail to expand it. Tap the expanded card again to close it.
                </p>

                {/* Carousel Component */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4">
                    <Carousel />
                </div>
                
            </div>

            {/* Usage Instructions */}
            <Banner 
                title="How to Use"
                variant="blue"
                instructions={[
                    "Tap any card thumbnail to expand it",
                    "Tap the expanded card again to close it", 
                    "Use the \"× Close Carousel\" button to reset all cards",
                    "Cards use Framer Motion for smooth animations"
                ]}
            />
        </div>
    );
};

export default CarouselPage;
