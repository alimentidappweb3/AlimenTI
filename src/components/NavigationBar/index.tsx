import React from "react";
import { AppBarStyled } from "./styles";
import { BoxProps, IconButton, Toolbar } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BodyLarge } from "../../common/typography/BodyLarge";
import { AccountCircle } from "../AccountIcon";

export const AppBar: React.FC<BoxProps> = (props) =>{
    return(
        <AppBarStyled >
            {props.children}
            
            <ToastContainer/>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <BodyLarge >
                AlimenTI
            </BodyLarge>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBarStyled>
    )
}