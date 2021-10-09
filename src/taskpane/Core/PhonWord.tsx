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
import { SylMode } from "../Configs/SylConfig";
import { EstConsonne, EstVoyelle } from "../Configs/Utils";
import AutomatFindPhons from "./AutomAutomat";
import { Phoneme } from "./Phoneme";
import PhonInW from "./PhonInW";
import SylInW from "./SylInW";
import TheText from "./TheText";
import TheWord from "./TheWord";

enum ComportementMotSuivant { voyelle, consonne, fin, undef }

const disjonctions = ["onze", "oui", "uhlan", "ululement", "iodler", "jodler", "ionesco", 
        "ouagadougou", "jahvé"];

    // Remqrque: "un" on dit le un quand il s'agit du chiffre, mais l'un et l'autre... Impossible
    // de distinguer sans connaître le sens. Donc on choisit l'article et le pronom qui 
    // sont quand même plus fréquents et qui se comportent comme une voyelle.

const liaisons = ["yeux", "yeuse", "ypérite", "yèble", "york", "yourcenar", "y"];

const hAspire = ["hâblerie", "hâbleur", "hableuse", "hachage", "hache", "haché", "hachée",
    "hachement", "hacher", "hachette", "hacheur",
    "hachis", "hachisch", "hachoir", "hachure", "hachurer", "hackle", "hadal",
    "hadale", "hadaux", "haddock", "haflinger", "hafnium", "hagard", "haggis", "haie",
    "haillon", "haillonneux", "haillonneuse", "haine", "haineusement", "haineux", "haineuse",
    "haïr", "haire", "haïssable", "haïti", "haïtien", "haïtienne", "halage", "hâlage", "halal", 
    "halbi", "halbran", "halbrené", "halbrenée", "halde", "hâle", "hâlé", 
    "hâlée", "hale", "halefis", "haler", "hâler", "haletant", "halètement", "haleter", 
    "haleur", "haleuse", "half", "hall", "halle", "hallebarde", "halo", "hallux", "halte", 
    "hamac", "hamada", "hamburger", "hameau", "hamman", "hampe", "hamster", "hanche", 
    "hanchement", "hancher", "hand", "handballeur", "handballeuse", "handicap", "handicapant",
    "handicapante", "handicapé", "handicapée", "handicaper", "handicapeur", "handisport", 
    "hangar", "hanneton", "hanon", "hanse", "hanter", "hantise", "happement", "happening", 
    "happer", "happy", "haque", "haquenée", "haquet", "hara", "harangue", "haranguer", 
    "harangueur", "harangueuse", "haras", "harassant", "harassante", "harassé", "harassée",
    "harassement", "harasser", "harcelant", "harcelante", "harcèlement", "harceler",
    "hard", "harde", "hardé", "harder", "hardes", "hardi", "hardie",
    "hardiesse", "hardiment", "hardware", "harelde", "harem", "hareng", "harengade",
    "harengaison", "harengère", "harenguet", "harengueux", "harenguier", "harenguière",
    "haret", "harfang", "hargne", "hargneusement", "hargneux", "hargneuse", "haricot",
    "haridelle", "harissa", "harka", "harki", "harle", "harnachement", "harnacher", "harnais",
    "harnat", "harnois", "haro", "harouelle", "harpail", "harpaye", "harpe", "harpette",
    "harpie", "harpiste", "harpocéras", "harpodon", "harpoise", "harpon", "harponnage",
    "harponnement", "harponner", "harponneur", "harpye", "harrier", "hart", "hasard",
    "hasarder", "hasardeusement", "hasardeux", "hasardeuse", "has", "hasch", "haschisch",
    "hase", "hâte", "hâter", "hatha", "hâtier", "hâtif", "hâtive", "hattéria", "hauban",
    "haubanage", "haubaner", "haubert", "hausse", "haussement", "hausser", "haussier",
    "haussière", "haut", "haute", "hautain", "hautaine", "hautbois", "hautboïste",
    "hautement", "hauteur", "hautin", "hauturier", "hauturière", "havage", "havane", "hâve",
    "havée", "haveneau", "havenet", "haver", "haveur", "haveuse", "havre", "havresac",
    "havrit", "haylage", "hayon", "hé", "heat", "heaume", "hein", "héler", "hem", "henné",
    "hennin", "hennir", "hennissant", "hennissante", "hennissement", "hennuyer", "hep", 
    "héraut", "hère", "hérissé", "hérissée", "hérissement", "hérisser", "hérisson",
    "hérissonne", "herniaire", "hernie", "hernié", "herniée", "hernieux", "hernieuse",
    "héron", "héronneau", "héronnier", "héronnière", "héros", "hersage",
    "herse", "herser", "hersillon", "hêtraie", "hêtre", "heu", "heurt", "heurter", "heurtoir",
    "hibou", "hic", "hickory", "hideur", "hideusement", "hideux", "hideuse", "hiement",
    "hiérarchie", "hiérarchique", "hiérarchiquement", "hiérarchisation", "hiérarchiser",
    "hiérarque", "hi", "high", "hilaire", "hile", "hindi", "hip", "hippie", "hippy", "hidjab",
    "hissage", "hit", "ho", "hobby", "hobbyste", "hobereau", "hochement", "hochepot", 
    "hochequeue", "hocher", "hochet", "hockey", "hockeyeur", "hockeyeuse", "holding",
    "holà", "hold", "hollandite", "hollywoodien", "hollywoodienne", "homard", 
    "homarderie", "homardier", "home", "hongre", "hongrer", "hongreur", "hongreuse", 
    "honduras", "hondurien", "hondurienne", "hongrie", "hongrois", "hongroise", "hongroises",
    "hongroierie", "hongroyage", "hongroyer", "hongroyeur", "honning", "honnir", "honoris",
    "honte", "honteusement", "honteux", "honteuse", "hooligan", "hooliganisme", "hop",
    "hoquet", "hoqueter", "hoqueton", "horde", "horion", "hormis", "hornblende", "hors",
    "horsain", "horsin", "horse", "horst", "hot", "hotdog", "hotinus", "hotte", "hottée",
    "hotu", "hou", "houache", "houaiche", "houage", "houblon", "houe", "houer", "houille",
    "houiller", "houillère", "houle", "houlette", "houleux", "houleuse",
    "houligan", "houliganisme", "houlque", "houp", "houppe",
    "houppelande", "houppette", "houppier", "hourd", "hourdage", "hourder", "hourdir",
    "hourdis", "houri", "hourque", "hourra", "hourri", "hourrite", "hourvari", "housche",
    "houseau", "house", "houspiller", "houssage", "housse", "housser", "housset",
    "houssière", "houst", "houx", "hovéa", "hoyau", "hoyé", "hoyée", "huard", "huart",
    "hublot", "huche", "hucher", "huchier", "hue", "huée", "huer", "huerta", "huguenot", 
    "huipil", "huir", "huis", "huit", "huitain", "huitaine", "huitante", "huitième", 
    "huitièmement", "hulotte", "hululation", "hululement", "hululer", "hum", "humantin", 
    "humer", "hune", "hunier", "hunter", "huppe", "huppé", "huppée", "huque", "hurdler", 
    "hure", "hurlant", "hurlement", "hurler", "hurleur", "hurleuse", "huron", "huronne", 
    "hurrah", "hurricane", "husky", "hussard", "hussarde", "hutinet", "hutte", "hutteau",
    "hyène"]

