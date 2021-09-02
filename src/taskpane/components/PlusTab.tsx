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
import Config from "../Configs/Config";
import CommandButton from "./CommandButton";
import { DefaultButton, DefaultPalette, IButtonStyles, IStackItemStyles, IStackTokens, Stack, Text } from "@fluentui/react";

export interface PlusTabProps {
    conf: Config;
    colLettres: (conf: Config) => void; // Coloriser les lettres
}

const stackTokens: IStackTokens = { 
    childrenGap: 3,
    padding: 2,
};

const flStackItemStyles: IStackItemStyles = {
    root: {
      alignItems: 'center',
      display: 'flex',
      height: 50,
      justifyContent: 'center',
      overflow: 'hidden',
    },
};

const customButStyles: IButtonStyles = { 
    root: {
      height: 20, 
      padding: 7,
      margin: 0,
      background: DefaultPalette.themeLighter,
    },
    label: {
      fontSize: 11,
    },
};

export default function PlusTab(props: PlusTabProps) {

    function LetClick()  {
        props.colLettres(props.conf);
    }

    return (
        <div>
            <Stack horizontal tokens={stackTokens}>
                <Stack.Item align="start" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololriser les lettres"
                        iconSrc="../assets/phon-carré 52.png"
                        onClick={LetClick}
                    />
                </Stack.Item>

                <Stack.Item align="center" grow styles={flStackItemStyles}>
                    <Stack tokens={stackTokens}>
                        <Stack.Item>
                            <Text block nowrap variant="small">Configurer les lettres à mettre en évidence</Text>
                        </Stack.Item>
                        <Stack.Item align="center">
                            <DefaultButton 
                                text="réinitialiser à bpdq" 
                                styles={customButStyles} 
                            />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>

            

            
        </div>


    )
}