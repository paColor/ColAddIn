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
import MSWText from "../WordInterface/MSWText";
import WAction from "../WordInterface/WActions";
import PhonTab from "./PhonTab";

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export default function App() {
  const conf : Config = new Config();

  return (
    <div>
      <PhonTab 
        conf = {conf}
        colPhons = {MSWText.ColPhonsClick}
        colNoir = {WAction.ColNoirClick}
      />
    </div>
  )
}

