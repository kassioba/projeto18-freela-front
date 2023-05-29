import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function StudentPage(){
    const params = useParams()
    const [student, setStudent] = useState([])

    useEffect(() =>{
        axios.get(`http://localhost:5000/student/${params.id}`)
        .then(res => setStudent(res.data))
        .catch(err => alert('Não foi possível buscar informações no servidor'))
    }, [])

    return (
        <StudentContainer>
            <Content>
                <Half>
                    <img src={student[0]?.photo} alt=""/>
                </Half>
                <Half>
                    <DownHalf>
                        <span className="title">DADOS</span>
                        <div className="student-data">
                            <span>NOME: {student[0]?.name}</span>
                            <span>CPF: {student[0]?.cpf}</span>
                            <span>E-MAIL: {student[0]?.email}</span>
                        </div>
                    </DownHalf>
                    <DownHalf>
                        <span className="title">TURMAS</span>
                        <Classes>
                            {student.map(student => (
                                <div key={student.id} className="class">
                                    <span>{student.className}</span>
                                    <span>Data de entrada: {student.enrollmentDate}</span>
                                    <span>Data de saída: {student.leaveDate ? student.leaveDate : '-'}</span>
                                </div>
                            ))}
                        </Classes>
                    </DownHalf>
                </Half>
            </Content>
        </StudentContainer>
    )
}

const StudentContainer = styled.div`
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
`

const Half = styled.div`
height: 50%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;

img{
    height: 150px;
    width: 150px;
    border-radius: 100px;
    background-color: blue;
}
`

const DownHalf = styled.div`
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;

.title{}

.student-data{
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 20px;
}
`

const Classes = styled.div`
height: 165px;
width: fit-content;
margin-top: 20px;
overflow-y: scroll;


.class{
height: 75px;
width: 300px;
background-color: beige;
display: flex;
flex-direction: column;
justify-content: space-around;

:not(:first-child){
    margin-top: 15px;
}
}
`