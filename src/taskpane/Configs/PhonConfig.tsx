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
import { Phoneme } from "../Core/Phoneme";
import CharFormatting from "./CharFormatting";

export enum IllMode {IllCeras, IllLireCouleur, undefined}

const sonValides = [
  "a", "q", "i", "y", "1", "u", "é", "o", "è", "an", "on", "2", "oi", "5", "w", "j", "ill", "ng", 
  "gn", "l", "v", "f", "p", "b", "m", "z", "s", "t", "d", "ks", "gz", "r", "n", "ge", "ch", "k",   
  "g", "ij", "oin", "47", "uni", "diz", "cen", "mil", "_muet", "q_caduc", 
]

function GetCerasChkSons(): Map<string, boolean> {
    return new Map([
        ["a", false], ["q", false], ["i", false], ["y", false], ["1", true], ["u", true], ["é", true], ["o", true], ["è", true], ["an", true], ["on", true], ["2", true], ["oi", true], ["5", true], ["w", false], ["j", false], ["ill", false], ["ng", false], 
        ["gn", false], ["l", false], ["v", false], ["f", false], ["p", false], ["b", false], ["m", false], ["z", false], ["s", false], ["t", false], ["d", false], ["ks", false], ["gz", false], ["r", false], ["n", false], ["ge", false], ["ch", false], ["k", false],   
        ["g", false], ["ij", false], ["oin", true], ["47", false], ["uni", false], ["diz", false], ["cen", false], ["mil", false], ["_muet", true], ["q_caduc", false], 
    ]);
}

function GetCerasCFSons(): Map<string, CharFormatting> {
    return new Map([
        ["a", defCF], ["q", defCF], ["i", defCF], ["y", defCF], ["w", defCF], ["j", defCF], ["ill", defCF], ["ng", defCF], 
        ["gn", defCF], ["l", defCF], ["v", defCF], ["f", defCF], ["p", defCF], ["b", defCF], ["m", defCF], ["z", defCF], ["s", defCF], 
        ["t", defCF], ["d", defCF], ["ks", defCF], ["gz", defCF], ["r", defCF], ["n", defCF], ["ge", defCF], ["ch", defCF], ["k", defCF],   
        ["g", defCF], ["ij", defCF], ["47", defCF], ["uni", defCF], ["diz", defCF], ["cen", defCF], ["mil", defCF], ["q_caduc", defCF], 
        ["1",     new CharFormatting (false, false, true, false, {r: 0, g: 0, b: 0})], 
        ["u",     new CharFormatting (false, false, false, true, {r: 255, g: 0, b: 0})], 
        ["é",     new CharFormatting (false, false, false, true, {r: 0, g: 20, b: 208})], 
        ["o",     new CharFormatting (false, false, false, true, {r: 240, g: 222, b: 0})], 
        ["è",     new CharFormatting (false, false, false, true, {r: 164, g: 20, b: 210})], 
        ["an",    new CharFormatting (false, false, false, true, {r: 237, g: 125, b: 49})], 
        ["on",    new CharFormatting (false, false, false, true, {r: 172, g: 121, b: 66})], 
        ["2",     new CharFormatting (false, false, false, true, {r: 71, g: 115, b: 255})], 
        ["oi",    new CharFormatting (true, false, false, true,  {r: 0, g: 0, b: 0})], 
        ["5",     new CharFormatting (false, false, false, true, {r: 51, g: 153, b: 102})],
        ["oin",   new CharFormatting (false, false, false, true, {r: 15, g: 201, b: 221})],
        ["_muet", new CharFormatting (false, false, false, true, {r: 166, g: 166, b: 166})],
      ])
}

