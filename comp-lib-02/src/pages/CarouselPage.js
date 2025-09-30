// CarouselPage.js

import React from 'react';
import Carousel from '../components/Carousel';

// Add custom page background
const pageStyle = {
    background: 'white',
    minHeight: '100vh'
};

const CarouselPage = () => {
    return (
        <div style={pageStyle}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Page Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    Carousel Component Demo
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
                    Interactive carousel with expandable cards using Framer Motion for smooth animations.
                </p>
            </div>

            {/* Component Demo Section */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                    Interactive Carousel
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 md:mb-6">
                    Tap any card to expand it. The carousel is fully responsive and optimized for mobile devices.
                </p>
             
                {/* Carousel Component */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4">
                    <Carousel />
                </div>
            </div>

            {/* Mobile Usage Instructions */}
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Mobile Usage:</h3>
                <ul className="text-blue-700 space-y-1 text-sm sm:text-base">
                    <li>• Tap any card thumbnail to expand it</li>
                    <li>• Tap the expanded card again to close it</li>
                    <li>• Use the "× Close Carousel" button to reset all cards</li>
                </ul>
            </div>
        </div>
        </div>
    );
};

export default CarouselPage;
