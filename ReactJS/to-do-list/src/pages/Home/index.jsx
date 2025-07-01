import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Tab from '../../components/Tab';
import { addTab, destroyTab } from '../../redux/tab.slice';
import * as S from './styled';

const Home = () => {
  const [keyword, setKeyword] = useState('')

  const schema = yup.object({
    title: yup.string().trim().required('Vui lòng nhập đầy đủ Title'),
    content: yup.string().trim().required('Vui lòng nhập đầy đủ Content'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const dispatch = useDispatch();

  const { tabList } = useSelector((state) => state.tab)

  const onSubmit = (data) => {
    dispatch(addTab({ title: data.title, content: data.content }))
    reset()
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
      <S.FormContainer className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>To Do List App</h1>
        <div>
          <label htmlFor="title">Title</label>
          <S.Input
            id="title"
            {...register('title')}
            error={!!errors.title}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <S.Input
            id="content"
            {...register('content')}
            error={!!errors.content}
          />
          {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}
        </div>
        <S.ButtonForm type="submit">Add task</S.ButtonForm>
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