function GetRoseChkSons(): Map<string, boolean> {
    return new Map([
        ["a", false], ["q", false], ["i", false], ["y", false], ["1", true], ["u", true], ["é", true], ["o", true], ["è", true], ["an", true], ["on", true], ["2", true], ["oi", true], ["5", true], ["w", false], ["j", false], ["ill", true], ["ng", false], 
        ["gn", false], ["l", false], ["v", false], ["f", false], ["p", false], ["b", false], ["m", false], ["z", false], ["s", false], ["t", false], ["d", false], ["ks", false], ["gz", false], ["r", false], ["n", false], ["ge", false], ["ch", false], ["k", false],   
        ["g", false], ["ij", false], ["oin", true], ["47", false], ["uni", false], ["diz", false], ["cen", false], ["mil", false], ["_muet", true], ["q_caduc", false], 
      ]); 
}

function GetRoseCFSons(): Map<string, CharFormatting> {
    return new Map([
        ["a", defCF], ["q", defCF], ["i", defCF], ["y", defCF], ["w", defCF], ["j", defCF], ["ng", defCF], 
        ["gn", defCF], ["l", defCF], ["v", defCF], ["f", defCF], ["p", defCF], ["b", defCF], ["m", defCF], ["z", defCF], ["s", defCF], 
        ["t", defCF], ["d", defCF], ["ks", defCF], ["gz", defCF], ["r", defCF], ["n", defCF], ["ge", defCF], ["ch", defCF], ["k", defCF],   
        ["g", defCF], ["ij", defCF], ["47", defCF], ["uni", defCF], ["diz", defCF], ["cen", defCF], ["mil", defCF], ["q_caduc", defCF], 
        ["1",     new CharFormatting (false, false, true, false, { r: 0,   g: 0,   b: 0   })], 
        ["u",     new CharFormatting (false, false, false, true, { r: 255, g: 0,   b: 0   })], 
        ["é",     new CharFormatting (false, false, false, true, { r: 255, g: 100, b: 177 })], 
        ["o",     new CharFormatting (false, false, false, true, { r: 240, g: 222, b: 0   })], 
        ["è",     new CharFormatting (false, false, false, true, { r: 164, g: 20,  b: 210 })], 
        ["an",    new CharFormatting (false, false, false, true, { r: 237, g: 125, b: 49  })], 
        ["on",    new CharFormatting (false, false, false, true, { r: 172, g: 121, b: 66  })], 
        ["2",     new CharFormatting (false, false, false, true, { r: 71,  g: 115, b: 255 })], 
        ["oi",    new CharFormatting (true, false, false, true,  { r: 0,   g: 0,   b: 0   })], 
        ["5",     new CharFormatting (false, false, false, true, { r: 51,  g: 153, b: 102 })],
        ["oin",   new CharFormatting (false, false, false, true, { r: 15,  g: 201, b: 221 })],
        ["_muet", new CharFormatting (false, false, false, true, { r: 166, g: 166, b: 166 })],
        ["ill",   new CharFormatting (false, true, false, true,  { r: 127, g: 241, b: 0   })], 
      ]);
}

const defCF: CharFormatting = CharFormatting.NeutralCF;      

