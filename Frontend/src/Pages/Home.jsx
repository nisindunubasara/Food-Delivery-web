import React from 'react'
import Title from '../Components/Title'
import { Hero } from '../Components/Hero'
import { ExploreMenu } from '../Components/ExploreMenu'
import { TopDishes } from '../Components/TopDishes'

const Home = () => {
  return (
    <div>
      <Hero />
      <ExploreMenu />
      <TopDishes />
    </div>
  )
}

export default Home