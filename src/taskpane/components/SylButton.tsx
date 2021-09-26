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

import { DefaultButton, getColorFromRGBA, getColorFromString, IButtonStyles, IColor } from "@fluentui/react";
import React = require("react");
import SylConfig from "../Configs/SylConfig";
import { GetTxtCol4Bkgrnd } from "../Configs/Utils";

export interface SylButtonProps {
    position: number; // nombre de 0 à 7 indiquant de quel bouton il s'agit
    sylConf: SylConfig;
    clickBut: (butNr: number) => void;
}

export default function SylButton(props: SylButtonProps) {

    function onClicked() {
        props.clickBut(props.position);
    }

    let displayTxt : string = "-";
    let faded: boolean = true;
    let cf = props.sylConf.GetSylButtonConfFor(props.position).cf;
    let bkgrCol: IColor = getColorFromString("#FFFFFF"); // blanc
    if (props.position < props.sylConf.nrSetButtons) {
        if (cf.changeColor){
            bkgrCol = getColorFromRGBA(cf.color);
        }
        displayTxt = "txt";
        faded = false;
    }
    let fontCol = GetTxtCol4Bkgrnd(bkgrCol, faded);

    const phonButStyles: IButtonStyles = { 
        root: {
            width: 45,
            height: 20, 
            padding: 0,
            margin: 0,
            minWidth: 10,
            flexWrap: 'nowrap',
            background: bkgrCol.str,
        },
        label: {
            fontSize: 11,
            fontWeight: cf.bold?"800":"400",
            fontStyle: cf.italic?"italic":"normal",
            textDecoration: cf.underline?"underline":"",
            padding: 0,
            margin: 0,
            flexWrap: 'nowrap',
            color: fontCol.str,
        },
    };
    
    return(
        <div>
            <DefaultButton 
                text={displayTxt}
                styles={phonButStyles}
                onClick={onClicked}
                disabled={!props.sylConf.GetSylButtonConfFor(props.position).buttonClickable}
            />
        </div>
    )
}