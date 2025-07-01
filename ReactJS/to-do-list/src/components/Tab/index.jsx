import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { updateTab } from '../../redux/tab.slice';
import * as S from './styled';

const Tab = ({ id, title, content, deleteTab }) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  // Schema Yup
  const schema = yup.object({
    titleTab: yup.string().trim().required('Title không được để trống'),
    contentTab: yup.string().trim().required('Content không được để trống'),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titleTab: title,
      contentTab: content,
    },
  });

  const onSubmit = (data) => {
    dispatch(
      updateTab({
        id: id,
        title: data.titleTab,
        content: data.contentTab,
      })
    );
    setIsEdit(false);
  };

  const renderTabData = () => {
    if (isEdit) {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="titleTab">Title</label>
            <S.Input
              id="titleTab"
              {...register('titleTab')}
              error={!!errors.titleTab}
            />
            {errors.titleTab && (
              <p style={{ color: 'red' }}>{errors.titleTab.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="contentTab">Content</label>
            <S.Input
              id="contentTab"
              {...register('contentTab')}
              error={!!errors.contentTab}
            />
            {errors.contentTab && (
              <p style={{ color: 'red' }}>{errors.contentTab.message}</p>
            )}
          </div>
          <S.ActionButton>
            <S.Button type="submit">Save</S.Button>
            <S.Button type="button" onClick={() => { setIsEdit(false); reset(); }}>
              Cancel
            </S.Button>
          </S.ActionButton>
        </form>
      );
    }
    return (
      <>
        <h2>{title}</h2>
        <p>{content}</p>
      </>
    );
  };

  const renderTabAction = () => {
    if (!isEdit) {
      return <S.Button onClick={() => setIsEdit(true)}>Edit</S.Button>;
    }
    return null; // Vì button Save/Cancel nằm trong form Edit
  };

  return (
    <div>
      <S.CardContainer>
        {renderTabData()}
        <S.ActionButton>
          {renderTabAction()}
          <S.Button onClick={() => deleteTab(id)}>Delete</S.Button>
        </S.ActionButton>
      </S.CardContainer>
    </div>
  );
};

export default Tab;
