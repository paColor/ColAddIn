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
import AutomatFindPhons from "./AutomAutomat";
import PhonInW from "./PhonInW";
import TheText from "./TheText";
import TheWord from "./TheWord";

export default class PhonWord extends TheWord {
    private phons: PhonInW[];
    private theConf: Config;

    constructor (tt: TheText, inFirst: number, inLast: number, conf: Config) {
        super(tt, inFirst, inLast);
        this.theConf = conf;
        this.phons = new Array<PhonInW>();
        AutomatFindPhons(this, this.theConf);
    }

    public AddPhon(piw: PhonInW) {
        this.phons.push(piw);
    }

    /**
     * Retourne une représentation phonétique lexique.org du mot.
     */
    public ToPhonString() : string {
        let toReturn = "";
        for (let piw of this.phons) {
            toReturn = toReturn + piw.PhonToString();
        }
        return toReturn;
    }

}