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

import { getColorFromRGBA } from "@fluentui/react";
import { WarningMsg } from "../components/MessageWin";
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
 "´", "`", "[", "]", "{", "}", "’", "«", "»"];


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
            // console.log(r.text + " length: " + r.text.length);
        }
    }

    protected SetChars(fte: FormattedTextEl, conf: Config) {
        for (let i = fte.first; i <= fte.last; i++) {
            if (fte.cf.changeColor) {
                this.pos[i].font.color = getColorFromRGBA(fte.cf.color).str;
            }
            else if (fte.cf.ForceBlackColor(conf)) {
                this.pos[i].font.color = "#000000";
            }

            if (fte.cf.bold) {
                this.pos[i].font.bold = true;
            }
            else if (fte.cf.ForceNonBold(conf)) {
                this.pos[i].font.bold = false;
            }

            if (fte.cf.italic) {
                this.pos[i].font.italic = true;
            }
            else if (fte.cf.ForceNonItalic(conf)) {
                this.pos[i].font.italic = false;
            }

            if (fte.cf.underline) {
                this.pos[i].font.underline = "Single";
            }
            else if (fte.cf.ForceNonUnderline(conf)) {
                this.pos[i].font.underline = "None";
            }
        }
    }

    static async ColNoirClick(_conf: Config) {
        Word.run(async (context) => {
            let sel = context.document.getSelection();
            sel.load();
            await context.sync();
            if (!sel.isEmpty) {
                sel.font.color = "#000000";
                sel.font.bold = false;
                sel.font.italic = false;
                sel.font.underline = "None";
                await context.sync();
            }
            else {
                WarningMsg("Aucun texte n'est sélectionné.")
            }
        })
    }

    static async ApplyFunct(act: string, conf: Config) {
        Word.run(async (context) => {
            let sel = context.document.getSelection();
            sel.load();
            await context.sync();
            if (!sel.isEmpty) {
                let rgeColl = sel.split(letDelimiters);
                rgeColl.load();
                await context.sync();
                let mswT = new MSWText(sel, rgeColl);
                switch (act) {
                    case "ColorizePhons":
                        mswT.ColorizePhons(conf);
                        break;
                    case "MarkSyls":
                        mswT.MarkSyls(conf);
                        break;
                    case "MarkWords":
                        mswT.MarkWords(conf);
                        break;
                    case "MarkVoyCons":
                        mswT.MarkVoyCons(conf);
                        break;
                    case "MarkLetters":
                        mswT.MarkLetters(conf);
                        break;
                    default:
                        throw new Error("Action inconnue!");
                }
                await context.sync();
            }
            else {
                WarningMsg("Aucun texte n'est sélectionné.")
            }
        })
    }

    static ColPhonsClick(conf: Config) {
        MSWText.ApplyFunct("ColorizePhons", conf);
    }

    static ColSylClick(conf: Config) {
        MSWText.ApplyFunct("MarkSyls", conf);
    }

    static ColMotsClick(conf: Config) {
        MSWText.ApplyFunct("MarkWords", conf);
    }

    static ColVoyConsClick(conf: Config) {
        MSWText.ApplyFunct("MarkVoyCons", conf);
    }

    static ColLetClick(conf: Config) {
        MSWText.ApplyFunct("MarkLetters", conf);
    }
    
    /**
     * Retourne le string correspondant au range donné. Il est nécessaire de nettoyer les cas 
     * spéciaux, par exemple pour les tableaux, de manière à ce que la découpe en sous-range
     * corresponde aux caractères dans le texte. 
     * @param rge Le Range du texte à nettoyer
     * @returns Le texte nettoyé.
     */
    private static GetStringFor(rge: Word.Range) : string {
        // Un problème identifié: CR + LF (deux caractères dans le range d'origine) est
        // représenté par un range d'un seul caractère. Il s'agit du "caractère" de fin
        // de ligne dans un tableau.

        let toReturn: string = "";
        let i = 0;
        while (i < rge.text.length) {
            toReturn = toReturn + rge.text[i];
            if ((rge.text[i] === "\r") 
                && ((i+1) < rge.text.length) 
                && (rge.text[i+1] == "\n")) {
                i++;
            } 
            i++;
        }
        return toReturn;
    }

}