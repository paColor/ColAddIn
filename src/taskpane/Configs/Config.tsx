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

import { useState } from "react";
import PBDQConfig from "./PBDQConfig";
import PhonConfig from "./PhonConfig";
import SylConfig from "./SylConfig";
import UnsetBehConf from "./UnsetBehConf";

export default class Config {
    public readonly pc: PhonConfig;
    public readonly uBeh: UnsetBehConf;
    public readonly pbdq: PBDQConfig;
    public readonly sylConf: SylConfig;

    /** 
     * Indique si la découpe en lettres individuelles a déjà eu lieu une fois.
     * Permet de contourner un comportement bizarre de Word (un bug?) lors de l'utilisation dans
     * un navigateur: la première utilisation ne fonctionne pas correctement... 
     */
     public readonly alreadyDone: boolean;
     public readonly setAlreadyDone : (boolean) => void;
 

    constructor() {
        this.pc = new PhonConfig();
        this.uBeh = new UnsetBehConf();
        this.pbdq = new PBDQConfig();
        this.sylConf = new SylConfig();

        [this.alreadyDone, this.setAlreadyDone] = useState(false);
    }
}