import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DataGrid } from "@mui/x-data-grid";
import { MdEdit } from "react-icons/md";
import Sidenav from "../Sidenav";
import "./style.css";

const MySwal = withReactContent(Swal);

const DashboardAuctions = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getUserAuctions();
    // eslint-disable-next-line
  }, []);

  const columns = [
    { field: "auction", headerName: "Auction Title", width: 300 },
    {
      field: "bids",
      headerName: "Number of bids",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 200,
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
      field: "endDateTime",
      headerName: "End",
      type: "dateTime",
      width: 200,
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
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
      field: "edit",
      headerName: "Edit Auction",
      description:
        "You can edit any of your auctions informations, if you published the auction less than 30 mins ago",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          const Before30Mins = new Date(new Date().getTime() - 30 * 60000);
          if (
            Date.parse(Before30Mins) < Date.parse(params.row.timestampFull) &&
            !params.row.sold
          ) {
            navigate(`/edit_auction/${params.row.id}`);
          } else {
            return MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "You can't edit this auction, because either the time of publishing was more than 30 mins ago, or the auction already ended",
              confirmButtonColor: "#2f2057",
            });
          }
        };

        return (
          <div onClick={onClick}>
            <MdEdit className="tableIcon" />
          </div>
        );
      },
    },
  ];

  const getUserAuctions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/userAuctions/${state.user._id}`,
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
        status: auction.status.status,
        timestamp: auction.timestamp.slice(0, 10),
        timestampFull: auction.timestamp,
      }));
      setRows(auctions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidenav />
      <div className="dashboardLayout">
        <div className="dashboardTableHeader">
          <h1 className="dashboardTableTitle">My Auctions</h1>
          <button className="dashboardCreateAuctionBtn">Create a new auction</button>
        </div>
        <div className="dashboardTable">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            checkboxSelection={false}
            hideFooterSelectedRowCount
          />
        </div>
      </div>
    </>
  );
};

export default DashboardAuctions;
