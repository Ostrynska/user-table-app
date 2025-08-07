import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getUsers, type Users } from '../data/users';
import PageContainer from './PageContainer';
import CustomToolbar from './CustomToolbar';
import { INITIAL_PAGE_SIZE, PAGE_TITLE } from '../constants';

export default function UsersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: Number(searchParams.get('page')) > 0 ? Number(searchParams.get('page')) - 1 : 0,
    pageSize: INITIAL_PAGE_SIZE,
  });
  const [genderFilter, setGenderFilter] = useState<string>(searchParams.get('gender') || 'All');

  const [selectedNationalities, setSelectedNationalities] = useState<string[]>(searchParams.get('nat')?.split(',') || []);
  const [rowsState, setRowsState] = useState<{
    rows: Users[];
    rowCount: number;
  }>({
    rows: [],
    rowCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const filterItems = [];

      if (genderFilter !== 'All') {
        filterItems.push({ field: 'gender', operator: 'equals', value: genderFilter });
      }

      if (selectedNationalities.length > 0) {
        filterItems.push({
          field: 'nat',
          operator: 'isAnyOf',
          value: selectedNationalities,
        });
      }

      const listData = await getUsers({
        paginationModel,
        filterModel: { items: filterItems },
      });

      setRowsState({
        rows: listData.items,
        rowCount: listData.itemCount,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [paginationModel, genderFilter, selectedNationalities]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', String(paginationModel.page + 1));

    if (genderFilter !== 'All') {
      params.set('gender', genderFilter);
    } else {
      params.delete('gender');
    }

    if (selectedNationalities.length > 0) {
      params.set('nat', selectedNationalities.join(','));
    } else {
      params.delete('nat');
    }

    setSearchParams(params, { replace: true });
  }, [paginationModel.page, genderFilter, selectedNationalities, setSearchParams]);

  const handlePaginationModelChange = useCallback((model: GridPaginationModel) => {
    setPaginationModel(model);
  }, []);

  const handleRefresh = () => {
    setGenderFilter('All');
    setSelectedNationalities([]);
    setPaginationModel({ page: 0, pageSize: INITIAL_PAGE_SIZE });
  };

  const rows = useMemo(
    () =>
      rowsState.rows.map((user) => ({
        id: user.id,
        first: user.first,
        last: user.last,
        gender: user.gender,
        email: user.email,
        nat: user.nat,
      })),
    [rowsState.rows]
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'first', headerName: 'First Name', flex: 1 },
      { field: 'last', headerName: 'Last Name', flex: 1 },
      { field: 'gender', headerName: 'Gender', flex: 0.7 },
      { field: 'email', headerName: 'Email', flex: 1.5 },
      { field: 'nat', headerName: 'Nationality', flex: 0.5 },
    ],
    []
  );

  return (
    <PageContainer
      title={PAGE_TITLE}
      breadcrumbs={[{ title: PAGE_TITLE }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Tooltip title="Reset filters" placement="right" enterDelay={1000}>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={handleRefresh}>
              Reset
            </Button>
          </Tooltip>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        {error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: 600 }}>
              <DataGrid
                rows={rows}
                rowCount={rowsState.rowCount}
                columns={columns}
                pagination
                paginationMode="server"
                pageSizeOptions={[INITIAL_PAGE_SIZE]}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                loading={isLoading}
                showToolbar
                checkboxSelection
                disableColumnFilter
                disableColumnSorting
                disableColumnMenu
                disableColumnResize
                slots={{
                  toolbar: () => (
                    <CustomToolbar
                      genderFilter={genderFilter}
                      onGenderChange={setGenderFilter}
                      selectedNationalities={selectedNationalities}
                      onNationalityChange={setSelectedNationalities}
                    />
                  ),
                }}
                sx={{
                  height: '78vh',
                  [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                    outline: 'transparent',
                  },
                  [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                    {
                      outline: 'none',
                    },
                  [`& .${gridClasses.row}:hover`]: {
                    cursor: 'pointer',
                  },
                }}
                slotProps={{
                  loadingOverlay: {
                    variant: 'circular-progress',
                    noRowsVariant: 'circular-progress',
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
}
