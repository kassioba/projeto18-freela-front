import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function ClassesPage({allClasses}){
    const [currentClass, setCurrentClass] = useState('Turma 1')
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/students/${currentClass}`)
        .then(res => setStudents(res.data))
        .catch(err => alert('Não foi possível buscar informações no servidor'))
    },[currentClass])

    return (
        <ClassesContainer>
            <Content>
                <Sidebar>
                    <Classes>
                        {allClasses.map(item => (                           
                            <Class key={item.id} currentClass={currentClass} class={item.className} onClick={() => setCurrentClass(item.className)}>{item.className}</Class>
                        ))}
                    </Classes>
                </Sidebar>
                <StudentsContainer>
                {students.length === 0 ?
                   <Student>Não há alunos nessa turma</Student> 
                :
                 students.map(student => (     
                    <Student onClick={() => navigate(`/student/${student.studentId}`)}>
                        <img src={student.photo} alt="" />
                        <span>{student.name}</span>
                    </Student>      
                ))
                }
                </StudentsContainer>
            </Content>
        </ClassesContainer>
    )
}

const ClassesContainer = styled.div`
width: 100vw;
height: 100vh;
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
    cursor: pointer;

    :hover{
        background-color: #f1f1f1;
    }

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
`