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
import Config from "./Config";

export default class CharFormatting {

    public static CreateNeutralCF() : CharFormatting {
        return new CharFormatting(false, false, false, false, getColorFromString("#AAAAAA"))
    }
    
    bold: boolean;
    italic: boolean;
    underline: boolean;
    changeColor: boolean;
    color: IRGB;

    constructor(inBold: boolean, inItalic: boolean, inUnderline: boolean, 
        inChangeColor : boolean, inColor : IRGB) {
            this.bold = inBold;
            this.italic = inItalic;
            this.underline = inUnderline;
            this.changeColor = inChangeColor;
            this.color = inColor;
    }

    public ForceNonBold (conf: Config) : boolean {
        return conf.uBeh.forceNBold;
    }

    public ForceNonItalic (conf: Config) : boolean {
        return conf.uBeh.forceNItalic;
    }

    public ForceNonUnderline (conf: Config) : boolean {
        return conf.uBeh.forceNUnderline;
    }

    public ForceBlackColor (conf: Config) : boolean {
        return conf.uBeh.forceBlackColor;
    }

}