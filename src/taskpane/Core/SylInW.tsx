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
import PhonInW from "./PhonInW";
import PhonWord from "./PhonWord";

const bkptgdfv:  Array<Phoneme> = [Phoneme.b, Phoneme.k, Phoneme.p, Phoneme.t, Phoneme.g,
    Phoneme.d, Phoneme.f, Phoneme.v, Phoneme.k_qu, Phoneme.g_u]

export default class SylInW extends PhonInW {

    /**
     * Crée und SylInW équivalent au PhonInW indiqué
     * @param piw Le PhonInW à "cloner" pour le SylInW
     * @returns Le nouveau SylInW correspondant à piw.
     */
    public static GetSylInW(piw: PhonInW) : SylInW {
        return new SylInW(piw.pw, piw.first-piw.pw.first, piw.last - piw.pw.first, piw.p);
    }

    /**
     * Crée un SylInW
     * @param inPW Le PhonWord qui contient le phonème créé.
     * @param inBeg: La position (zero based) de la première lettre du phonème dans le mot.
     * @param inEnd: La position (zero based) de la dernière lettre du phonème dans le mot.
     * @param inP: Le type de phonème
     */
    public constructor (inPW : PhonWord, inBeg : number, inEnd : number, inP : Phoneme) {
        super(inPW, inBeg, inEnd, inP);
    }

    public EstBkptgdfv() : boolean {
        return bkptgdfv.includes(this.p);
    }

    public EstConsonneRedoublee() : boolean
    {
        return ((this.last - this.first === 1) // le phoneme contient exactement deux lettres
            && this.pw.GetChar(this.first) === this.pw.GetChar(this.last) // qui sont égales
            && this.EstConsonne()); // et il s'agit bien d'une consonne
    }

    /** 
     * pour une syllabe de deux lettres, se réduit à la première lettre.
     * Ne fait rien s'il n'y a pas exactement deux lettres.
     */
    public ReduitAPremiereLettre()
    {
        if (this.last - this.first === 1) {
            // exactement deux lettres
            this.last = this.first;

        } 
    }

    /** 
     * pour une syllabe de deux lettres, se réduit à la dernière lettre.
     * Ne fait rien s'il n'y a pas exactement deux lettres.
     */
    public ReduitADerniereLettre()
    {
        if (this.last - this.first === 1) {
            // exactement deux lettres
            this.first = this.last;
        } 
    }

    /**
     * La syllabe s'agrandit en absorbant la syllabe suivante.
     * @param suivant doit être la syllabe qui suit this.
     */
    public AbsorbeSuivant(suivant: SylInW)
    {
        if (suivant.first === this.last + 1) {
            this.last = suivant.last;
            if (!this.EstVoyelle() && suivant.EstVoyelle())
            {
                this.p = suivant.p;
            }
        }
        else {
            throw new Error("Ce n'est pas la syllabe suivante.")
        }
    }

    /**
     * Enlève les n premières lettres à la syllabe
     * @param n Le nombre de lettres à enlever
     * @returns false si la syllabe est vide (plus de lettres), 
     * true si l'opération s'est bien déroulée. 
     */
    public ReduitGauche (n: number) : boolean
    {
        this.first = this.first + n;
        return (this.last >= this.first);
    }

    /** Etend la syllabe de n caractères vers la droite. */
    public EtendDroite(n: number)
    {
        this.last = this.last + n;
    }

    /**
     * Applique le formatage défini par conf à la syllabe.
     * @param conf la Config à utiliser, en particulier conf.sylConf.
     */
    public PutColor(conf: Config)
    {
        
        FormattedTextEl.SetCharFormat4TE(this, conf.sylConf.NextCF());
    }

}