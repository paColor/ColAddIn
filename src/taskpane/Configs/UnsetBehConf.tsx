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

export default class UnsetBehConfig {
    public readonly forceNBold: boolean;
    public readonly forceNItalic: boolean;
    public readonly forceNUnderline: boolean;
    public readonly forceBlackColor: boolean;
    private readonly setFNBold: Dispatch<SetStateAction<boolean>>;
    private readonly setFNItalic: Dispatch<SetStateAction<boolean>>;
    private readonly setFNUnderline: Dispatch<SetStateAction<boolean>>;
    private readonly setFBlackColor: Dispatch<SetStateAction<boolean>>;

    /**
     * 
     * @param ub L'objet UnsetBehConfig résultant du chargement (JSON.parse) d'une config suavegardée,
     * dont il faut copier les valeurs. Configuration par défaut si ub est null.
     */
    constructor(ub: any) {
        [this.forceNBold, this.setFNBold] = useState(ub===null?false:ub.forceNBold);
        [this.forceNItalic, this.setFNItalic] = useState(ub===null?false:ub.forceNItalic);
        [this.forceNUnderline, this.setFNUnderline] = useState(ub===null?false:ub.forceNUnderline);
        [this.forceBlackColor, this.setFBlackColor] = useState(ub===null?false:ub.forceBlackColor);
    }

    public Copy(theUbeh: UnsetBehConfig) {
        this.setFNBold(theUbeh.forceNBold);
        this.setFNItalic(theUbeh.forceNItalic);
        this.setFNUnderline(theUbeh.forceNUnderline);
        this.setFBlackColor(theUbeh.forceBlackColor);
    }

    public Reset() {
        this.setFNBold(false);
        this.setFNItalic(false);
        this.setFNUnderline(false);
        this.setFBlackColor(false);
    }

    public SetFNBold(val: boolean) {
        this.setFNBold(val);
    }

    public SetFNItalic(val: boolean) {
        this.setFNItalic(val);
    }

    public SetFNUnderline(val: boolean) {
        this.setFNUnderline(val);
    }

    public SetFBlackColor(val: boolean) {
        this.setFBlackColor(val);
    }
     
}