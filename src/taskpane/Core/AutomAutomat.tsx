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
import PhonWord from "./PhonWord";

/*
import { RegleMotsEn5, RegleMotsGnGN, RegleMotsOYoj, RegleMotsQUkw, RegleMotsRe, Regle_avoir, Regle_ChK, Regle_er, Regle_finD, Regle_ient, Regle_ierConjE, Regle_ierConjI, Regle_ill, Regle_ment, Regle_MotsUM, Regle_MotsUN_ON, Regle_mots_ent, Regle_nc_ai_final, Regle_s_final, Regle_tien, Regle_t_final, Regle_VerbesTer, Regle_X_Final } from "../Core/AutomRuleFilter";
import { Phoneme } from "./PhonInW";


let automat = {

    'a' : [['u','il','in','nc_ai_fin','ai_fin','fais','i','n','m','adam','nm','y_except','y_fin','yat',
            'taylor','y','ae_e','coach','saoul','*'],
            {'u':[{'+':/u/i},Phoneme.o_comp,2],
            'il':[{'+':/il((s?)$|l)/i},Phoneme.a,1],
            'in':[{'+':/i[nm]([bcçdfghjklnmpqrstvwxz]|$)/i},Phoneme.e_tilda,3], // toute succession 'ain' 'aim' suivie d'une consonne ou d'une fin de mot
            'nc_ai_fin':[Regle_nc_ai_final,Phoneme.E_comp,2],
            'ai_fin':[{'+':/i$/i},Phoneme.E_comp,2],
            'fais':[{'-':/f/i,'+':/is[aeiouy]/i},Phoneme.q, 2], // (PAE - 30.04.20) faisais et toutes les variations
            'i':[{'+':/[iî]/i},Phoneme.E_comp,2],
            'n':[{'+':/n[bcçdfgjklmpqrstvwxz]/i},Phoneme.a_tilda,2],
            'm':[{'+':/m[bp]/i},Phoneme.a_tilda,2], // règle du m devant b, p
            'adam':[{'-':/^ad/i,'+':/m(s?)$/i},Phoneme.a_tilda,2],
            'nm':[{'+':/n(s?)$/i},Phoneme.a_tilda,2],
            'y_except':[{'-':/(^b|cob|cip|^k|^m|^f|mal|bat|^bisc)/i,'+':/y/i},Phoneme.a,1], // exception : baye, cobaye, kayac, maya, mayonnaise, fayot (PAE - 10.03.20)
            'y_fin':[{'+':/y(s?)$/i},Phoneme.E_comp,2], // (PAE - 10.03.20) - 'pays' est une eexception traitée dans AutomDictionary.
            'yat':[{'+': /yat/i},Phoneme.a,1], // (PAE - 10.03.20) ayatollah
            'taylor':[{'-':/t/i,'+':/ylor/i},Phoneme.E_comp, 2],
            'y':[{'+':/y/i},Phoneme.E_comp,1],
            'ae_e': [{'+':/e/i},Phoneme.e,2],
            'coach':[{'-':/co/i,'+':/(ch|lt)/i},Phoneme._muet, 1],
            'saoul':[{'-':/s/i,'+':/oul/i},Phoneme._muet, 1],
            '*':[{},Phoneme.a,1]}],
    'â' : [['*'],
            {'*':[{},Phoneme.a,1]}],
    'à' : [['*'],
            {'*':[{},Phoneme.a,1]}],
    'b' : [['b','plomb', '*'],
            {'b':[{'+':/b/i},Phoneme.b,2],
            'plomb':[{'-':/om/i,'+':/(s?)$/i},Phoneme._muet,1], // le ´b´ à la fin de plomb ne se prononce pas
            '*':[{},Phoneme.b,1]}],
    'c' : [['eiy','choeur','psycho','brachio','schizo','tech','tachy','batra','chK','h',
            'cciey','cc','cisole','c_muet_fin','c_k_fin','@',
            'ct_fin','apostrophe','coe','seconde','*'],
            {'eiy':[{'+':/([eiyéèêëîï]|ae)/i},Phoneme.s_c,1],
            'choeur':[{'+':/h(oe|œ|or|éo|r|estr|esti|irop|irom|lo|lam)/i},Phoneme.k,2],
            'psycho':[{'-':/psy/i,'+':/h[oa]/i},Phoneme.k,2], // tous les ´psycho´ quelque chose
            'brachio':[{'-':/bra/i,'+':/hio/i},Phoneme.k,2], // brachiosaure, brachiocéphale
            'schizo':[{'-':/s/i,'+':/(hi[aoz]|hato)/i},Phoneme.k,2], // schizo, eschatologie
            'tech':[{'-':/te/i,'+':/hn/i},Phoneme.k,2], // technique et tous ses dérivés
            'tachy':[{'-':/ta/i,'+':/hy/i},Phoneme.k,2],
            'batra':[{'-':/batra/i,'+':/h/i},Phoneme.k,2],
            'chK':[Regle_ChK,Phoneme.k,2], // pour les cas qui n'ont pas été reconnus par les règles précédentes
            'h':[{'+':/h/i},Phoneme.S,2],
            'cciey':[{'+':/c[eiyéèêëîï]/i},Phoneme.k,1], // accident, accepter, coccyx
            'cc':[{'+':/[ck]/i},Phoneme.k,2], // accorder, accompagner
            'cisole':[{'+':/$/i,'-':/^/i},Phoneme.s_c,1], // exemple : c'est
            'c_muet_fin':[{'-':/taba|accro|estoma|bro|capo|cro|escro|raccro|caoutchou|mar/i,'+':/(s?)$/i},Phoneme._muet,1], // exceptions traitées : tabac, accroc [PAE 20.02.20 ajouté les autres]
            'c_k_fin':[{'-':/([aeiouïé]|^on|don|ar|ur|s|l)/i,'+':/(s?)$/i}, Phoneme.k, 1], // [PAE 20.02.20 ajouté la règle]
            '@':[{'+':/(s?)$/i},Phoneme._muet,1],
            'ct_fin':[{'-':/(spe|in)/i,'+':/t(s?)$/i},Phoneme._muet,1], // respect, suspect, aspect
            'apostrophe':[{'+':/('|’)/i},Phoneme.s_c,2], // il faut aussi cette règle car l'appostrophe n'est pas toujours filtrée.
            'coe':[{'+':/(œ)(l|n|c)/i},Phoneme.s_c,1],
            'seconde':[{'-':/se/i,'+':/ond/i},Phoneme.g,1],
            '*':[{},Phoneme.k,1]}], 
    'ç' : [['*'],
            {'*':[{},Phoneme.s,1]}],
    'd' : [['d','disole','except','dmuet','dt','*'],
            {'d':[{'+':/d/i},Phoneme.d,2],
            'except':[Regle_finD,Phoneme.d,1], // aïd, caïd, oued
            'disole':[{'+':/$/i,'-':/^/i},Phoneme.d,1], // exemple : d'abord
            'dmuet':[{'+':/(s?)$/i},Phoneme._muet,1], // un d suivi éventuellement d'un s ex. : retards
            'dt':[{'+':/t/i},Phoneme._muet,1], // un d suivi t ne se prononce pas ex: cronstadt
            '*':[{},Phoneme.d,1]}],
    'e' : [['conj_v_ier','uient','ien_0','scien','orient','ien','ien2',
            'examen','zen','_ent',
            'adv_emment_fin','ment','imparfait','verbe_3_pluriel','hier','au',
            'avoir','eu','in','orgueil','eil','y','iy',//'ennemi',
            'enn_debut_mot',
            't_final','eclm_final','d_except','drz_final','except_en2','n','adv_emment_a',
            'lemme','em_gene','nm','eno','tclesmesdes',
            'jtcnslemede','jean','ge','eoi','ex','ef','reqquechose','entre',
            'except_evr',
            '2consonnes','abbaye','que_gue_final','e_muet','e_deb',
            '@','ier_Conj','hyper','*'],
            {
            'conj_v_ier':[Regle_ient,Phoneme._muet,3], // verbe du 1er groupe terminé par 'ier' conjugué à la 3ème pers du pluriel
            'uient':[{'-':/ui/i,'+':/nt$/i},Phoneme._muet,3], // enfuient, appuient, fuient, ennuient, essuient
            'ien_0':[{'-':/(fic|n|quot|ingréd)i/i,'+':/nt(s?)$/i},Phoneme.a_tilda,2], // incovénient, coefficient,...
            'scien':[{'-':/((aud|sc|cl|^fa|([éf]fic)|pat|émoll|expé[dr]|^farn|^résil|obéd)[iï])/i,'+':/n/i},Phoneme.a_tilda,2], // science, faïence...
            'orient':[{'-':/(ori|gradi)/i,'+':/nt/i},Phoneme.a_tilda,2],
            'ien':[{'-':/([bcdégklmnrstvhz]i|ï)/i,'+':/n([bcçdfghjklpqrstvwxz]|(s?)$)/i},Phoneme.e_tilda,2], // certains mots avec 'ien' => son [e_tilda]
            'ien2':[{'-':/pi/i,'+':/n(s?)$/i},Phoneme.e_tilda,2], // carpien, olympien, ...
            'examen':[{'-':/(exam|mino|édu|apexi|^api|loqui|\wy|é|^b(r?))/i,'+':/n(s?)$/i},Phoneme.e_tilda,2],
            'zen':[{'-':/([a-z]m|gold|poll|^[yz]|^av|bigoud|coh|^éd)/i,'+':/n(s?)$/i},Phoneme.E_comp,1],
            '_ent':[Regle_mots_ent,Phoneme.a_tilda,2], // quelques mots (adverbes ou noms) terminés par ent
            'adv_emment_fin':[{'-':/emm/i,'+':/nt/i},Phoneme.a_tilda,2], // adverbe avec 'emment' => se termine par le son [a_tilda]
            'ment':[Regle_ment,Phoneme.a_tilda,2], // on considère que les mots terminés par 'ment' se prononcent [a_tilda] sauf s'il s'agit d'un verbe
            'imparfait':[{'-':/ai/i,'+':/nt$/i},Phoneme.verb_3p,3], // imparfait à la 3ème personne du pluriel
            'verbe_3_pluriel':[{'+':/nt$/i},Phoneme.q_caduc,1], // normalement, pratiquement tout le temps verbe à la 3eme personne du pluriel
            'hier':[Regle_er,Phoneme.E_comp,1], // encore des exceptions avec les mots terminés par 'er' prononcés 'E R'        
            'au':[{'+':/au/i},Phoneme.o_comp,3],
            'avoir':[Regle_avoir,Phoneme.y,2],
            'eu':[{'+':/(u|û)/i},Phoneme.x2,2],
            'in':[{'+':/i[nm]([bcçdfghjklnmpqrstvwxz]|$)/i},Phoneme.e_tilda,3], // toute succession 'ein' 'eim' suivie d'une consonne ou d'une fin de mot
            'orgueil':[{'-':/gu/i,'+':/il/i},Phoneme.x2,1], // enorgueilli
            'eil':[{'+':/il/i},Phoneme.E_comp,1],
            'y':[{'+':/y[aeiouéèêààäôâ]/i},Phoneme.E_comp,1],
             'iy':[{'+':/[iy]/i},Phoneme.E_comp,2],
            'enn_debut_mot':[{'-':/(^|dés)/i,'+':/nn[^ié]/i},Phoneme.a_tilda,2], // 'enn' en début de mot se prononce 'en'
            't_final':[{'+':/[t]$/i},Phoneme.E_comp,2], // donne le son [E] et le t ne se prononce pas
            'eclm_final':[{'+':/[clm](s?)$/i},Phoneme.E_comp,1], // donne le son [E] et le l ou le c se prononcent (ex. : miel, sec)
             'd_except': [{'-':/(^bl|^ou|^damn)/i, '+':/d(s?)$/i},Phoneme.E_comp,1], // [PAE 22.02.20] pour covrir oued, bled, damned   
            'drz_final':[{'+':/[drz](s?)$/i},Phoneme.E_comp,2], // e suivi d'un d,r ou z en fin de mot done le son [e] 
            'except_en2':[RegleMotsEn5,Phoneme.e_tilda,2], // mots dont le en se prononce [5]
            'n':[{'+':/n[bcdfghjklmpqrstvwxzç]/i},Phoneme.a_tilda,2],
            'adv_emment_a':[{'+':/mment/i},Phoneme.a,1], // adverbe avec 'emment' => son [a]
            'lemme':[{'-':/([ltg]|^p|^syn|^systr)/i,'+':/mm/i},Phoneme.E_comp,1], // lemme et ses dérivés => son [E]
            'em_gene':[{'+':/m[bcçdfghjklmpqrstvwxz]/i},Phoneme.a_tilda,2], // 'em' cas général => son [a_tilda]
            'nm':[{'+':/[nm]$/i},Phoneme.a_tilda,2], // en fin de mot...
            'eno':[{'-':/(^|dés)/i,'+':/n[aio]/i},Phoneme.a_tilda,1], // 'enivrer' --> le 'n' se prononce également
            'tclesmesdes':[{'-':/^[tcslmd]/i,'+':/s$/i},Phoneme.E_comp, 2], // mes, tes, ces, ses, les
            'que_gue_final':[{'-':/[gq]u/i,'+':/(s?)$/i},Phoneme.q_caduc,1], // que ou gue final
            'jtcnslemede':[{'-':/^[jtcnslmd]/i,'+':/$/i},Phoneme.q,1], // je, te, me, le, se, de, ne
            'jean':[{'-':/j/i,'+':/an/i},Phoneme._muet,1], // jean
            'ge':[{'-':/g/i,'+':/[aouàäôâ]/i},Phoneme._muet,1], // un e précédé d'un 'g' et suivi d'une voyelle ex. : cageot
            'eoi':[{'+':/oi/i},Phoneme._muet,1], // un e suivi de 'oi' ex. : asseoir
            'ex':[{'+':/x/i},Phoneme.E_comp,1], // e suivi d'un x se prononce è
            'ef':[{'+':/[bf](s?)$/i},Phoneme.E_comp,1], // e suivi d'un f ou d'un b en fin de mot se prononce è
            'reqquechose':[RegleMotsRe,Phoneme.q,1], // re-quelque chose : le e se prononce 'e'
            'entre':[{'-':/(^((ré)?)entr|^contr|^autor|^maugr)/i},Phoneme.q,1],
            'except_evr':[{'+':/([cfv]r)/i},Phoneme.q,1], // chevrier, chevron, chevreuil, secret
            '2consonnes':[{'+':/[bcçdfghjklmnpqrstvwxz]{2}/i},Phoneme.E_comp,1], // e suivi de 2 consonnes se prononce è
            'abbaye':[{'-':/abbay/i,'+':/(s?)$/i},Phoneme._muet,1], // ben oui...
            'e_muet':[{'-':/[aeiouéèêà]/i,'+':/(s?)$/i},Phoneme._muet,1], // un e suivi éventuellement d'un 's' et précédé d'une voyelle ou d'un 'g' ex. : pie, geai
            'e_deb':[{'-':/^/i},Phoneme.q,1], // par défaut, un 'e' en début de mot se prononce [q]
            '@':[{'+':/(s?)$/i},Phoneme.q_caduc,1],
            'ier_Conj':[Regle_ierConjE,Phoneme._muet,1], // verbes en ier conjugués au futur ou au conditionnel
            'hyper':[{'-':/(hyp|^int)/i,'+':/r/i},Phoneme.E_comp,1],
            '*':[{},Phoneme.q,1],
            }],
    'é' : [['*'],
            {'*':[{},Phoneme.e,1]}],
    'è' : [['*'],
            {'*':[{},Phoneme.E,1]}],
    'ê' : [['*'],
            {'*':[{},Phoneme.E,1]}],
    'ë' : [['*'],
            {'*':[{},Phoneme.E,1]}],
    'f' : [['f','oeufs', '*'],
            {'f':[{'+':/f/i},Phoneme.f,2],
                'oeufs':[{'-':/(oeu|œu)/i,'+':/s/i},Phoneme._muet,1], // oeufs et boeufs
                '*':[{},Phoneme.f,1]}],
    'g' : [['sugg','g','ao','eiy','aiguille','u_consonne','ngui','u','except_n','n','vingt','g_muet_oin',
            'g_muet_our','g_muet_an',//'g_muet_fin', 
            '*'],
            {'sugg':[{'-':/su/i,'+':/g(e|é)/i},Phoneme.g,1], // suggérer et sa famille
            'g':[{'+':/g/i},Phoneme.g,2],
            'ao':[{'+':/(a|o)/i},Phoneme.g,1],
            'eiy':[{'+':/[eéèêëïiîy]/i},Phoneme.Z,1], // un 'g' suivi de e,i,y se prononce [Z]
            'aiguille':[{'-':/ai/i,'+':/(u(ill|iér|ï|ité|(s?)$))/i},Phoneme.g,1], // encore une exception : aiguille, aigu et quelques mots bizarres comme aiguité
            'u_consonne':[{'+':/u[bcçdfghjklmnpqrstvwxz]/i},Phoneme.g,1], // gu suivi d'une consonne se prononce [g][y]
            'ngui':[{'-':/n/i,'+':/ui(st|sm|fè|cu)/i},Phoneme.g,1], // linguiste, inguinal, unguifère, onguiculé...
            'u':[{'+':/u/i},Phoneme.g_u,,2],
            'except_n':[RegleMotsGnGN,Phoneme.g,1],
            'n':[{'+':/n/i},Phoneme.N,2],
            'vingt':[{'-':/vin/i,'+':/t/i},Phoneme._muet,1], // vingt
            'g_muet_oin':[{'-':/oi(n?)/i},Phoneme._muet,1], // un 'g' précédé de 'oin' ou de 'oi' ne se prononce pas ; ex. : poing, doigt
            'g_muet_our':[{'-':/ou(r)/i},Phoneme._muet,1], // un 'g' précédé de 'our' ou de 'ou(' ne se prononce pas ; ex. : bourg
            'g_muet_an':[{'-':/((s|^ét|^r|^harf|^il)an|lon|haren|ein)/i,'+':/(s?)$/i},Phoneme._muet,1], // sang, rang, étang, long, hareng
            '*':[{},Phoneme.g,1]}],
    'h' : [['*'],
            {'*':[{},Phoneme._muet,1]}],
    'i' : [['ing','inh','sprint','n','m','nm','prec_2cons','lldeb','vill','tranquille',
            'ill','except_ill','bacille','ill_Ceras', '@ill','@il','ll','@il_Ceras',
            'll_Ceras','ui','ient_1','ient_2','ie','ier_Conj','i_voyelle','flirt','*'],
            {'ing':[{'-':/[bcçdfghjklmnpqrstvwxz]/i,'+':/ng(s?)$/i},Phoneme.i,1],
            'inh':[{'+':/nh/i},Phoneme.i,1],
            'sprint':[{'-':/(^spr|^sw|^tram|^sp|^sh|^pidg|^park|^muezz|^ingu)/i,'+':/n/i},Phoneme.i,1],
            'n':[{'+':/n[bcçdfghjklmpqrstvwxz]/i},Phoneme.e_tilda,2],
            'm':[{'+':/m[bcçdfghjklnpqrstvwxz]/i},Phoneme.e_tilda,2],
            'nm':[{'+':/[n|m]$/i},Phoneme.e_tilda,2],
            'prec_2cons':[{'-':/[ptkcbdgfv][lr]/i, '+':/[aäâeéèêëoôöuù]/i},Phoneme.i_j,1], // précédé de 2 consonnes (en position 3), doit apparaître comme [ij] [PAE 20.02.20: rajouté les voyelles]
            'lldeb':[{'-':/^/i,'+':/ll/i},Phoneme.i,1],
            'vill':[{'-':/(v|^m)/i,'+':/ll/i},Phoneme.i,1,"IllCeras"],
            'tranquille' : [{'-':/(ach|tranqu)/i,'+':/ll/i},Phoneme.i,1,"IllCeras"],
            'ill':[{'+':/ll/i,'-':/[bcçdfghjklmnpqrstvwxz](u?)/i},Phoneme.i,1,"IllLireCouleur"], // précédé éventuellement d'un u et d'une consonne, donne le son [i]
            'except_ill':[Regle_ill,Phoneme.i,1], // PAE - 07.05.20
            'bacille':[{'-':/(bac|dist|inst)/i,'+':/ll/i},Phoneme.i,1], // il y tant de mots contenant 'bacill'... et les verbes...
            'ill_Ceras':[{'+':/ll/i,'-':/[bcçdfghjklmnpqrstvwxz](u?)/i},Phoneme.i_j_ill,3,"IllCeras"], // précédé éventuellement d'un u et d'une consonne, donne le son [i]
            '@ill':[{'-':/[aeoœ]/i,'+':/ll/i},Phoneme.j,3,"IllLireCouleur"], // par défaut précédé d'une voyelle et suivi de 'll' donne le son [j]
            '@il':[{'-':/[aeouœ]/i,'+':/l(s?)$/i},Phoneme.j,2,"IllLireCouleur"], // par défaut précédé d'une voyelle et suivi de 'l' donne le son [j]
            'll':[{'+':/ll/i},Phoneme.j,3, "IllLireCouleur"], // par défaut avec ll donne le son [j]
            '@il_Ceras':[{'-':/[aeouœ]/i,'+':/l(s?)$/i},Phoneme.j_ill,2, "IllCeras"], // par défaut précédé d'une voyelle et suivi de 'l' donne le son [ill]
            'll_Ceras':[{'+':/ll/i},Phoneme.j_ill,3, "IllCeras"], // par défaut avec ll donne le son [ill]
            'ui':[{'-':/u/i,'+':/ent/i},Phoneme.i,1], // essuient, appuient
            'ient_1':[Regle_ient,Phoneme.i,1], // règle spécifique pour différencier les verbes du premier groupe 3ème pers pluriel
            'ient_2':[{'+':/ent(s?)$/i},Phoneme.j,1], // si la règle précédente ne fonctionne pas
            'ie':[{'+':/e(s?)$/i},Phoneme.i,1], // mots terminés par -ie(s)
            'ier_Conj':[Regle_ierConjI,Phoneme.i,1], // verbes en ier conjugués au futur ou au conditionnel
            'i_voyelle':[{'+':/[aäâeéèêëoôöuù]/i},Phoneme.ji,1], // i suivi d'une voyelle donne [j]
            'flirt':[{'-':/^fl/i,'+':/rt/i},Phoneme.x2,1],
            '*':[{},Phoneme.i,1]}],
    'ï' : [['thai', 'aie', 'n','m','nm','*'],
            {'thai':[{'-':/t(h?)a/i},Phoneme.j,1], // taï, thaï et dérivés
            'aie':[{'-':/[ao]/i,'+':/e/i},Phoneme.j,1], // païen et autres
            'n':[{'+':/n[bcçdfghjklmpqrstvwxz]/i},Phoneme.e_tilda,2],
            'm':[{'+':/m[bcçdfghjklnpqrstvwxz]/i},Phoneme.e_tilda,2],
            'nm':[{'+':/[n|m]$/i},Phoneme.e_tilda,2],
            '*':[{},Phoneme.i,1]}],
    'î' : [['n','*'],
            {'n':[{'+':/n[bcçdfghjklmpqrstvwxz]/i},Phoneme.e_tilda,2],
            '*':[{},Phoneme.i,1]}],
    'j' : [['*'],
            {'*':[{},Phoneme.Z,1]}],
    'k' : [['*'],
            {'*':[{},Phoneme.k,1]}],
    'l' : [['vill','tranquille','illdeb','except_ill_l','bacille','ill','eil','ll','excep_il', 
            '*'],
            {'vill':[{'-':/(^v|vaudev|banv|^ov|bougainv|interv|cav|^m)i/i,'+':/l/i},Phoneme.l,2], // ville, village etc. => son [l]
            'tranquille':[{'-':/(achi|tranqui)/i,'+':/l/i},Phoneme.l,2], // tranquille => son [l]
            'illdeb':[{'-':/^i/i,'+':/l/i},Phoneme.l,2], // 'ill' en début de mot = son [l] ; exemple : illustration
            'except_ill_l':[Regle_ill,Phoneme.l,2],
            'bacille':[{'-':/(baci|disti|insti)/i,'+':/l/i},Phoneme.l,2],
            'ill':[{'-':/.i/i,'+':/l/i},Phoneme.j,2], // par défaut, 'ill' donne le son [j]
            'eil':[{'-':/e(u?)i/i},Phoneme.j,1], // les mots terminés en 'eil' ou 'ueil' => son [j]
            'll':[{'+':/l/i},Phoneme.l,2], // à défaut de l'application d'une autre règle, 'll' donne le son [l]
            'excep_il':[{'-':/(fusi|outi|genti|sourci|persi)/i,'+':/(s?)$/i},Phoneme._muet,1], // les exceptions trouvées où le 'l' à la fin ne se prononce pas : fusil, gentil, outil
            '*':[{},Phoneme.l,1]}],
    'm' : [['m','tomn','damn','*'],
            {'m':[{'+':/m/i},Phoneme.m,2],
            'damn':[{'-':/da/i,'+':/n/i},Phoneme._muet,1], // Regle spécifique pour 'damné' et ses dérivés
            'tomn':[{'-':/to/i,'+':/n/i},Phoneme._muet,1], // Regle spécifique pour 'automne' et ses dérivés
            '*':[{},Phoneme.m,1],
            }],
    'n' : [['n','ent','ing','*'],
            {'n':[{'+':/n/i},Phoneme.n,2],
            'ent':[{'-':/e/i,'+':/t$/i},Phoneme.verb_3p,2],
            'ing':[{'-':/i/i,'+':/g(s?)$/i},Phoneme.J,2],
            '*':[{},Phoneme.n,1],
            }],
    'o' : [['in','except_y','i','tomn','faonner',
            'n','m','nm','u','boo','alcool','oeu_defaut','oe_0','oe_2', 'oe_3',
            'oe_4','oe_defaut','toast','*'],
            {'in':[{'+':/i[nm]([bcçdfghjklpqrstvwxz]|$)/i},Phoneme.w_e_tilda,3],
            'except_y':[RegleMotsOYoj,Phoneme.o,1],
            'i':[{'+':/(i|î|y)/i},Phoneme.oi,2], // [PAE 26.02.20] introduction du phonème oi pour pouvoir le marquer dans la convention CERAS
            'tomn':[{'-':/t/i,'+':/mn/i},Phoneme.o,1], // Regle spécifique pour 'automne' et ses dérivés
            'faonner':[{'-':/^fa/i,'+':/nn/i},Phoneme._muet,1],
            'n':[{'+':/n[bcçdfgjklmpqrstvwxz]/i},Phoneme.o_tilda,2],
            'm':[{'+':/m[bcçdfgjkpqrstvwxz]/i},Phoneme.o_tilda,2], // toute consonne sauf le l et le m
            'nm':[{'+':/[nm]$/i},Phoneme.o_tilda,2],
            'u':[{'+':/[uwûù]/i},Phoneme.u,2], // son [u] : clou, clown
            'boo':[{'-':/(al|b|bl|baz|f|gl|gr|lm|pr|^r|sc|sh|sl|w)/i,'+':/o/i},Phoneme.u,2], // exemple : booléen, boom, sloop, ...
            'alcool':[{'-':/(alc|hyper|waterl|witl)/i,'+':/o/i},Phoneme.o,2],
            'oeu_defaut':[{'+':/eu/i},Phoneme.x2,3], // exemple : oeuf
            'oe_0':[{'+':/ê/i},Phoneme.oi,2],  // exemple : poêle [PAE 26.02.2020] remplacé par 'oi'
            'oe_2':[{'-':/m/i,'+':/e/i},Phoneme.oi,2], // exemple : moelle [PAE 26.02.2020] remplacé par 'oi'
            'oe_3':[{'-':/f/i,'+':/et/i},Phoneme.e,2], // exemple : foetus
            'oe_4':[{'-':/(gastr|électr|inc|min|c|aér|angi|benz)/i,'+':/e/i},Phoneme.o,1], // [PAE 26.02.2020] électroencéphalogramme, minoen, coefficient
            'oe_defaut':[{'+':/e/i},Phoneme.x2,2], // exemple : oeil
            'toast':[{'-':/t/i,'+':/ast/i},Phoneme.o,2], // toast, toaster et toutes ses formes
            '*':[{},Phoneme.o,1]
            }],
    'œ' : [['oeu','coe','oe_e','*'],
            {'oeu':[{'+':/u/i},Phoneme.x2,2], // voeux, ... [PAE 29.02.20]
            'coe':[{'-':/c/i,'+':/n/i},Phoneme.e,1],
            'oe_e':[{'+':/(l|c|b|t)/i},Phoneme.e,1],
            '*':[{},Phoneme.x2,1]
            }],
    'ô' : [['*'],
            {'*':[{},Phoneme.o,1]
            }],
    'ö' : [['*'],
            {'*':[{},Phoneme.o,1]
            }],
    'p' : [['p','h','oup','sculpt','*'],
            {'p':[{'+':/p/i},Phoneme.p,2],
            'h':[{'+':/h/i},Phoneme.f_ph,2],
            'oup':[{'-':/([cl]ou|dra|[ti]ro|alo|[rm])/i,'+':/(s?)$/i},Phoneme._muet,1], // les exceptions avec un p muet en fin de mot : loup, coup, galop, sirop
            'sculpt':[{'-':/(scul|ba|com|corrom)/i,'+':/t/i},Phoneme._muet,1], // les exceptions avec un p muet : sculpter, baptême, compter et les mots de la même famille
            '*':[{},Phoneme.p,1]}],
    'q' : [['qua_w','qu','k', '*'],
            {'qua_w':[RegleMotsQUkw,Phoneme.k,1], 
            'qu':[{'+':/u[bcçdfgjklmnpqrstvwxz]/i},Phoneme.k,1],
            'k':[{'+':/u/i},Phoneme.k_qu,2],
            '*':[{},Phoneme.k,1]}],
    'r' : [[
            'r', '*'],
            {
            'r':[{'+':/r/i},Phoneme.R,2],
            '*':[{},Phoneme.R,1]}],
    's' : [['schizo','sch','transs','s','s_final','@','parasit','balsa','subside','asept','pasZ','pasZ2',
            'déss','prés_s','z','dész','h','fasci',
            '*'],
            {'schizo':[{'+':/(chi[aoz]|chato)/i},Phoneme.s,1],
            'sch':[{'+':/ch/i},Phoneme.S,3], // schlem
            'transs':[{'-':/tran/i, '+':/s/i},Phoneme.s,1],
            's':[{'+':/s/i},Phoneme.s,2], // un s suivi d'un autre s se prononce [s]
            's_final':[Regle_s_final,Phoneme.s,1], // quelques mots terminés par -us, -is, -os, -as, -es
            '@':[{'+':/$/i},Phoneme._muet,1],
            'parasit':[{'-':/para/i,'+':/it/i},Phoneme.z_s,1], // parasit*
            'balsa':[{'-':/(tran|bal)/i,'+':/(i|hum|a)/i},Phoneme.z_s,1], // transhumance, transit, balsa,...
            'subside':[{'-':/sub/i,'+':/i/i},Phoneme.z_s,1], // subsidiaire
            'asept':[{'-':/a/i,'+':/(ep(s|t)i|ex|ocia|y(m|n|s))/i},Phoneme.s,1],
            'pasZ':[{'-':/(^para|^contre|^mono|^vrai|^vivi|^uni|^ultra|^alcoo|^antidy|^anti|^auto|batracho|^bio|^su|^carbo|^chéno|^ortho|^déca|^co|^soubre|^crypto|^cupro|^cyno|^deuto|^dodéca|^écho|(^[ée]qui))/i},Phoneme.s,1],
            'pasZ2':[{'-':/(^énnéa|^entre|^géo|^gira|^gymno|^hélio|^hendéca|^hétéro|^homo|^hydro|^hypo|^poly|^psycho|^prime|^psycho|^radio|^tourne|^péri|^impari|^idio|^hydrogéno|^invrai|^micro|^octo|^photo|^proto)/i},Phoneme.s,1],		
            'déss':[{'-':/^dé/i,'+':/(acra|ensibi|olida)/i},Phoneme.s,1], // désacraliser
            'prés_s':[{'-':/^pré/i,'+':/(éanc|échoir|élect|ériel|exu|uppo|ylvi|yndic)/i},Phoneme.s,1],
            'z':[{'-':/[aeiyouéèàâüûùëöêîôïœ]/i,'+':/[aeiyouéèàâüûùëöêîôïœ]/i},Phoneme.z_s,1], // un s entre 2 voyelles se prononce [z]
            'dész':[{'-':/(^dé|^di|^dy|^e|^phy|^tran)/i,'+':/[aiyouéèàâüûùëöêîôïh]/i},Phoneme.z_s,1], // déshonneur, esherbeur (si si), transhumance...
            'h':[{'+':/h/i},Phoneme.S,2],
            'fasci':[{'-':/fa/i,'+':/cis/i},Phoneme.S,2], // fasciste
            '*':[{},Phoneme.s,1]}],
    't' : [['t_deb','t','tisole','except_tien','_tien','ex_tiot','verb_tions','ex_tie','tie','tiaot',
            'tiaos','vingt',
            'ourt','_inct','_spect','_ct','_est','t_final','tmuet',
            'ex_tiel','_tiel','courtci','@','*'],
            {'t_deb':[{'-':/^/i},Phoneme.t,1],
            't':[{'+':/t/i},Phoneme.t,2],
            'tisole':[{'+':/$/i,'-':/^/i},Phoneme.t,1], // exemple : demande-t-il
            'except_tien':[Regle_tien,Phoneme.t,1], // quelques mots où 'tien' se prononce [t]
            '_tien':[{'+':/ien/i},Phoneme.s_t,1],
            'ex_tie':[{'-':/minu/i,'+':/ie(r|z)/i},Phoneme.t,1],
            'tie':[{'-':/(ambi|albu|cra|lvi|[^r]essen|idio|iner|ini|minu|ipé|oten|phé|oba|iaba|argu|automa|balbu|^cani|cap|tan|conten|dévo|féren|ploma|facé|^fac|^goé|thé|^inep|^impa|^impéri|^infec|sat)/i,
                '+':/i(e|é|èr)/i},Phoneme.s_t,1],
            'ex_tiot':[{'-':/(cré|plé|jé|([^r]|^)essen|^dui|intui)/i,'+':/i[ao]/i},Phoneme.s_t,1],
            'tiaot':[{'-':/([eéèêës]|[sc]en|(^|h|n)an|f(l?)[uû]|(ch|^str|galim|fum)[aâ]|rb[io]|^ca|^tri)/i,'+':/i[aâou]/i},Phoneme.t,1],
            'verb_tions':[Regle_VerbesTer,Phoneme.t,1], // verbes en ter à l'imparfait - nous
            'tiaos':[{'+':/i[aâou]/i},Phoneme.s_t,1],
            'vingt':[{'-':/ving/i,'+':/$/i},Phoneme.t,1], // vingt mais pas vingts
            'ourt':[{'-':/(a|h|g)our/i,'+':/$/i},Phoneme.t,1], // exemple : yaourt, yoghourt, yogourt
            '_inct':[{'-':/inc/i,'+':/(s?)$/i},Phoneme._muet,1], // instinct, succinct, distinct
            '_spect':[{'-':/spec/i,'+':/(s?)$/i},Phoneme._muet,1], // respect, suspect, aspect
            '_ct':[{'-':/c/i,'+':/(s?)$/i},Phoneme.t,1], // tous les autres mots terminés par 'ct'
            '_est':[{'-':/es/i,'+':/(s?)$/i},Phoneme.t,1], // test, ouest, brest, west, zest, lest
            't_final':[Regle_t_final,Phoneme.t,1], // quelques mots où le ´t´ final se prononce
            'tmuet':[{'+':/(s?)$/i},Phoneme._muet,1], // un t suivi éventuellement d'un s ex. : marrants
            'ex_tiel':[{'-':/céles/i},Phoneme.t,1],
            '_tiel':[{'+':/iel((le)?)(s?)/i},Phoneme.s_t,1],
            'courtci':[{'-':/^cour/i,'+':/circ/i},Phoneme._muet,1], // une règle pour courtcircuiter...
            '*':[{},Phoneme.t,1],							
            '@':[{'+':/$/i},Phoneme._muet,1]}],
    'u' : [['um','circum','n_on','n','nm','ueil','trust','bluff','qua_w','umb','*'],
            {'um':[Regle_MotsUM,Phoneme.o,1],
            'circum':[{'-':/(circ|^cent)/i,'+':/m/i},Phoneme.o,1],
            'n_on':[Regle_MotsUN_ON,Phoneme.o_tilda,2],
            'n':[{'+':/n[bcçdfgjklmpqrstvwxz]/i},Phoneme.x_tilda,2],
            'nm':[{'+':/[nm]$/i},Phoneme.x_tilda,2],
            'ueil':[{'+':/eil/i},Phoneme.x2,2], // mots terminés en 'ueil' => son [x2]
            'trust':[{'-':/tr/i,'+':/st/i},Phoneme.x2,1],
            'bluff':[{'-':/bl/i,'+':/ff/i},Phoneme.x2,1],
            'qua_w':[RegleMotsQUkw,Phoneme.w,1],
            'umb':[{'-':/(l|rh|^)/i,'+':/mb([aio]|ra|(s?)$)/i},Phoneme.o_tilda,2],
            '*':[{},Phoneme.y,1]}],
    'û' : [['*'],
            {'*':[{},Phoneme.y,1]}],
    'ù' : [['*'],
            {'*':[{},Phoneme.y,1]}],
    'ü' : [['*'],
            {'*':[{},Phoneme.y,1]}], // pour les mots allemands [PAE 11.07.2020]
    'v' : [['*'],
            {'*':[{},Phoneme.v,1]}],
    'w' : [['wurst', '*'],
            {'wurst':[{'+':/((u|ü)r|ag(o|n|uin)|rr|lk|isi|e(stp|rn|l(t|che)|i)|arrant|yando|orm|olfram|ill(é|e)|alky)/i},Phoneme.v,1], 
            '*':[{},Phoneme.w,1]}], 
    'x' : [['six_dix','dixième','gz_1','gz_2','gz_3','gz_4','gz_5','_aeox','fix','xisole','x_final', '@', '*'],
            {'six_dix':[{'-':/(s|d)i/i,'+':/$/i},Phoneme.s_x,1],
            'dixième':[{'-':/(s|d)i/i,'+':/iè/i},Phoneme.z,1],
            'gz_1':[{'-':/^/i,'+':/[aeuéèàüëêûù]/i},Phoneme.gz,1], // mots qui commencent par un x suivi d'une voyelle (sauf 'i' ou 'o')
            'gz_2':[{'-':/^(h?)e/i,'+':/(h?)[aeiouéèàüëöêîôûù]/i},Phoneme.gz,1], // mots qui commencent par un 'ex' ou 'hex' suivi d'une voyelle
            'gz_3':[{'-':/^coe/i,'+':/[aeiouéèàüëöêîôûù]/i},Phoneme.gz,1], // mots qui commencent par un 'coex' suivi d'une voyelle
            'gz_4':[{'-':/^ine/i,'+':/[aeiouéèàüëöêîôûù]/i},Phoneme.gz,1], // mots qui commencent par un 'inex' suivi d'une voyelle
            'gz_5':[{'-':/^(p?)rée/i,'+':/[aeiouéèàüëöêîôûù]/i},Phoneme.gz,1], // mots qui commencent par un 'réex' ou 'préex' suivi d'une voyelle
            '_aeox':[{'-':/[aeo]/i},Phoneme.ks,1],
            'fix':[{'-':/fi/i},Phoneme.ks,1],
            'xisole':[{'-':/^/i,'+':/$/i},Phoneme.ks,1],
            'x_final':[Regle_X_Final,Phoneme.ks,1],
            '*':[{},Phoneme.ks,1],
            '@':[{'+':/$/i},Phoneme._muet,1]}],
    'y' : [['m','n','nm','abbaye','y_voyelle', '*'],
            {'m':[{'+':/m[mpb]/i},Phoneme.e_tilda,2],
            'n':[{'+':/n[bcçdfghjklmpqrstvwxz]/i},Phoneme.e_tilda,2],
            'nm':[{'+':/[n|m]$/i},Phoneme.e_tilda,2],
            'abbaye':[{'-':/abba/i,'+':/e/i},Phoneme.i, 1], // abbaye... bien irrégulier
            'y_voyelle':[{'+':/[aâeiouéèàüëöêîôûù]/i},Phoneme.j,1], // y suivi d'une voyelle donne [j]
            '*':[{},Phoneme.i,1]}],
    'z' : [['riz', 'aio_z','razzia','zsch','tz','zisole','@', '*'],
            {'riz':[{'-':/^r(i|a)/i,'+':/$/i},Phoneme._muet,1], 
            'aio_z':[{'-':/(a|i|o)/i,'+':/$/i},Phoneme.z,1],
            'razzia':[{'+':/z/i},Phoneme.d,1],
            'zsch':[{'+':/sch/i},Phoneme.S,4], // nietzschéen...
            'tz':[{'-':/t/i},Phoneme.s,1],
            'zisole':[{'-':/^/i,'+':/$/i},Phoneme.z,1],
            '@':[{'+':/$/i},Phoneme._muet,1],
            '*':[{},Phoneme.z,1]}],
    'æ' : [['*'],
            {'*':[{},Phoneme.e,1]}], // les autres cas sont traités dans les exceptions. [ae] n'est cependant pas possible...
    '0' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '1' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '2' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '3' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '4' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '5' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '6' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '7' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '8' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '9' : [['unité','dizaine','centaine', 'mil','*'],
            {
            'unité':[{'+':/($|[^\d])/i},Phoneme.unité,1],
            'dizaine':[{'+':/\d($|[^\d])/i},Phoneme.dizaine,1],
            'centaine':[{'+':/\d\d($|[^\d])/i},Phoneme.centaine,1],
            'mil':[{'+':/\d\d\d($|[^\d])/i},Phoneme.milliers,1],
            '*':[{},Phoneme.chiffre,1]
            }
           ],
    '\'' : [['*'],
            {'*':[{},Phoneme.chiffre,1]}], // 20.11.2020 mis à 'chiffre' plutôt que Phoneme._muet. ça se discute...
    '’' : [['*'],
            {'*':[{},Phoneme.chiffre,1]}], // 20.11.2020 mis à 'chiffre' plutôt que Phoneme._muet. ça se discute...
    '*' : [['*'],
            {'*':[{},Phoneme.chiffre,1]}]  // 20.11.2020 mis à 'chiffre' plutôt que Phoneme._muet. ça se discute...
    
    } // automat

*/

export function AutomatFindPhons(_pw: PhonWord, _conf: Config) {
    
}

