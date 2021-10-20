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

import { Pivot, PivotItem } from "@fluentui/react";
import * as React from "react";
import Config from "../Configs/Config";
import MSWText from "../WordInterface/MSWText";
import AvTab from "./AvTab";
import InfosTab from "./InfosTab";
import MessageWin from "./MessageWin";
import PhonTab from "./PhonTab";
import PlusTab from "./PlusTab";
import SauvTab from "./SauvTab";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
  storedConf: any;
}

export default function App(props: AppProps) {
  // window.localStorage.clear();
  const conf = new Config(props.storedConf);
  Config.SaveCurConfig(conf); 
  // c'est un peu l'artillerie lourde: on sauvegarde à chaque changement. càd à chaque re-render.

  // window.onunload = function() {
  //   console.log("window is closing.");
  //   Config.SaveCurConfig(conf);
  // }

  return (
    <div>
      <Pivot aria-label="Basic Pivot Example" linkFormat="links"> 
        <PivotItem
          headerText="Phon"
        >
          <PhonTab 
            conf = {conf}
            colPhons = {MSWText.ColPhonsClick}
            colNoir = {MSWText.ColNoirClick}
          />
        </PivotItem>
        <PivotItem headerText="Plus">
          <PlusTab 
            conf = {conf}
            colLettres = {MSWText.ColLetClick}
            colSyllabes = {MSWText.ColSylClick}
            colMots = {MSWText.ColMotsClick}
            colVoyCons = {MSWText.ColVoyConsClick}
            colNoir = {MSWText.ColNoirClick}
          />
        </PivotItem>
        <PivotItem headerText="Sauv">
          <SauvTab 
            conf = {conf}
          />
        </PivotItem>
        <PivotItem headerText="Avancé">
          <AvTab
            conf = {conf}
          />
        </PivotItem>
        <PivotItem headerText="Infos">
          <InfosTab/>
        </PivotItem>
      </Pivot>
      
      <MessageWin/>
    </div>
  )
}

