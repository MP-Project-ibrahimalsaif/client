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

const DashboardUsers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
      user: state.Login.user,
    };
  });

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const handleSnackbar = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
    });
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        return (
          <a
            className={
              !params.row.blocked
                ? "dashboardATag dashboardTableAuctionTitle"
                : "dashboardATag"
            }
            href={!params.row.blocked ? `/users/${params.row.id}` : "#/"}
          >
            {params.row.name}
          </a>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "blocked",
      headerName: "Blocked",
      width: 150,
      renderCell: (params) => {
        return params.row.blocked ? (
          <ImCheckmark className="tableIconNoHover" />
        ) : (
          <ImCross className="tableIconNoHover" />
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`chip ${params.row.role}`}>{params.row.role}</div>
        );
      },
    },
    {
      field: "timestamp",
      headerName: "Joined",
      type: "dateTime",
      width: 200,
    },
    {
      field: "change_blocked",
      headerName: "Change Status",
      description: "You can change the user status either blocked or unblocked",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          updateUserStatus(params.row.id, params.row.blocked ? false : true);
        };

        return !params.row.blocked ? (
          <div onClick={onClick}>
            <button className="blockBtn block">Block</button>
          </div>
        ) : (
          <div onClick={onClick}>
            <button className="blockBtn unblock">Unblock</button>
          </div>
        );
      },
    },
    {
      field: "change_role",
      headerName: "Change Role",
      description: "You can change the user role either user or admin",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          updateUserRole(params.row.id);
        };

        return (
          <div onClick={onClick}>
            <button className="changeStatusBtn">Change Role</button>
          </div>
        );
      },
    },
  ];

  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      const users = res.data.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.role,
        blocked: user.blocked,
        timestamp: user.timestamp.slice(0, 10),
      }));
      setRows(users);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatus = async (id, block) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/${
          block ? "blockUser" : "unblockUser"
        }/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      getUsers();
      handleSnackbar('the user has been updated successfully', 'success');
    } catch (error) {
      console.log(error);
      handleSnackbar('oops something went wrong', 'error');
    }
  };

  const updateUserRole = async (id) => {
    const { value: role } = await MySwal.fire({
      title: "Change User Role",
      input: "select",

      inputOptions: {
        user: "User",
        admin: "Admin",
      },
      inputPlaceholder: "Select a role",
      showCancelButton: true,
      confirmButtonColor: "#2f2057",
      confirmButtonText: "Change",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (role) {
      let newRole;

      if (role === "user") {
        newRole = process.env.REACT_APP_ROLE_USER;
      }
      if (role === "admin") {
        newRole = process.env.REACT_APP_ROLE_ADMIN;
      }

      try {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/changeRole/${id}`,
          { role_id: newRole },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        getUsers();
        handleSnackbar('the user has been updated successfully', 'success');
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
              <h1 className="dashboardTableTitle">Mazad Users</h1>
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

export default DashboardUsers;
