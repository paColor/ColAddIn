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

import { useState } from "react";
import CharFormatting from "./CharFormatting";

//const nrButtons = 8;

function GetDefPBDQCFs(): Map<string, CharFormatting> {
    return new Map ([
        ["p", new CharFormatting(false, false, false, true, {r: 51, g: 153, b: 102})],
        ["b", new CharFormatting(false, false, false, true, {r: 255, g: 0, b: 0})],
        ["d", new CharFormatting(false, false, false, true, {r: 71, g: 115, b: 255})],
        ["q", new CharFormatting(false, false, false, true, {r: 172, g: 121, b: 66})],
    ])
}

function GetDefSelLet(): string[] {
    return ["p", "b", "d", "q", " ", " ", " ", " "];
}


export default class PBDQConfig {
    /**
     * Indique si les lettres qui ne doivent pas être marquées doivent être laissées telles
     * quelles <c>false</c> ou mises en noir <c>true</c>.
     */
    public readonly markAsBlack : boolean;
    private readonly setMAB : (boolean) => void;

    /**
     * pour une lettre donnée, le formattage correspondant
     */
    private pbdqCF : Map<string, CharFormatting>;
    private setPBDQcf: (newPBDQcf: Map<string, CharFormatting>) => void;

    /**
     * La lettre associée à chaque bouton
     */
    private selLetters: string[];
    private setSelLetters: (newSelL: string[]) => void;

    /**
     * Le CF qui est retourné pour les lettres qui ne doivent pas être formattées.
     */
    private readonly defaultCF = CharFormatting.CreateNeutralCF();


    constructor() {
        [this.markAsBlack, this.setMAB] = useState(false);
        [this.pbdqCF, this.setPBDQcf] = useState(GetDefPBDQCFs());
        [this.selLetters, this.setSelLetters] = useState(GetDefSelLet());
    }

    public Reset() {
        this.setMAB(false);
        this.setPBDQcf(GetDefPBDQCFs());
        this.setSelLetters(GetDefSelLet());
    }

    public ttt() {
        if (this.pbdqCF.get("c") == this.defaultCF) {

        }
        else if (this.selLetters.length === 1) {

        }

    }

}