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
import { RegleMotsEn5, RegleMotsGnGN, RegleMotsOYoj, RegleMotsQUkw, RegleMotsRe, Regle_avoir, Regle_ChK, Regle_er, Regle_finD, Regle_ierConjI, Regle_ill, Regle_ment, Regle_MotsUM, Regle_MotsUN_ON, Regle_mots_ent, Regle_nc_ai_final, Regle_s_final, Regle_tien, Regle_t_final, Regle_VerbesTer, Regle_verbe_mer, Regle_X_Final } from "../Core/AutomRuleFilter";
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
            // console.log(r.text);
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

    static async ColPhonsClick(_conf: Config) {
        Word.run(async (context) => {
            let sel = context.document.getSelection();
            sel.load();
            let rgeColl = sel.split(letDelimiters);
            rgeColl.load();
            await context.sync();
            let mswT = new MSWText(sel, rgeColl);
    
            mswT.ColQquesChar([1, 3, 5, 7]);

            console.log("Regle_ierConjI");
            console.log(Regle_ierConjI("châtierais", 4));
            console.log(Regle_ierConjI("Bonjour", 4)); 

            console.log("Regle_mots_ent");
            console.log(Regle_mots_ent("impotent", 5));
            console.log(Regle_mots_ent("lent", 1));
            console.log(Regle_mots_ent("vient", 2));

            console.log("Regle_ment");
            console.log(Regle_ment("impotent", 5));
            console.log(Regle_ment("importent", 6));
            console.log(Regle_ment("dorment", 4));
            console.log(Regle_ment("comment", 4));

            console.log("Regle_verbe_mer");
            console.log(Regle_verbe_mer("impotent", 5));
            console.log(Regle_verbe_mer("importent", 6));
            console.log(Regle_verbe_mer("dorment", 4));

            console.log("Regle_er");
            console.log(Regle_er("impotent", 5));
            console.log(Regle_er("fier", 2));

            console.log("Regle_nc_ai_final");
            console.log(Regle_nc_ai_final("impotent", 5));
            console.log(Regle_nc_ai_final("mangeai", 5));
            console.log(Regle_nc_ai_final("geai", 2));

            console.log("Regle_avoir");
            console.log(Regle_avoir("impotent", 5));
            console.log(Regle_avoir("eue", 0));

            console.log("Regle_s_final");
            console.log(Regle_s_final("impotent", 5));
            console.log(Regle_s_final("bonjours", 7));
            console.log(Regle_s_final("triceps", 6));

            console.log("Regle_t_final");
            console.log(Regle_t_final("impotent", 7));
            console.log(Regle_t_final("bonjours", 7));
            console.log(Regle_t_final("rapt", 3));

            console.log("Regle_tien");
            console.log(Regle_tien("capétien", 4));
            console.log(Regle_tien("chrétien", 4));
            console.log(Regle_tien("antienne", 2));

            console.log("Regle_finD");
            console.log(Regle_finD("lourd", 4));
            console.log(Regle_finD("baroud", 5));
            console.log(Regle_finD("caïd", 3));
    
            console.log("Regle_ill");
            console.log(Regle_ill("vanille", 3));
            console.log(Regle_ill("vanilline", 3));
            console.log(Regle_ill("filliole", 1));

            console.log("Regle_ill");
            console.log(Regle_ill("vanille", 3));
            console.log(Regle_ill("vanilline", 3));
            console.log(Regle_ill("filliole", 1));

            console.log("Regle_MotsUM");
            console.log(Regle_MotsUM("hume", 1));
            console.log(Regle_MotsUM("minimum", 5));
            console.log(Regle_MotsUM("maximum", 5));

            console.log("Regle_VerbesTer");
            console.log(Regle_VerbesTer("chantions", 4));
            console.log(Regle_VerbesTer("obligations", 6));
            console.log(Regle_VerbesTer("prétentions", 6));

            console.log("Regle_X_Final");
            console.log(Regle_X_Final("dix", 2));
            console.log(Regle_X_Final("choux", 4));
            console.log(Regle_X_Final("lynx", 3));

            console.log("Regle_ChK");
            console.log(Regle_ChK("rachitique", 2));
            console.log(Regle_ChK("psychédélique", 3));
            console.log(Regle_ChK("autochtone", 4));

            console.log("Regle_MotsUN_ON");
            console.log(Regle_MotsUN_ON("unifié", 0));
            console.log(Regle_MotsUN_ON("acupuncture", 4));
            console.log(Regle_MotsUN_ON("chacun", 4));

            console.log("RegleMotsQUkw");
            console.log(RegleMotsQUkw("quidam", 0));
            console.log(RegleMotsQUkw("aquarelle", 1));
            console.log(RegleMotsQUkw("etique", 3));

            console.log("RegleMotsEn5");
            console.log(RegleMotsEn5("rendez", 1));
            console.log(RegleMotsEn5("aquarelle", 1));
            console.log(RegleMotsEn5("agenda", 2));

            console.log("RegleMotsGnGN");
            console.log(RegleMotsGnGN("cognitig", 2));
            console.log(RegleMotsGnGN("campagne", 5));
            console.log(RegleMotsGnGN("agneau", 1));

            console.log("RegleMotsOYoj");
            console.log(RegleMotsOYoj("roy", 1));
            console.log(RegleMotsOYoj("goyave", 1));
            console.log(RegleMotsOYoj("boyeau", 1));

            console.log("RegleMotsRe");
            console.log(RegleMotsRe("regarder", 1));
            console.log(RegleMotsRe("renverser", 1));
            console.log(RegleMotsRe("rectifié", 1));


            await context.sync();
        })
    }

    static async ColNoirClick(_conf: Config) {
        Word.run(async (context) => {
            let sel = context.document.getSelection();
            sel.load();
            sel.font.color = "#000000";
            sel.font.bold = false;
            sel.font.italic = false;
            sel.font.underline = "None";
            await context.sync();
        })
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