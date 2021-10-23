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

import { DefaultButton, Dialog, DialogFooter, DialogType } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { useState } from 'react';
import React = require('react');

let hideDialog: boolean; 
let showMsgWin: () => void;
let hideMsgWin: () => void;

let msgTxt: string;
let setMsgTxt: (string) => void;

let titre: string;
let setTitre: (string) => void;

/**
 * Affiche le message contTxt avec le titre titTxt dans une fenêtre avec un bouton Valider.
 * @param titTxt Le titre de la fenêtre
 * @param contTxt Le contenu du message
 */
export function ShowMsg (titTxt: string, contTxt: string) {
    setMsgTxt(contTxt);
    setTitre(titTxt);
    showMsgWin();
}

/**
 * Affiche une fenêtre avec le titre "Désolé" et le message contTxt
 * @param contTxt Le message à afficher
 */
export function SorryMsg (contTxt: string) {
    ShowMsg("Désolé", contTxt);
}

/**
 * Affiche une fenêtre avec le titre "Attention" et le message contTxt
 * @param contTxt Le message à afficher
 */
export function WarningMsg (contTxt: string) {
    ShowMsg("Attention", contTxt);
}

/**
 * Affiche une fenêtre avec le titre "Erreur" et le message contTxt
 * @param contTxt Le message à afficher
 */
export function ErrorMsg (contTxt: string) {
    ShowMsg("Erreur", contTxt);
}

export function InfoMsg (contTxt: string) {
    ShowMsg("Information", contTxt);
}

export default function MessageWin() {
    [hideDialog, { setTrue: hideMsgWin, setFalse: showMsgWin }] = useBoolean(true);
    [msgTxt, setMsgTxt] = useState("Texte par défaut");
    [titre, setTitre] = useState("Erreur");

    const theDialogContentProps = {
        type: DialogType.normal,
        title: titre,
        subText: msgTxt,
    };

    const theModalProps = {
        styles: { main: { maxWidth: 450 } },
    }

    return (
        <Dialog    
            hidden={hideDialog}
            onDismiss={hideMsgWin}
            dialogContentProps={theDialogContentProps}
            modalProps={theModalProps}
        >
            <DialogFooter>
                <DefaultButton onClick={hideMsgWin} text="OK" />
            </DialogFooter>
        </Dialog>
    )
        


 }