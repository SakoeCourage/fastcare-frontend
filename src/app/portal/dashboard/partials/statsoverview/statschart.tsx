import React from 'react'
import ReactApexChart, { Props as apexProps } from 'react-apexcharts'
import dynamic from 'next/dynamic'
import { formatcurrency } from 'app/app/lib/utils';

const labels: string[] = ['Good Standing', 'Defaulters','Inactive', ]
const colors: string[] = ['#678AE2', '#9262C9', '#53CEC1']
const series: number[] = [400, 430, 448]

function statschart() {
    const state: apexProps = {
        series: [...series],
        
        options: {
            colors: [...colors],
            labels: [...labels],
            legend: {
                show: false,
                position: "bottom",
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (val, opts) => formatcurrency(val)
                }
            },
            dataLabels: {
                enabled: false,
            },
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: "100%"
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],

        },
     
        dataLabels: {
            enabled: false
        },


    }

    const getPercentageOf = (i: number) => {
        const numerator = series[i]
        const total = series.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return Math.round(((numerator / total) * 100)) + "%"
    }

    return (
        <div className='w-full lg:col-span-2 flex flex-col shadow-c-md h-max rounded-md ' id='chart'>
            <nav className=' text-sm text-gray-600 py-3 border-b font-semibold px-2'>Subscription Distribution <span className='text-gray-400'>%</span></nav>
            <div className='flex bar-chart'>
                <ReactApexChart
                    className="w-max p-5 basis-[60%]"
                    options={state.options}
                    series={state.series} type="donut"
                    height={200}
                />
                <nav className='flex flex-col my-auto'>
                    {
                        labels.map((label, i) => {
                            return <nav key={i} className='flex items-center gap-1 '>
                                <nav className=' h-3 w-3 my-auto rounded-full aspect-square ' style={{ backgroundColor: colors[i] }}>
                                </nav>
                                <nav className=' py-1 text-sm font-semibold text-gray-500 truncate whitespace-nowrap'>
                                    {label} <span className='inline-block text-xs text-gray-400 '>({getPercentageOf(i)})</span>
                                </nav>
                            </nav>
                        })
                    }
                </nav>
            </div>
        </div>
    )
}

export default statschart