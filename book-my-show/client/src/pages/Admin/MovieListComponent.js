import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import MovieForm from "./MovieForm";
import DeleteMovieModal from "./DeleteMovieModal";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movies";
import { useDispatch } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const fakeMovie = [
    {
      key: "1",
      poster: "Image 1",
      title: "Wolverine Vs Deadpool",
      description: "two crazy heroes",
      duration: 120,
      genre: "Action",
      language: "English",
      releaseDate: "2024-08-01",
    },
    {
      key: "2",
      poster: "Image 2",
      title: "Wolverine Vs Deadpool 2",
      description: "two crazy heroes",
      duration: 120,
      genre: "Action",
      language: "English",
      releaseDate: "2024-08-01",
    },
  ];

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
            src={data.poster}
          />
        );
      },
    },
    { title: "Movie Name", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => `${text} Min`,
    },
    { title: "Genre", dataIndex: "genre" },
    { title: "Language", dataIndex: "language" },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    dispatch(ShowLoading());
    const response = await getAllMovies();
    const allMovies = response.data;
    setMovies(
      allMovies.map(function (item) {
        return { ...item, key: item._id };
      })
    );
    dispatch(HideLoading());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MovieList;
