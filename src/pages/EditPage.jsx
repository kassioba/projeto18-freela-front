import { useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import axios from 'axios'

export default function EditPage({allClasses}){
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [classes, setClasses] = useState('')
    const params = useParams() 
    
console.log(params)

    function editData(e){
        e.preventDefault()

        if(!name || !cpf || !email || !photo) return alert('Por favor, preencha todos os campos corretamente.')

        axios.put(`${import.meta.env.VITE_API_URL}/edit/${params.id}`, {
            name,
            cpf,
            photo,
            email,
            classes
        })
        .then(res => alert('Aluno editado!'))
        .catch(err => {
            alert('Deu errado')
            console.log(err.response.data)
        })
    }
    
    return (
        <RegisterContainer>
        <RegisterForm onSubmit={editData}>
            <span>Editar dados</span>
            <input type='text' placeholder='Nome' onChange={e => setName(e.target.value)} required></input>
            <input type='text' placeholder='CPF' onChange={e => setCpf(e.target.value)} required></input>
            <input type='email' placeholder='E-mail' onChange={e => setEmail(e.target.value)} required></input>
            <input type='text' placeholder='Foto' onChange={e => setPhoto(e.target.value)} required></input>
            <select onChange={e => setClasses(e.target.value)}>
                <option value='' hidden>Selecione uma turma caso queria editar</option>
                {
                    allClasses.map(item => (
                        <option key={item.id} value={item.className}>{item.className}</option>
                    ))
                }
            </select>
            <button type='submit'>Editar</button>
        </RegisterForm>
    </RegisterContainer>
    )
}


const RegisterContainer = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`

const RegisterForm = styled.form`
    height: 500px;
    width: 1000px;
    background-color: azure;
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        width: 100%;
        height: 50px;
        outline: none;
        box-sizing: border-box;
    }

    select{
        height: 50px;
        outline: none;
        width: 100%;
    }

    button{
        height: 50px;
        width: 100%;
    }
`