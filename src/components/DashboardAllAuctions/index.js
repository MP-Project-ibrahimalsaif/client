import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DataGrid } from "@mui/x-data-grid";
import { ImCross, ImCheckmark } from "react-icons/im";
import { useSnackbar } from "notistack";
import Sidenav from "../Sidenav";
import "./style.css";

const MySwal = withReactContent(Swal);

const DashboardAllAuctions = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getAuctions();
    // eslint-disable-next-line
  }, []);

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const columns = [
    {
      field: "auction",
      headerName: "Auction Title",
      width: 300,
      renderCell: (params) => {
        return (
          <a
            className={
              params.row.status === "approved"
                ? "dashboardATag dashboardTableAuctionTitle"
                : "dashboardATag"
            }
            href={
              params.row.status === "approved"
                ? `/explore/${params.row.id}`
                : "#/"
            }
          >
            {params.row.auction}
          </a>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 150,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 150,
    },
    {
      field: "endDateTime",
      headerName: "End",
      type: "dateTime",
      width: 200,
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 150,
      renderCell: (params) => {
        return params.row.sold ? (
          <ImCheckmark className="tableIconNoHover" />
        ) : (
          <ImCross className="tableIconNoHover" />
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`chip ${params.row.status}`}>{params.row.status}</div>
        );
      },
    },
    {
      field: "timestamp",
      headerName: "publish",
      type: "dateTime",
      width: 200,
    },
    {
      field: "change",
      headerName: "Change Status",
      description:
        "You can change an auction status, hit: only approved auctions appear in the website",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          updateStatus(params.row.id);
        };

        return (
          <div onClick={onClick}>
            <button className="changeStatusBtn">Change Status</button>
          </div>
        );
      },
    },
  ];

  const getAuctions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/allauctions`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const auctions = res.data.map((auction) => ({
        id: auction._id,
        auction: auction.title,
        bids: auction.bids,
        price: auction.currentPrice,
        endDateTime: auction.endDateTime.slice(0, 10),
        sold: auction.sold,
        createdBy: auction.createdBy.name,
        status: auction.status.status,
        timestamp: auction.timestamp.slice(0, 10),
        timestampFull: auction.timestamp,
      }));
      setRows(auctions);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {
    const { value: status } = await MySwal.fire({
      title: "Change Auction Status",
      input: "select",

      inputOptions: {
        PENDING_STATUS: "Pending",
        APPROVED_STATUS: "Approved",
        REJECTED_STATUS: "Rejected",
      },
      inputPlaceholder: "Select a status",
      showCancelButton: true,
      confirmButtonColor: "#2f2057",
      confirmButtonText: "Change",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (status) {
      let newStatus;

      if (status === "PENDING_STATUS") {
        newStatus = process.env.REACT_APP_PENDING_STATUS;
      }
      if (status === "APPROVED_STATUS") {
        newStatus = process.env.REACT_APP_APPROVED_STATUS;
      }
      if (status === "REJECTED_STATUS") {
        newStatus = process.env.REACT_APP_REJECTED_STATUS;
      }

      try {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/changeAuctionStatus/${id}`,
          { status_id: newStatus },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        getAuctions();
        handleSnackbar('the auction has been updated successfully', 'success');
      } catch (error) {
        console.log(error);
        handleSnackbar('oops something went wrong', 'error');
      }
    }
  };

  return (
    <>
      {state.token ? (
        <>
          <Sidenav />
          <div className="dashboardLayout">
            <div className="dashboardTableHeader">
              <h1 className="dashboardTableTitle">Mazad Auctions</h1>
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

export default DashboardAllAuctions;
