import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export default function RegisterPage(){
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [classes, setClasses] = useState('')
    const [allClasses, setAllClasses] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:5000/classes')
        .then(res => setAllClasses(res.data))
        .catch(err => alert('Não foi possível buscar informações no servidor'))
    },[])

    function submitEnrollment(e){
        e.preventDefault()

        if(!name || !cpf || !email || !photo) return alert('Por favor, preencha todos os campos corretamente.')

        if(!classes) return alert('Por favor, selecione uma turma.')

        axios.post('http://localhost:5000/register', {
            name,
            cpf,
            photo,
            email,
            classes
        })
        .then(res => alert('Aluno cadastrado!'))
        .catch(err => alert('Deu errado'))
    }

    return (
    <RegisterContainer>
        <RegisterForm onSubmit={submitEnrollment}>
            <input type='text' placeholder='Nome' onChange={e => setName(e.target.value)} required></input>
            <input type='text' placeholder='CPF' onChange={e => setCpf(e.target.value)} required></input>
            <input type='email' placeholder='E-mail' onChange={e => setEmail(e.target.value)} required></input>
            <input type='text' placeholder='Foto' onChange={e => setPhoto(e.target.value)} required></input>
            <select onChange={e => setClasses(e.target.value)}>
                <option value='' hidden>Selecione uma turma</option>
                {
                    allClasses.map(item => (
                        <option key={item.id} value={item.className}>{item.className}</option>
                    ))
                }
            </select>
            <button type='submit'>Cadastrar</button>
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

    input{
        height: 50px;
        outline: none;
    }

    select{
        height: 50px;
        outline: none;
    }

    button{
        height: 50px;
    }
`