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

import TextEl from "./TextEl";
import TheText from "./TheText";

export default class TheWord extends TextEl {

    public readonly lowWord: string; // low characters version of the word.

    // Paramètres: le TheText considéré ainsi que inFirst et inLast: positions 
    // (zero based) du premier et dernier caractère.
    constructor(tt: TheText, inF: number, inL: number) { 
        super(tt, inF, inL);
        this.lowWord = this.T.S.substring(inF, inL+1).toLowerCase();
    }

    /** retourne le mot en minuscules. */
    public GetWord() : string {
        return this.lowWord;
    }

    /**
     * Retourne le caractère (en minuscule) à la position pos dans le mot
     * @param pos la position du caractère dans le TheText sur lequel s'appuie le TextEl
     * @returns le caractère à la position définie.
     */
    public GetChar(pos : number) : string {
        if (pos >= this.first && pos <= this.last) {
            return this.lowWord[pos - this.first];
        }
        else {
            throw new Error("La position dans le mot est impossible.")
        }
        
    }
    
}