import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { createGlobalStyle } from 'styled-components'
import ClassesPage from './pages/ClassesPage'
import StudentPage from './pages/StudentPage'
import ProjectSubmitPage from './pages/ProjectSubmitPage'
import { useEffect, useState } from 'react'
import axios, { all } from 'axios'
import ProjectsGrades from './pages/ProjectsGrades'
import Header from './components/Header'
import EditPage from './pages/EditPage'

function App() {
  const [allClasses, setAllClasses] = useState([])

  useEffect(() =>{
    axios.get(`${import.meta.env.VITE_API_URL}/classes`)
    .then(res => setAllClasses(res.data))
    .catch(err => alert('Não foi possível buscar informações no servidor'))
},[])

  return (
    <BrowserRouter>
    <GlobalStyle/>
    <Header/>
      <Routes>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/classes' element={<ClassesPage allClasses={allClasses}/>}/>
        <Route path='/student/:id' element={<StudentPage/>}/>
        <Route path='/submit' element={<ProjectSubmitPage allClasses={allClasses}/>}/>
        <Route path='/grades' element={<ProjectsGrades allClasses={allClasses}/>}/>
        <Route path='/edit/:id' element={<EditPage allClasses={allClasses}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
  }
`

export default App