export default class PhonWord extends TheWord {
    private phons: PhonInW[];
    private syls: SylInW[];
    private theConf: Config;

    constructor (tt: TheText, inFirst: number, inLast: number, conf: Config) {
        super(tt, inFirst, inLast);
        this.theConf = conf;
        this.phons = new Array<PhonInW>();
        this.syls = undefined;
        AutomatFindPhons(this, this.theConf);
    }

    /**
     * Ajoute le PhonInW à la liste des PhonInW pour le mot.
     * @param piw Le PhonInW à ajouter
     */
    public AddPhon(piw: PhonInW) {
        this.phons.push(piw);
    }

    /**
     * Applique le formattage de phonèmes défini par conf aux phonèmes du PhonWord.
     * Ajoute les FormattedTextEl nécessaires au TheText auquel le PhonWord est attaché.
     * @param conf La Config indiquant les formattages à utiliser.
     */
    public ColorPhons (conf: Config) {
        for (let piw of this.phons) {
            piw.PutColor(conf);
        }
    }

    /**
     * Colorise les syllabes dans le PhonWord, en utilisant la Config indiquée.
     * @param conf La Config (en particulier conf.sylConf) utilisée pour la colorisation.
     */
    public ColorizeSyls(conf: Config)
    {
        if (this.syls != undefined)
        {
            // Mettre les syllabes en couleur
            for (let s of this.syls)
                s.PutColor(conf);

            // s'il le faut, marquer, par-dessus, les phonemes muets.
            if (conf.sylConf.marquerMuettes) {
                for (let piw of this.phons) {
                    if (piw.EstMuet())
                        piw.PutColor(conf);
                }
            } 
        }
        else
        {
            throw new Error("ColorizeSyls called when syls is undefined.")
        }
    }

