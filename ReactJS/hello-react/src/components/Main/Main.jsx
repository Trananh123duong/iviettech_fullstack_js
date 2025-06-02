import React, { useState } from 'react';
import MainCss from './Main.module.css';

const Main = ({isShowSiderBar}) => {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <div className={`${MainCss['tabs-container']} ${isShowSiderBar ? MainCss['show-sidebar'] : ''}`}>
      <div className="tab-buttons">
        <button
          className={`${MainCss['tab-button']} ${tabIndex === 1 ? MainCss['active-tab'] : ""}`}
          onClick={() => setTabIndex(1)}
        >
          Tab 1
        </button>
        <button
          className={`${MainCss['tab-button']} ${tabIndex === 2 ? MainCss['active-tab'] : ""}`}
          onClick={() => setTabIndex(2)}
        >
          Tab 2
        </button>
        <button
          className={`${MainCss['tab-button']} ${tabIndex === 3 ? MainCss['active-tab'] : ""}`}
          onClick={() => setTabIndex(3)}
        >
          Tab 3
        </button>
        <button
          className={`${MainCss['tab-button']} ${tabIndex === 4 ? MainCss['active-tab'] : ""}`}
          onClick={() => setTabIndex(4)}
        >
          Tab 4
        </button>
      </div>

      <div className={MainCss['tab-content']}>
        {tabIndex === 1 && <p>Content of Tab 1</p>}
        {tabIndex === 2 && <p>Content of Tab 2</p>}
        {tabIndex === 3 && <p>Content of Tab 3</p>}
        {tabIndex === 4 && <p>Content of Tab 4</p>}
      </div>
    </div>
  )
}

export default Main
