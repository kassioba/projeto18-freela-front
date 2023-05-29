import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Header(){
    const navigate = useNavigate()

    return (
        <HeaderContainer>
            <span className="title">DROVEM</span>
            <div className="navigation">
                <span onClick={() => navigate('/register')}>Inscrição</span>
                <span onClick={() => navigate('/classes')}>Classes</span>
                <span onClick={() => navigate('/submit')}>Entrega de projetos</span>
                <span onClick={() => navigate('/grades')}>Notas</span>
            </div>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
width: 100%;
height: 20vh;
background-color: aquamarine;
display: flex;
justify-content: space-between;
align-items: center;
padding-left: 100px;
padding-right: 100px;
box-sizing: border-box;

.title{
    font-size: 30px;
    font-weight: 700;
}

.navigation{
    width: 500px;
    display: flex;
    justify-content: space-between;

    span{
        cursor: pointer;
    }
}
`