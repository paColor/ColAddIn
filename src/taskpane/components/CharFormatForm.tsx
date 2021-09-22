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

import { useBoolean } from '@fluentui/react-hooks';
import { IColor, getColorFromString, getColorFromRGBA, } from "@fluentui/react";
import * as React from "react";
import { useState } from "react";
import CharFormatting from '../Configs/CharFormatting';
import CharFormatFormBase from './CharFormatFormBase';

export interface CharFormatFormProps { 

    /**
     * Fonction appelée quand OK ou "Valider" est cliqué et que editLet est true.
     * c: la valeur du champ lettre, cf: le CharFormatting défini par l'utilisateur.
     */
    validLet?: (c: string, cf: CharFormatting) => void;
    
    /** fonction appelée quand OK ou "Valider" est cliqué et que editLet est false. */
    valid?: (cf: CharFormatting) => void;

}

let isCFFOpen: boolean;
let showCFF: () => void;
let hideCFF: () => void;

let titreTxt: string;
let setTitreTxt: (c: string) => void;

let edLet: boolean;
let setEdLet: React.Dispatch<React.SetStateAction<boolean>>;

let theLet: string;
let setTheLet: (c: string) => void;

let cffColor : IColor;
let setCffColor: (c: IColor) => void;

let cffBold: boolean;
let clickCffBold: () => void;
let setBold: () => void;
let clearBold: () => void;

let cffItalic: boolean;
let clickCffItalic: () => void;
let setItalic: () => void;
let clearItalic: () => void;

let cffUnderline: boolean;
let clickCffUnderline: () => void;
let setUnderline: () => void;
let clearUnderline: () => void;

function OpenDialog(titre: string, cf: CharFormatting) {
    setTitreTxt(titre);
    if (cf.bold) {
        setBold();
    } else {
        clearBold();
    }
    if (cf.italic) {
        setItalic();
    } else {
        clearItalic();
    }
    if (cf.underline) {
        setUnderline();
    } else {
        clearUnderline();
    }
    setCffColor(getColorFromRGBA(cf.color));
    showCFF();
}

export function EditCf(titre: string, cf: CharFormatting) {
    setEdLet(false);
    OpenDialog(titre, cf);
}

export function EditLetCf(titre: string, c: string, cf: CharFormatting) {
    setEdLet(true);
    setTheLet(c);
    OpenDialog(titre, cf);
}

export default function CharFormatForm(props:CharFormatFormProps) {
    [titreTxt, setTitreTxt] = useState("");
    [isCFFOpen, { setTrue: showCFF, setFalse: hideCFF }] 
        = useBoolean(false);

    const white: IColor = getColorFromString('#ffffff');
    [cffColor, setCffColor] = useState(white);
    [cffBold, {toggle : clickCffBold, setTrue : setBold, setFalse : clearBold}] 
        = useBoolean(false);
    [cffItalic, {toggle : clickCffItalic, setTrue : setItalic, setFalse : clearItalic}] 
        = useBoolean(false);
    [cffUnderline, {toggle : clickCffUnderline, setTrue : setUnderline, setFalse : clearUnderline}]
        = useBoolean(false);
    [edLet, setEdLet] = useState(false);
    [theLet, setTheLet] = useState("");

    function LoadCffBData() {
        if (edLet) {
            props.validLet(
                theLet, new CharFormatting(cffBold, cffItalic, cffUnderline, true, cffColor))
        } else {
            props.valid(new CharFormatting(cffBold, cffItalic, cffUnderline, true, cffColor));
        }
        hideCFF();
    }

    return(
        <CharFormatFormBase
            visible={isCFFOpen}
            titTxt={titreTxt}
            editLet={edLet}
            let={theLet}
            modifLet={setTheLet}
            bold={cffBold}
            clickBold={clickCffBold}
            italic={cffItalic}
            clickItalic={clickCffItalic}
            underline={cffUnderline}
            clickUnderline={clickCffUnderline}
            color={cffColor}
            setColor={setCffColor}
            valid={LoadCffBData}
            cancel= {hideCFF}
        />
    )

}
