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
import CharFormatting from "./CharFormatting";

const NrButtons = 6;

export enum SylMode {ecrit, oral, poesie, undefined}

export class SylButtonConf {

    public static GetClickableNeutral() : SylButtonConf {
        return new SylButtonConf(true, CharFormatting.NeutralCF)
    }

    public static GetNonClickableNeutral() : SylButtonConf {
        return new SylButtonConf(false, CharFormatting.NeutralCF)
    }

    buttonClickable: boolean;
    cf: CharFormatting;

    constructor (bclb: boolean, inCF: CharFormatting) {
        this.buttonClickable = bclb;
        this.cf = inCF;
    }
}

function GetDefSylButtons() : SylButtonConf[] {
    return new Array(
        new SylButtonConf(true, new CharFormatting (false, false, false, true, {r: 0, g: 0, b: 255})),
        new SylButtonConf(true, new CharFormatting (false, false, false, true, {r: 255, g: 0, b: 0})), 
        SylButtonConf.GetClickableNeutral(),
        SylButtonConf.GetNonClickableNeutral(),
        SylButtonConf.GetNonClickableNeutral(),
        SylButtonConf.GetNonClickableNeutral(),
    );
}

export default class SylConfig {
    /**
     * Indique si les doubles consonnes doivent être séparées entre (true) ou avant elles (false).
     */
    public readonly doubleConsStd : boolean;
    public readonly setDoubleConsStd : (boolean) => void;

    /** Le mode à utiliser pour la reconnaissance des syllabes. */
    public readonly sylMode : SylMode;
    public readonly setSylMode : (SylMode) => void;

    /** Indique si les muettes doivent être marquées. */
    public readonly marquerMuettes : boolean;
    public readonly setMarquerMuettes : (boolean) => void;

    /** Indique si en mode poésie, il faut rechercher les diérèses. */
    public readonly chercherDierese : boolean;
    public readonly setChercherDierese : (boolean) => void;

    /** Dans le cas où il faut chercher les diérèses, le nombre de pieds à chercher */
    public readonly nrPieds : number;
    public readonly setNrPieds : (number) => void;

    /** Les 6 boutons de configuration.  */
    private sylButtons : SylButtonConf[];
    private setSylButtons : (sbc: SylButtonConf[]) => void;

    /** Nombre de boutons configurés pour formater */
    public readonly nrSetButtons : number;
    private readonly setNrSetButtons : (number) => void;

    /** Permet de forcer un nouveau rendu... */
     private readonly dummy: boolean;
     private readonly setDummy: (boolean) => void;

    /** Compteur utilisé pour retourner les formatages les uns après les autres. */
    private counter : number;

    /**
     * @param sc La SylConfig dont il faut copier les valeurs. Configuration par défaut si
     * sc est null.
     */
    constructor(sc: SylConfig) {
        [this.doubleConsStd, this.setDoubleConsStd] = useState(sc==null?true:sc.doubleConsStd);
        [this.sylMode, this.setSylMode] = useState(sc==null?SylMode.ecrit:sc.sylMode);
        [this.marquerMuettes, this.setMarquerMuettes] = useState(sc==null?true:sc.marquerMuettes);
        [this.chercherDierese, this.setChercherDierese] = useState(sc==null?true:sc.chercherDierese);
        [this.nrPieds, this.setNrPieds] = useState(sc==null?0:sc.nrPieds);
        [this.sylButtons, this.setSylButtons] = useState(sc==null?GetDefSylButtons():sc.sylButtons);
        [this.nrSetButtons, this.setNrSetButtons] = useState(sc==null?2:sc.nrSetButtons);
        [this.dummy, this.setDummy] = useState(false);
        this.ResetCounter();
    }

    /**
     * Copie les valeurs de cObj dans la SylConfig
     * @param sObj Un objet qui a la structure de SylConfig, mais qui ne contient que les attributs
     * qui peuvent être stockés dans un JSON. 
     */
    public Copy(sObj: any) {
        if (sObj != null) {
            this.setDoubleConsStd(sObj.doubleConsStd);
            this.setSylMode(sObj.sylMode);
            this.setMarquerMuettes(sObj.marquerMuettes);
            this.setChercherDierese(sObj.chercherDierese);
            this.setNrPieds(sObj.nrPieds);
            this.setSylButtons(sObj.sylButtons);
            this.setNrSetButtons(sObj.nrSetButtons);
        }    
    }

