import styled from "styled-components";


export const FormStyle = styled.form`
    input[type=text], select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    button[type=submit] {
        width: 100%;
        background-color: #153858;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 15px
    }
    
    button[type=submit]:hover {
        background-color: #000;
    }

    label {
        float: left;
    }
`