    /**
     * Retourne une représentation phonétique lexique.org du mot.
     * S'appelle "Phonetique()" dans la version VSTO
     */
    public ToPhonString() : string {
        let toReturn = "";
        for (let piw of this.phons) {
            toReturn = toReturn + piw.PhonToString();
        }
        return toReturn;
    }

    public ComputeSyls(forceDierese = false)
    {
        let siw: SylInW;
        let i : number, j : number;
        let sylConfig = this.theConf.sylConf;

        // Algorithme de Marie-Pierre
        this.syls = new Array<SylInW>();

        // créons une syllabe pour chaque phonème
        for (i = 0; i < this.phons.length; i++)
            this.syls.push(SylInW.GetSylInW(this.phons[i]));

        if (this.syls.length > 1)
        {
            // Si le décodage est standard dupliquer les phonèmes qui comportent des consonnes doubles
            if (sylConfig.doubleConsStd)
            {
                for (i = 0; i < this.syls.length; i++)
                {
                    if (this.syls[i].EstConsonneRedoublee())
                    {
                        siw = SylInW.GetSylInW(this.syls[i]);
                        this.syls[i].ReduitADerniereLettre();
                        siw.ReduitAPremiereLettre();
                        this.syls.splice(i, 0, siw); // syls.Insert(i, siw);
                    }
                }
            }

            // Il y a une série de cas spéciaux où deux sons ne forment qu'une syllabe
            // par exemple [bkptgdfv][lR] ou [y][i] ou [u]([i]|[e_tilda]|[o_tilda])
            // (la notation est un peu libre :-)
            for (i = 0; i < this.syls.length - 1; i++)
            {
                if (this.FusionnerSyllabes(this.syls, i, i + 1, forceDierese))
                {
                    // mixer les deux phonèmes puis raccourcir la chaîne
                    this.syls[i].AbsorbeSuivant(this.syls[i + 1]);
                    this.syls.splice(i + 1, 1); // this.syls.RemoveAt(i + 1);
                    i--; // faire en sorte que la prochaine itération considère le nouveau
                         // phonème fusionné et son successeur
                }
            }

            // construire les syllabes par association de phonèmes consonnes et voyelles
            // Les syllabes sont constituées de tout ce qui précède un phonème voyelle 
            // jusqu'à la syllabe précédente ou le début du mot.
            // De plus si le phonème voyelle est suivi de deux consonnes, la première fait
            // partie de la première syllabe.

            i = 0;
            j = 0; // début de la syllabe
            while (i < this.syls.length)
            {
                if(this.syls[i].EstVoyelle(forceDierese))
                {
                    // fusionner les syllabes de j à i
                    for (let k = 0; k<(i-j); k++)
                    {
                        this.syls[j].AbsorbeSuivant(this.syls[j + 1]);
                        this.syls.splice(j + 1, 1); // syls.RemoveAt(j + 1);
                    }
                    i = j;
                    j++;

                    // si les deux lettres qui suivent sont des consonnes, la première fait partie de la syllabe que nous venons de créer
                    // A condition qu'elles ne soient pas toutes les deux dans la même syllabe.
                    if (j < this.syls.length)
                    {
                        let pos = this.syls[j].first; // position de la lettre suivante dans le texte sous-jacent
                        if (this.syls[j].last === this.syls[j].first 
                            && pos < this.last 
                            && EstConsonne(this.GetChar(pos)) 
                            && EstConsonne(this.GetChar(pos+1))) 
                        {
                            this.syls[j - 1].EtendDroite(1);
                            if (!this.syls[j].ReduitGauche(1))
                                this.syls.splice(j, 1); // syls.RemoveAt(j);
                        }
                    }
                }
                i++;
            } // while

            // précaution de base : si pas de syllabes reconnues, on concatène simplement les phonèmes
            if (j === 0)
            {
                // le mot ne comprend pas de voyelles --> une seule syllabe
                this.syls = new Array<SylInW>();
                siw = new SylInW(this, 0, this.last - this.first, Phoneme.firstPhon);
                this.syls.push(siw);
            } 
            else 
            {
                // il ne doit rester à la fin que les lettres muettes ou des consonnes qu'on ajoute
                // à la dernière syllabe
                while (j < this.syls.length)
                {
                    this.syls[j-1].AbsorbeSuivant(this.syls[j]);
                    this.syls.splice(j, 1); // syls.RemoveAt(j);
                    j++;
                }
            }

            // ###############################################################################
            // # Traitement spécial de de la dernière syllabe dans les modes oral et poésie. #
            // ###############################################################################

            if ((this.syls.length > 1) && (this.syls[this.syls.length - 1].p === Phoneme.q_caduc)) 
            {
                // s'il y a plus d'une syllabe, il y a aussi plus d'un phonème
                if (sylConfig.sylMode === SylMode.oral)
                {
                    // si nous sommes en mode oral, les e caducs des dernières syllabes
                    // doivent être concaténés avec la syllabe précédente
                    this.syls[this.syls.length - 2].AbsorbeSuivant(this.syls[this.syls.length - 1]);
                    this.syls.splice(this.syls.length - 1, 1); // syls.RemoveAt(syls.Count - 1);
                }
                else if (sylConfig.sylMode === SylMode.poesie)
                {
                    // voir http://mamiehiou.over-blog.com/article-versification-comment-compter-les-pieds-syllabes-d-un-vers-97149081.html
                    // dont nous nous inspirons ici. Il faut toutefois noter que quand le 
                    // "e" ne compte pas pour un pied, nous le relions simplement avec la
                    // syllabe précédente, ce qui n'est pas tout à fait correct au niveau
                    // de la prononciation.

                    // En gros on peut dire que si le mot suivant commence par une voyelle
                    // (ou équivalent), le e-caduc ne se prononce pas, sauf s'il y a une laison.
                    // Si le mot suivant commence par une consonne (ou équivalent) le e-caduc
                    // se prononce.
                        
                    let txt = this.T.ToLowerString();
                    let wrd = this.ToLowerString();
                    let cms = ComportementMotSuivant.undef;

                    let startNextWord = this.last + 1;
                    // cherchons le début du prochain mot (ou la fin de ligne...)
                    while (startNextWord < txt.length 
                        && (txt[startNextWord] == ' ' 
                        || txt[startNextWord] == '\t'
                        || txt[startNextWord] == ',' // la virgule n'empêche pas l'influence du mot suivant.
                        || txt[startNextWord] == '!' // ça pourrait dépendre des situations...
                        || txt[startNextWord] == '?' // ça pourrait dépendre des situations...
                        || txt[startNextWord] == '.' // ça pourrait dépendre des situations...
                        || txt[startNextWord] == '"'
                        || txt[startNextWord] == '«'
                        || txt[startNextWord] == '»'
                        || txt[startNextWord] == '“'
                        || txt[startNextWord] == '”'
                        || txt[startNextWord] == '‘'
                        || txt[startNextWord] == '’'
                        || txt[startNextWord] == '-'
                        || txt[startNextWord] == '—'
                        || txt[startNextWord] == ';'
                        || txt[startNextWord] == ':' // ça pourrait dépendre des situations...
                        ))
                    {
                        startNextWord++;
                    }

                    // cherchons la fin du mot suivant
                    let endNextWord = startNextWord;
                    while (endNextWord < txt.length 
                        && (EstConsonne(txt[endNextWord]) || EstVoyelle(txt[endNextWord])))
                    {
                        endNextWord++;
                    }
                    // startNextWord est l'index du début du mot suivant. S'il y a des 
                    // lettres, endNextWord est celui de la lettre qui suit le mot.
                    // S'il n'y a pas de lettres, endNextWord == startNextWord
                    let nextWord : string = null;
                    if (endNextWord > startNextWord)
                    {
                        nextWord = txt.substring(startNextWord, endNextWord);
                    }

                    if (startNextWord < txt.length)
                    {
                        // il peut y avoir un mot suivant.
                        if (PhonWord.Disjonction(nextWord))
                        {
                            cms = ComportementMotSuivant.consonne;
                        }
                        else if (PhonWord.Liaison(nextWord))
                        {
                            cms = ComportementMotSuivant.voyelle;
                        }
                        else if (txt[startNextWord] == 'y')
                        {
                            // Le cas normal est que le y se comporte comme une consonne
                            // et le e-caduc forme une syllabe). Les exceptions sont 
                            // interceptées par "Liaison"
                            cms = ComportementMotSuivant.consonne;
                        }
                        else if (EstVoyelle(txt[startNextWord])) 
                        {
                            cms = ComportementMotSuivant.voyelle;
                        }
                        else if (txt[startNextWord] == 'h')
                        {
                            // Le 'h' mérite un dictionnaire à lui tout seul
                            if (PhonWord.HAspire(nextWord))
                            {
                                cms = ComportementMotSuivant.consonne;
                            }
                            else
                            {
                                // h muet
                                cms = ComportementMotSuivant.voyelle;
                            }
                        }
                        else if (EstConsonne(txt[startNextWord])) 
                        {
                            cms = ComportementMotSuivant.consonne;
                        }
                        else
                        {
                            // Il ne s'agit pas d'un lettre. Donc soit de la ponctuation,
                            // une fin de ligne ou autre chose... On traite ce cas comme
                            // une fin de vers.
                            cms = ComportementMotSuivant.fin;
                        }
                    }
                    else
                    {
                        // C'est la fin du texte.
                        cms = ComportementMotSuivant.fin;
                    }
                    switch (cms)
                    {
                        case ComportementMotSuivant.consonne:
                            // la syllabe est prononcée, on la laisse.
                            break;
                        case ComportementMotSuivant.voyelle:
                            if (wrd[wrd.length - 1] == 's' || wrd[wrd.length - 1] == 't')
                            {
                                // il y a une liaison, la syllabe se prononce.
                                // L'existence d'un eliaison est probablement plus compliquée
                                // à identifier (il y certainement une foule d'exceptions)
                                // :-) Commençons quand même comme ça...
                            }
                            else
                            {
                                // la syllabe ne se prononce pas.
                                this.syls[this.syls.length - 2].AbsorbeSuivant(this.syls[this.syls.length - 1]);
                                this.syls.splice(this.syls.length - 1, 1); // syls.RemoveAt(syls.Count - 1);
                            }
                            break;
                        case ComportementMotSuivant.fin:
                            // la syllabe ne se prononce pas.
                            this.syls[this.syls.length - 2].AbsorbeSuivant(this.syls[this.syls.length - 1]);
                            this.syls.splice(this.syls.length - 1, 1); // syls.RemoveAt(syls.Count - 1);
                            break;
                        default:
                            throw new Error ("ComportementMotSuivant non traité");
                            break;
                    }
                }
            }
        } // if (syls.Count > 1)
    }

