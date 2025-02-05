import React from 'react'
import FilterVariantBlock from './filter-variant-block'
import FilterBtns from './filter-btns'
import FilterSlidebar from './filter-slidebar'

type Props = {}

function FilterBody({}: Props) {
  return (
    <div>
        <FilterVariantBlock 
          title='Тип размещения'>
            <FilterBtns/>
        </FilterVariantBlock>
        <FilterVariantBlock
            title='Ценовой диапазон'
            subtitle='Цены за ночь без учета налогов и сборов'
        >
            <FilterSlidebar/>
        </FilterVariantBlock>
    </div>
  )
}

export default FilterBody