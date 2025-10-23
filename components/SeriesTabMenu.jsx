'use client';

import { useState } from 'react';

export default function SeriesTabMenu({ tabs, color }) {
    const availableTabs = tabs.filter(tab => tab.available);
    const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || 'specs');

    const activeTabContent = availableTabs.find(tab => tab.id === activeTab)?.content;

    return (
        <div className="mb-8">
            <div className="hidden md:flex bg-white rounded-2xl shadow-lg py-2 px-4 mb-6 border-2 border-gray-100 gap-4">
                {availableTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                            activeTab === tab.id
                                ? 'text-white shadow-lg transform scale-105'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        style={
                            activeTab === tab.id
                                ? { backgroundColor: color }
                                : {}
                        }
                    >
                        <span className="hidden lg:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="md:hidden mb-6">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
                    <button
                        onClick={() => {
                            const dropdown = document.getElementById('mobile-tab-dropdown');
                            dropdown.classList.toggle('hidden');
                        }}
                        className="w-full flex items-center justify-between py-4 px-6 font-semibold text-white"
                        style={{ backgroundColor: color }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl">
                                {availableTabs.find(tab => tab.id === activeTab)?.icon}
                            </span>
                            <span>
                                {availableTabs.find(tab => tab.id === activeTab)?.label}
                            </span>
                        </div>
                        <span className="text-xl">▼</span>
                    </button>
                    
                    <div id="mobile-tab-dropdown" className="hidden">
                        {availableTabs.map((tab) => (
                            tab.id !== activeTab && (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        document.getElementById('mobile-tab-dropdown').classList.add('hidden');
                                    }}
                                    className="w-full flex items-center gap-3 py-4 px-6 text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            )
                        ))}
                    </div>
                </div>
            </div>

            <div className="animate-fadeIn">
                {activeTabContent}
            </div>
        </div>
    );
}