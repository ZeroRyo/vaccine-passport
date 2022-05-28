import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import vaccineApi from "../api/vaccineApi";
import { PageHeader } from "../components";
const Place = () => {
  const [placeList, setPlaceList] = useState([]);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const res = await vaccineApi.getAll24hUser();
        setPlaceList(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPlaces();
  }, []);

  const tableHeader = [
    // {
    //     field: 'name', headerName: 'Name', width: 200,
    //     renderCell: (params) => <Button
    //         variant='text'
    //         component={Link}
    //         to={`/place/${params.row.id}`}
    //     >
    //         {params.value}
    //     </Button>
    // },
    // {
    //     field: 'creator', headerName: 'Created by', width: 220,
    //     renderCell: (params) => <Button
    //         variant='text'
    //         component={Link}
    //         to={`/user/${params.value._id}`}
    //     >
    //         {params.value.fullName}
    //     </Button>
    // },
    // {
    //     field: 'userVisitLast24h', headerName: 'User check in last 24h', width: 220, align: 'right',
    //     renderCell: (params) => params.value.length
    // },
    // {
    //     field: '_id', headerName: 'Name', flex: 1
    // },
    // name of colection user
    {
      field: "idNumber",
      headerName: "Username",
      renderCell: (params) => (
        // { console.log(params.row.user);
        //     return <p style={{color: 'red'}}>{params.row.user.idNumber}</p>}
        <Button
          variant="text"
          component={Link}
          to={`/user/${params.row.user.id}`}
        >
          {params.row.user.idNumber}
        </Button>
      ),
      flex: 1,
    },
    {
      field: "user",
      headerName: "User last 24h",
      flex: 1,
      // renderCell: (params) => params.value.fullName,
      renderCell: (params) => {
        console.log(params);
        return params.value.fullName;
      },
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      valueGetter: (params) => params.row.user.address
    },
    {
      field: "vaccine",
      headerName: "Vaccine",
      flex: 1,
      renderCell: (params) => {
        // console.log(params.value);
        return params.value.name
      },
    },

    {
      field: "createdAt",
      headerName: "time",
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format("DD-MM-YYYY HH:mm:ss"),
    },
  ];
  return (
    <>
      <PageHeader title="Last User last 24h List" />
      <Paper elevation={0}>
        <DataGrid
          autoHeight
          rows={placeList}
          columns={tableHeader}
          pageSize={pageSize}
          onPageSizeChange={(size) => setPageSize(size)}
          rowsPerPageOptions={[9, 50, 100]}
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default Place;
