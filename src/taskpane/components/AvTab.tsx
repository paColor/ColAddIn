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

import { Checkbox, ChoiceGroup, ICheckboxStyles, IChoiceGroupOption, ISeparatorStyles, IStackTokens, Separator, Stack } from "@fluentui/react";
import React = require("react");
import Config from "../Configs/Config";
import { IllMode } from "../Configs/PhonConfig";

export interface AvTabProps {
    conf: Config;
}

const cbStackTokens: IStackTokens = { 
    childrenGap: 10,
    padding: '2px 2px 2px 2px', // top right bottom left
};

const cbStyles : ICheckboxStyles = {
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
}

const sepStyles : Partial<ISeparatorStyles> = {
    content: {
        fontSize: 12,
        fontWeight: 700,
        backgroundColor: "#FFFFFF00",
    }
}

const illOptions: IChoiceGroupOption[] = [
    { key: 'CERAS', text: '\"ill\" est un phonème', },
    { key: 'L_COUL', text: '\"ill\" -> plusieurs sons', },
];

export default function AvTab(props: AvTabProps) {

    function OnNonGrasChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        props.conf.uBeh.SetFNBold(isChecked);
    }

    function OnNonItaliqueChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        props.conf.uBeh.SetFNItalic(isChecked);
    }

    function OnNonSouligneChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        props.conf.uBeh.SetFNUnderline(isChecked);
    }

    function OnNonCouleurChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        props.conf.uBeh.SetFBlackColor(isChecked);
    }

    function OnIllChange(_ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void  {
        switch (option.key) {
            case "CERAS":
                props.conf.pc.setIllMode(IllMode.IllCeras);
                break;
            case "L_COUL":
                props.conf.pc.setIllMode(IllMode.IllLireCouleur);
                break;
        }
    }

    return (
        <div>
            <Separator alignContent="center" styles= {sepStyles} >
                Formatages non imposés
            </Separator>
            
            <Stack 
                tokens={cbStackTokens} 
                styles= {{root: {margin: '0px 0px 0px 2px'}}} // top right bottom left
            >
                <Stack.Item>
                    <Checkbox 
                        label="Appliquer non gras" 
                        styles={cbStyles}
                        checked={props.conf.uBeh.forceNBold}
                        onChange={OnNonGrasChange}
                    />
                </Stack.Item>
                <Stack.Item>
                    <Checkbox 
                        label="Appliquer non italique" 
                        styles={cbStyles}
                        checked={props.conf.uBeh.forceNItalic}
                        onChange={OnNonItaliqueChange}
                    />
                </Stack.Item>
                <Stack.Item>
                    <Checkbox 
                        label="Appliquer non souligné" 
                        styles={cbStyles}
                        checked={props.conf.uBeh.forceNUnderline}
                        onChange={OnNonSouligneChange}
                    />
                </Stack.Item>
                <Stack.Item>
                    <Checkbox 
                        label="Appliquer non couleur" 
                        styles={cbStyles}
                        checked={props.conf.uBeh.forceBlackColor}
                        onChange={OnNonCouleurChange}
                    />
                </Stack.Item>
            </Stack>

            <Separator alignContent="center" styles= {sepStyles} >
                Traitement du &quot;ill&quot;
            </Separator>

            <Stack>
                <Stack.Item align="start">
                    <ChoiceGroup
                        //label="Traitement du  'ill'"
                        selectedKey={props.conf.pc.illMode === IllMode.IllCeras?"CERAS":"L_COUL"}
                        onChange={OnIllChange}
                        options={illOptions}
                        styles={{
                            root: { 
                                // width: 115, 
                                padding: '0px 5px 5px 5px', // top right bottom left
                                margin: '0px 0px 0px -10px', // top right bottom left,
                                borderStyle: "solid",
                                borderWidth: 0.1,
                                borderColor: "#BBBBBB",
                                transform: "scale(0.8, 0.8)", },
                            label: { padding: 0 , fontWeight:700},
                        }}
                    />
                </Stack.Item>
                
            </Stack>
        </div>
    )
}