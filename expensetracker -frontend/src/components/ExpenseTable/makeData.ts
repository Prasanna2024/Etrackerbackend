import { type MRT_ColumnDef } from 'mantine-react-table';
import { InputType } from '../Tracker/Tracker';

 export const columns: MRT_ColumnDef<InputType>[] =
[

    {
        accessorKey: 'name',
        header: 'Expense need',
        enableEditing: true, // make sure editing is supported for this column
    },
    {
        accessorKey: 'Amount',
        header: 'Amount',
        enableEditing: true, // make sure editing is supported for this column

    },
    {
        accessorKey: 'date',
        header: 'Date',
        enableEditing: true, // make sure editing is supported for this column
    },
    {
        accessorKey: 'description',
        header: 'Description',
        enableEditing: true, // make sure editing is supported for this column

    },
]