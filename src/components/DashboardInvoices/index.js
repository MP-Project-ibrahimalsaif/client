import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { ImCross, ImCheckmark } from "react-icons/im";
import { useSnackbar } from "notistack";
import Sidenav from "../Sidenav";
import "./style.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DashboardInvoices = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  useEffect(() => {
    const updatePayment = async () => {
      const id = query.get("id");
      const status = query.get("redirect_status");
      if (id && status) {
        if (status === "succeeded") {
          try {
            await axios.put(
              `${process.env.REACT_APP_BASE_URL}/invoices/${id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              }
            );
            handleSnackbar("your payment was successful", "success");
            getInvoices();
          } catch (error) {
            console.log(error);
            handleSnackbar("oops something went wrong", "error");
          }
        } else {
          handleSnackbar("oops something went wrong", "error");
        }
      }
    };
    updatePayment();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      field: "auction",
      headerName: "Auction",
      width: 300,
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
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
      width: 250,
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
      width: 250,
    },
    {
      field: "change",
      headerName: "Pay",
      description: "Pay for the unpaid invoices",
      sortable: false,
      width: 250,
      renderCell: (params) => {
        return !params.row.paid ? (
          <div>
            <button
              className="payBtn"
              onClick={() => navigate(`/pay/${params.row.id}`)}
            >
              Pay
            </button>
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
        price: invoice.auction.currentPrice,
        paid: invoice.paid,
        timestamp: invoice.timestamp.slice(0, 10),
      }));
      setRows(invoices);
    } catch (error) {
      console.log(error);
    }
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
