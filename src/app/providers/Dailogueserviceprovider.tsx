import React, { useState, createContext, useContext, useEffect, useRef, useLayoutEffect } from 'react'
import DialogueBox, { IDialogue } from '../components/ui/dialoguebox';
import { rejects } from 'assert';

const dialogueContext = createContext({});

type dialogConfirmed = (callback: () => void) => { onDialogDecline: dialogDeclined; };
type dialogDeclined = (callback: () => void) => { onDialogConfirm: dialogConfirmed; };

interface dialogeReponse {
    onDialogConfirm: dialogConfirmed;
    onDialogDecline: dialogDeclined;
}

interface IDialogueService {
    setDialogData: (data: IDialogue | null) => dialogeReponse;
}


interface IDialogueParam {
    children: React.ReactNode,

}

export function Dailogueserviceprovider(params: IDialogueParam) {
    const { children } = params
    const [dialogProps, setDialogProps] = useState<IDialogue | null>(null)

    const setDialogData = (dt: IDialogue | null) => {
        const onDialogConfirm = (callback: () => void) => {
            console.log("onDialogConfirm")
            dt && setDialogProps({
                ...dt, onConfirm: () => {
                    callback && callback()
                    setDialogProps(null)
                }
            })
            return { onDialogDecline }
        };

        const onDialogDecline = (callback: () => void) => {
            dt && setDialogProps((cv) => cv && ({
                ...cv, onCancel: () => {
                    callback && callback()
                    setDialogProps(null)
                }
            }));
            return { onDialogConfirm }
        };

        return { onDialogConfirm, onDialogDecline }
    }

    const values: IDialogueService = {
        setDialogData: setDialogData
    }


    return <dialogueContext.Provider value={values}>
        <DialogueBox {...(dialogProps !== null ? { ...dialogProps } : {
            open: false,
            onCancel: () => void (0),
            onConfirm: () => void (0)
        })} />
        {children}
    </dialogueContext.Provider>

}


export function dialogService(): IDialogueService {
    if (dialogueContext.Provider == null) throw ("Unable to start Dialogue Service");
    return useContext(dialogueContext) as IDialogueService
}



interface ISystemDialog {
    title: string,
    promptText: string,
    onDialogConfirm?: () => void,
    onDialogDecline?: () => void,
}

// doesnt work
export function SystemDialog(params: ISystemDialog) {
    const { title, promptText, onDialogConfirm, onDialogDecline } = params
    const { setDialogData } = dialogService();

    React.useEffect(() => {
        setDialogData({
            open: true,
            title: title,
            promptText: promptText,
            onConfirm: () => {
                onDialogConfirm && onDialogConfirm();
                setDialogData(null)
            },
            onCancel: () => {
                onDialogDecline && onDialogDecline();
                setDialogData(null)
            },
        });
    }, []);


}