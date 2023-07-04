import React, { useState } from 'react';
import './TabSwitcher.css';


const TabSwitcher = ({ tabs, tabFunctions }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    tabFunctions[index]();
  };

  return (
    <div>
      <div className="tab-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;
