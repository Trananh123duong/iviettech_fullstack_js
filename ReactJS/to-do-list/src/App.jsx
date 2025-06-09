import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Tab from './components/tab/tab';


function App() {
  let listTabStorage = localStorage.getItem('listTabStorage') ? JSON.parse(localStorage.getItem('listTabStorage')) : [];

  const [listTab, setListTab] = useState(listTabStorage)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [keyword, setKeyword] = useState('')
  const [errorTitle, setErrorTitle] = useState('')
  const [errorContent, setErrorContent] = useState('')

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

    const newTab = {
      id: uuidv4(),
      title: title,
      content: content
    };

    const newListTab = [...listTab, newTab];
    localStorage.setItem('listTabStorage', JSON.stringify(newListTab));
    setListTab(newListTab)

    setTitle('')
    setContent('')
  }
  
  const handleUpdateTab = (id, title, content) => {
    const index = listTab.findIndex(item => item.id === id)
    const newListTab = [...listTab];

    newListTab.splice(index, 1, {
      id: id,
      title: title,
      content: content
    })

    localStorage.setItem('listTabStorage', JSON.stringify(newListTab));
    setListTab(newListTab);
  }

  const renderListTab = () => {
    const keywordLower = keyword.trim().toLowerCase();

    const filteredList = listTab.filter((item) => {
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
        handleUpdateTab={handleUpdateTab}
      />
    ));
  }

  const deleteTab = (id) => {
    const newListTab = listTab.filter(item => item.id !== id)
    localStorage.setItem('listTabStorage', JSON.stringify(newListTab));
    setListTab(newListTab);
  }

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => handlerAddTab(e)}>
        <h1>To Do List App</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className={errorTitle ? 'error-input' : ''}
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
            className={errorContent ? 'error-input' : ''}
          />
          {errorContent && <p style={{ color: 'red' }}>{errorContent}</p>}
        </div>
        <button className="button">Add task</button>
      </form>
      <div className="search">
        <input id="keyword" onChange={(e) => setKeyword(e.target.value)}/>
        <button htmlFor="keyword" onClick={() => renderListTab()}>Search</button>
      </div>
      <div>
        {renderListTab()}
      </div>
    </div>
  )
}

export default App
