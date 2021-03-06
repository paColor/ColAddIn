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

import * as React from "react";
import { IButtonStyles, IconButton, IIconProps, ImageFit} from "@fluentui/react";

export interface CommandButtonProps {
    butTitle : string;
    iconSrc: string;
    onClick: () => void;
}

const iconSize = 40;

const customIconButStyles: IButtonStyles = { 
  root: {height: iconSize + 5, width: iconSize + 5, border: "solid", borderWidth: 1, borderColor: "#A19F9D"},
  icon: {height: iconSize}
};

export default function CommandButton (props: CommandButtonProps) {

    const phonIcon: IIconProps = {
        imageProps: {
            imageFit: ImageFit.centerContain,
            width: iconSize,
            height: iconSize,
            src: props.iconSrc
        }
    };
    return(
        <IconButton
          iconProps={phonIcon}
          title={props.butTitle}
          styles= {customIconButStyles}
          onClick= {props.onClick}
        />
    )

}
  