import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Entry from './Components/Entry/Entry'
import Auth from './Components/Auth/Auth'
import Signup from './Components/Auth/Components/Signup'
import Login from './Components/Auth/Components/Login'
import Projects from './Components/Projects/Projects'
import TweetSearch from './Components/TweetSearch/TweetSearch'

export const Main = () => {
  return (
    <Routes>

        
        <Route exact path="/" element={<Entry/>}></Route>
        <Route exact path="/auth" element={<Auth/>}></Route>
        <Route exact path="/auth/signup" element={<Signup/>}></Route>
        <Route exact path="/auth/login" element={<Login/>}></Route>
        <Route exact path="/:uid/projects" element={<Projects/>}></Route>
        <Route exact path="/:uid/projects/:pid" element={<TweetSearch/>}></Route>
    </Routes>
  )
}
