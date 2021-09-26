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

import { getColorFromString, IColor, IRGB } from "@fluentui/react";

/**
 * Retourne true si la couleur est considérée comme foncée.
 * @param col La couleur à analyser
 */
export function IsDark(col: IRGB): boolean {
    return (((0.9 * col.r) + (1.5 * col.g) + (0.5 * col.b)) < 380);
}

/**
 * Retourne la couleur du texte à utiliser sur un fond de couleur col
 * @param col La couleur due fond
 * @returns La couleur du texte à utiliser
 */
export function GetTxtCol4Bkgrnd(col: IRGB, faded: boolean = false): IColor {
    if (faded) {
        return getColorFromString("#CCCCCC"); // gris clair
    }
    else if (IsDark(col)) {
        return getColorFromString("#FFFFFF"); // blanc
    }
    else {
        return getColorFromString("#000000"); // noir
    }
}