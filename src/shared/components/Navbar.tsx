import React from 'react'
import Categories from './categories'
import Button from '../ui/button'
import Container from './container'

type Props = {}

function Navbar({}: Props) {
  return (
    <Container>
        <div className='flex justify-between items-center py-4'>
            <Categories className = "w-[70%]"/>
            <div className="flex gap-4">
                <Button>Фильтр</Button>
                <Button>Показывать итог</Button>
            </div>
        </div>
    </Container>
  )
}

export default Navbar