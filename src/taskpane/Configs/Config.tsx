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
import { ErrorMsg } from "../components/MessageWin";
import PBDQConfig from "./PBDQConfig";
import PhonConfig from "./PhonConfig";
import SylConfig from "./SylConfig";
import UnsetBehConf from "./UnsetBehConf";

/** Nom de la config courante enregistrée */
const curConf = "CurConf";
// const prefixSauv = "S_";

/* voir https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map */
function replacer (_key: string, value: any) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()),
        };
    } else {
        return value;
    }
}

function reviver (_key: string, value: any) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
          return new Map(value.value);
        }
    }
    return value;
}

export default class Config {

    /********************************************************************************************
     *                                 S T A T I C      P A R T                                 *
    *********************************************************************************************/

   /**
    * Charge la config par défaut enregistrée
    * @returns Un objet correspondant à la Config enregistrée. Il a la structure de Config, mais
    * ne contient que les variables qui sont transférables dans un JSON.
    */
    public static LoadDefaultConfigObj(): any {
        try {
            let json = window.localStorage.getItem(curConf);
            // console.log(json);
            const storedConf = JSON.parse(json, reviver);
            console.log("Config enregistrée chargée.");
            return storedConf;
        }
        catch {
            console.log("Pas de config enregistrée trouvée.");
            return null;
        }
    }

    /**
     * Enregistre conf comme Config courante. 
     * @param conf La Config à enregistrer comme Config courante
     */
    public static SaveCurConfig(conf: Config) {
        try {
            let json = JSON.stringify(conf, replacer);
            // console.log(json);
            window.localStorage.setItem(curConf, json);
            console.log("Config courante sauvegardée comme défaut.")
        }
        catch (e) {
            ErrorMsg("Impossible d'enregistrer la configuration courante. " + e.name);
        }
    }

    /********************************************************************************************
     *                           I N S T A N T I A T E D      P A R T                           *
    *********************************************************************************************/

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
 

    /**
     * Crée une Config en copiant les champs de c. Si c est null, une Config par défaut
     * est créée.
     * @param c l'objet résultant du chargement d'une Config sauvegardée.
     */
    public constructor(c: any = null) {
        this.pc = new PhonConfig(c == null?null:c.pc);
        this.uBeh = new UnsetBehConf(c == null?null:c.uBeh);
        this.pbdq = new PBDQConfig(c == null?null:c.pbdq);
        this.sylConf = new SylConfig(c == null?null:c.sylConf);

        [this.alreadyDone, this.setAlreadyDone] = useState(false);
    }

    public Copy (theConf : Config) {
        this.pc.Copy(theConf.pc);
        this.uBeh.Copy(theConf.uBeh);
        this.pbdq.Copy(theConf.pbdq);
        this.sylConf.Copy(theConf.sylConf);

        // alreadyDone ne doit pas être copié.
    }

    public Reset() {
        this.pc.Reset();
        this.uBeh.Reset();
        this.pbdq.Reset();
        this.sylConf.Reset();
    }
}