    public Reset() {
        this.setDoubleConsStd(true);
        this.setSylMode(SylMode.ecrit);
        this.setMarquerMuettes(true);
        this.setChercherDierese(true);
        this.setNrPieds(0); // Auto
        this.setSylButtons(GetDefSylButtons());
        this.setNrSetButtons(2);
        this.ResetCounter();
        // this.ForceRendering();
    }

    /** 
     * Réinitialise le compteur utilisé pour passer d'une couleur à l'autre. Permet d'être
     * sûr de commencer avec la première couleur configurée.
     */
    public ResetCounter() {
        this.counter = 0;
    }

    /**
     * Indique s'il s'agit du bouton qui n'est pas encore actif, mais qu'on peut configurer.
     * @param butNr Le numéro du bouton
     * @returns true s'il s'agit du bouton qu'on peut activer.
     */
    public ButtonIsActivableOne(butNr: number) : boolean {
        return butNr === this.nrSetButtons;
    }

    /**
     * Indique si le bouton donné est le dernier bouton actif, c.à.d. si c'est celui qui peut
     * être effacé.
     * @param butNr Le bouton à analyser.
     * @returns true si le bouton est le dernier actif.
     */
    public ButtonIsLastActive(butNr: number) : boolean {
        return butNr === this.nrSetButtons - 1;
    }

    /**
     * Donne la SylButtonConf pour le bouton butNr
     * @param butNr le bouton dont on veut connaître la configuration.
     * @returns La SylButtonConf demandée.
     */
    public GetSylButtonConfFor(butNr : number) : SylButtonConf {
        return this.sylButtons[butNr];
    }

    /**
     * Indique que le le boouton butNr (commence à 0) doit être formatté avec inCf.
     * @param butNr Le numéro du bouton dont on veut changer le formatage
     * @param inCf Le nouveau formatage
     */
    public SetSylButtonCF(butNr: number, inCf: CharFormatting) {
        if (butNr > this.nrSetButtons)
        {
            throw new Error("Modification d'un bouton non actif. butNr: " + butNr.toString);
        }
        let sylButsCopy = this.sylButtons;
        sylButsCopy[butNr].cf = inCf;
        if (butNr === this.nrSetButtons)
        {
            let newNrSetButtons = this.nrSetButtons + 1;
            this.setNrSetButtons(newNrSetButtons);
            if (newNrSetButtons < NrButtons)
            {
                sylButsCopy[newNrSetButtons] = SylButtonConf.GetClickableNeutral();
            }
            if (inCf.changeColor == false)
            {
                // c'est un problème. Il faut une couleur, sinon l'expérience utilisateur
                // n'est pas consistante.
                throw new Error("Les boutons des syllabes doivent avoir une couleur.")
            }
        }
        this.setSylButtons(sylButsCopy);
        this.ForceRendering();
    }

    /**
     * Efface le dernier bouton formaté de la série.
     * @param errAction fonction appelée s'il n'y a rien à effacer
     */
    public ClearLastButton(errAction: () => void) {
        if (this.nrSetButtons > 0) 
        {
            let sylButsCopy = this.sylButtons;
            if (this.nrSetButtons < NrButtons)
            {
                sylButsCopy[this.nrSetButtons] = SylButtonConf.GetNonClickableNeutral();
            }
            let newNrSetButtons = this.nrSetButtons - 1;
            this.setNrSetButtons(newNrSetButtons);
            sylButsCopy[newNrSetButtons] = SylButtonConf.GetClickableNeutral();
            this.setSylButtons(sylButsCopy);
            this.ForceRendering();
        }
        else
        {
            errAction();
        }
    }

    /**
     * Retourne le CharFormatting à utiliser pour le formatage en alternance.
     * @returns 
     */
    public NextCF(): CharFormatting {
        let toReturn = this.sylButtons[this.counter].cf;
        if (this.nrSetButtons > 0)
            this.counter = (this.counter + 1) % this.nrSetButtons;
        else
            this.counter = 0;
        return toReturn;
    }

    private ForceRendering() {
        this.setDummy(!this.dummy);
    }
}