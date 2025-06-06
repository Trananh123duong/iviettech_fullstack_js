import React, { useState } from 'react';
import MainCss from './Main.module.css';

const Main = ({isShowSiderBar}) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [tabList, setTabList] = useState([1, 2, 3, 4]);

  const renderTabItem = () => {
    return tabList.map((item, index) => {
      return (
        <button
          key={index}
          className={`${MainCss['tab-button']} ${tabIndex === item ? MainCss['active-tab'] : ""}`}
          onClick={() => setTabIndex(item)}
        >
          Tab {item}
        </button>
      )
    });
  }
  const renderTabContent = () => {
    return <p>Content of tab {tabIndex}</p>
  }
  const handleAddTab = () => {
    const newTabList = [...tabList, tabList.length + 1]
    setTabList(newTabList)
  }

  return (
    <div className={`${MainCss['tabs-container']} ${isShowSiderBar ? MainCss['show-sidebar'] : ''}`}>
      <div className="tab-buttons">
        {renderTabItem()}
      </div>

      <div className={MainCss['tab-content']}>
        {renderTabContent()}
      </div>

      <button type="button" class="btn btn-secondary" onClick={() => handleAddTab() }>Add Tab</button>
    </div>
  )
}

export default Main
