import React, { useState, createContext, useContext, useEffect, useRef, useLayoutEffect } from 'react'
import DialogueBox, { IDialogue } from '../components/ui/dialoguebox';
import { rejects } from 'assert';

const dialogueContext = createContext({});

interface IDialogueService {
    onConfimSelect: () => Promise<any>
    OnDeclineSelect: () => Promise<any>
    setDialogData: (data: IDialogue | null) => void
}

interface IDialogueParam {
    children: React.ReactNode,

}

function Dailogueserviceprovider(params: IDialogueParam) {
    const { children } = params
    const [dialogeProps, setDialogeProps] = useState<IDialogue | null>(null)
    const [diaLogPromise, setDialogPromise] = useState<Promise<any> | null>(null)

    const onConfimSelect = () => {
        return new Promise((resolve, reject) => {
            const btnOK: HTMLButtonElement | null = document.querySelector("#dialog_confirm")
            if (btnOK != null) {
                btnOK?.addEventListener('click', () => {
                    resolve("dialogeConfirmed")
                })
            } else {
                reject("dialoge not confirmed")
            }
        })
    }
    const OnDeclineSelect = () => {
        return new Promise((resolve, reject) => {
            const btnOK: HTMLButtonElement | null = document.querySelector("#dialog_cancel")
            if (btnOK != null) {
                btnOK?.addEventListener('click', () => {
                    resolve("dialogeConfimed")
                })
            } else {
                reject("dialoge not confirmed")
            }
        })
    }

    const setDialogData = (dt: IDialogue | null) => {
        setDialogeProps(dt)
    }

    const values: IDialogueService = {
        setDialogData: setDialogData,
        OnDeclineSelect: OnDeclineSelect,
        onConfimSelect: onConfimSelect,
    }
    return <dialogueContext.Provider value={values}>
        {/* <DialogueBox {(dialogeProps != null) ? { ...dialogeProps } : null} /> */}
        {children}
    </dialogueContext.Provider>

}


export function dialogService(): IDialogueService {
    if (dialogueContext.Provider == null) throw ("Unable to start Dialogue Service");
    return useContext(dialogueContext) as IDialogueService
}