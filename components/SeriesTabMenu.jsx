'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SeriesTabMenu({ tabs, color }) {
	const availableTabs = tabs.filter(tab => tab.available);
	const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || 'specs');

	const activeTabContent = availableTabs.find(tab => tab.id === activeTab)?.content;

	return (
		<div className="mb-12">
			{/* Desktop Tabs */}
			<div className="hidden md:flex bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-xl py-2 px-3 mb-6 border border-slate-200/60 dark:border-slate-800/80 gap-3">
				{availableTabs.map((tab) => {
					const isActive = activeTab === tab.id;
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-98 ${
								isActive
									? 'text-white shadow-lg scale-[1.02]'
									: 'text-slate-650 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-100'
							}`}
							style={
								isActive
									? { backgroundColor: color, boxShadow: `0 10px 20px -10px ${color}` }
									: {}
							}
						>
							<span>{tab.label}</span>
						</button>
					);
				})}
			</div>

			{/* Mobile Dropdown Tab Selector */}
			<div className="md:hidden mb-6">
				<div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-800/80 overflow-hidden">
					<button
						onClick={() => {
							const dropdown = document.getElementById('mobile-tab-dropdown');
							dropdown.classList.toggle('hidden');
						}}
						className="w-full flex items-center justify-between py-4 px-6 font-bold text-sm uppercase tracking-wider text-white transition-all duration-300"
						style={{ backgroundColor: color }}
					>
						<div className="flex items-center gap-3">
							<span>
								{availableTabs.find(tab => tab.id === activeTab)?.label}
							</span>
						</div>
						<ChevronDown className="w-4 h-4 shrink-0 transition-transform duration-300" />
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
									className="w-full flex items-center gap-3 py-4 px-6 text-slate-700 dark:text-slate-300 hover:bg-slate-150/40 dark:hover:bg-slate-800/30 transition-colors border-t border-slate-200/60 dark:border-slate-800/60 font-semibold text-xs uppercase tracking-wider text-left"
								>
									<span>{tab.label}</span>
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