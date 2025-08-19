import { TypographyProps } from "@mui/material";
import { BodyLargeStyled } from "./styles";

export const BodyLarge: React.FC<TypographyProps> = (props) => {
    return(
        <BodyLargeStyled variant="h4">
            {props.children}
        </BodyLargeStyled>
    )
}