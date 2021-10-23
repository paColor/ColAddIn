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

const DefaultConfigName = "Hippocampéléphantocamélos";

/** 
 * Nom de la config courante enregistrée.
 * Remarque: si un utilisateur choisit le même nom de sauvegarde, la config par défaut sera
 * écrasée...
 */
const curConf = "CurConf_RtZh68j_$";
const prefixSauv = "Sclrzn_";

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
    public static LoadCurrentConfigObj(): any {
        return Config.LoadConfigObj(curConf);
    }

    public static LoadSavedConfigObj(name: string): any {
        return Config.LoadConfigObj(name, true);
    }


   /**
    * Charge la config enregistrée sous name
    * @param name le nom sous lequel est enregsitrée la config à charger.
    * @param addPrfx indique s'il faut ajouter le préfixe des configs enregistrées nomément. 
    * @returns Un objet correspondant à la Config enregistrée. Il a la structure de Config, mais
    * ne contient que les variables qui sont transférables dans un JSON.
    * null si la config en question ne peut pas être chargée.
    */
    private static LoadConfigObj(name: string, addPrfx: boolean = false) : any {
        try {
            let theName = name;
            if (addPrfx) {
                theName = prefixSauv + name;
            }
            let json = window.localStorage.getItem(theName);
            // console.log(json);
            const storedConfObj = JSON.parse(json, reviver);
            // console.log(`Config ${theName} chargée.`);
            return storedConfObj;
        }
        catch (e) {
            ErrorMsg(`Impossible de charger ${name}. ${e.name}`); 
            return null;
        }
    }

    /**
     * Retourne la liste des configs enregistrées (sans la config courante)
     */
    public static GetSavedConfList(): string[] {
        let toReturn : string[] = [];
        let nrSavedConfs = window.localStorage.length;
        for (let i = 0; i < nrSavedConfs; i++) {
            let sN: string = window.localStorage.key(i);
            if (sN.startsWith(prefixSauv)) {
                toReturn.push(sN.substr(prefixSauv.length));
            }
        }
        return toReturn.sort();
    }

    /**
     * Efface la caonfiguration enregistrée "name"
     * @param name Le nom de la Config à effacer.
     */
    public static DeleteSavedConf(name: string) {
        let theName = prefixSauv + name;
        window.localStorage.removeItem(theName);
    }

    /********************************************************************************************
     *                           I N S T A N T I A T E D      P A R T                           *
    *********************************************************************************************/

    public readonly pc: PhonConfig;
    public readonly uBeh: UnsetBehConf;
    public readonly pbdq: PBDQConfig;
    public readonly sylConf: SylConfig;
    public readonly configName: string;
    public readonly setConfigName: (string) => void;

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
        [this.configName, this.setConfigName] = 
            useState((c==null || c.configName == null)?DefaultConfigName:c.configName);
    }

    /**
     * Copie les valeurs de cObj dans la Config
     * @param cObj Un objet qui a la structure de Config, mais qui ne contient que les attributs
     * qui peuvent être stockés dans un JSON. 
     */
    public Copy (cObj : any) {
        if (cObj != null) {
            this.pc.Copy(cObj.pc);
            this.uBeh.Copy(cObj.uBeh);
            this.pbdq.Copy(cObj.pbdq);
            this.sylConf.Copy(cObj.sylConf);

            // alreadyDone ne doit pas être copié.
            this.setConfigName(cObj.configName != null?cObj.configName:DefaultConfigName)
        }
    }

    public Reset() {
        this.pc.Reset();
        this.uBeh.Reset();
        this.pbdq.Reset();
        this.sylConf.Reset();
        this.setConfigName(DefaultConfigName);
    }

    /**
     * Enregistre la Config sous le nom donné en additionnant le préfixe pour les sauvegardes
     * explicites si demandé.
     * @param name Le nom de la sauvegarde
     * @param addPrfx Indique s'il faut ajouter le préfixe qui distingue les configs. Seules
     * les configs sauvegardées avec addPrfx = true sont retournées par GetSavedConfList.
     */
    private SaveConf(name: string, addPrfx: boolean) {
        try {
            let json = JSON.stringify(this, replacer);
            // console.log(json);
            let storeName = name;
            if (addPrfx) {
                storeName = prefixSauv + name;
            }
            window.localStorage.setItem(storeName, json);
        }
        catch (e) {
            ErrorMsg(`Impossible d'enregistrer ${name}. Raison: ${e.name}`);
        }
    }

    /**
     * Enregistre la Config comme Config courante. 
     */
    public SaveCurConfig(){
        this.SaveConf(curConf, false);
    }

    /**
     * Enregistre la Config sous le nom donné. Ce nom apparaîtra dans la liste retournée par
     * GetSavedConfList
     * @param name Le nom de la sauvegarde
     */ 
    public Save(name: string) {
        this.SaveConf(name, true);
    }
}