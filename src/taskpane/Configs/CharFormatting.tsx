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


import { IRGB } from "@fluentui/react";

export default class CharFormatting {
    /** Un CharFormatting sans aucun flag mis. */
    public static readonly NeutralCF = new CharFormatting(false, false, false, false, { r: 170, g: 170, b: 170 });

    /**Un CharFormatting contenant les instructions de colorer en noir. */
    public static readonly BlackCF = new CharFormatting(false, false, false, true, { r: 0, g: 0, b: 0 });


    readonly bold: boolean;
    readonly italic: boolean;
    readonly underline: boolean;
    readonly changeColor: boolean;
    readonly color: IRGB;
    readonly changeHighlight: boolean;
    readonly hilightColor: IRGB;

    /** Indique si un arc doit être tracé sous le groupe de letres. La couleur
     * est donnée par arcColor */
    readonly drawArc: boolean;

    /** La couleur de l'arc. */
    readonly arcColor: IRGB;

    /** Indique si les arcs liés au groupe de lettres doivent être effacés. */
    readonly removeArcs: boolean;

    constructor(inBold: boolean, inItalic: boolean, inUnderline: boolean, 
        inChangeColor : boolean, inColor : IRGB, inChangeHilight: boolean = false,
        inHilightColor: IRGB = { r: 170, g: 170, b: 170 }, inDrawArc : boolean = false,
        inArcColor: IRGB = { r: 170, g: 170, b: 170 }, inRemoveArcs: boolean = false) {
            this.bold = inBold;
            this.italic = inItalic;
            this.underline = inUnderline;
            this.changeColor = inChangeColor;
            this.color = inColor;
            this.changeHighlight = inChangeHilight;
            this.hilightColor = inHilightColor;
            this.drawArc = inDrawArc;
            this.arcColor = inArcColor;
            this.removeArcs = inRemoveArcs;
    }

}