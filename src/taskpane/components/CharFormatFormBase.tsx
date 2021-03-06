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


import { useId } from '@fluentui/react-hooks';
import { FontWeights, getTheme, IconButton, mergeStyleSets, Modal, IIconProps, IColor, ColorPicker, IColorPickerStyles, ImageFit, IButtonStyles, Stack, IStackStyles, PrimaryButton, DefaultButton, IStackTokens, TextField, ITextFieldStyles, } from "@fluentui/react";
import * as React from "react";

export interface CharFormatFormBaseProps {
    
    // indique si le dialogue doit être affiché (true) ou caché (false)
    visible : boolean;

    // le titre de la fenêtre de dialogue
    titTxt: string;

    /** Indique si le dialogue doit éditer une lettre */
    editLet : boolean;

    /** La lettre à éditer. N'est présent que si editLet est true */
    let?: string;

    /** Call back pour le cas où la lettre à éditer a été modifiée. Seulement si editLet est true. */
    modifLet?: (c: string) => void;

    // Les détails du CharFormatting à éditer.
    bold: boolean;
    clickBold: () => void; // fonction "toggle" appelée quand le bouton est pressé

    italic: boolean;
    clickItalic : () => void; // fonction "toggle"

    underline: boolean;
    clickUnderline : () => void; // fonction "toggle"

    color: IColor;
    setColor: (c: IColor) => void; // fonction appelée quand la couleur change.

    // fonction appelée quand OK ou "Valider" est cliqué.
    valid: () => void;

    // fonction appelée quand le dialogue est annulé   
    cancel: () => void; 
        
}

const letFieldStyles: Partial<ITextFieldStyles> = { 
    field: { fontSize: 20, },
    root: {
        width: 35,
        margin: '-35px 0px 0px 170px', // top right bottom left
    }
};

const btnSize = 22;
const margin = 12;

const boldIcon: IIconProps = {
  imageProps: {
      imageFit: ImageFit.centerContain,
      width: btnSize,
      height: btnSize,
      src: "/assets/Bold_22.png"
  }
};

const italicIcon: IIconProps = {
  imageProps: {
      imageFit: ImageFit.centerContain,
      width: btnSize,
      height: btnSize,
      src: "/assets/Italic_22.png"
  }
};

const underlineIcon: IIconProps = {
  imageProps: {
      imageFit: ImageFit.centerContain,
      width: btnSize,
      height: btnSize,
      src: "/assets/Underscore_22.png"
  }
};

const withBorderIconButStyles: IButtonStyles = { 
  root: {height: btnSize + margin, width: btnSize + margin, border: "solid", borderWidth: 1, borderColor: "#A19F9D"},
  icon: {height: btnSize}
};

const noBorderIconButStyles: IButtonStyles = { 
  root: {height: btnSize + margin, width: btnSize + margin, border: "none"},
  icon: {height: btnSize}
};

const formatStackStyles: IStackStyles = {
  root: {
    marginTop: 5,
  },
};

const buttonsStackStyles: IStackStyles = {
  root: {
    marginTop: 15,
  },
};

const buttonsStackTokens: IStackTokens = { childrenGap: 40 };

const cancelIcon: IIconProps = { iconName: 'Cancel' };

export default function CharFormatFormBase(props:CharFormatFormBaseProps) {

    const updateColor = React.useCallback((_ev: any, colorObj: IColor) => props.setColor(colorObj), []);

    const titleId = useId('title');

    function UpdateLetter(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
        let c: string;
        if (newValue.length > 0)
            c = newValue[0];
        else
            c = "";
        props.modifLet(c);
    }
    
    return(
        <Modal
            isOpen= {props.visible}
            onDismiss= {props.cancel}
            isModeless= {false}
            containerClassName={contentStyles.container}
            // dragOptions={dragOptions}
            styles={modalStyles}
        >
            <div className={contentStyles.header}>
                <span id={titleId}>{props.titTxt} </span>
                <IconButton
                    styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={props.cancel}
                />
            </div>

            {props.editLet?
                <TextField
                    value={props.let}
                    onChange={UpdateLetter}
                    styles={letFieldStyles}
                /> : ""
            }
            
            <div className={contentStyles.body}>
              <ColorPicker
                color={props.color}
                onChange={updateColor}
                alphaType={"none"}
                showPreview={true}
                styles={colorPickerStyles}
                // The ColorPicker provides default English strings for visible text.
                // If your app is localized, you MUST provide the `strings` prop with localized strings.
                strings={{
                  red: "R",
                  green: "V",
                  blue: "B",
                }}
              />
            </div>

            <Stack horizontal horizontalAlign="center" styles={formatStackStyles}>
              <IconButton
                toggle
                checked={props.bold}
                iconProps={boldIcon}
                onClick={props.clickBold}
                styles= {props.bold?withBorderIconButStyles:noBorderIconButStyles}
              />
              <IconButton
                toggle
                checked={props.italic}
                iconProps={italicIcon}
                onClick={props.clickItalic}
                styles= {props.italic?withBorderIconButStyles:noBorderIconButStyles}
              />
              <IconButton
                toggle
                checked={props.underline}
                iconProps={underlineIcon}
                onClick={props.clickUnderline}
                styles= {props.underline?withBorderIconButStyles:noBorderIconButStyles}
              />
            </Stack>

            <Stack horizontal horizontalAlign="center" styles={buttonsStackStyles} tokens={buttonsStackTokens}>
              <PrimaryButton text="OK" onClick={props.valid} />
              <DefaultButton text="Annuler" onClick={props.cancel} />
            </Stack>


        </Modal>
    )
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
    },
    header: [
      theme.fonts.mediumPlus,
      {
        flex: '1 1 auto',
        borderTop: `4px solid ${theme.palette.themePrimary}`,
        color: theme.palette.neutralPrimary,
        display: 'flex',
        alignItems: 'center',
        fontWeight: FontWeights.semibold,
        padding: '0px 4px 4px 12px', // top right bottom left
      },
    ],
    body: {
      padding: '0 10px',
      overflowY: 'hidden',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
    buttons: {
      padding: '60',
      overflowY: 'hidden',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      margin: '30',
    },
});

const iconButtonStyles = {
    root: {
      color: theme.palette.neutralPrimary,
      marginLeft: 'auto',
      marginTop: '4px',
      marginRight: '2px',
    },
    rootHovered: {
      color: theme.palette.neutralDark,
    },
};

const modalStyles = {
    main: {
        minWidth: 150,
        maxWidth: 350,
        width: 300,
        minHeight: 100,
        height: 500,
    }
}

const colorPickerStyles: Partial<IColorPickerStyles> = {
  panel: { 
    padding: 12,
  },
  root: {
    maxWidth: 280,
    minWidth: 280,
  },
  colorRectangle: { height: 100 },
};