/*
const sonMap : Map<string, Phoneme[]> = new Map ([
    ["a",    [Phoneme.a]],
    ["q",    [Phoneme.q]],
    ["i",    [Phoneme.i]],
    ["y",    [Phoneme.y]],
    ["1",    [Phoneme.x_tilda]],
    ["u",    [Phoneme.u]],
    ["é",    [Phoneme.e, Phoneme.e_comp]],
    ["o",    [Phoneme.o, Phoneme.o_comp]],
    ["è",    [Phoneme.E, Phoneme.E_comp]],
    ["an",   [Phoneme.a_tilda]],
    ["on",   [Phoneme.o_tilda]],
    ["2",    [Phoneme.x2]],
    ["oi",   [Phoneme.oi]],
    ["5",    [Phoneme.e_tilda]],
    ["w",    [Phoneme.w]],
    ["j",    [Phoneme.j, Phoneme.ji]],
    ["ill",  [Phoneme.j_ill, Phoneme.i_j_ill]],
    ["ng",   [Phoneme.J]],
    ["gn",   [Phoneme.N]],
    ["l",    [Phoneme.l]],
    ["v",    [Phoneme.v]],
    ["f",    [Phoneme.f, Phoneme.f_ph]],
    ["p",    [Phoneme.p]],
    ["b",    [Phoneme.b]],
    ["m",    [Phoneme.m]],
    ["z",    [Phoneme.z, Phoneme.z_s]],
    ["s",    [Phoneme.s, Phoneme.s_c, Phoneme.s_t, Phoneme.s_x]],
    ["t",    [Phoneme.t]],
    ["d",    [Phoneme.d]],
    ["ks",   [Phoneme.ks]],
    ["gz",   [Phoneme.gz]],
    ["r",    [Phoneme.R]],
    ["n",    [Phoneme.n]],
    ["ge",   [Phoneme.Z]],
    ["ch",   [Phoneme.S]],
    ["k",    [Phoneme.k, Phoneme.k_qu]],
    ["g",    [Phoneme.g, Phoneme.g_u]],
    ["ij",   [Phoneme.i_j]],
    ["oin",  [Phoneme.w_e_tilda]],
    ["47",   [Phoneme.chiffre]],
    ["uni",  [Phoneme.unité]],
    ["diz",  [Phoneme.dizaine]],
    ["cen",  [Phoneme.centaine]],
    ["mil",  [Phoneme.milliers]],
    ["_muet",    [Phoneme.verb_3p, Phoneme._muet]],
    ["q_caduc",  [Phoneme.q_caduc]]
]);
*/

const phonMap : Map<Phoneme, string> = new Map ([
    [Phoneme.a,         "a"],
    [Phoneme.q,         "q"],
    [Phoneme.i,         "i"],
    [Phoneme.y,         "y"],
    [Phoneme.x_tilda,   "1"],
    [Phoneme.u,         "u"],
    [Phoneme.e,         "é"],
    [Phoneme.e_comp,    "é"],
    [Phoneme.o,         "o"],
    [Phoneme.o_comp,    "o"],
    [Phoneme.E,         "è"],
    [Phoneme.E_comp,    "è"],
    [Phoneme.a_tilda,   "an"],
    [Phoneme.o_tilda,   "on"],
    [Phoneme.x2,        "2"],
    [Phoneme.oi,        "oi"],
    [Phoneme.e_tilda,   "5"],
    [Phoneme.w,         "w"],
    [Phoneme.j,         "j"],
    [Phoneme.ji,        "j"],
    [Phoneme.j_ill,     "ill"],
    [Phoneme.i_j_ill,   "ill"],
    [Phoneme.J,         "ng"],
    [Phoneme.N,         "gn"],
    [Phoneme.l,         "l"],
    [Phoneme.v,         "v"],
    [Phoneme.f,         "f"],
    [Phoneme.f_ph,      "f"],
    [Phoneme.p,         "p"],
    [Phoneme.b,         "b"],
    [Phoneme.m,         "m"],
    [Phoneme.z,         "z"],
    [Phoneme.z_s,       "z"],
    [Phoneme.s,         "s"],
    [Phoneme.s_c,       "s"],
    [Phoneme.s_t,       "s"],
    [Phoneme.s_x,       "s"],
    [Phoneme.t,         "t"],
    [Phoneme.d,         "d"],
    [Phoneme.ks,        "ks"],
    [Phoneme.gz,        "gz"],
    [Phoneme.R,         "r"],
    [Phoneme.n,         "n"],
    [Phoneme.Z,         "ge"],
    [Phoneme.S,         "ch"],
    [Phoneme.k,         "k"],
    [Phoneme.k_qu,      "k"],
    [Phoneme.g,         "g"],
    [Phoneme.g_u,       "g"],
    [Phoneme.i_j,       "ij"],
    [Phoneme.w_e_tilda, "oin"],
    [Phoneme.chiffre,   "47"],
    [Phoneme.unité,     "uni"],
    [Phoneme.dizaine,   "diz"],
    [Phoneme.centaine,  "cen"],
    [Phoneme.milliers,  "mil"],
    [Phoneme.verb_3p,   "_muet"],
    [Phoneme._muet,     "_muet"],
    [Phoneme.q_caduc,   "q_caduc"]
]);

