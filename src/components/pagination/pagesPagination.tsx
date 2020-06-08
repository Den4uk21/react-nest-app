import React from 'react'
import { Pagination } from 'antd'

import './styles.sass'

interface IPagesPaginationProps {
  onPageChange: (page: number) => void,
  total: number,
  current?: number
}

export const PagesPagination: React.FC<IPagesPaginationProps> = ({ total, onPageChange, current = 1 }) => {
  return (
    <section className="pagination">
      <Pagination current={current} onChange={onPageChange} total={total} />
    </section>
  )
}