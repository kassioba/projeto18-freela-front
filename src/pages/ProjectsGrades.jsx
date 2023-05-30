import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function ProjectsGrades({allClasses}){
    const [currentClass, setCurrentClass] = useState('Turma 1')
    const [classProjects, setClassProjects] = useState([])
    const [currentProject, setCurrentProject] = useState('')
    const [students, setStudents] = useState([])
    const [grade, setGrade] = useState('')

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/projects/${currentClass}`)
        .then(res => setClassProjects(res.data))
        .catch(err => alert('Não foi possível buscar informações no servidor'))

        setCurrentProject('')
    }, [currentClass])

    useEffect(() => {
        if(currentProject){
            axios.get(`${import.meta.env.VITE_API_URL}/projects/${currentClass}/${currentProject}`)
            .then(res => setStudents(res.data))
            .catch(err => alert('Não foi possível buscar informações no servidor'))
        }
    } ,[currentProject])

    function changeGrade(e, student){

        axios.put(`${import.meta.env.VITE_API_URL}/grade`, {grade: e.target.value, student})
        .catch(err => alert('Não foi possível alterar a nota'))
        
    }
   
    return (
        <ProjectsContainer>
             <Content>
                <Sidebar>
                    <Classes>
                    {allClasses.map(item => (                           
                            <Class key={item.id} currentClass={currentClass} class={item.className} onClick={() => setCurrentClass(item.className)}>{item.className}</Class>
                        ))}
                    </Classes>
                    <Projects>
                        {!classProjects.length ? 
                        <Project>Essa turma ainda não possui projetos</Project>
                        :
                        classProjects.map(project => (
                            <Project key={project.id} currentProject={currentProject} project={project.projectName} onClick={() => setCurrentProject(project.projectName)}>{project.projectName}</Project>
                        ))
                        }
                    </Projects>
                </Sidebar>
                <StudentsContainer>
                    {
                        students?.map(student =>
                            (
                            <Student>
                                <img src={student.photo} alt="" />
                                <span>{student.name}</span>
                                <select onChange={e => changeGrade(e, student)}>
                                    <option value={student.grade}>{student.grade}</option>
                                    <option value='Sem Nota' hidden={student.grade === "Sem Nota" && true}>Sem Nota</option>
                                    <option value='Abaixo da Expectativa' hidden={student.grade === "Abaixo da Expectativa" && true}>Abaixo da Expectativa</option>
                                    <option value='Dentro da Expectativa' hidden={student.grade === "Dentro da Expectativa" && true}>Dentro da Expectativa</option>
                                    <option value='Acima da Expectativa' hidden={student.grade === "Acima da Expectativa" && true}>Acima da Expectativa</option>
                                </select>
                            </Student> 
                        ))
                    }
                </StudentsContainer>
            </Content>
        </ProjectsContainer>
    )
}

const ProjectsContainer = styled.div`
height: 100vh;
width: 100vw;
background-color: black;
display: flex;
justify-content: center;
align-items: center;
`

const Content = styled.div`
height: 500px;
width: 1000px;
background-color: azure;
display: flex;
align-items: center;
`

const Sidebar = styled.div`
height: 100%;
width: 200px;
background-color: red;
border-right: 1px solid #c0c0c0;
display: flex;
flex-direction: column;
justify-content: space-evenly;
`

const Classes = styled.div`
height: 150px;
display: flex;
flex-direction: column;
background-color: blue;
align-items: center;
overflow-y: scroll;
`

const Class = styled.div`
font-size: 18px;
background-color: white;
line-height: 25px;
cursor: pointer;

text-decoration: ${props => props.currentClass === props.class && 'underline'};

:hover{
    text-decoration: underline;
}
`

const Projects = styled.div`
height: 150px;
display: flex;
flex-direction: column;
background-color: blue;
align-items: center;
overflow-y: scroll;
text-align: center;
`

const Project = styled.div`
font-size: 18px;
background-color: white;
line-height: 25px;
cursor: pointer;

text-decoration: ${props => props.currentProject === props.project && 'underline'};

:hover{
    text-decoration: underline;
}
`

const StudentsContainer = styled.div`
height: 100%;
width: 100%;
background-color: pink;
display: flex;
flex-direction: column;
align-items: center;
padding-top: 25px;
box-sizing: border-box;
`

const Student = styled.div`
    width: 85%;
    height: 100px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding-left: 30px;
    box-sizing: border-box;

    img{
        height: 75px;
        width: 75px;
        border-radius: 100px;
    }

    span{
        margin-left: 40px;
        font-size: 20px;
    }

    :not(:first-child){
        margin-top: 15px;
    }

    select{
        height: 25px;
        width: 150px;
        margin-left: 250px;
    }
`