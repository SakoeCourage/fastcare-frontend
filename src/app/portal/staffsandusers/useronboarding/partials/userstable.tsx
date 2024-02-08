"use client"
import React, { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { userDTO } from 'app/app/types/entitiesDTO'
import Modal from 'app/app/components/ui/modal'
import Newuserform from './newuserform'
import DataTable from 'app/app/components/datatable/datatable'
import IconifyIcon from 'app/app/components/ui/IconifyIcon'
import { resetTableData } from 'app/app/components/datatable/datatable'
import { dateReformat } from 'app/app/lib/utils'
import Tooltip from 'app/app/components/ui/tooltip'
import Moretableoptions from 'app/app/components/datatable/moretableoptions'
import Api from 'app/app/fetch/axiosInstance'
import { toastnotify } from 'app/app/providers/Toastserviceprovider'
import { DialogService } from 'app/app/providers/Dailogueserviceprovider'

function Userstable() {
    const { setDialogData } = DialogService()
    const [showNewUserForm, setShowNewUserForm] = useState<userDTO | null>(null)


    const handleOnUserAccountResetAction = (id: number) => {
        setDialogData({
            open: true,
            title: "Reset User Password?",
            promptText: "User password will be reset to default i.e users First Name",
            okText: "Continue",
            cancelText: "Cancel"
        })
            .onDialogConfirm(() => {
                Api.patch('/users/reset-password/' + id)
                    .then(res => {
                        toastnotify("User Passwor Reset To Default", "Success")
                        resetTableData();
                    }).catch(err => {
                        toastnotify("Failed To Reset Password")
                    })
            })
            .onDialogDecline(() => {
            })

    }
    const handleOnUserDisableAction = (id: number) => {
        setDialogData({
            open: true,
            title: "Disable User Account?",
            promptText: "User will not be able to access system resources",
            okText: "Continue",
            cancelText: "Cancel",
            variant: "Danger"
        })
            .onDialogConfirm(() => {
                Api.patch('/users/disable-user/' + id)
                    .then(res => {
                        toastnotify("User Account Is Disabled", "Success")
                        resetTableData();
                    }).catch(err => {
                        toastnotify("Failed Disable User Account")
                    })
            })
            .onDialogDecline(() => {
            })

    }
    const handleOnUserEnableAction = (id: number) => {
        setDialogData({
            open: true,
            title: "Enable User Account?",
            promptText: "User will be able to access system resources",
            okText: "Continue",
            variant: "Danger",
            cancelText: "Cancel"
        })
            .onDialogConfirm(() => {
                Api.patch('/users/enable-user/' + id)
                    .then(res => {
                        resetTableData();
                        toastnotify("User Account Enabled", "Success")
                    }).catch(err => {
                        toastnotify("Failed To Enable User Account ")
                    })
            })
            .onDialogDecline(() => {
            })

    }

    const columns: ColumnDef<userDTO>[] = [
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => dateReformat(row.original.createdAt)
        },
        {
            accessorKey: "username",
            header: "User Name"
        },
        {
            accessorKey: "",
            header: "Action",
            cell: ({ row }) => <Moretableoptions
                options={[
                    {
                        optionName: "Edit User",
                        onOptionSelected: () => setShowNewUserForm(row.original),
                        icon: "basil:edit-alt-solid"
                    },
                    {
                        optionName: "Reset User Password",
                        onOptionSelected: () => handleOnUserAccountResetAction(row.original.id),
                        icon: "material-symbols:device-reset-rounded"
                    },
                    {
                        optionName: row.original.active ? "Disable Account" : "Enable Account",
                        onOptionSelected: () => row.original.active ? handleOnUserDisableAction(row.original.id) : handleOnUserEnableAction(row.original.id),
                        icon: "tabler:lock-x",
                        theme: row.original.active ? "danger" : "neutral"
                    },
                ]}
            />
        }
    ]
    return (
        <div>
            <Modal size='xl' open={showNewUserForm !== null} title='New User Onboarding' closeModal={() => setShowNewUserForm(null)} >
                <Newuserform
                    formData={showNewUserForm}
                    onCancel={() => setShowNewUserForm(null)}
                    onNewDataSucess={() => { resetTableData(); setShowNewUserForm(null) }}
                />
            </Modal>
            <DataTable
                dataSourceUrl='/users?pageSize=10&page=1&sort=createAt_desc'
                filterable="username"
                filterablePlaceholder='Search username'
                onAction={() => setShowNewUserForm({} as userDTO)} columns={columns} actionName='Onboard New User'
                sortableColumns={[
                    {
                        column: "createdAt",
                        accessor: "sort",
                        options: [
                            {
                                key: "Ascending",
                                value: "createdAt_asc"
                            },
                            {
                                key: "Descending",
                                value: "createdAt_desc"
                            }
                        ]
                    },

                ]}
            />
        </div>
    )
}

export default Userstable