    /**
     * Donne le nombre de syllabes dans le mot.
     * @returns le nombre de syllabes du mot.
     */
    public GetNbreSyllabes() : number
    {
        return this.syls.length;
    }

    /**
     * Vérifie si une syllabe et son successeur doivent être fusionnées. (voir explications plus
     * longues dans la version c#)
     * @param syls Liste des syllabes du mot, comme elles sont comprises au moment de l'appel de
     * la méthode.
     * @param sylIndex L'index dans syls de la syllabe.
     * @param succIndex L'index dans syls du successeur de la syllabe.
     * @param forceDierese indique si la diérèse doit être forcée. Dans ce cas, la méthode 
     * retourne false dans le cas où on aurait pu fusionner deux voyelles.
     * @returns true si les deux syllabes doivent être fusionnées, false dans le cas contraire.
     */
    private FusionnerSyllabes(syls: SylInW[], sylIndex: number, 
        succIndex: number, forceDierese: boolean) : boolean
    {
        let toReturn = false;
        let syl = syls[sylIndex];
        let succ = syls[succIndex];
        if (syl.EstBkptgdfv() && (succ.p == Phoneme.l || succ.p == Phoneme.R))  // [bkptgdfv][lR]
            toReturn = true;
        else if (syl.p == Phoneme.y && succ.p == Phoneme.i)  // ui
            toReturn = true;
        else if (syl.p == Phoneme.u)
        {
            if (succ.p == Phoneme.e_tilda || succ.p == Phoneme.o_tilda) // u(e_tilda|o_tilda)
            {
                toReturn = !forceDierese;
            }
            else if (succ.p == Phoneme.i && succ.ToLowerString() !== "ï") // ui
            {
                if (this.ToLowerString() == "oui")
                {
                    toReturn = true;
                }
                else if (!this.ToLowerString().startsWith("enfoui")
                    && !this.ToLowerString().startsWith("foui")
                    && !this.ToLowerString().startsWith("joui")
                    && !this.ToLowerString().startsWith("réjoui")
                    && !this.ToLowerString().startsWith("ébloui")
                    && !this.ToLowerString().startsWith("épanoui")
                    && !this.ToLowerString().startsWith("évanoui"))
                {
                    // pour les exceptions ci-dessus, pas de fusion.
                    toReturn = !forceDierese;
                }
            }
            else if (succ.p == Phoneme.a && !forceDierese && succ.last < this.last)
            {
                // Pas la fin du mot. Quelle est la lettre suivante?
                let nextC = succ.T.ToLowerString()[succ.last + 1];
                switch (nextC)
                {
                    case 'c':
                    case 'd':
                    case 'n':
                    case 'p':
                    case 'q':
                    case 't':
                        toReturn = true;
                        break;
                    default:
                        break;
                }
            }
        }
        else if (succ.EstMuet())
        {
            if (syl.EstConsonne() && succ.ToLowerString() == "h")
            {
                // Il faut parfois faire le césure de syllabes entre la consonne et le h
                // (bon-homme, mal-heur) et parfois il est correct de fusionner la consonne 
                // avec le h qui suit (sym-pa-thique).
                // Hypothèse: ça dépend de la consonne qui précède. Certaines repoussent le
                // h alors que d'autres l'attirent :-). C'est probablement un peu plus compliqué
                // mais essayons avec ça...

                // const AttireH = "bcdgkpqrtvwz";
                const RepousseH = "fjlmnsxç";

                // remarques: pour le s, on suppose que le son [S] est identifié par l'automate.
                // il reste donc des cas où s repousse h.

                toReturn = true;
                if (RepousseH.indexOf(succ.T.ToLowerString()[syl.last]) > -1)
                {
                    for (let i = succIndex + 1; i < syls.length; i++)
                    {
                        toReturn = toReturn && syls[i].EstMuet();
                    }
                }
            }
            else
            {
                toReturn = true;
            }
        }
        return toReturn;
    }

