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

import { getColorFromString, IRGB } from "@fluentui/react";
import CharFormatting from "../Configs/CharFormatting";
import Config from "../Configs/Config";
import FormattedTextEl from "./FormattedTextEl";
import TextEl from "./TextEl";

class CFFForceBlack extends CharFormatting {
    constructor() {
        let black: IRGB = getColorFromString("#000000");
        super(false, false, false, false, black);
    }

    public ForceNonBold (_conf: Config) : boolean {
        return true;
    }

    public ForceNonItalic (_conf: Config) : boolean {
        return true;
    }

    public ForceNonUnderline (_conf: Config) : boolean {
        return true;
    }

    public ForceBlackColor (_conf: Config) : boolean {
        return true;
    }
}


export default class TheText {
    public S : string;
    private lowerCaseS: string;
    private formats: FormattedTextEl[];

    constructor(txt: string) {
        this.S = txt;
        this.lowerCaseS = null;
        this.formats = []; 
    }

    public ToLowerString() : string {
        if (this.lowerCaseS === null) {
            this.lowerCaseS = this.S.toLowerCase();
        }
        return this.lowerCaseS;
    }

    public MarkNoir(conf: Config) {
        if (this.S.length > 0) {
            let cfFB = new CFFForceBlack();
            this.formats.push(FormattedTextEl.GetFTEfromTE(new TextEl(this, 0, this.S.length - 1), cfFB));
            this.ApplyFormatting(conf);
        }
    }

    private ApplyFormatting(conf: Config) {
        this.formats.forEach((fte: FormattedTextEl) => {
            this.SetChars(fte, conf);
        })
    }

    protected SetChars(_fte: FormattedTextEl, _conf: Config) {
        // Must be overriden
        // Must learn how to throw exceptions in Typescript :-) 
    }

}