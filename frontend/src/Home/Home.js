import React from 'react'
import Dashboard from './Dashboard'
import Homepage from './Homepage'


function Home() {
  return (
    <Dashboard component={<Homepage/>}/>
  )
}

export default Home