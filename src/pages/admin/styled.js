import styled from 'styled-components';

export const StyledAdmin = styled.div`
    .back1 {
        font-family: Roboto, sans-serif;
        margin: 0;
        background: url(/assets/backadmin.png);
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        min-height: 1080px;
        position: absolute;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    * {
        box-sizing: border-box;
    }
    .contenedor {
        width: 100%;
        padding: 25px;
        border-radius: 20px;
    }

    div.formulario {
        background: #fff;
        border-radius:25px;
        padding: 3px;
    }

    img {
        display: block;
        margin: auto;
    }
    input[type='text'],
    input[type='password'] {
        font-size: 20px;
        width: 100%;
        padding: 10px;
        border: none;
    }
    .input-contenedor {
        margin-bottom: 15px;
        border: 1px solid #fff;
    }

    .button {
        border: none;
        width: 100%;
        color: white;
        font-size: 20px;
        background: #bb4b46;
        padding: 15px 20px;
        border-radius: 45px;
        cursor: pointer;
    }
    .button:hover {
        background: #ab0000;
    }
    p {
        text-align: center;
    }
    .link {
        text-decoration: none;
        color: #bb4b46;
        font-weight: 600;
    }
    .link:hover {
        color: cadetblue;
    }
    @media (min-width: 768px) {
        .formulario {
            margin: auto;
            width: 500px;
            border-radius: 2%;
        }
    }
`;
