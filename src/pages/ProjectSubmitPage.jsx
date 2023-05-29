import axios from "axios"
import { useState } from "react"
import styled from "styled-components"

export default function ProjectSubmitPage({allClasses}){
    const [disabled, setDisabled] = useState(true)
    const [projectId, setProjectId] = useState('')
    const [studentId, SetStudentId] = useState('')
    const [projectLink, setProjectLink] = useState('')
    const [classId, setClassId] = useState('')
    const [list, setList] = useState([])

    console.log(allClasses)

    function submitProject(e){
        e.preventDefault()

        console.log({
            studentId,
            projectId,
            projectLink,
            classId
        })

        if(!projectId || !studentId || !projectLink) return alert('Por favor, preencha todos os campos corretamente.')

        console.log()

        axios.post('http://localhost:5000/submit', {
            studentId,
            projectId,
            projectLink,
            classId
        })
        .then(res => alert('Deu certo'))
        .catch(err => {
            if(err.response.status === 409){
                alert('Projeto já entregue!')
            }else{
                alert('Não foi possível entregar o projeto')
            }
        })
    }

    function findStudentsAndProjects(e){
        setClassId(e.target.value)
        console.log(e.target.value)

        axios.get(`http://localhost:5000/submit/${e.target.value}`)
        .then(res => {
            setList(res.data)
            setDisabled(false)
        })
        .catch(err => alert('Não foi possível buscar informações no servidor'))
    }

    return (
        <SubmitContainer>
            <Content onSubmit={submitProject}>
                <select onChange={findStudentsAndProjects}>
                    <option value='' hidden>Selecione uma turma</option>
                    {
                        allClasses.map(item => (
                            <option key={item.className} value={item.id}>{item.className}</option>
                        ))
                    }
                </select>
                <select disabled={disabled} onChange={e => SetStudentId(e.target.value)}>
                    <option value='' hidden >Selecione seu nome</option>
                    {list.students?.map(student => (
                        <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                </select>
                <select disabled={disabled} onChange={e => setProjectId(e.target.value)}>
                    <option value='' hidden >Selecione o projeto</option>
                    {list.projects?.map(projectId => (
                        <option key={projectId.id} value={projectId.id}>{projectId.projectName}</option>
                    ))}
                </select>
                <input placeholder="Link do projeto" disabled={disabled} onChange={e => setProjectLink(e.target.value)}></input>
                <button type="submit">ENTREGAR</button>
            </Content>
        </SubmitContainer>
    )
}

const SubmitContainer = styled.div`
height: 100vh;
width: 100vw;
background-color: black;
display: flex;
justify-content: center;
align-items: center;
`

const Content = styled.form`
width: 1000px;
height: 500px;
background-color: azure;
display: flex;
flex-direction: column;

select{
    height: 50px;
}

input{
    height: 50px;
    outline: none;
}

button{
    height: 50px;
}
`