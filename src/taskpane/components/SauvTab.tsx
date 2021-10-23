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
import { DefaultButton, DefaultPalette, DetailsList, IButtonStyles, IColumn, IDetailsListStyles, IStackTokens, Selection, SelectionMode, Stack, TextField } from "@fluentui/react";
import { WarningMsg } from "./MessageWin";

export interface SauvTabProps {
    conf: Config;
    nameList: string[];
    refreshNameList: () => void;
}

const ChargEffStackTokens: IStackTokens = { // first line stack tokens
    childrenGap: 10,
    padding: '10px 2px 8px 2px', // top right bottom left
};

const SauvStackTokens: IStackTokens = { // first line stack tokens
    padding: '10px 2px 2px 2px', // top right bottom left
};

const customButStyles: IButtonStyles = { 
    root: {
      background: DefaultPalette.themeLighter,
    },
};

interface Item {
    value: string
}

const columns: IColumn[] = [
    { key: 'column1', name: 'Configurations sauvegardées', fieldName: 'value', minWidth: 50, maxWidth: 60, isResizable: false },
]

const listStyles: Partial<IDetailsListStyles> = {
    headerWrapper: {
        margin: '-10px 0px 0px 0px', // top right bottom left
    },
    contentWrapper: {
        overflowY: "scroll",
        overflowX: "hidden",
        height: "290px"
    }
}


export default function SauvTab(props: SauvTabProps) {

    const [selection, _setSelection] = React.useState(new Selection());

    function SauvegarderClick() {
        let savedName = props.conf.configName;
        props.conf.Save(savedName);
        props.refreshNameList();
    }

    function ChargerClick() {
        let sel = selection.getSelection()[0] as Item;
        if (sel != null) {
            let cObj = Config.LoadSavedConfigObj(sel.value);
            props.conf.Copy(cObj);
            props.refreshNameList();
        }
    }

    function EffacerClick() {
        let sel = selection.getSelection()[0] as Item;
        if (sel != null) {
            Config.DeleteSavedConf(sel.value);
            props.refreshNameList();
        }
        else {
            WarningMsg("Pas de configuration sélectionnée.")
        }
    }

    function DefautClick() {
        props.conf.Reset();
    }

    function UpdateConfName(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, 
        newValue?: string) {
        props.conf.setConfigName(newValue);
    }

    function GetItems():Item[] {
        let toReturn: Item[] = [];
        let savedConfs = props.nameList;
        for (let i = 0; i < savedConfs.length; i++) {
            toReturn.push({value: savedConfs[i]});
        }
        return toReturn;
    }

    return (
        <div>
            <TextField
                label="Donnez un nom à votre configuration"
                value={props.conf.configName}
                onChange={UpdateConfName}
            />
            <Stack tokens={SauvStackTokens}>
                <Stack.Item align="center">
                    <DefaultButton
                        text={"Sauvegarder"}
                        iconProps={{iconName: "save"}}
                        styles={customButStyles}
                        onClick={SauvegarderClick}
                    />
                </Stack.Item>
            </Stack>
            <DetailsList
                items={GetItems()}
                columns={columns}
                selectionPreservedOnEmptyClick={true}
                selectionMode={SelectionMode.single}
                selection={selection}
                styles={listStyles}
                onItemInvoked={ChargerClick}
            />
            <Stack horizontal tokens={ChargEffStackTokens} horizontalAlign="center">
                <Stack.Item align="center">
                    <DefaultButton 
                        text="Charger" 
                        iconProps={{iconName: "OpenFile"}}
                        styles={customButStyles}
                        onClick={ChargerClick}
                    />
                </Stack.Item>
                <Stack.Item align="center">
                    <DefaultButton 
                        text="Effacer" 
                        iconProps={{iconName: "Delete"}}
                        styles={customButStyles}
                        onClick={EffacerClick}
                    />
                </Stack.Item>
            </Stack>
            <Stack>
                <Stack.Item align="center">
                    <DefaultButton 
                        text="Par défaut" 
                        iconProps={{iconName: "Refresh"}}
                        styles={customButStyles}
                        onClick={DefautClick}
                    />
                </Stack.Item>
            </Stack>
        </div>
    )
}