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

import PhonWord from "./PhonWord";
import TextEl from "./TextEl";
import TheText from "./TheText";

/**
 * Cherche la dernière lettre d'un vers dont on connaît la position de la première lettre. On 
 * part du principe que le vers se termine à la fin de lalligne.
 * @param tt Le texte contenant le vers.
 * @param startPos La position de la première lettre du vers dans tt.
 * @returns La position (dans tt) de la dernière lezttre du vers.
 */
function FindLastVersPos(tt: TheText, startPos: number): number
{
    let i = startPos;
    while (i < tt.S.length && tt.S[i] != '\r' && tt.S[i] != '\v')
    {
        i++;
    }
    return i - 1;
}

function ComptePieds(pwList: PhonWord[]): number
{
    let toReturn = 0;
    for (let pw of pwList)
    {
        toReturn += pw.GetNbreSyllabes();
    }
    return toReturn;
}

/**
 * Recalcule les PhonWords de pws l'un après l'autre en forçant les diérèses, jusqu'à ce
 * que le nombre de pieds de l'ensemble des pws soit >= nbrPiedsVoulu.
 * @param pws La liste des mots où il faut checrher une diérèse.
 * @param nbrPiedsVoulu Le nombre de pieds que doivent donner les pws.
 */
 function ChercherDierese(pws: PhonWord[], nbrPiedsVoulu: number)
 {
     let i = 0;
     while (i < pws.length && ComptePieds(pws) < nbrPiedsVoulu)
     {
         pws[i].ComputeSyls(true);
         i++;
     }
 }

export default class Vers extends TextEl {

    /**
     * Au-delà de cette limite la méthode <see cref="ChercheDierese(int)"/> ne travaille pas.
     * L'idée est que si un vers fait plus que ce nombre de pieds, il ne s'agit plus d'un vers
     * mais d'un paragraphe. Un paragraphe court, risque encore d'êtr etraité comme un vers...
     */
    public static readonly MaxNrPieds = 16;

    /** Nombre de pieds du vers. */
    public nrPieds: number;

    /** Les PhonWord qui constituent le vers. */
    private pWordList: PhonWord[];

    /**
     * Crée un vers sur la base du texte tt. Le premier caractère du vers se trouve
     * à la position first.
     * @param tt Le texte contenant le vers.
     * @param first La position (zero based) de la première lettre du vers.
     * @param pws La liste des PhonWord de tt. 
     */
    constructor(tt: TheText, first: number, pws: PhonWord[]) {
        super(tt, first, FindLastVersPos(tt, first));
        this.pWordList = new Array<PhonWord>();
        this.nrPieds = 0;

        // Trouvons le début du vers
        let i = 0;
        while (i < pws.length && pws[i].first < first)
            i++;
        // Ajoutons le PhonWords au vers.
        if (i < pws.length) {
            while (i < pws.length && pws[i].last <= this.last) {
                this.pWordList.push(pws[i]);
                i++;
            }
            this.nrPieds = ComptePieds(this.pWordList);
        }
    }

    /**
     * Cherche une ou plusieurs diérèses dans le vers, transforme les mots correspondants 
     * jusqu'à ce que le nombre de pieds voulu soit atteint ou qu'il n'y ait plus de diérèse
     * détectable.
     * @param nbrPiedsVoulu Le nombre de pieds souhaité après la mise en évidence des diérèses.
     */
    public ChercheDierese (nbrPiedsVoulu: number)
    {
        if (nbrPiedsVoulu > Vers.MaxNrPieds) {
            console.log("Chercher diérèse pour trop de pieds. Non exécuté.");
            return;
        }
        // traitement spécial pour les nombres de pieds pairs, parcequ'ils le valent bien!
        if (nbrPiedsVoulu % 2 === 0)
        {
            // nombre pair de pieds
            // Y a-t-il un hémistiche à la moitié du vers ou juste avant?
            let demiVers = Math.floor(nbrPiedsVoulu / 2); // je suis mal à l'aise avec cette
            // division qui doit absolument donner un nombre entier. Utilisons Math.floor. 
            let moitie1 = new Array<PhonWord>();
            let i = 0;
            let piedsM1 = 0;
            while (i < this.pWordList.length && piedsM1 < demiVers -1)
            {
                moitie1.push(this.pWordList[i]);
                piedsM1 = ComptePieds(moitie1);
                i++;
            }

            // En prenant les cas dans cet ordre, on favorise légèrement la recherche de la
            // diérèse dans la première partie du vers. Il y a au moins un exemple dans le
            // poème de référence où cette approche est justifiée:
            // "D'affreux bohémiens, des vainqueurs de charnier" 
            // Faut-il rallonger "bohémines" ou "charnier"? Il y a certainement des cas
            // qui demanderaient l'approche opposée. Je ne vois pas comment les distinguer
            // sans tenir compte du sens ou d'éléments que j'ignore jusqu'ici comme la 
            // virgule dans le vers de V. Hugo.

            if (piedsM1 === demiVers - 1)
            {
                let moitie2 = new Array<PhonWord>();
                while (i < this.pWordList.length)
                {
                    moitie2.push(this.pWordList[i]);
                    i++;
                }
                ChercherDierese(moitie1, demiVers);
                if (ComptePieds(this.pWordList) < nbrPiedsVoulu)
                    ChercherDierese(moitie2, demiVers);
                if (ComptePieds(this.pWordList) < nbrPiedsVoulu)
                    ChercherDierese(this.pWordList, nbrPiedsVoulu);
            }
            else if (piedsM1 === demiVers)
            {
                // hypothèse: on a trouvé l'hémistiche
                let moitie2 = new Array<PhonWord>();
                while (i < this.pWordList.length)
                {
                    moitie2.push(this.pWordList[i]);
                    i++;
                }
                ChercherDierese(moitie2, demiVers);
                if (ComptePieds(this.pWordList) < nbrPiedsVoulu)
                    ChercherDierese(moitie1, demiVers);
                if (ComptePieds(this.pWordList) < nbrPiedsVoulu)
                    ChercherDierese(this.pWordList, nbrPiedsVoulu);
            }
            else if (piedsM1 > demiVers)
            {
                // On est allés trop loin. 
                // on n'a pas réussi à trouver d'hémistiche.
                ChercherDierese(this.pWordList, nbrPiedsVoulu);
            }
            else
            {
                // Bizarre: le vers entier semble faire moins de la moitié des pieds voulus...
                console.log("on demande " + nbrPiedsVoulu + "pour le vers " + this.ToString());
                ChercherDierese(this.pWordList, nbrPiedsVoulu); // ça ne devrait pas marcher...
            }
        }
        else
        {
            // nombre impair de pieds voulu.
            ChercherDierese(this.pWordList, nbrPiedsVoulu);
        }
        this.nrPieds = ComptePieds(this.pWordList);
        if (this.nrPieds != nbrPiedsVoulu)
        {
            console.log(
                "!! Diérèse pas trouvée. nbrPiedsVoulu: " + nbrPiedsVoulu + ", nrPieds: " + this.nrPieds +
                ", vers: '" + this.ToString());
        }
    }   
    
}