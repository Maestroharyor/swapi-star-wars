import React, { useState, useLayoutEffect } from "react";

// Components
import { FaCircleNotch } from "react-icons/fa";
import starWarsLogo from "../assets/star_wars.png";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { message } from "antd";

// Functions and Data
import { movieDataType } from "../data/dataTypes";

type Props = {
  setSelected: (value: movieDataType | null) => void;
  movieList: movieDataType[];
  setMovieList: (value: movieDataType[]) => void;
};

const Welcome = ({ setSelected, movieList, setMovieList }: Props) => {
  const [loading, setLoading] = useState(false);

  const fetchMovieList = async () => {
    setLoading(true);
    axios
      .get("https://swapi.dev/api/films")
      .then((response) => {
        setLoading(false);

        const movies = response.data.results.sort(
          (a: movieDataType, b: movieDataType) =>
            Number(a.release_date) - Number(b.release_date)
        );
        setMovieList(movies);
      })
      .catch((error) => {
        if (error.message) {
          message.error(error.message);
        }
      });
  };

  useLayoutEffect(() => {
    if (!movieList.length) {
      fetchMovieList();
    }
  }, []);
  return (
    <div className="w-full min-h-[100vh] flex flex-col gap-20 items-center justify-center py-20 px-5">
      <motion.img
        src={starWarsLogo}
        alt=""
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="animate-pulse"
      />

      {loading ? (
        <motion.div
          className="text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaCircleNotch className="animate-spin text-yellow-500" />
        </motion.div>
      ) : (
        <div className="lg:w-[400px]">
          <motion.select
            className="movie-select block bg-yellow-500 text-xl py-2 px-5 w-full mt-1 rounded-md  border-transparent focus:bg-yellow-600 focus:ring-0 focus:outline-none transition duration-300 ease-in-out form-select cursor-pointer outline-none focus:border-none "
            defaultValue={""}
            onChange={(event) => {
              const movie = JSON.parse(event.target.value);
              setSelected(movie);
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <option value={""} disabled className="">
              Select Movie
            </option>
            {movieList.map((movie) => (
              <option key={movie.episode_id} value={JSON.stringify(movie)}>
                {movie.title}
              </option>
            ))}
          </motion.select>
        </div>
      )}
    </div>
  );
};

export default Welcome;
