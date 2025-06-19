import { useState } from 'react';
import * as S from './styled';

const Main = ({isShowSiderBar}) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [tabList, setTabList] = useState([1, 2, 3, 4]);

  const renderTabItem = () => {
    return tabList.map((item, index) => {
      const isActive = tabIndex === item
      return (
        <S.TabButton
          key={index}
          isActive={isActive}
          onClick={() => setTabIndex(item)}
        >
          Tab {item}
        </S.TabButton>
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
    <S.TabsContainer isShowSiderBar={isShowSiderBar}>
      <S.TabButtons>
        {renderTabItem()}
      </S.TabButtons>

      <S.TabContent>
        {renderTabContent()}
      </S.TabContent>

      <button type="button" class="btn btn-secondary" onClick={() => handleAddTab() }>Add Tab</button>
    </S.TabsContainer>
  )
}

export default Main
