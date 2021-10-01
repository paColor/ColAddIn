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
import FormattedTextEl from "./FormattedTextEl";
import { Phoneme } from "./Phoneme";
import PhonWord from "./PhonWord";
import TextEl from "./TextEl";

    /// <summary>
    /// Traduction de la représentation ColSimpl étendue (ça devient un peu compliqué) vers les 
    /// phonèmes utilisés par PhonInW et PhonWord.
    /// ColSimpl correspond en fait à Lexique sans la distinction entre "o" et "O". Les extensions
    /// attribuent une représentation en une lettre pour les phonèmes "spéciaux" de colorization.
    /// Est utilisé par le dictionnaire d'exceptions.
    /// Extensions: 
    ///     "#" pour muet, 
    ///     "ç" pour e caduc, 
    ///     "4" pour les chiffres, 
    ///     "3" pour oin, 
    ///     "6" pour oi, 
    ///     "x" pour ks, 
    ///     "X" pour gz,
    ///     "%" pour ill
    ///     "/" pour ij
    /// 
    /// </summary>
    const colSE2phoneme = new Map ([
        ['a',   Phoneme.a],
        ['°',   Phoneme.q],
        ['i',   Phoneme.i],
        ['y',   Phoneme.y],
        ['1',   Phoneme.x_tilda],
        ['u',   Phoneme.u],
        ['e',   Phoneme.e],
        ['o',   Phoneme.o],
        ['E',   Phoneme.E],
        ['@',   Phoneme.a_tilda], // an
        ['§',   Phoneme.o_tilda], // on
        ['2',   Phoneme.x2],
        ['6',   Phoneme.oi], // oi
        ['5',   Phoneme.e_tilda],
        ['w',   Phoneme.w],
        ['j',   Phoneme.j],
        ['%',   Phoneme.j_ill], // ill
        ['G',   Phoneme.J], // ng
        ['N',   Phoneme.N], // gn
        ['l',   Phoneme.l],
        ['v',   Phoneme.v],
        ['f',   Phoneme.f],
        ['p',   Phoneme.p],
        ['b',   Phoneme.b],
        ['m',   Phoneme.m],
        ['z',   Phoneme.z],
        ['s',   Phoneme.s],
        ['t',   Phoneme.t],
        ['d',   Phoneme.d],
        ['x',   Phoneme.ks], // ks
        ['X',   Phoneme.gz], // gz
        ['R',   Phoneme.R],
        ['r',   Phoneme.R],
        ['n',   Phoneme.n],
        ['Z',   Phoneme.Z], // ge
        ['S',   Phoneme.S], // ch
        ['k',   Phoneme.k],
        ['g',   Phoneme.g],
        ['/',   Phoneme.i_j],
        ['3',   Phoneme.w_e_tilda], // oin
        ['4',   Phoneme.chiffre],
        ['#',   Phoneme._muet],
        ['ç',   Phoneme.q_caduc]
    ]);

    /** Mapping vers la représentation lexique.org des phonèmes.*/
    const lexMap = new Map<Phoneme, string> ([
        [ Phoneme.a,           "a" ],
        [ Phoneme.q,           "°" ],
        [ Phoneme.q_caduc,     ""  ], // e final "" est plus proche de Lexique, normalement il faudrait plutôt °
        [ Phoneme.i,           "i" ],
        [ Phoneme.o,           "O" ],
        [ Phoneme.o_comp,      "o" ],
        [ Phoneme.u,           "u" ],
        [ Phoneme.y,           "y" ],
        [ Phoneme.e,           "e" ],
        [ Phoneme.E,           "E" ],
        [ Phoneme.E_comp,      "E" ],
        [ Phoneme.e_comp,      "e" ],
        [ Phoneme.e_tilda,     "5" ],
        [ Phoneme.a_tilda,     "@" ],
        [ Phoneme.o_tilda,     "§" ],
        [ Phoneme.x_tilda,     "1" ],
        [ Phoneme.x2,          "2" ],
        [ Phoneme.oi,          "wa" ],
        [ Phoneme.w,           "w" ],
        [ Phoneme.i_j,         "ij" ],
        [ Phoneme.j,           "j" ],
        [ Phoneme.J,           "G" ],
        [ Phoneme.p,           "p" ],
        [ Phoneme.b,           "b" ],
        [ Phoneme.t,           "t" ],
        [ Phoneme.d,           "d" ],
        [ Phoneme.k,           "k" ],
        [ Phoneme.g,           "g" ],
        [ Phoneme.f,           "f" ],
        [ Phoneme.v,           "v" ],
        [ Phoneme.s,           "s" ],
        [ Phoneme.z,           "z" ],
        [ Phoneme.S,           "S" ],
        [ Phoneme.Z,           "Z" ],
        [ Phoneme.m,           "m" ],
        [ Phoneme.n,           "n" ],
        [ Phoneme.N,           "N" ],
        [ Phoneme.l,           "l" ],
        [ Phoneme.R,           "R" ],
        [ Phoneme.w_e_tilda,   "w5" ],
        [ Phoneme.f_ph,        "f" ],
        [ Phoneme.k_qu,        "k" ],
        [ Phoneme.g_u,         "g" ],
        [ Phoneme.s_c,         "s" ],
        [ Phoneme.s_t,         "s" ],
        [ Phoneme.s_x,         "s" ],
        [ Phoneme.z_s,         "z" ],
        [ Phoneme.ks,          "ks" ],
        [ Phoneme.gz,          "gz" ],
        [ Phoneme.verb_3p,     "" ],
        [ Phoneme._muet,       "" ],
        [ Phoneme.j_ill,       "j" ],
        [ Phoneme.i_j_ill,     "ij" ],
        [ Phoneme.ji,          "j" ],
        [ Phoneme.chiffre,     "" ],
        [ Phoneme.unité,       "" ],
        [ Phoneme.dizaine,     "" ],
        [ Phoneme.centaine,    "" ],
        [ Phoneme.milliers,    "" ],
        [ Phoneme.firstPhon,   "FIRSTPHON" ],
        [ Phoneme.lastPhon,    "LASTPHON" ]
    ])

    const voyelles : Array<Phoneme> = [ Phoneme.a, Phoneme.q, 
        Phoneme.q_caduc, Phoneme.i, Phoneme.o, Phoneme.o_comp, Phoneme.u, Phoneme.y, 
        Phoneme.e, Phoneme.E, Phoneme.E_comp, Phoneme.e_comp, Phoneme.e_tilda,
        Phoneme.a_tilda, Phoneme.o_tilda, Phoneme.x_tilda, Phoneme.x2, Phoneme.oi, 
        Phoneme.w_e_tilda, Phoneme.i_j, Phoneme.i_j_ill ];

    const consonnes : Array<Phoneme> = [ Phoneme.p, Phoneme.b, 
        Phoneme.t, Phoneme.d, Phoneme.k, Phoneme.g, Phoneme.f, Phoneme.v, Phoneme.s,
        Phoneme.z, Phoneme.S, Phoneme.Z, Phoneme.m, Phoneme.n, Phoneme.l, Phoneme.R, 
        Phoneme.f_ph, Phoneme.k_qu, Phoneme.g_u, Phoneme.s_c, Phoneme.s_t, Phoneme.s_x,
        Phoneme.z_s,Phoneme.ks, Phoneme.gz ];

    // const semiVoyelles : Array<Phoneme> = [ Phoneme.w,
    //     Phoneme.J, Phoneme.N, Phoneme.j, Phoneme.j_ill, Phoneme.ji ];

    const muet : Array<Phoneme> = [ Phoneme.verb_3p, Phoneme._muet,
        Phoneme.chiffre ];

    export default class PhonInW extends TextEl {
        public p : Phoneme;
        public readonly pw : PhonWord; // the PhonWord the PhonInW belongs to
        public readonly firedRuleName: string; // name of the rule that was used to set the phonème.

        /** Créé un PhonInWord.
         * @param inPW Le PhonWord qui contient le phonème créé.
         * @param inBeg: La position (zero based) de la première lettre du phonème dans le mot.
         * @param inEnd: La position (zero based) de la dernière lettre du phonème dans le mot.
         * @param inP: Le type de phonème
         * @param ruleN: La règle de l'automate qui a décidé de la création du phonème.
        */
        constructor(inPW : PhonWord, inBeg : number, inEnd : number, inP : Phoneme, ruleN? : string)
        {
            super(inPW.T, inPW.first+inBeg, inPW.first + inEnd);
            this.pw = inPW;
            this.p = inP;
            this.firedRuleName = ruleN;
        }

        /**
         * Applique le formattage défini par conf au phonème.
         * Remarque: le nom devrait être PutFormat, mais nous gardons les noms de la version
         * VSTO pour rendre le parallèle plus facile à établir.
         * @param conf La configuration indiquant les fomrattages à utiliser.
         */
        public PutColor(conf: Config) {
            FormattedTextEl.SetCharFormat4TE(this, conf.pc.GetPhonCF(this.p));
        }

        /**
         * Retourne la représentation "lexique.org" du phonème
         * @returns la représentation "lexique.org" du phonème
         */
        public PhonToString() : string {
            return lexMap.get(this.p);
        }

        /** Indique si le PhonInW est un phonème consonne */
        public EstConsonne() : boolean {
            return consonnes.includes(this.p);
        }

        /**
         * Indique si le PhonInW est un phonème voyelle
         * @param forceDierese Indique si la diérèse doit être forcée. 
         * @returns true s'il s'agit d'une voyelle,  false sinon.
         */
        public EstVoyelle(forceDierese = false) : boolean {
            let toReturn = false;
            if (this.p === Phoneme.ji)
            {
                toReturn = forceDierese;
            }
            else
            {
                toReturn = voyelles.includes(this.p);
            }
            return toReturn;
        }

        /** Indique si le PhonInW est un phonème muet */
        public EstMuet() : boolean {
            return muet.includes(this.p);
        }

        /** Créé un PhonInWord et l'ajoute à la liste de inPW.
         * @param inPW Le PhonWord qui contient le phonème créé.
         * @param inBeg: La position (zero based) de la première lettre du phonème dans le mot.
         * @param inEnd: La position (zero based) de la dernière lettre du phonème dans le mot.
         * @param inP: Le type de phonème
         * @param ruleN: La règle de l'automate qui a décidé de la création du phonème.
        */
        public static CreateAndPushPiWPhon(inPW : PhonWord, inBeg : number, inEnd : number, 
            inP : Phoneme, ruleN : string) : PhonInW
        {
            let piw = new PhonInW(inPW, inBeg, inEnd, inP, ruleN)
            inPW.AddPhon(piw);
            return piw;
        }
        
        
        /** Créé un PhonInWord et l'ajoute à la liste des phonèmes de inPW.
         * @param inPW Le PhonWord qui contient le phonème créé.
         * @param inBeg La position (zero based) de la première lettre du phonème dans le mot.
         * @param inEnd La position (zero based) de la dernière lettre du phonème dans le mot.
         * @param colSE Le phonème au format ColSimplifiéEtendu.
         * @param ruleN La règle de l'automate qui a décidé de la création du phonème.
        */
        public static CreateAndPushPiWColSE (inPW : PhonWord, inBeg : number, inEnd : number, 
            colSE : string, ruleN : string) : PhonInW 
        {
            let phon = colSE2phoneme.get(colSE);
            if (phon !== undefined) {
                let piw = new PhonInW(inPW, inBeg, inEnd, phon, ruleN);
                inPW.AddPhon(piw);
                return piw;
            }
            else {
                return null;
            }
        }
        
    }