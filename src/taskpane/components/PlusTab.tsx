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
import { useId } from '@fluentui/react-hooks';
import CharFormatForm, { EditCf, EditLetCf } from "./CharFormatForm";
import CharFormatting from "../Configs/CharFormatting";
import { useState } from "react";
import { SylMode } from "../Configs/SylConfig";
import { WarningMsg } from "./MessageWin";

export interface PlusTabProps {
    conf: Config;
    colLettres: (conf: Config) => void; // Coloriser les lettres
    colSyllabes: (conf: Config) => void;
    colMots: (conf: Config) => void;
    colVoyCons: (conf: Config) => void;
    colNoir: (conf: Config) => void; 
    addSpace: (conf: Config) => void; 
    shrinkSpace: (conf: Config) => void; 
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

const TextEspaceStyle: ITextStyles = {
    root: {
        textAlign: "center",
        width: 200,
    },
}

const sylModeOptions: IChoiceGroupOption[] = [
    { key: 'Ecrit', text: 'Écrit', },
    { key: 'Oral', text: 'Oral', },
    { key: 'Poesie', text: 'Poésie', },
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

/**
 * Retourne le string qui peut être utilisé comme clef dans sylModeOptions
 * pour un SylMode donné.
 * @param sm Le SylMode dont on veut la conversion
 */
function GetSylModeOption(sm : SylMode) : string {
    switch(sm) {
        case SylMode.ecrit:
            return "Ecrit";
            break;
        case SylMode.oral:
            return "Oral";
            break;
        case SylMode.poesie:
            return "Poesie";
            break;
        default:
            return "Ecrit"
    }
}

export default function PlusTab(props: PlusTabProps) {

    // Pour CharFormatForm: le numéro du bouton qui est édité. 
    const [curButNr, setCurButNr] = useState(0);

    function LetClick()  {
        props.colLettres(props.conf);
    }

    function ResetLetClick() {
        props.conf.pbdq.Reset();
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

    function OnLetButClicked(butNr: number) {
        setCurButNr(butNr);
        let c = props.conf.pbdq.GetLetterForButtonNr(butNr);
        if (c === " ") {
            c = "";
        }
        EditLetCf("Configurer la lettre", c, 
            props.conf.pbdq.GetCFForPBDQButton(butNr));
    }

    function OnSylButClicked(butNr: number) {
        setCurButNr(butNr);
        EditCf("Configurer le bouton " + (butNr + 1).toString(),
            props.conf.sylConf.GetSylButtonConfFor(butNr).cf);
    }


    function OnSylModeChange(_ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void  {
        switch (option.key) {
            case "Ecrit":
                props.conf.sylConf.setSylMode(SylMode.ecrit);
                break;
            case "Oral":
                props.conf.sylConf.setSylMode(SylMode.oral);
                break;
            case "Poesie":
                props.conf.sylConf.setSylMode(SylMode.poesie);
                break;
            default:
                props.conf.sylConf.setSylMode(SylMode.ecrit);
                break;
        }
    }

    function On2ConsChange(_ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void  {
        switch (option.key) {
            case "Std":
                props.conf.sylConf.setDoubleConsStd(true);
                break;
            case "Av2C":
                props.conf.sylConf.setDoubleConsStd(false);
                break;
        }
    }

    function OnMuettesChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        props.conf.sylConf.setMarquerMuettes(isChecked);
    }

    function OnDiereseChange(_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
        props.conf.sylConf.setChercherDierese(isChecked);
    }

    function OnNbrePiedsChange(_ev: React.FormEvent<IComboBox>, _option?: IComboBoxOption, 
        index?: number, _value?: string){
        props.conf.sylConf.setNrPieds(index);
    }

    function ResetCoulSylClick() {
        props.conf.sylConf.Reset();
    }

    function EffacerSylClick() {
        props.conf.sylConf.ClearLastButton(() => {WarningMsg("Il n'y a pas de bouton à effacer.");})
    }

    function LoadCffData(cf: CharFormatting) {
        props.conf.sylConf.SetSylButtonCF(curButNr, cf);
    }

    function LoadCffLetData(c: string, cf: CharFormatting) {
        props.conf.pbdq.UpdateLetter(curButNr, c, cf);
    }

    function AddSpaceClick() {
        props.addSpace(props.conf);
    }

    function ShrinkSpaceClick() {
        props.shrinkSpace(props.conf);
    }

    let letButtons: Array<any> = new Array<any>();
    for (let i = 0; i < 8; i++) {
        letButtons.push(
            <Stack.Item key = {useId("SI_LetBut")}> 
                <LetterButton 
                    position = {i} 
                    pbdqC = {props.conf.pbdq}
                    clickBut = {OnLetButClicked}
                    key = {useId("LB_LetBut")}
                /> 
            </Stack.Item>
        )
    }

    let sylButtons: Array<any> = new Array<any>();
    for (let i = 0; i < 6; i++) {
        sylButtons.push(
            <Stack.Item key = {useId("SI_LetBut")}> 
                <SylButton 
                    position = {i} 
                    sylConf = {props.conf.sylConf}
                    clickBut = {OnSylButClicked}
                    key = {useId("SB_SylBut")}
                /> 
            </Stack.Item>
        )
    }

    return (
        <div>
            <Stack horizontal tokens={flStackTokens}>
                <Stack.Item align="start" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololrisez les lettres"
                        iconSrc="/assets/bdpq_40.png"
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
                                text="réinitialisez à bpdq" 
                                styles={customButStyles}
                                onClick={ResetLetClick}
                            />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>

            <Stack horizontal grow tokens={letterStackTokens}>
                {letButtons}
            </Stack>

            <Stack tokens={flStackTokens}>
                <Stack.Item align="center" grow styles={flStackItemStyles}>
                    <Text block variant="medium" styles={TextStyle}>
                        {"Mise en évidence d'éléments alternés."}
                    </Text>
                </Stack.Item>
            </Stack>

            <Stack horizontal tokens={CommandStackTokens} horizontalAlign="center">
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololrisez les syllabes"
                        iconSrc="/assets/syll_dys_64.png"
                        onClick={SylClick}
                    />
                </Stack.Item>
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololrisez les mots"
                        iconSrc="/assets/mots_40.png"
                        onClick={MotsClick}
                    />
                </Stack.Item>
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololrisez les voyelles et les consonnes"
                        iconSrc="/assets/voycons_64.png"
                        onClick={VoyConsClick}
                    />
                </Stack.Item>
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Cololrisez en noir sans autre formattage"
                        iconSrc="/assets/black_carre_64.png"
                        onClick={NoirClick}
                    />
                </Stack.Item>
            </Stack>

            <Separator 
                alignContent="center"
                styles= {{
                    root: {
                        fontSize: 12,
                    },
                    content: {
                        backgroundColor: "#FFFFFF00",
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
                        selectedKey={GetSylModeOption(props.conf.sylConf.sylMode)}
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
                                selectedKey={props.conf.sylConf.doubleConsStd?"Std":"Av2C"}
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
                                checked={props.conf.sylConf.marquerMuettes}
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
                                checked={props.conf.sylConf.chercherDierese}
                                disabled={props.conf.sylConf.sylMode !== SylMode.poesie}
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
                                label="Nbre pieds"
                                options={nrPiedsOptions}
                                selectedKey={props.conf.sylConf.nrPieds.toString()}
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
                                disabled={props.conf.sylConf.sylMode !== SylMode.poesie 
                                            ||
                                            !props.conf.sylConf.chercherDierese}
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
                    },
                    content: {
                        backgroundColor: "#FFFFFF00",
                    }
                }}
            >
                Couleurs alternées
            </Separator>

            <Stack horizontal grow tokens={sylButStackTokens}>
                {sylButtons}
            </Stack>
            
            <Stack horizontal tokens={flStackTokens} horizontalAlign="center">
                <Stack.Item align="center">
                    <DefaultButton 
                        text="Effacer" 
                        styles={customButStyles}
                        onClick={EffacerSylClick}
                    />
                </Stack.Item>
                <Stack.Item align="center">
                    <DefaultButton 
                        text="réinitialiser à bleu/rouge" 
                        styles={customButStyles}
                        onClick={ResetCoulSylClick}
                    />
                </Stack.Item>
            </Stack>
            <Separator 
                alignContent="center"
                styles= {{
                    root: {
                        fontSize: 12,
                        marginTop: 5,
                    },
                    content: {
                        backgroundColor: "#FFFFFF00",
                    }
                }}
            >
                Espace entre les mots
            </Separator>
            <Stack horizontal tokens={CommandStackTokens} horizontalAlign="center">
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Écartez les mots"
                        iconSrc="/assets/enlarge.png"
                        onClick={AddSpaceClick}
                    />
                </Stack.Item>
                <Stack.Item align="center" grow styles={flStackItemStyles}>
                    <Text block variant="small" styles={TextEspaceStyle}>
                        La commande {"'"}Écarter{"'"} ajoute un espace entre chaque mot.
                        {"'"}Resserrer{"'"} en efface un.
                    </Text>
                </Stack.Item>
                <Stack.Item align="center" styles={flStackItemStyles}>
                    <CommandButton
                        butTitle="Resserrez les mots"
                        iconSrc="/assets/Shrink_red_sq_64.png"
                        onClick={ShrinkSpaceClick}
                    />
                </Stack.Item>
            </Stack>
            
            <CharFormatForm
                valid= {LoadCffData}
                validLet= {LoadCffLetData}
            />
        </div>
    )
}