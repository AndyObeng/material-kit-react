import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';


import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { CropTableRow } from '../crop-table-row';
import { CropTableHead } from '../crop-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { CropTableToolbar } from '../crop-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { CropProps } from '../crop-table-row';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import ProgressDialog from 'src/components/ProgressDialog';

// ----------------------------------------------------------------------

export function CropView() {
  const [isLoading, setLoading] = useState(false);
  const [productslist, setproductslist] = useState([]);

  const  getstate = async() =>{
      setLoading(true)
try {   
  
        const session =  secureLocalStorage.getItem("logincredentials")
        console.log(session)
        fetchmydata((JSON.parse(session)).userid,(JSON.parse(session)).access_token);
        // .then(result=>{
          
        //      if (result !== undefined) {
        //       console.log(result)
        //     //console.log((JSON.parse(session)).ispassed)
        //     let state = null;
        //     state = (JSON.parse(result)).firstname
        //     if(state)
        //     {
        //       console.log(state)
              
        //       // setfirstname((JSON.parse(result)).firstname)
        //       // setlastname((JSON.parse(result)).lastname)
        //       // setothername((JSON.parse(result)).othername)
        //       // settitle((JSON.parse(result)).title)
        //       // setuserid((JSON.parse(result)).userid)
        //       // setapi_token((JSON.parse(result)).api_token)
        //       //fetchmydata((JSON.parse(result)).userid,(JSON.parse(result)).api_token);
        //       //pieref.current.data = pieData
        //      // console.log(pieData)
        //      // this.props.navigation.navigate("AnimTab3",{user:state})
        //      // navigation.navigate("VerificationScreen")
        //     }
        //     else
        //     {
        //       //navigation.navigate("EditProfile",{user:state})
        //     }

        // }
        // });
        // //console.log(session)
     
    } catch (error) {
        console.log(error)
    }
     }

      const  fetchmydata = async (userid,api_token) => {
   
   
 axios.defaults.headers.common['Authorization'] = `Bearer ${api_token}`;
       const URL = "https://api.cropestate.com/api/crops";
    
    

  //  this.setDisabled(true)
	let payload = {};
  let header = { headers: {
     'Authorization': `Bearer ${api_token}`,
    //'content-type': 'multipart/form-data'
  }
}
  await axios.get(URL, )
    .catch(function (error) {
      //console.log(error)
    if (error.response) {
       // setretry(true)
        setLoading(false)
      // Request made and server responded
      console.log(error.response);
    // showToast('error','Network error',"Please try again")
     return;
   
       
        
    } else if (error.request) {
      //setretry(true)
        setLoading(false)
      // The request was made but no response was received
    //  console.log(error.request);
     // this.showToast('danger','Server error',error.request)
     //  showToast('error','Server error',"Please try again")
    
    } else {
      //setretry(true)
        setLoading(false)
     

    }

  })
.then(async result => {
      setLoading(false) 
     
        console.log(result.data)
       if(result!==undefined)
       {
        setproductslist(result.data)
       //  setretry(false)
      }
      
        
        
    })
  .finally(()=>{ 
  });

 
    }   
  const table = useTable();

    useEffect(() => {
    getstate();
    console.log("state")
  }, []);

  const [filterName, setFilterName] = useState('');

  const dataFiltered: CropProps[] = applyFilter({
    inputData: productslist,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Crops
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New crop
        </Button>
      </Box>
<ProgressDialog open={isLoading} message="Processing, please wait..." />
      <Card>
        <CropTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CropTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={productslist.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    productslist.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Acre price' },
                  { id: 'role', label: 'Plot price' },
                  { id: 'isVerified', label: 'Tree price', align: 'center' },
                  { id: 'status', label: 'ROI' },
                  { id: 'quantityavailable', label: 'Quantity ' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <CropTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(String(row.id))}
                      onSelectRow={() => table.onSelectRow(String(row.id))}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, productslist.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={productslist.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
