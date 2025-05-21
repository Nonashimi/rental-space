import React from 'react'
import SearchDestinctionCard from './search-destinction-card';
import { m } from 'framer-motion';

type Props = {}

const cities = [
  { title: "Париж", description: "Город любви и Эйфелевой башни" },
  { title: "Токио", description: "Современный мегаполис с древними храмами" },
  { title: "Нью-Йорк", description: "Город небоскребов и свободы" },
  { title: "Рим", description: "Исторический центр с Колизеем" },
  { title: "Кейптаун", description: "Горы, пляжи и винодельни" },
  { title: "Сидней", description: "Оперный театр и солнечные пляжи" },
   { title: "Париж", description: "Город любви и Эйфелевой башни" },
  { title: "Токио", description: "Современный мегаполис с древними храмами" },
  { title: "Нью-Йорк", description: "Город небоскребов и свободы" },
  { title: "Рим", description: "Исторический центр с Колизеем" },
  { title: "Кейптаун", description: "Горы, пляжи и винодельни" },
  { title: "Сидней", description: "Оперный театр и солнечные пляжи" }
];


function SearchDestinction({}: Props) {
  return (
    <div className='flex flex-col gap-2'>
        <div className="text-[13px]">Suggested destinations</div>
        {cities.map((city, index) =>(
            <SearchDestinctionCard title={city.title} description={city.description}/>
        ))}
    </div>
  )
}

export default SearchDestinction