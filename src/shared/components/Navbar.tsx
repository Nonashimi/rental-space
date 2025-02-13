import React, { Suspense } from 'react'
import Categories from './categories'
import Button from '../ui/button'
import Container from './container'

type Props = {
  clickOpen: () => void,
}

function Navbar({clickOpen}: Props) {
  return (
    <Container>
        <div className='flex w-full justify-between items-center py-4'>
          <Suspense fallback={<div>Loading...</div>}>
            <Categories className = "w-[70%]"/>
          </Suspense>
            <div className="flex items-center gap-4">
                <Button className='p-3' onClick = {clickOpen}>Фильтр</Button>
                <Button className='p-3'>Показывать Итог</Button>
            </div>
        </div>
    </Container>
  )
}

export default Navbar