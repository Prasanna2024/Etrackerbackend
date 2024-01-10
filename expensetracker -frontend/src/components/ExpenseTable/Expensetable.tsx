import React from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnDef,
  MRT_TableOptions,
} from 'mantine-react-table';
import { InputType } from '../Tracker/Tracker';
import { useStore } from '../../store/store';
import { Box, ActionIcon } from '@mantine/core';
import { IconEdit, IconSend, IconTrash } from '@tabler/icons-react';
import { columns } from './makeData';
import { addExpenses, deleteExpense, editExpense } from '../../services/api.services';

const ExpenseTable: React.FC = () => {
  const { expenses, setExpenses } = useStore();

  const handleSaveRow: MRT_TableOptions<InputType>['onEditingRowSave'] = async ({
    table,
    row,
    values,
  }) => {
    const ids = row.original as {id:any}['id'];
    expenses[ids] = values;
    try {
      // Assuming addExpenses is an asynchronous function
      const exp = await editExpense(ids['id'],values);
      setExpenses([...exp]);
      table.setEditingRow(null);
    } catch (error) {
      console.error('Error saving row:', error);
      // Handle error accordingly
    }
  };

  const handleDeleteRow = async (row: any) => {
    try {
      const id = (row.original as { id: any }).id;
      await deleteExpense(id);
      expenses.splice(row.index, 1);
      setExpenses([...expenses]);
    } catch (error) {
      console.error('Error deleting row:', error);
      // Handle error accordingly
    }
  };

  const table = useMantineReactTable({
    columns: columns as MRT_ColumnDef<InputType>[],
    data: expenses,
    enableRowActions: true,
    enableEditing: true,
    onEditingRowSave: handleSaveRow,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <ActionIcon
          color="blue"
          onClick={() =>
            window.open(`mailto:kevinvandy@mailinator.com?subject=Hello ${row.original}!`)
          }
        >
          <IconSend />
        </ActionIcon>
        <ActionIcon color="orange" onClick={() => table.setEditingRow(row)}>
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => handleDeleteRow(row)}>
          <IconTrash />
        </ActionIcon>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default ExpenseTable;