    /**
     * Analyse si le mot est une exception et se comporte comme s'il commençait par une
     * consonne en ce qui concerne les liaisons et la prononciation des syllabes
     * qui précèdent. Typiquement on aura un 'le' ou un 'la' devant au lieu d'un l'.
     * @param wrd Le mot à analyser en minuscules. Peut être null.
     * @returns true si le mot fait partie de la liste des exceptions (sans les h aspirés).
     */
    private static Disjonction(wrd : string) : boolean
    {
        let toReturn = false;
        if (wrd !== null && wrd !== "")
        {
            toReturn = disjonctions.includes(wrd);
            if (!toReturn && wrd[wrd.length - 1] === 's')
            {
                let sing = wrd.substring(0, wrd.length - 1);
                toReturn = disjonctions.includes(sing);
            }
        }
        return toReturn;
    }

    /**
     * Analyse si le mot est une exception et se comporte comme s'il commençait par une
     * voyelle en ce qui concerne les liaisons et la prononciation des syllabes
     * qui précèdent. Typiquement on aura un 'l'' devant au lieu d'un 'le' ou 'la'.
     * @param wrd Le mot à analyser en minuscules. Peut être null.
     * @returns true si le mot fait partie de la liste des exceptions.
     */
    private static Liaison(wrd : string) : boolean
    {
        let toReturn = false;
        if (wrd !== null && wrd !== "")
        {
            toReturn = liaisons.includes(wrd);
            if (!toReturn && wrd[wrd.length - 1] === 's')
            {
                let sing = wrd.substring(0, wrd.length - 1);
                toReturn = liaisons.includes(sing);
            }
        }
        return toReturn;
    }

    /**
     * Analyse si le mot comence par un h aspiré.
     * @param wrd Le mot à analyser en minuscules. Peut-être null.
     * @returns true si le mot commence par un h aspiré. false dans le cas contraire.
     */
    private static HAspire(wrd : string) : boolean
    {
        let toReturn = false;
        if (wrd !== null && wrd !== "")
        {
            toReturn = hAspire.includes(wrd);
            if (!toReturn && wrd[wrd.length - 1] === 's')
            {
                let sing = wrd.substring(0, wrd.length - 1);
                toReturn = hAspire.includes(sing);
            }
        }
        return toReturn;
    }

}