import React, { useState, useEffect } from "react";
import { getAlltheatresForAdmin, updateTheatre } from "../../api/theatreApi";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message, Button, Table } from "antd";

function TheatresTable() {
  const [theatres, setTheatres] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAlltheatresForAdmin();
      if (response.success) {
        const allTheatres = response.data;
        setTheatres(
          allTheatres.map(function (item) {
            return { ...item, key: `theatre${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      console.log(err);
      dispatch(HideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading());
      const values = {
        ...theatre,
        theatreId: theatre._id,
        isActive: !theatre.isActive,
      };
      const response = await updateTheatre(values);
      console.log(response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      console.log(err);
      message.error(err.message);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div>
            {data.isActive ? (
              <Button
                onClick={() => {
                  handleStatusChange(data);
                }}
              >
                Block
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleStatusChange(data);
                }}
              >
                Approve
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {theatres && theatres.length > 0 && (
        <Table dataSource={theatres} columns={columns} />
      )}
    </div>
  );
}

export default TheatresTable;
