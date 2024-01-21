"use client"
import React, { useEffect } from 'react'
import IconifyIcon from 'app/app/components/ui/iconsbutton'
import Datepicker from 'app/app/components/form-components/datepicker'
import Selectoption from 'app/app/components/form-components/selectoption'
import Vr from 'app/app/components/ui/vr'
import { ExtendedFilterTypes, filterParamTypes } from '../tabletypedefs'
import { FilterCompsPropsTuple } from '../tabletypedefs'
import { getQueryParamValue, extractQueryParams } from 'app/app/lib/utils'
import { resetTableData } from '../../datatable'
const OptionsHasComponent: Record<ExtendedFilterTypes, React.JSX.Element | React.FC<any>> = {
  "DateFilter": Datepicker,
  "SelectFilter": Selectoption
}

function RenderFilterComponent({ filterType, params }: { filterType: ExtendedFilterTypes, params: FilterCompsPropsTuple }): React.JSX.Element | null {
  const FilterComponent = OptionsHasComponent[filterType];

  if (FilterComponent) {
    return <FilterComponent {...params} />;
  }

  return null;
}

function index({ filters, path, handleUrlQuery }: { filters: filterParamTypes[], handleUrlQuery: (accessor: string, value: string) => void, path: string | undefined }) {

  function getActiveFilters(): string[] {
    let activeFilters: string[] = []
    let params: Record<string, string> | undefined = extractQueryParams(path!);
    if (params !== undefined) {
      Object.entries(params).forEach(([key, value]) => {
        filters.forEach(filter => {
          if (filter.accessor.includes(key)) {
            activeFilters = [...activeFilters, key]
          }
        })
      })
    }
    return activeFilters;
  }



  return (
    <div className=' min-w-full px-4'>
      <div className=' rounded-md border h-max border-gray-300 w-full flex items-center'>
        <nav className=' min-h-full px-3 flex items-center justify-center'>
          <IconifyIcon className={`text-gray-500 ${!!getActiveFilters().length && 'bg-green-100 text-green-500'}`} icon='mi:filter' />
        </nav>
        <Vr className='' />
        <nav className='min-h-full px-3 flex items-center whitespace-nowrap justify-center'>
          Filter By
        </nav>
        <Vr className='' />
        {
          filters!.map(({ filterType, accessor, args }, i) => {
            return <div key={i} className='h-full p-1 py-2 flex items-center justify-center'>
              <RenderFilterComponent
                filterType={filterType}
                params={{
                  ...args,
                  ...{ value: path && (getQueryParamValue(path, accessor) ?? "") },
                  ...(filterType === 'DateFilter' ? { onChange: (v) => handleUrlQuery(accessor, v!) } : {}),
                  ...(filterType === 'SelectFilter' ? { onValueChange: (v) => handleUrlQuery(accessor, v!) } : {}),
                }}
              />
              <Vr className=' mx-2' />
            </div>
          })
        }
        <button onClick={() => resetTableData()} className=' text-sm flex min-h-full items-center gap-2 py-1 px-3 text-red-500 border border-gray-300 bg-red-100/35 rounded-md'>
          <IconifyIcon className=' bg-transparent' icon='system-uicons:reset-forward' />
          <span className=' hidden md:block whitespace-nowrap'>
            Reset Table
          </span>
        </button>
      </div>
    </div>
  )
}

export default index