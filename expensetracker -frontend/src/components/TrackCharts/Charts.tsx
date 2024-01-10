import { BarChart, PieChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import classes from './charts.module.css';
import { useStore } from '../../store/store';

export default function Charts() {
    const { expenses, setExpenses } = useStore();
    const [chartDatas, setChartDatas] = useState([])
    useEffect(() => {
        if (expenses.length === 0) {
            const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
            setExpenses(storedExpenses);
        }
        setChartNames()
    }, [expenses, setExpenses]);
    const setChartNames = () => {
        const names: any = []
        expenses.forEach((data) => {
            let name = data.name
            let total_sum = 0
            expenses.forEach((data) => {
                if (data.name == name) {
                    total_sum += data.Amount
                }
            })
            let val = JSON.stringify({ label: name, value: total_sum })
            if (!names.includes(val)) {
                names.push(val)
            }
        })
        const parsednames = names.map(JSON.parse);
        console.log(parsednames);
        setChartDatas(parsednames)
    }
    console.log(expenses);

    return (
        <div className={classes.chart}>
            {expenses.length > 0 ? (
                <PieChart
                    series={[
                        {
                            data: chartDatas,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            arcLabel: (item) => `${item.label} (${item.value})`,
                            arcLabelMinAngle:20,
                        },
                    ]}
                    width={600}
                    height={400}
                />
            ) : (
                <p>No expense data available.</p>
            )}
        </div>

    );
}
