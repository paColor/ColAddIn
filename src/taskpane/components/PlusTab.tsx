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
import { Checkbox, ChoiceGroup, ComboBox, DefaultButton, DefaultPalette, IButtonStyles, IChoiceGroupOption, IComboBox, IComboBoxOption, IStackItemStyles, IStackTokens, ITextStyles, Separator, Stack, Text } from "@fluentui/react";
import LetterButton from "./LetterButton";
import SylButton from "./SylButton";
import PBDQConfig from "../Configs/PBDQConfig";

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

const sylOptStackTokens: IStackTokens = { 
    childrenGap: 5,
    padding: '2px 2px 2px 2px', // top right bottom left
};

const sylButStackTokens: IStackTokens = { 
    childrenGap: 6,
    padding: '2px 2px 2px 2px', // top right bottom left
};

const flStackItemStyles: IStackItemStyles = {
    root: {
      alignItems: 'center',
      display: 'flex',
      margin: '2px 0px 2px 0px', // top right bottom left
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

const sylModeOptions: IChoiceGroupOption[] = [
    { key: 'Ecrit', text: 'Écrit', },
    { key: 'Oral', text: 'Oral', },
    { key: 'Poésie', text: 'Poésie', },
];

const cons2Options: IChoiceGroupOption[] = [
    { key: 'Std', text: 'Standard' },
    { key: 'Av2C', text: 'Avant 2 cons.' },
];

const nrPiedsOptions: IComboBoxOption[] = [
    { key: '0', text: 'Auto' },
    { key: '1', text: '1' },
    { key: '2', text: '2' },
    { key: '3', text: '3' },
    { key: '4', text: '4' },
    { key: '5', text: '5' },
    { key: '6', text: '6' },
    { key: '7', text: '7' },
    { key: '8', text: '8' },
    { key: '9', text: '9' },
    { key: '10', text: '10' },
    { key: '11', text: '11' },
    { key: '12', text: '12' },
    { key: '13', text: '13' },
    { key: '14', text: '14' },
    { key: '15', text: '15' },
    { key: '16', text: '16' },
];


export default function PlusTab(props: PlusTabProps) {

    function LetClick()  {
        props.colLettres(props.conf);
        let pbdqC = new PBDQConfig();
        pbdqC.ttt();
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

    function OnSylModeChange(_ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void  {
        console.dir(option);
    }

    function On2ConsChange(_ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void  {
        console.dir(option);
    }

    function OnMuettesChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        console.log(`Muettes has been changed to ${isChecked}.`);
    }

    function OnDiereseChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        console.log(`Dierese has been changed to ${isChecked}.`);
    }

    function OnNbrePiedsChange(_ev: React.FormEvent<IComboBox>, _option?: IComboBoxOption, 
        _index?: number, _value?: string){
        console.log(`Nbre Pieds has been changed to index ${_index} and value ${_value}.`);
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
                        Mise en évidence d'éléments alternés.
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

            <Separator 
                alignContent="center"
                styles= {{
                    root: {
                        fontSize: 12,
                    }
                }}
            >
                Config Syllabes
            </Separator>

            <Stack horizontal grow tokens={sylOptStackTokens} verticalAlign="start">
                <Stack.Item 
                    align="start"
                    styles={{
                        root:{ margin: '-14px 0px 0px -6px', }// top right bottom left}
                    }}
                >
                    <ChoiceGroup
                        label="Mode"
                        defaultSelectedKey="Ecrit"
                        onChange={OnSylModeChange}
                        options={sylModeOptions}
                        styles={{
                            root: { 
                                width: 80, 
                                padding: 5,
                                margin: 0,
                                borderStyle: "solid",
                                borderWidth: 0.1,
                                borderColor: "#BBBBBB",
                                transform: "scale(0.8, 0.8)", },
                            label: { padding: 0 , fontWeight:700},
                        }}
                    />
                </Stack.Item>
                <Stack.Item
                    align="start"
                >
                    <Stack horizontalAlign="start">
                        <Stack.Item
                            align="start"
                            styles={{
                                root:{ margin: '-10px 0px 0px -12px', } // top right bottom left
                            }}
                        >
                            <ChoiceGroup
                                label="2 Consonnes"
                                defaultSelectedKey="Std"
                                onChange={On2ConsChange}
                                options={cons2Options}
                                styles={{
                                    root: { 
                                        width: 115, 
                                        padding: 5,
                                        margin: 0,
                                        borderStyle: "solid",
                                        borderWidth: 0.1,
                                        borderColor: "#BBBBBB",
                                        transform: "scale(0.8, 0.8)", },
                                    label: { padding: 0 , fontWeight:700},
                                }}
                            />
                        </Stack.Item>
                        <Stack.Item>
                            <Checkbox 
                                label="Col. Muettes" 
                                styles={{
                                    root: {
                                        margin: '-1px 0px 0px 4px'
                                    },
                                    checkbox: {
                                        width: 17,
                                        height: 17,
                                    },
                                    text: {
                                        fontSize: 12,
                                        margin: '-2px 0px 0px 0px'
                                    },
                                }}
                                onChange={OnMuettesChange}
                            />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item styles={{root: {paddingTop:'0px'}}}>
                    <Stack>
                        <Stack.Item>
                            <Text 
                                variant='small'
                                styles={{
                                    root: { 
                                        fontWeight: "700",
                                        margin: 0,
                                    }
                                }}
                            >
                                Mode poésie
                            </Text>
                        </Stack.Item>
                        <Stack.Item>
                            <Checkbox 
                                label="Diérèse" 
                                disabled={false}
                                styles={{
                                    checkbox: {
                                        width: 17,
                                        height: 17,
                                    },
                                    text: {
                                        fontSize: 12,
                                        margin: '-2px 0px 0px 0px' // top right bottom left
                                    },
                                }}
                                onChange={OnDiereseChange}
                            />
                        </Stack.Item>
                        <Stack.Item>
                            <ComboBox
                                defaultSelectedKey="0"
                                label="Nbre pieds"
                                options={nrPiedsOptions}
                                styles={{ 
                                    root: { 
                                        width: 80,
                                        height: 22,
                                    },
                                    label: {
                                        fontSize: 12,
                                        fontWeight: "700",
                                    },
                                    input: {
                                        fontSize: 12,
                                        verticalAlign: "middle",
                                    }
                                }}
                                disabled={false}
                                onChange={OnNbrePiedsChange}
                            />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack> 

            <Separator 
                alignContent="center"
                styles= {{
                    root: {
                        fontSize: 12,
                        marginTop: -5,
                    }
                }}
            >
                Couleurs alternées
            </Separator>

            <Stack horizontal grow tokens={sylButStackTokens}>
                <Stack.Item> <SylButton position = {0} /> </Stack.Item>
                <Stack.Item> <SylButton position = {1} /> </Stack.Item>
                <Stack.Item> <SylButton position = {2} /> </Stack.Item>
                <Stack.Item> <SylButton position = {3} /> </Stack.Item>
                <Stack.Item> <SylButton position = {4} /> </Stack.Item>
                <Stack.Item> <SylButton position = {5} /> </Stack.Item>
            </Stack>
            
            <Stack tokens={flStackTokens}>
                <Stack.Item align="center">
                    <DefaultButton 
                        text="réinitialiser à bleu/rouge" 
                        styles={customButStyles} 
                    />
                </Stack.Item>
            </Stack>


            
        </div>


    )
}