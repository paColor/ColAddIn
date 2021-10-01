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

// import { getColorFromString, IRGB } from "@fluentui/react";
import Config from "../Configs/Config";
import { EstConsonne, EstVoyelle } from "../Configs/Utils";
import FormattedTextEl from "./FormattedTextEl";
import PhonWord from "./PhonWord";

/* Pas sûr qu'on en aura besoin puisque la fonction "Noir" est directement réalisée 
 * dans MSWText

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
*/

export default class TheText {
    private static rxWords = /[a-z0-9àáäâéèêëíìïîóòöôúùüû_]+/ig;  // expression régulière (rationnelle?) pour détecter les mots
    
    public S : string;
    private lowerCaseS: string; // attention: utiliser ToLowerString()
    private formats: FormattedTextEl[];
    
    constructor(txt: string) {
        this.S = txt;
        this.lowerCaseS = undefined;
        this.formats = []; 
        this.LogCodePoints();
    }

    public ToLowerString() : string {
        if (this.lowerCaseS === undefined) {
            this.lowerCaseS = this.S.toLowerCase();
        }
        return this.lowerCaseS;
    }

    /** Colorise les phonèmes du texte
     * @param conf La Config donnant les formats à utiliser
    */
    public ColorizePhons(conf: Config) {
        let pws = this.GetPhonWords(conf);
        for (let pw of pws) {
            pw.ColorPhons(conf);
        }
        this.ApplyFormatting(conf);
    }

    /**
     * Colorise les lettres du texte conformément à la configuration de conf.pbdq
     * @param conf La configuration à utiliser.
     */
    public MarkLetters(conf: Config) {
        for (let i = 0; i < this.S.length; i++) {
            let cf = conf.pbdq.GetCfForPBDQLetter(this.S[i]);
            if (cf !== null) {
                this.AddFTE(new FormattedTextEl(this, i, i, cf));
            }
        }
        this.ApplyFormatting(conf);
    }

    /**
     * Colorise les mots du texte de manière alternée, en utilsant les formatages donnés par 
     * conf.sylConfig.
     * @param conf La configuration à utiliser (en particulier conf.sylConf).
     */
    public MarkWords(conf: Config) {
        conf.sylConf.ResetCounter();
        let match: RegExpExecArray | null;
        while ((match = TheText.rxWords.exec(this.ToLowerString())) !== null) {
            let beg = match.index;
            let len = match[0].length;
            let end = beg + len - 1;
            this.AddFTE(new FormattedTextEl(this, beg, end, conf.sylConf.NextCF()));
        }
        this.ApplyFormatting(conf);
    }

    /**
     * Colorise les voyelles et les consonnes, en utilisant les deux premiers formtatages donnés
     * par conf.sylConfig.
     * @param conf La configuration à utiliser (en particulier conf.sylConf).
     * 
     */
    public MarkVoyCons(conf: Config) {
        conf.sylConf.ResetCounter();
        let voyCF = conf.sylConf.NextCF();
        let consCF = conf.sylConf.NextCF();
        let lowS = this.ToLowerString();
        for (let i = 0; i < lowS.length; i++) {
            if (EstConsonne(lowS[i])) {
                this.AddFTE(new FormattedTextEl(this, i, i, consCF));
            }
            else if (EstVoyelle(lowS[i])) {
                this.AddFTE(new FormattedTextEl(this, i, i, voyCF));
            }
        }
        this.ApplyFormatting(conf);
    }

    /**
     * Ajoute le FormattedTextEl à la liste de ceux qui existent pour le texte.
     * @param fte Le FOrmattedTextEl à ajouter.
     */
    public AddFTE(fte : FormattedTextEl) {
        this.formats.push(fte);
    }

    /**
     * Génère un log sur la console des représentation UTF-16 (code points) des caractères du texte.
     */
    public LogCodePoints() {
        for (let i = 0; i < this.S.length; i++) {
            console.log(this.S[i] + " - " + this.S.codePointAt(i));
        }
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
        while ((match = TheText.rxWords.exec(this.ToLowerString())) !== null) {
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
        throw new Error("SetChars must be overridden.")
    }

}