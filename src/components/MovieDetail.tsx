import React, { useLayoutEffect, useState } from "react";

// Components
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Tooltip, message } from "antd";
import MovieTableDisplay from "./MovieTableDisplay";
import { FaSync } from "react-icons/fa";

// Functions and Data
import { characterDataType, movieDataType } from "../data/dataTypes";
import axios from "axios";
import CharacterLoadingSkeleton from "./CharacterLoadingSkeleton";

type Props = {
  selected: movieDataType | null;
  setSelected: (value: movieDataType | null) => void;
};

const MovieDetail = ({ selected, setSelected }: Props) => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<characterDataType[]>([]);

  const fetchAllCharacters = async () => {
    setLoading(true);
    Promise.all(
      selected?.characters.map(async (character) => await axios.get(character))!
    )
      .then((response) => {
        const characters: characterDataType[] = response.map((res) => res.data);

        setCharacters(characters);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.message) {
          message.error(`An error occured: ${error.message}`, 2);
        }
        message.info("Please selected desired movie again", 5);
        setSelected(null);
      });
  };

  useLayoutEffect(() => {
    if (!characters.length) {
      fetchAllCharacters();
    }
  }, []);
  return (
    <div className=" h-full flex flex-col gap-10 items-start justify-start py-20 px-5 max-w-[900px] mx-auto relative">
      <div>
        <motion.p
          className="bg-black text-yellow-500 px-8 py-2 rounded border border-white w-fit text-xl mb-5"
          initial={{ y: -2000 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 30 }}
        >
          Title
        </motion.p>
        <motion.h1
          className="text-yellow-500 text-5xl font-bold"
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 70 }}
        >
          {selected?.title}
        </motion.h1>
      </div>
      <div
        className="text-yellow-500 text-xl sm:text-2xl md:text-3xl  leading mb-10"
        style={{ lineHeight: "50px" }}
      >
        <TypeAnimation
          sequence={[selected?.opening_crawl!]}
          speed={75} // Must be in range between 1 and 99!
          wrapper="div"
          repeat={0}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full"
      >
        {loading ? (
          <CharacterLoadingSkeleton />
        ) : (
          <>
            {characters.length && <MovieTableDisplay characters={characters} />}
          </>
        )}
      </motion.div>

      <Tooltip title="Reset">
        <div
          className="absolute right-[20px] lg:right-0 top-20 rounded-full w-[50px] h-[50px] bg-yellow-500 flex items-center justify-center  text-2xl transition duration-300 ease-in-out hover:scale-75 hover:rotate-[360deg] cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <FaSync />
        </div>
      </Tooltip>
    </div>
  );
};

export default MovieDetail;
