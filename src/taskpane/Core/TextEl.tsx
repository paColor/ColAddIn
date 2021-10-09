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

import TheText from "./TheText";

// Cerci génère une boucle d'imports avec TheText. On l'a donc déplacé dans Utils.
// const consonnes = "bcdfghjklmnpqrstvwxzç";
// const voyelles = "aeiouyœéàèùäëïöüâêîôûœ";

// export function EstVoyelle(c:string) {
//     return voyelles.includes(c);
// }

// export function EstConsonne(c:string) {
//     return consonnes.includes(c);
// }

export default class TextEl {

    public readonly T: TheText;
    
    // La position (zero-based) dans T du premier caractère du TextEl. Doit
    // être plus grand ou égal à zéro.
    public first: number;

    // La position (zero-based) dans T du dernier caractère du TextEl.
    // S'il est plus petit que first, l'élément est considéré comme vide.
    public last: number;

    constructor(tt: TheText, inF: number, inL: number) {
        this.T = tt;
        this.first = inF;
        this.last = inL;
    }

    public ToLowerString(): string
    {
        if (this.last < this.first)
            return "";
        else
            return this.T.ToLowerString().substring(this.first, this.last + 1);
    }

    public ToString(): string {
        if (this.last < this.first)
            return "";
        else
            return this.T.S.substring(this.first, this.last + 1);
    }

}