export default class PhonConfig { // équivalent de ColConfWin
    private readonly cfSons: Map<string, CharFormatting>;
    private readonly setCFSons: (newCFP : Map<string, CharFormatting>) => void;
    private readonly chkSons: Map<string, boolean>;
    private readonly setChkSons: (newCHKP: Map<string, boolean>) => void;
    private readonly dummy: boolean;
    private readonly setDummy: Dispatch<SetStateAction<boolean>>;

    public readonly illMode : IllMode;
    public readonly setIllMode : (IllMode) => void;

    constructor () {
        [this.cfSons, this.setCFSons] = useState(GetRoseCFSons());
        [this.chkSons, this.setChkSons] = useState(GetRoseChkSons());
        [this.dummy, this.setDummy] = useState(false);
        [this.illMode, this.setIllMode] = useState(IllMode.IllCeras);
    }

    public SetChk(son: string, chkBoxVal: boolean) {
        let chkMap = this.chkSons;
        chkMap.set(son, chkBoxVal);
        this.setChkSons(chkMap);
        this.ForceRendering(); // to force rendering
    }

    public GetChk(son: string) : boolean {
        return this.chkSons.get(son);
    }
    
    public SetCF(son: string, cf: CharFormatting) {
        let cfMap = this.cfSons;
        cfMap.set(son, cf);
        this.setCFSons(cfMap);
        this.ForceRendering();
    }

    public GetCF(son: string) : CharFormatting {
        return this.cfSons.get(son);
    }

    public GetPhonCF(phon:Phoneme) : CharFormatting {
        let son = phonMap.get(phon);
        if (this.GetChk(son)) {
            return this.GetCF(son);
        }
        else {
            return defCF;
        }
    }

    public SetCERAS() {
        this.setChkSons(GetCerasChkSons());
        this.setCFSons(GetCerasCFSons());
        this.ForceRendering();
    }

    public SetRose() {
        this.setChkSons(GetRoseChkSons());
        this.setCFSons(GetRoseCFSons());
        this.ForceRendering();
    }

    public ChkTout() {
        this.SetAllChk(true);
    }

    public ChkRien() {
        this.SetAllChk(false);
    }

    /**
     * Indique si les règles de la catégorie donnée sont activées (true) ou non (false)
     * @param rCat catégorie de règles dont on veut connaître l'état. Sont possibles:
     *      "IllCeras"
     *      "IllLireCouleur"
     */
    public IsRuleCatEnabled(rCat : string) : boolean {
        // implémentation à modifier quand on rendra les flags configurables, comme dans
        // la version VSTO.
        switch (rCat) {
            case "IllCeras":
                return this.illMode === IllMode.IllCeras;
                break;
            case "IllLireCouleur":
                return this.illMode === IllMode.IllLireCouleur;
                break;
            default:
                throw new Error("Catégorie de règle inattendue: " + rCat);
                
        }
        return rCat === "IllCeras";
    }

    private SetAllChk(val: boolean) {
        let chkMap = new Map<string, boolean> ();
        sonValides.forEach((son:string) => {chkMap.set(son, val)});
        this.setChkSons(chkMap);
        this.setDummy(!this.dummy); // to force rendering
    }

    /** 
     * Il est parfois nécessaire de forcer le rendu. En utilisant ce truc ça marche...
     */
    private ForceRendering() {
        this.setDummy(!this.dummy);
    }

}