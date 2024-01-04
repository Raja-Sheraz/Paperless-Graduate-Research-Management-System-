import React from 'react'
import {useContext} from 'react';
import { UserContext } from '../../context/userContext';
export default function StudentDashboard() {
const {user} =useContext(UserContext)
  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && (<h1>Hi {user.name}!<br></br> {user.email}{user.hashedPassword}</h1>) }
    </div>
  )
}
