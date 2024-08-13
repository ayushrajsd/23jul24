import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllTheatres } from "../../api/theatreApi";
import { useSelector, useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import ShowModal from "./ShowModal";

function TheatreList() {
  const { user } = useSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theatres, setTheatres] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTheatres(user._id);
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
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    { title: "Phone Number", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
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
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setSelectedTheatre(data);
                setFormType("edit");
                setIsModalOpen(true);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setSelectedTheatre(data);
                setIsDeleteModalOpen(true);
              }}
            >
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheatre(data);
                }}
              >
                +Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setFormType("add");
            setIsModalOpen(true);
          }}
        >
          Add Theatre
        </Button>
        <Table dataSource={theatres} columns={columns} />
        {isModalOpen && (
          <TheatreFormModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            formType={formType}
            getData={getData}
            selectedTheatre={selectedTheatre}
            setSelectedTheatre={setSelectedTheatre}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteTheatreModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            getData={getData}
            selectedTheatre={selectedTheatre}
            setSelectedTheatre={setSelectedTheatre}
          />
        )}
        {isShowModalOpen && (
          <ShowModal
            isShowModalOpen={isShowModalOpen}
            setIsShowModalOpen={setIsShowModalOpen}
            selectedTheatre={selectedTheatre}
          />
        )}
      </div>
    </>
  );
}

export default TheatreList;
