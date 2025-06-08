import { useState } from 'react'
import './App.css'

function App() {
  const [listTab, setListTab] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlerAddTab = (e) => {
    e.preventDefault();
    const newTab = {
      title: title,
      content: content
    };
    setListTab([...listTab, newTab])
    setTitle('')
    setContent('')
  }

  const renderListTab = () => {
    return listTab.map((item, index) => {
      return (
        <div className="card">
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <div className="action-buttons">
            <button className="button">Edit</button>
            <button className="button" onClick={() => deleteTab(index)}>Delete</button>
          </div>
        </div>
      )
    })
  }

  const deleteTab = (id) => {
    const newListTab = [...listTab];
    newListTab.splice(id, 1)
    setListTab(newListTab);
  }  

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => handlerAddTab(e)}>
        <h1>To Do List App</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="">Content</label>
          <input id="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        <button className="button">Add task</button>
      </form>
      <div>
        {renderListTab()}
        {/* <div className="card">
          <h2>Task 1</h2>
          <p>Content of task 1</p>
          <div className="action-buttons">
            <button className="button">Edit</button>
            <button className="button">Delete</button>
          </div>
        </div>
        <div className="card">
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" value="Task 2" />
          </div>
          <div>
            <label htmlFor="">Content</label>
            <input id="content" value="Content of task 2" />
          </div>
          <div className="action-buttons">
            <button className="button">Save</button>
            <button className="button">Cancel</button>
            <button className="button">Delete</button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default App
