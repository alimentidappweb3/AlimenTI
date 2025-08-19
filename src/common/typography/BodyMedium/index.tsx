import { TypographyProps } from "@mui/material";
import { BodyLargeStyled } from "./styles";

export const BodyMedium: React.FC<TypographyProps> = (props) => {
    return(
        <BodyLargeStyled variant="h4">
            {props.children}
        </BodyLargeStyled>
    )
}