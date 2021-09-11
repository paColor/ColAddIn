/********************************************************************************
 *  Copyright 2021, Pierre-Alain Etique                                         *
 *                                                                              *
 *  This file is part of Coloriƨation.                                          *
 *                                                                              *
 *  Coloriƨation is free software: you can redistribute it and/or modify        *
 *  it under the terms of the GNU General Public License as published by        *
 *  the Free Software Foundation, either version 3 of the License, or           *
 *  (at your option) any later version.                                         *
 *                                                                              *
 *  Coloriƨation is distributed in the hope that it will be useful,             *
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of              *
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the               *
 *  GNU General Public License for more details.                                *
 *                                                                              *
 *  You should have received a copy of the GNU General Public License           *
 *  along with Coloriƨation.  If not, see <https://www.gnu.org/licenses/>.      *
 *                                                                              *
 ********************************************************************************/

import { DefaultButton, IButtonStyles } from "@fluentui/react";
import React = require("react");

export interface LetterButtonProps {
    position: number; // nombre de 0 à 7 indiquant de quel bouton il s'agit
    // clickBut: (butNr: number) => void;
}

export default function LetterButton(props: LetterButtonProps) {

    function onClicked() {
        // props.clickBut(props.position);
    }

    let col: string = "#FFFFFF"; // blanc
    let fontCol: string = "#000000"; // noir

    const phonButStyles: IButtonStyles = { 
        root: {
        width: 35,
        height: 20, 
        padding: 0,
        margin: 0,
        minWidth: 10,
        flexWrap: 'nowrap',
        background: col,
        },
        label: {
        fontSize: 11,
        // fontWeight: props.chk && props.cf.bold?"800":"400",
        // fontStyle: props.chk && props.cf.italic?"italic":"normal",
        // textDecoration: props.chk && props.cf.underline?"underline":"",
        padding: 0,
        margin: 0,
        flexWrap: 'nowrap',
        color: fontCol,
        },
    };
    
    return(
        <div>
            <DefaultButton 
                text={props.position.toString()} 
                styles={phonButStyles}
                onClick={onClicked}
            />
        </div>
    )
}