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


import Config from "../Configs/Config";
import FormattedTextEl from "../Core/FormattedTextEl";
import TheText from "../Core/TheText";

// interface MultipleCharInfo {
//     pos: number;
//     nrCHars: number;
// }

const letDelimiters : string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
 "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
 "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
 "T", "U", "V", "W", "X", "Y", "Z",
 "é", "è", "ê", "ë", "à", "â", "î", "ï", "ô", "û", "ù",
 "É", "È", "Ê", "Ë", "À", "Â", "Î", "Ï", "Ô", "Û", "Ù"];

export default class MSWText extends TheText {

    // private multipleChars : MultipleCharInfo[];
    
    
    constructor (rge: Word.Range) {
        super(MSWText.GetStringFor(rge));
    }

    protected SetChars(_fte: FormattedTextEl, _conf: Config) {
         
    }

    // Retourne le string correspondant au range donné. 
    // Dans la version VSTO, nettoie ce string des
    // caractères spéciaux corrspondants à l'accroche d'un objet à un paragraphe (par exemple
    // une image).
    // Pour le moment, une fonctionalité simplifiée ici. On verra quand ça ne suffira pas. 
    private static GetStringFor(rge: Word.Range) : string {
        // let itR = new Word.Range();
        // itR.set(rge);
        return rge.text;
    }

}