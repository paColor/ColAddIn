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
import TheText from "./TheText";
import Vers from "./Vers";
import ZonePoeme from "./ZonePoeme";

/**
 * Cherche les diérèses dans le texte tt. Les syllabes des mots concernés sont modifiées
 * en conséquence.
 * @param tt Le texte du poème.
 * @param pwL La liste des PhonWord du poème. Les syllabes ont déjà été calculées.
 * @param nbrPieds Le nombre de pieds des vers du poème. 0 si on se contente de la détection 
 * automatique du nombre de peids voulu.
 */
export default function ChercheDierese(tt: TheText, pwL: PhonWord[], nbrPieds: number)
{
    // créer les zones
    let zL = new Array<ZonePoeme>();
    let zpCourante = new ZonePoeme(tt);
    zL.push(zpCourante);
    let pos = 0;
    while (pos < tt.S.length)
    {
        let v = new Vers(tt, pos, pwL);
        if (!zpCourante.AddVers(v))
        {
            zpCourante = new ZonePoeme(tt);
            zL.push(zpCourante);
            if (!zpCourante.AddVers(v))
            {
                throw new Error("Une zone ne doit pas refuser le premier vers!");
            }
        }
        pos = v.last + 2; // on saute le caractère de fin de ligne
    }

    // chercher d'éventuelles diérèses
    for (let zp of zL)
        zp.ChercheDierese(nbrPieds);
}