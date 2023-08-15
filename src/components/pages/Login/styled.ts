import { Button } from 'antd';
import styled from 'styled-components';

interface CustomNavProps {
    margin?: string; // Define the type for the margin prop as string
}

export const ButtonLogin = styled(Button)<CustomNavProps>`
    background-color: #00b96b !important;
    /* margin: ${(props) => props.margin}; */
`;
