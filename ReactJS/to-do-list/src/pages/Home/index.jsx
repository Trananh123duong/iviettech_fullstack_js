import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '../../components/Tab';
import { addTab, destroyTab } from '../../redux/tab.slice';
import * as S from './styled';

const Home = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [keyword, setKeyword] = useState('')
  const [errorTitle, setErrorTitle] = useState('')
  const [errorContent, setErrorContent] = useState('')

  const dispatch = useDispatch();

  const { tabList } = useSelector((state) => state.tab)

  const handlerAddTab = (e) => {
    e.preventDefault();

    let hasError = false;
    if (!title.trim()) {
      setErrorTitle('Vui lòng nhập đầy đủ Title');
      hasError = true;
    } else {
      setErrorTitle('');
    }
    if (!content.trim()) {
      setErrorContent('Vui lòng nhập đầy đủ Content');
      hasError = true;
    } else {
      setErrorContent('')
    }
    if (hasError) return;

    dispatch(
      addTab({
        title: title,
        content: content
      })
    )

    setTitle('')
    setContent('')
  }

  const renderListTab = () => {
    const keywordLower = keyword.trim().toLowerCase();

    const filteredList = tabList.filter((item) => {
      const titleLower = item.title.toLowerCase();
      const contentLower = item.content.toLowerCase();

      return (
        titleLower.indexOf(keywordLower) !== -1 ||
        contentLower.indexOf(keywordLower) !== -1
      );
    });

    return filteredList.map((item) => (
      <Tab
        key={item.id}
        id={item.id}
        title={item.title}
        content={item.content}
        deleteTab={deleteTab}
      />
    ));
  }

  const deleteTab = (id) => {
    dispatch(destroyTab(id))
  }

  return (
    <S.Container>
      <S.FormContainer className="form" onSubmit={(e) => handlerAddTab(e)}>
        <h1>To Do List App</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errorTitle}
          />
          {errorTitle && <p style={{ color: 'red' }}>{errorTitle}</p>}
        </div>
        <div>
          <label htmlFor="">Content</label>
          <input
            id="content"
            value={content}
            onChange={(e) =>
            setContent(e.target.value)}
            error={!!errorContent}
          />
          {errorContent && <p style={{ color: 'red' }}>{errorContent}</p>}
        </div>
        <S.ButtonForm>Add task</S.ButtonForm>
      </S.FormContainer>
      <S.SearchContainer>
        <input id="keyword" onChange={(e) => setKeyword(e.target.value)}/>
        <S.Button htmlFor="keyword" onClick={() => renderListTab()}>Search</S.Button>
      </S.SearchContainer>
      <div>
        {renderListTab()}
      </div>
    </S.Container>
  )
}

export default Home
