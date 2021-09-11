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
import { DefaultButton, DefaultPalette, IButtonStyles, IStackItemStyles, IStackTokens, ITextStyles, Stack, Text } from "@fluentui/react";
import LetterButton from "./LetterButton";

export interface PlusTabProps {
    conf: Config;
    colLettres: (conf: Config) => void; // Coloriser les lettres
    colSyllabes: (conf: Config) => void;
    colMots: (conf: Config) => void;
    colVoyCons: (conf: Config) => void;
    colNoir: (conf: Config) => void; 
}

const flStackTokens: IStackTokens = { // first line stack tokens
    childrenGap: 3,
    padding: '2px 2px 2px 2px', // top right bottom left
};

const letterStackTokens: IStackTokens = { 
    childrenGap: 3,
    padding: '2px 2px 2px 2px', // top right bottom left
};

const CommandStackTokens: IStackTokens = { 
    childrenGap: 20,
    padding: '2px 2px 2px 2px', // top right bottom left
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

const TextStyle: ITextStyles = {
    root: {
        textAlign: "center",
    },

}

export default function PlusTab(props: PlusTabProps) {

    function LetClick()  {
        props.colLettres(props.conf);
    }

    function SylClick()  {
        props.colSyllabes(props.conf);
    }

    function MotsClick()  {
        props.colMots(props.conf);
    }

    function VoyConsClick()  {
        props.colVoyCons(props.conf);
    }

    function NoirClick()  {
        props.colNoir(props.conf);
    }

    return (
        <div>
            <Stack horizontal tokens={flStackTokens}>
                <Stack.Item align="start" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololriser les lettres"
                        iconSrc="../assets/bdpq_40.png"
                        onClick={LetClick}
                    />
                </Stack.Item>

                <Stack.Item align="center" grow styles={flStackItemStyles}>
                    <Stack tokens={flStackTokens}>
                        <Stack.Item>
                            <Text block nowrap variant="small">Configurer les lettres à coloriƨer.</Text>
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

            <Stack horizontal grow tokens={letterStackTokens}>
                <Stack.Item> <LetterButton position = {0} /> </Stack.Item>
                <Stack.Item> <LetterButton position = {1} /> </Stack.Item>
                <Stack.Item> <LetterButton position = {2} /> </Stack.Item>
                <Stack.Item> <LetterButton position = {3} /> </Stack.Item>
                <Stack.Item> <LetterButton position = {4} /> </Stack.Item>
                <Stack.Item> <LetterButton position = {5} /> </Stack.Item>
                <Stack.Item> <LetterButton position = {6} /> </Stack.Item>
                <Stack.Item> <LetterButton position = {7} /> </Stack.Item>
            </Stack>

            <Stack tokens={flStackTokens}>
                <Stack.Item align="center" grow styles={flStackItemStyles}>
                    <Text block variant="medium" styles={TextStyle}>
                        Mise en évidence des syllabes, mots, lignes, voyelles et consonnes.
                    </Text>
                </Stack.Item>
            </Stack>

            <Stack horizontal tokens={CommandStackTokens} horizontalAlign="center">
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololriser les syllabes"
                        iconSrc="../assets/syll_dys_64.png"
                        onClick={SylClick}
                    />
                </Stack.Item>
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololriser les mots"
                        iconSrc="../assets/mots_40.png"
                        onClick={MotsClick}
                    />
                </Stack.Item>
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololriser les voyelles et les consonnes"
                        iconSrc="../assets/voycons_64.png"
                        onClick={VoyConsClick}
                    />
                </Stack.Item>
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololriser en noir sans autre formattage"
                        iconSrc="../assets/black_carre_64.png"
                        onClick={NoirClick}
                    />
                </Stack.Item>
            </Stack>
            

            
        </div>


    )
}