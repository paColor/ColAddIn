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

import { ActionButton, Image, IStackItemStyles, IStackTokens, Link, Stack, Text } from "@fluentui/react";
import React = require("react");
import { ShowMsg } from "./MessageWin";

export interface InfosTabProps {}

const imgStackTokens: IStackTokens = { 
    childrenGap: 15,
    padding: '2px 2px 2px 2px', // top right bottom left
};

const butStackTokens: IStackTokens = { 
    childrenGap: 30,
};


const versStackItemStyles: IStackItemStyles = {
    root: {
      padding: '0px 0px 10px 0px', // top right bottom left
    },
};

function OnClickLicence() {
    ShowMsg("Licence",
    "Coloriƨation is free software: you can redistribute it and/or modify " + 
    "it under the terms of the GNU General Public License as published by " +
    "the Free Software Foundation, either version 3 of the License, or " + 
    "(at your option) any later version. " +
    "Coloriƨation is distributed in the hope that it will be useful, " +
    "but WITHOUT ANY WARRANTY; without even the implied warranty of " +
    "MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the " +
    "GNU General Public License for more details. " +
    "You should have received a copy of the GNU General Public License " +
    "along with Coloriƨation. If not, see https://www.gnu.org/licenses/");
}

export default function InfosTab(_props: InfosTabProps) {
    return (
        <div>
            <Stack horizontalAlign="center">
                <Stack.Item>
                    <Stack horizontal grow tokens={imgStackTokens} verticalAlign="center">
                        <Stack.Item>
                            <Image
                                src= "/assets/LogoColorization_carré_64.png"  
                            />
                        </Stack.Item>
                        <Stack.Item>
                            <Image
                                src= "/assets/Colorization.png"
                                width={180}
                            />
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
                <Stack.Item styles = {versStackItemStyles}>
                    <Text variant="medium">Version: Add-In - 0.5.0</Text>
                </Stack.Item>
                <Stack.Item>
                    <Text block variant="small">
                        Coloriƨation est le résultat d{"'"}une demande de mon épouse pour pouvoir 
                        aider des enfants ayant des difficultés de lecture.
                    </Text>
                    <Text block variant="small">
                        Le programme emprunte beaucoup à{' '}
                        <Link href="http://lirecouleur.arkaline.fr/" underline>
                            LireCouleur
                        </Link>
                        . Merci à Marie-Pierre Brungard pour l{"'"}autorisation d{"'"}utiliser son superbe travail.
                    </Text>
                </Stack.Item>
                <Stack.Item 
                    styles ={{
                        root: {
                            padding: '10px 0px 0px 0px', // top right bottom left
                        }
                    }}
                >
                    <Text block variant="small">
                        Le service{' '}
                        <Link href="http://api.ceras.ch/" underline>
                            API
                        </Link>
                        {' '}du Centre Régional d{"'"}Apprentissages Spécialisés Berne,
                        Jura, Neuchâtel (CERAS) a défini des jeux de couleurs pour la colorisation
                        de phonèmes qui ont été repris dans les deux configurations préenregistrées
                        {' "'}
                        <Link href="https://colorization.ch/docs/Sons-couleurs-symboles-et-coloriseur-API.pdf" underline>
                            foncé
                        </Link>
                        {'" '} 
                        et {' "'}
                        <Link href="https://colorization.ch/docs/Sons_couleurs_COLORISEUR_API_rose_2020.pdf" underline>
                            rosé
                        </Link>
                        {'" '}.
                    </Text>
                </Stack.Item>
                <Stack.Item 
                    styles ={{
                        root: {
                            padding: '10px 0px 0px 0px', // top right bottom left
                        }
                    }}
                >
                    <Text block variant="small">
                        Vos commentaires, suggestions, rapports d{"'"}erreur,... sont bien-entendu
                        les bienvenus. Écrivez à 
                    </Text>
                </Stack.Item>
                <Stack.Item 
                    styles ={{
                        root: {
                            padding: '10px 0px 10px 0px', // top right bottom left
                        }
                    }}
                >
                    <Text block variant="small">
                        <Link href="mailto:info@colorization.ch" underline>
                            info@colorization.ch
                        </Link>
                    </Text>
                </Stack.Item>
                <Stack horizontal grow tokens = {butStackTokens} horizontalAlign = "stretch">
                    <Stack.Item>
                        <ActionButton 
                            // href="http://www.gnu.org/licenses/gpl-3.0.html"
                            iconProps={{ iconName: 'EntitlementPolicy' }}
                            onClick={OnClickLicence}
                        >
                            Licence
                        </ActionButton>
                    </Stack.Item>
                    <Stack.Item>
                        <ActionButton 
                            href="https://colorization.ch/docs/Manuel_Utilisateur_Colorization.pdf"
                            iconProps={{ iconName: 'Help' }}
                        >
                            Aide
                        </ActionButton>
                    </Stack.Item>
                </Stack>
            </Stack>
        </div>
    )
}