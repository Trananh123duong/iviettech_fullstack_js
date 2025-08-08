import { Button, Card, Checkbox, Col, Flex, Input, Row, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PRODUCT_LIMIT } from '../../../../constants/paging'
import { getCategories } from '../../../../redux/thunks/category.thunk'
import { getProducts } from '../../../../redux/thunks/product.thunk'

import * as S from './styles'

const { Option } = Select

const List = () => {
  const [filterParams, setFilterParams] = useState({
    categoryId: [], // multiple IDs
    q: '',
    sort: 'id',
    order: 'asc',
    page: 1,
    limit: PRODUCT_LIMIT,
  })

  const dispatch = useDispatch()
  const { listProduct, loading } = useSelector((state) => state.product)
  const { listCategory } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts(filterParams))
  }, [])

  const applyFilter = (newParams) => {
    setFilterParams(newParams)
    dispatch(
      getProducts({
        ...newParams,
        'categoryIds[]': newParams.categoryId,
      })
    )
  }

  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...filterParams,
      page: 1,
      [key]: value,
    }
    applyFilter(newFilterParams)
  }

  const handleLoadMore = () => {
    const newFilterParams = {
      ...filterParams,
      page: filterParams.page + 1,
    }
    setFilterParams(newFilterParams)
    dispatch(
      getProducts({
        ...newFilterParams,
        'categoryIds[]': newFilterParams.categoryId,
        more: true,
      })
    )
  }

  const renderCategoryOptions = useMemo(() => {
    return listCategory.data.map((item) => ({
      label: item.name,
      value: item.id,
    }))
  }, [listCategory.data])

  const renderProductItems = () => {
    return listProduct.data.map((product) => (
      <Col span={6} key={product.id}>
        <Card
          hoverable
          cover={<img alt={product.name} src={'https://placehold.co/600x400'} />}
          style={{ width: '100%' }}
        >
          <Card.Meta title={product.name} description={`${product.price} ₫`} />
        </Card>
      </Col>
    ))
  }

  return (
    <S.Container>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Lọc danh mục" style={{ width: '100%' }}>
            <Checkbox.Group
              options={renderCategoryOptions}
              value={filterParams.categoryId}
              onChange={(checkedValues) => handleFilter('categoryId', checkedValues)}
              style={{ display: 'flex', flexDirection: 'column' }}
            />
          </Card>
        </Col>

        <Col span={18}>
          <Flex justify="space-between" style={{ marginBottom: 16 }}>
            <Select
              value={`${filterParams.sort}-${filterParams.order}`}
              onChange={(value) => {
                const [sort, order] = value.split('-')
                applyFilter({
                  ...filterParams,
                  sort,
                  order,
                  page: 1,
                })
              }}
              style={{ width: 200 }}
            >
              <Option value="id-asc">Mặc định</Option>
              <Option value="price-asc">Giá tăng dần</Option>
              <Option value="price-desc">Giá giảm dần</Option>
              <Option value="name-asc">Tên A-Z</Option>
              <Option value="name-desc">Tên Z-A</Option>
            </Select>

            <Input.Search
              placeholder="Tìm sản phẩm..."
              onSearch={(value) => handleFilter('q', value)}
              style={{ width: '40%' }}
              allowClear
            />
          </Flex>

          {loading ? (
            <p>Đang tải sản phẩm...</p>
          ) : (
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              {renderProductItems()}
            </Row>
          )}

          {listProduct.data.length < listProduct.meta.total && (
            <Flex justify="center">
              <Button onClick={handleLoadMore}>Tải thêm</Button>
            </Flex>
          )}
        </Col>
      </Row>
    </S.Container>
  )
}

export default List
