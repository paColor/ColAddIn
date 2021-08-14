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

// C'est la seule façon que j'ai trouvée pour séparer chaque lettre et pouvoir la coloriser
// de manière indépendante. 
const letDelimiters : string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
 "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
 "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
 "T", "U", "V", "W", "X", "Y", "Z",
 "é", "è", "ê", "ë", "à", "â", "î", "ï", "ô", "û", "ù", "ç",
 "É", "È", "Ê", "Ë", "À", "Â", "Î", "Ï", "Ô", "Û", "Ù", "Ç",
 " ", "\b", "\f", "\n", "\r", "\t", "\v", "\'", "\"", "\\",
 ".", ",", ";", ":", "?", "!", "§", "°", "+", "*", "-", "_", "/", "%", "&", "(", ")", "=",
 "´", "`", "[", "]", "{", "}"];


async function ColPhonAction() {
    Word.run(async (context) => {
        let sel = context.document.getSelection();
        sel.load();
        let rgeColl = sel.split(letDelimiters);
        rgeColl.load();
        await context.sync();
        let mswT = new MSWText(sel, rgeColl);

        mswT.ColQquesChar([1, 3, 5, 7]);

        await context.sync();
    })
}


export default class MSWText extends TheText {    
    
    // pour chaque position dans le texte, indique le Range correspondant.
    // On utilise ce mécanisme car on ne peut garantir que chaque Range contienne exactement
    // un caractère dans tous les cas.
    private pos : Word.Range[];

    constructor (rge: Word.Range, rgeColl : Word.RangeCollection) {
        super(MSWText.GetStringFor(rge));
        this.pos = new Array<Word.Range>(this.S.length);
        let i = 0;
        for (let r of rgeColl.items) {
            for (let j = 0; j < r.text.length; j++) {
                this.pos[i] = r;
                i++;
            }
            console.log(r.text);
        }
    }

    public ColQquesChar(numArr: number[]) {
        for (let i of numArr) {
            if (i < this.pos.length) {
                this.pos[i].font.color = "#00FF00";
            }
        }
    }

    protected SetChars(_fte: FormattedTextEl, _conf: Config) {
         
    }

    static ColPhonsClick(_conf: Config) {
        ColPhonAction();
        console.log("ColPhonsClick");
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