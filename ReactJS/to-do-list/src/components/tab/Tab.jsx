import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTab } from '../../redux/tab.slice';

const Tab = ({ id, title, content, deleteTab }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [titleTab, setTitleTab] = useState(title)
  const [contentTab, setContentTab] = useState(content)
  const [errorTitle, setErrorTitle] = useState('')
  const [errorContent, setErrorContent] = useState('')

  const dispatch = useDispatch();

  const handleSave = () => {
    let hasError = false;
  
    if (!titleTab.trim()) {
      setErrorTitle('Title không được để trống');
      hasError = true;
    } else {
      setErrorTitle('');
    }
  
    if (!contentTab.trim()) {
      setErrorContent('Content không được để trống');
      hasError = true;
    } else {
      setErrorContent('');
    }
  
    if (hasError) return;

    dispatch(
      updateTab({
        id: id,
        title: titleTab,
        content: contentTab
      })
    )
    setIsEdit(false);
  };
  
  
  const renderTabData = () => {
    if (isEdit) {
      return (
        <>
          <div>
            <label htmlFor="title">Title</label>
            <input 
              id="title" 
              value={titleTab} 
              onChange={(e) => setTitleTab(e.target.value)}
              className={errorTitle ? 'error-input' : ''}
            />
            {errorTitle && <p style={{ color: 'red' }}>{errorTitle}</p>}
          </div>
          <div>
            <label htmlFor="">Content</label>
            <input 
              id="content" 
              value={contentTab} 
              onChange={(e) => setContentTab(e.target.value)}
              className={errorContent ? 'error-input' : ''}
            />
            {errorContent && <p style={{ color: 'red' }}>{errorContent}</p>}
          </div>
        </>
      )
    }
    return (
      <>
        <h2>{title}</h2>
        <p>{content}</p>
      </>
    )
  }

  const renderTabAction = () => {
    if (isEdit) {
      return (
        <>
          <button className="button" onClick={() => handleSave()}>Save</button>
          <button className="button" onClick={() => setIsEdit(false)}>Cancel</button>
        </>
      )
    }
    return <button className="button" onClick={() => setIsEdit(true)}>Edit</button>
  }

  return (
    <div>
      <div className="card">
        {renderTabData()}
        <div className="action-buttons">
          {renderTabAction()}
          <button className="button" onClick={() => deleteTab(id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Tab
