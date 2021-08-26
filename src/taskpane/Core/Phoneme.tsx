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

 export enum Phoneme
 {
     firstPhon,

     // Voyelles
     /// <summary>1 --> 'a'  bat, plat -> A | A de X-Sampa</summary>
     a, 
     /// <summary>2 le e de je, te, me, le , se... --> schwa '°', le e de abordera, schwa élidable | @ de X-Sampa</summary>
     q, 
     /// <summary>3 e final p. ex de correctes --> schwa '°', le e de abordera, schwa élidable | @ de X-Sampa</summary>
     q_caduc,
     /// <summary>4 --> 'i'  lit, émis -> I</summary>
     i, 
     /// <summary>5 sot, coefficient, automne --> 'O' éloge, fort --> o ouvert</summary>
     o,
     /// <summary>6 eau, au, --> 'o' peau --> o fermé</summary>
     o_comp,
     /// <summary>7 ou --> 'u' roue --> Ou</summary>
     u,
     /// <summary>8 u --> 'y' lu --> U</summary>
     y,
     /// <summary>9 é --> 'e' été --> e-fermé</summary>
     e,
     /// <summary>10 è --> 'E' paire, treize --> e-ouvert</summary>
     E,
     /// <summary>11 è --> 'E' paire, treize --> e-ouvert</summary>
     E_comp,
     /// <summary>12 é --> 'e' clef, nez --> e-fermé</summary>
     e_comp,
     /// <summary>13 in --> cinq  '5', cinq, linge --> in (voy. nasale) | e~ de X-Sampa</summary>
     e_tilda,
     /// <summary>14 an --> an '@', ange --> an (voy. nasale) | a~ de X-Sampa</summary>
     a_tilda,
     /// <summary>15 on --> on '§', on, savon --> on (voy. nasale) | o~ de X-Sampa</summary>
     o_tilda,
     /// <summary>16 un --> un '1', un, parfum --> un (voy. nasale) | 9~ de X-Sampa</summary>
     x_tilda,
     /// <summary>17 eu --> deux '2', deux, oeuf nous renonçons à distinguer x2 et x9</summary>
     x2,
                  // x9,      // oeil, oeuf --> neuf  '9', oeuf, peur --> e-ouvert Nous renonçons à distinguer x2 et x9
     /// <summary>18 Spécialement introduit pour identifier des deux lettres qui donnent --> 'wa'</summary>
     oi,
     /// <summary>19 oin de poing, oint --> 'w5'</summary>
     w_e_tilda,  
                  // w_E_comp,   // oue de ouest, oued --> 'wE' Le cas particulier crée plus de confusion qu'il n'aide
                  // w_i,        // oui, kiwi --> 'wi' Nous renonçons à ce cas particulier. kiwi donnera 'kiwi' en phonétique :-)

     // Semi-voyelles
     /// <summary>20 kiwi, sanwich, steward  --> 'w' pour le lexique.</summary>
     w,
     /// <summary>21 paille, ail, thaï, païen --> 'j' yeux, paille --> y (semi-voyelle)</summary>
     j,
     /// <summary>22 ng en fin de mot, prononcé à l'anglaise (string) --> 'iG'</summary>
     J,
     /// <summary>23 le son [ij] de affrioler -->´'ij'</summary>
     i_j,
     /// <summary>24 gn --> 'N' agneau, vigne --> gn (c. nasale palatine)  | J de X-Sampa</summary>
     N,

     // Consonnes
     /// <summary>25 p --> 'p' père, soupe --> p (occlusive)</summary>
     p,
     /// <summary>26 b --> 'b' bon, robe --> b (occlusive)</summary>
     b,
     /// <summary>27 t --> 't' terre, vite --> t (occlusive)</summary>
     t,
     /// <summary>28 d --> 'd' dans aide --> d (occlusive)</summary>
     d,
     /// <summary>29 k --> 'k' carré, laque --> k (occlusive)</summary>
     k,
     /// <summary>30 g --> 'g' gare, bague --> g (occlusive)</summary>
     g,
     /// <summary>31 f --> 'f' feu, neuf --> f (fricative)</summary>
     f,
     /// <summary>32 v --> 'v' vous, rêve --> v (fricative)</summary>
     v,
     /// <summary>33 s --> 's' sale, dessous --> s (fricative)</summary>
     s,
     /// <summary>34 z --> 'z' zéro, maison --> z (fricative)</summary>
     z,
     /// <summary>35 ch --> 'S' chat, tâche --> ch (fricative)</summary>
     S,
     /// <summary>36 j --> 'Z' gilet, mijoter --> ge (fricative)</summary>
     Z,
     /// <summary>37 m --> 'm' main, ferme --> m (cons. nasale)</summary>
     m,
     /// <summary>38 n --> 'n' nous, tonne --> n (cons. nasale</summary>
     n,
     /// <summary>39 l --> 'l' lent, sol --> l (liquide)</summary>
     l,
     /// <summary>40 R --> 'R' rue, venir --> R</summary>
     R,
     /// <summary>41 ph de philosophie --> 'f'</summary>
     f_ph,
     /// <summary>42 qu de quel --> 'k'</summary>
     k_qu,
     /// <summary>43 g de gueule ou de guignol --> 'g'</summary>
     g_u,
     /// <summary>44 son s dans ceci --> 's'</summary>
     s_c,
     /// <summary>45 son s dans partition --> 's'</summary>
     s_t,
     /// <summary>46 sons s dans six, dix --> 's'</summary>
     s_x,
     /// <summary>47 s se prononce z raser --> 'z'</summary>
     z_s,
     /// <summary>48 son x de rixe --> 'ks'</summary>
     ks,
     /// <summary>49 son x de examiner, exact --> 'gz'</summary>
     gz,

     /// <summary>50 nt ou ent des verbes conjugués --> muet ""</summary>
     verb_3p,
     /// <summary>51 --> muet ""</summary>
     _muet,

     // o_ouvert,
     // O,       // Marie-Pierre a renoncé à l'analyse o ouvert / fermé. Nous nous contentons de son travail.
     // z_g, ex z^, remplacé par Z
     // w5,  ???

     // créons des réserves pour assurer la compatibilité des fichiers de sauvegarde futurs, si nous introduisons de 
     // nouveaux phonèmes. Comme nous créons des tableaux qui ont cette longueur, ça pourrait poser des problèmes,
     // si les tableaux n'ont pas la même dimension.
     // Les tests semblent prouver que la taille de cet enum n'a pas d'impact sur la compatibilité des sauvegardes...
     // comme ça ne mange presque pas de pain, gardons-les quand même.

     /// <summary>52 utilisé dans la version CERAS des règles pour "ill" et "il" correspond au son 'j'</summary>
     j_ill,
     /// <summary>53 utilisé dans la version CERAS des règles pour "ill" (et "il") correspond au son 'ij'</summary>
     i_j_ill,
     /// <summary>54 le son [j] quand il est produit par la lettre i seule devant une voyelle. 
     /// --> 'j'</summary>
     ji,
     /// <summary>55 pour les chiffres 0 .. 9 qui ne correspondent pas aux autres critères</summary>
     chiffre,
     /// <summary>56 pour les chiffres, quand ils sont en position d'unité dans un nombre</summary>
     unité,
     /// <summary>57 pour les chiffres, quand ils sont en position de dizaine dans un nombre</summary>
     dizaine,
     /// <summary>58 pour les chiffres, quand ils sont en position de centaine dans un nombre</summary>
     centaine,
     /// <summary>59 pour les chiffres, quand ils sont en position de milliers dans un nombre</summary>
     milliers,

     /// <summary>used to iterate through all values. We could avoid this by using a Dictionary, 
     /// but the advantage seems limited...</summary>
     lastPhon
 }