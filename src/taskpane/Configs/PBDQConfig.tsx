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

import { Dispatch, SetStateAction, useState } from "react";
import CharFormatting from "./CharFormatting";

const nrButtons = 8;

function GetDefPBDQCFs(): Map<string, CharFormatting> {
    return new Map ([
        ["p", new CharFormatting(false, false, false, true, {r: 51, g: 153, b: 102})],
        ["b", new CharFormatting(false, false, false, true, {r: 255, g: 0, b: 0})],
        ["d", new CharFormatting(false, false, false, true, {r: 71, g: 115, b: 255})],
        ["q", new CharFormatting(false, false, false, true, {r: 172, g: 121, b: 66})],
    ])
}

function GetDefSelLet(): string[] {
    return ["p", "b", "d", "q", " ", " ", " ", " "];
}


export default class PBDQConfig {

    public static readonly inactiveLetter = " ";
    /**
     * Indique si les lettres qui ne doivent pas être marquées doivent être laissées telles
     * quelles <c>false</c> ou mises en noir <c>true</c>.
     */
    public readonly markAsBlack : boolean;
    private readonly setMAB : (boolean) => void;

    /**
     * pour une lettre donnée, le formattage correspondant
     */
    private pbdqCF : Map<string, CharFormatting>;
    private setPBDQcf: (newPBDQcf: Map<string, CharFormatting>) => void;

    /**
     * La lettre associée à chaque bouton
     */
    private selLetters: string[];
    private setSelLetters: (newSelL: string[]) => void;

    /**
     * Le CF qui est retourné pour les lettres qui ne doivent pas être formattées.
     */
    private defaultCF: CharFormatting;
    private setDefaultCF: (newCF: CharFormatting) => void;

    /**
     * Permet de forcer un nouveau rendu...
     */
    private readonly dummy: boolean;
    private readonly setDummy: Dispatch<SetStateAction<boolean>>;

    /**
     * @param pb La PBDQConfig dont il faut copier les valeurs. Configuration par défaut si
     * pb est null.
     */
    constructor(pb: PBDQConfig) {
        [this.markAsBlack, this.setMAB] = useState(pb==null?false:pb.markAsBlack);
        [this.pbdqCF, this.setPBDQcf] = useState(pb==null?GetDefPBDQCFs(): pb.pbdqCF);
        [this.selLetters, this.setSelLetters] = useState(pb==null?GetDefSelLet():pb.selLetters);
        [this.defaultCF, this.setDefaultCF] = useState(pb==null?CharFormatting.NeutralCF:pb.defaultCF);
        [this.dummy, this.setDummy] = useState(false);
    }

    public Copy(thePBDQconf: PBDQConfig) {
        this.setMAB(thePBDQconf.markAsBlack);
        this.setPBDQcf(thePBDQconf.pbdqCF);
        this.setSelLetters(thePBDQconf.selLetters);
        this.setDefaultCF(thePBDQconf.defaultCF);
    }

    /**
     * Réinitialise tous les champs du PBDQConfig à leur valeur par défaut.
     */
    public Reset() {
        this.setMAB(false);
        this.setPBDQcf(GetDefPBDQCFs());
        this.setSelLetters(GetDefSelLet());
    }

    /**
     * Retourne le CharFormatting pour la lettre c
     * @param c La lettre dont on veut le Charformatting
     * @returns Le CharFormatting souhaité. defaultCF dans le cas où il n'y a pas d'instructions
     * pour la lettre donnée.
     */
    public GetCfForPBDQLetter(c: string) : CharFormatting {
        let toReturn = this.pbdqCF.get(c);
        if (toReturn === undefined) {
            toReturn = this.defaultCF;
        }
        return toReturn;
    }

    /**
     * Retourne le CharFormatting pour le bouton butNr
     * @param butNr Le numéro (zero based) du bouton pour lequel on veut le CharFormatting.
     * @returns Le CharFormatting pour le bouton donné.
     */
    public GetCFForPBDQButton (butNr: number): CharFormatting {
        if (butNr >= 0 && butNr < nrButtons) {
            return this.GetCfForPBDQLetter(this.selLetters[butNr]);
        }
        else {
            // on jettera une exception quand on saura comment ça se fait :-)
            return null;
        }
    }

    /**
     * Retourne la lettre pour le bouton donné.
     * @param butNr Le numéro du bouton dont on veut la lettre.
     * @returns La lettre recherchée.
     */
    public GetLetterForButtonNr(butNr: number): string {
        if (butNr >= 0 && butNr < nrButtons) {
            return this.selLetters[butNr];
        }
        else {
            // on jettera une exception quand on saura comment ça se fait :-)
            return null;
        }
    }

    /**
     * Met à jour la configuration pour le bouton butNr. Si le caractère c est déjà utilisé
     * pour un autre bouton, la modification est refusée et la méthode retourne false. Si <c>c</c> est 
     * le caractère inactif ' ', le bouton est "effacé". 
     * @param butNr Numéro du bouton à modifier
     * @param c Nouveau caractère pour le bouton. inactiveLetter correspond à un effacement du bouton.
     * @param cf Le nouveau CharFormatting pour le bouton
     * @returns false si la lettre n'a pas pu être mise à jour, par exemple parce qu'elle est
     * déjà traitée. true si tout à fonctionné.
     */
    public UpdateLetter(butNr: number, c: string, cf: CharFormatting): boolean{
        let toReturn = true;
        if (butNr >= 0 && butNr < nrButtons) {
            let newPBDQcf = this.pbdqCF;
            let newSelLetters = this.selLetters;
            let previousC = this.selLetters[butNr];
            if (c === "") {
                c = " ";
            }
            if (c !== PBDQConfig.inactiveLetter)
            {
                if (previousC !== c)
                {
                    if (!newPBDQcf.has(c))
                    {
                        if (previousC !== PBDQConfig.inactiveLetter)
                        {
                            newPBDQcf.delete(previousC);
                        }
                        newPBDQcf.set(c, cf);
                        newSelLetters[butNr] = c;
                    } else {
                        // pbdqCF.ContainsKey(c) i.e. the letter is already present
                        toReturn = false;
                    }
                } else {
                    // previousC == c
                    newPBDQcf.set(c, cf);
                }
            } else {
                // c == inactiveLetter
                newSelLetters[butNr] = PBDQConfig.inactiveLetter; // neutral character inactiveLetter
                if (previousC !== PBDQConfig.inactiveLetter){
                    newPBDQcf.delete(previousC);
                }
            }
            this.setPBDQcf(newPBDQcf);
            this.setSelLetters(newSelLetters);
            this.ForceRendering();
        } else {
            throw new Error("butNr not in range")
        }
        return toReturn;
    }

    public SetMarkAsBlackTo(val: boolean) {
        this.setMAB(val);
        if (this.markAsBlack)
            this.setDefaultCF(CharFormatting.BlackCF);
        else
            this.setDefaultCF(CharFormatting.NeutralCF);
        let newPBDQcf = this.pbdqCF;
        newPBDQcf.set(PBDQConfig.inactiveLetter, this.defaultCF);
        this.setPBDQcf(newPBDQcf);
    }

    private ForceRendering() {
        this.setDummy(!this.dummy);
    }

}