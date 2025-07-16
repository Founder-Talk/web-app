import React from 'react'
import Nav from '../common/nav/nav'
import { Outlet } from 'react-router-dom'
import Foot from '../common/foot/foot'

function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Foot />
    </div>
  )
}

export default Layout
