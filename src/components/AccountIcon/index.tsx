import { BoxProps } from "@mui/material"
import { CircleIconStyled } from "./styles"

export const AccountCircle: React.FC<BoxProps> = (props) =>{
    return(
        <CircleIconStyled>{props.children}</CircleIconStyled>
    )
}