import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DataGrid } from "@mui/x-data-grid";
import { ImCross, ImCheckmark } from "react-icons/im";
import Sidenav from "../Sidenav";
import "./style.css";

const MySwal = withReactContent(Swal);

const DashboardReports = () => {
  const [rows, setRows] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getReports();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      field: "reported",
      headerName: "Reported",
      width: 200,
    },
    {
      field: "reportedBy",
      headerName: "Reported By",
      width: 200,
    },
    {
      field: "reason",
      headerName: "Reason",
      sortable: false,
      flex: 1,
      width: 400,
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
      headerName: "issued",
      type: "dateTime",
      width: 150,
    },
    {
      field: "change",
      headerName: "Change Status",
      description:
        "You can change a report status",
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

  const getReports = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/reports`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const reports = res.data.map((report) => ({
        id: report._id,
        reported: report.reported.email,
        reportedBy: report.reportedBy.email,
        reason: report.reason,
        status: report.status.status,
        timestamp: report.timestamp.slice(0, 10),
      }));
      setRows(reports);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {
    const { value: status } = await MySwal.fire({
      title: "Change Report Status",
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
          `${process.env.REACT_APP_BASE_URL}/changeReportStatus/${id}`,
          { status_id: newStatus },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        getReports();
      } catch (error) {
        console.log(error);
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
              <h1 className="dashboardTableTitle">Mazad Reports</h1>
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

export default DashboardReports;
