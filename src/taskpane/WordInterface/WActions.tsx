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


import Config from "../Configs/Config";

export default class WAction {

    // ------------------------------ Agir sur MSWText -------------------------
    
    static AddSpace(_conf: Config) {

    }

    // ----------------------- Les clicks -------------------------------------

    static EcarterClick(conf: Config) {
        ActOnSelectedText(this.AddSpace, "Écarter", conf);
    }

    static ColPhonsClick(conf: Config) {
        ActOnSelectedText(this.AddSpace, "Coloriser phonèmes", conf);
        console.log("ColPhonsClick");
    }

    static ColNoirClick(conf: Config) {
        ActOnSelectedText(this.AddSpace, "Noir", conf);
    }

}

    async function ActOnSelectedText(_act: (c:Config) => void, _undoTxt: string, _conf: Config) {
        Word.run(async (context) => {
            let sel = context.document.getSelection();
            // sel.load();
            const delimiters : string[] = ["B", "o", "n", "j", "u", "r"];
            let rgeColl = sel.split(delimiters);
            rgeColl.load();
            await context.sync();

            for (let rge of rgeColl.items) {
                console.log(rge.text);
            }

            
/* 
            let rge = rgeColl.getFirstOrNullObject();
            rge.font.color = "#FF0000";

            rgeColl.items[1].font.color = "#00FF00";



            let rge = sel.getRange("Start");
            let rge2 = rge.getRange("After");
            let rge3 = rge2.getRange("After");
            
            let newRge = rge.expandTo(rge3);
             */

            

            // const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);
            // paragraph.font.color = "blue";
            
            await context.sync();
        })
    }

