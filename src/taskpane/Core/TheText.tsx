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

import { getColorFromString, IRGB } from "@fluentui/react";
import CharFormatting from "../Configs/CharFormatting";
import Config from "../Configs/Config";
import FormattedTextEl from "./FormattedTextEl";
import PhonWord from "./PhonWord";
import TextEl from "./TextEl";

class CFFForceBlack extends CharFormatting {
    constructor() {
        let black: IRGB = getColorFromString("#000000");
        super(false, false, false, false, black);
    }

    public ForceNonBold (_conf: Config) : boolean {
        return true;
    }

    public ForceNonItalic (_conf: Config) : boolean {
        return true;
    }

    public ForceNonUnderline (_conf: Config) : boolean {
        return true;
    }

    public ForceBlackColor (_conf: Config) : boolean {
        return true;
    }
}



export default class TheText {
    private static rxWords = /\b\w+\b/ig; // expression régulière (rationnelle?) pour détecter les mots
    
    public S : string;
    private lowerCaseS: string;
    private formats: FormattedTextEl[];
    
    constructor(txt: string) {
        this.S = txt;
        this.lowerCaseS = null;
        this.formats = []; 
    }

    public ToLowerString() : string {
        if (this.lowerCaseS === null) {
            this.lowerCaseS = this.S.toLowerCase();
        }
        return this.lowerCaseS;
    }

    public ColorizePhons(conf: Config) {

    }

    /**
     * Retourne la liste de PhonWords pour le texte
     * @param conf La configuration à utiliser pour rechercher les mots et les phonèmes
     * @param mergeApostrophe Indique si les mots suivis d'une apostrophe doivent être
     * fusionnés avec l'apostrophe
     */
    private GetPhonWords (conf: Config, mergeApostrophe = false) : PhonWord[] {
        let pws = new Array<PhonWord>();
        let match: RegExpExecArray | null;
        while ((match = TheText.rxWords.exec(this.S)) !== null) {
            let beg = match.index;
            let len = match[0].length;
            let end = beg + len - 1;

            // Apostrophes: On considère comme apostrophes, les caractères ' ou ’ placé après une ou deux lettres.
            // Cela couvre les formes élidées de le, que, ce, te... Y en  a-t-il d'autres?
            // Il peut y avoir confusion avec le guillemet simple. Tant pis!
            // Le mot est allongé pour contenir l'apostrophe comme dernière lettre.
            // [09.07.2020] On considère le trait d'union comme une apostrophe s'il suit 
            // un 't' seul, comme dans arriva-t-il.
            if ((len <= 2) 
                && (end + 1 < this.S.length) 
                && ((this.S[end + 1] == '\'') 
                    || (this.S[end + 1] == '’') 
                    || (match[0] === "t" && this.S[end + 1] === '-')))
            {
                if (mergeApostrophe)
                {
                    let nextMatch = TheText.rxWords.exec(this.S);
                    if (nextMatch !== null) {
                        end = nextMatch.index + nextMatch[0].length - 1;
                    }
                }
                else
                {
                    end++;
                }
            }

            let pw = new PhonWord(this, beg, end, conf);
            pws.push(pw);
        }
        return pws;
    }

    private ApplyFormatting(conf: Config) {
        this.formats.forEach((fte: FormattedTextEl) => {
            this.SetChars(fte, conf);
        })
    }

    protected SetChars(_fte: FormattedTextEl, _conf: Config) {
        // Must be overriden
        // Must learn how to throw exceptions in Typescript :-) 
    }

}