import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { ImCross, ImCheckmark } from "react-icons/im";
// import { useSnackbar } from "notistack";
import Sidenav from "../Sidenav";
import "./style.css";

const DashboardInvoices = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getInvoices();
    // eslint-disable-next-line
  }, []);

  // const handleSnackbar = (message, type) => {
  //   enqueueSnackbar(message, {
  //     variant: type,
  //   });
  // };

  const columns = [
    {
      field: "auction",
      headerName: "Auction",
      width: 400,
    },
    {
      field: "paid",
      headerName: "Paid",
      width: 200,
      renderCell: (params) => {
        return params.row.paid ? (
          <ImCheckmark className="tableIconNoHover" />
        ) : (
          <ImCross className="tableIconNoHover" />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      renderCell: (params) => {
        return (
          <div className={`chip ${params.row.status}`}>{params.row.status}</div>
        );
      },
    },
    {
      field: "timestamp",
      headerName: "issued",
      type: "dateTime",
      width: 300,
    },
    {
      field: "change",
      headerName: "Change Status",
      description: "You can change a report status",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          pay(params.row.id);
        };

        return !params.row.paid ? (
          <div onClick={onClick}>
            <button className="payBtn">Pay</button>
          </div>
        ) : (
          <ImCheckmark className="tableIconNoHover" />
        );
      },
    },
  ];

  const getInvoices = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/invoices`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const invoices = res.data.map((invoice) => ({
        id: invoice._id,
        auction: invoice.auction.title,
        status: invoice.status.status,
        paid: invoice.paid,
        timestamp: invoice.timestamp.slice(0, 10),
      }));
      setRows(invoices);
    } catch (error) {
      console.log(error);
    }
  };

  const pay = async (id) => {
    console.log(id);
    // try {
    //   // await axios.put(
    //   //   `${process.env.REACT_APP_BASE_URL}/changeReportStatus/${id}`,
    //   //   { status_id: newStatus },
    //   //   {
    //   //     headers: {
    //   //       Authorization: `Bearer ${state.token}`,
    //   //     },
    //   //   }
    //   // );
    //   getReports();
    //   handleSnackbar("the report has been updated successfully", "success");
    // } catch (error) {
    //   console.log(error);
    //   handleSnackbar("oops something went wrong", "error");
    // }
  };

  return (
    <>
      {state.token ? (
        <>
          <Sidenav />
          <div className="dashboardLayout">
            <div className="dashboardTableHeader">
              <h1 className="dashboardTableTitle">My Invoices</h1>
            </div>
            <div className="dashboardTable">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection={false}
                hideFooterSelectedRowCount
              />
            </div>
          </div>
        </>
      ) : (
        <div className="centerDashboard">
          <div className="error">
            <img src="/img/stop.svg" className="errorImg" alt="error" />
            <h1 className="errorText">You are not logged in yet</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardInvoices;
