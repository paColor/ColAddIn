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

import TextEl from "./TextEl";
import TheText from "./TheText";
import Vers from "./Vers";

/** 
 * Différence négative par rapport au nombre moyen de vers au-delà de laquelle le vers est 
 * considéré comme faisant partie d'une autre zone.
*/
const DeltaMoins = 2.7; // valeur purement empirique...

/** 
 * Différence positive par rapport au nombre moyen de vers au-delà de laquelle le vers est 
 * considéré comme faisant partie d'une autre zone.
*/
const DeltaPlus = 2.1; // valeur purement empirique...

/**
 * Représente une zone de plusieurs vers consécutifs dans un poème. Ces vers ont à peu près
 * le même nombre de pieds. L'hypothèse est qu'ils devraient tous en compter exactement le
 * même nombre et que les pieds qui manquent sont des diérèses qu'il reste à trouver...
 */
export default class ZonePoeme extends TextEl {

    /**
     * Nombre de pieds calculé au fur et à mesure de l'ajout de vers.
     */
    public nrPiedsVoulu: number; 

    /** Liste (ordonnée) des vers de la zone. */
    public vList: Vers[];

    private nrPiedsMoyen: number;

    /**
     * Crée une ZonePoeme vide pour le texte tt. 
     * @param tt Let texte sur lequel est construit la zone.
     */
    constructor(tt: TheText) {
        super(tt, 0, -1); // élément vide
        this.nrPiedsMoyen = 0;
        this.nrPiedsVoulu = 0;
        this.vList = new Array<Vers>();
    }

    /// <summary>
    /// Ajout le vers <c>v</c> à la zone. 
    /// </summary>
    /// <param name="v">Le vers à ajouter à la zone. Non <c>null</c>.</param>
    /// <returns><c>true</c>: Le vers a été ajouté à la zone. <c>false</c>: le vers a un nombre
    /// de pieds trop éloigné des autres vers de la zone. Il fait partie d'une autre zone.
    /// Il n'a pas été ajouté.</returns>
    /// <exception cref="ArgumentNullException"> si <paramref name="v"/> est <c>null</c>.</exception>

    /**
     * Ajoute le vers v à la zone.
     * @param v Le vers à ajouter à la zone. 
     * @returns true: Le vers a été ajouté à la zone. false: le vers a un nombre
     * de pieds trop éloigné des autres vers de la zone. Il fait partie d'une autre zone.
     * Il n'a pas été ajouté.
     */
    public AddVers(v: Vers) : boolean
    {
        let toReturn = false;
        if (this.vList.length === 0)
        {
            this.vList.push(v);
            this.nrPiedsMoyen = v.nrPieds;
            this.nrPiedsVoulu = v.nrPieds;
            this.first = v.first;
            this.last = v.last;
            toReturn = true;
        }
        else if ((this.nrPiedsMoyen >= v.nrPieds && this.nrPiedsMoyen - v.nrPieds < DeltaMoins)
            || (this.nrPiedsMoyen < v.nrPieds && v.nrPieds - this.nrPiedsMoyen < DeltaPlus))
        {
            this.nrPiedsMoyen =  ((this.nrPiedsMoyen * this.vList.length) + v.nrPieds) / (this.vList.length + 1);
            this.nrPiedsVoulu = Math.round(this.nrPiedsMoyen);
            if (this.nrPiedsVoulu < (this.nrPiedsMoyen - 0.3))
                this.nrPiedsVoulu++;
            this.vList.push(v);
            this.last = v.last;
            toReturn = true;
        }
        return toReturn;
    }
    
    /**
     * Pour tous les vers de la zone dont le nombre de pieds est plus petit que le nombre de
     * pieds voulu, on cherche s'il n'y aurait pas une diérèse qui pourrait augmenter le
     * nombre de pieds du vers.
     * @param nrPieds Nombre de pieds à rechercher. 0 s'il faut prendre le nombre de
     * pieds estimé par l'algorithme. Ne fait rien si nrPieds > Vers.MaxNrPieds
     */
    public ChercheDierese(nrPieds: number)
    {
        if (nrPieds > 0)
            this.nrPiedsVoulu = nrPieds;
        else if (nrPieds < 0)
        {
            throw new Error("Nombre de pieds voulu négatif: " + nrPieds);
        }

        if (this.nrPiedsVoulu <= Vers.MaxNrPieds)
        {
            for (let v of this.vList)
            {
                if (v.nrPieds < this.nrPiedsVoulu)
                {
                    v.ChercheDierese(this.nrPiedsVoulu);
                }
            }
        }
        else
        {
            console.log("Nombre de pieds demandé({0}) trop grand pour chercher les diérèses: " +
                this.nrPiedsVoulu);
        }
    }

}