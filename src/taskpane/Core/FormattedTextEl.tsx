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

import CharFormatting from "../Configs/CharFormatting";
import TextEl from "./TextEl";
import TheText from "./TheText";

export default class FormattedTextEl extends TextEl {

    public readonly cf: CharFormatting;

    constructor(tt: TheText, inF: number, inL: number, inCF: CharFormatting) {
        super(tt, inF, inL);
        this.cf = inCF;
    }

    /**
     * Crée le formattage demandé pour le TextEl
     * @param te Le TextEl à formatter
     * @param cf Le formattage à appliquer
     */
    public static SetCharFormat4TE(te: TextEl, cf: CharFormatting) {
        let fte = new FormattedTextEl(te.T, te.first, te.last, cf);
        te.T.AddFTE(fte);
    }

}