import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridRowsProp,
    GridToolbar
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    deleteCategory,
    selectCategories,
    // useDeleteCategoryMutation,
    // useGetCategoriesQuery
} from "./categorySlice";


export const CategoryList = () => {
    //api
    // const { data, isFetching, error } = useGetCategoriesQuery()
    // const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation()

    //local
    const categories = useAppSelector(selectCategories)
    const componentsProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        },
    }

    const rows: GridRowsProp = categories.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
        isActive: c.is_active,
        createdAt: new Date(c.created_at).toLocaleDateString("Pt-br"),
    }))

    //api 
    // const rows: GridRowsProp = data
    //     ? data.data.map(c => ({
    //         id: c.id,
    //         name: c.name,
    //         description: c.description,
    //         isActive: c.is_active,
    //         createdAt: new Date(c.created_at).toLocaleDateString("Pt-br"),
    //     }))
    //     : []

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: 'boolean',
            renderCell: renderIsActiveCell
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'Actions',
            flex: 1,
            renderCell: renderActionsCell
        },
    ];

    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()

    //local
    function handleDeleteCategory(id: string) {
        dispatch(deleteCategory(id))
        enqueueSnackbar('Category deleting success!', { variant: "success" })
    }

    //api
    // async function handleDeleteCategory(id: string) {
    //     await deleteCategory({ id })
    // }
    // useEffect(() => {
    //     if (deleteCategoryStatus.isSuccess) {
    //         enqueueSnackbar('Category deleting success!', { variant: "success" })
    //     }
    //     if (deleteCategoryStatus.error) {
    //         enqueueSnackbar('Category not success!', { variant: "error" })
    //     }

    // }, [deleteCategoryStatus, enqueueSnackbar])

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDeleteCategory(params.value)}
            >
                <DeleteIcon />
            </IconButton>
        )
    }


    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        )
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                state={{ textDecoration: "none" }}
                to={`/categories/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>
            <Box sx={{ display: "flex", height: 500 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[2, 10, 50, 100]}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    disableSelectionOnClick
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={componentsProps}
                />
            </Box>
        </Box>
    )
}