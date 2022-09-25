import React, { useState } from "react";

// Components
import { motion } from "framer-motion";
import { Table } from "antd";

// Datas and Functions
import { characterDataType } from "../data/dataTypes";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  gender: string;
  height: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  },

  {
    title: "Gender",
    dataIndex: "gender",
    sorter: (a, b) =>
      a.gender.toLowerCase().localeCompare(b.gender.toLowerCase()),
  },
  {
    title: "Height",
    dataIndex: "height",

    sorter: (a, b) => a.height - b.height,
  },
];

type Props = {
  characters: characterDataType[];
};

const MovieTableDisplay = ({ characters }: Props) => {
  const [selectedGender, setSelectedGender] = useState("");
  const characterData: DataType[] = characters
    .map((character, index) => {
      const data: DataType = {
        key: index,
        name: character.name,
        gender:
          character.gender === "male" || character.gender === "female"
            ? character.gender[0].toUpperCase()
            : character.gender,
        height: character.height,
      };

      return data;
    })
    .filter((character) => {
      if (selectedGender === "") {
        return true;
      }
      return (
        character.gender.toLowerCase() === selectedGender.toLocaleLowerCase()
      );
    });

  const totalHeight = characterData
    .map((character) =>
      isNaN(Number(character.height)) ? 0 : Number(character.height)
    )
    .reduce((prev, next) => prev + next);

  console.log(
    characterData
      .filter((character) => typeof Number(character.height) === "number")
      .map((character) =>
        Number(character.height) != NaN ? Number(character.height) : 0
      )
  );

  return (
    <div className="w-full overflow-x-auto">
      <div>
        <motion.p
          className="bg-black text-yellow-500 px-8 py-2 rounded border border-white w-fit text-xl mb-9"
          initial={{ x: -2000 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 30 }}
        >
          Characters:
        </motion.p>
      </div>
      <div className="md:w-[250px] mb-6 ">
        <motion.select
          className="movie-select block bg-yellow-500 text-xl py-2 px-5 w-full mt-1 rounded-md  border-transparent focus:bg-yellow-600 focus:ring-0 focus:outline-none transition duration-300 ease-in-out form-select cursor-pointer "
          defaultValue={""}
          onChange={(event) => {
            setSelectedGender(event.target.value);
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <option value={""}>All Gender</option>
          <option value={"m"}>Male</option>
          <option value={"f"}>Female</option>
        </motion.select>
      </div>
      <Table
        columns={columns}
        dataSource={characterData}
        pagination={false}
        footer={(props) => {
          return (
            <div className="bg-yellow-500 flex justify-between font-bold w-full text-sm md:text-xl">
              <div>
                {props.length === 1
                  ? `1 Character`
                  : `${props.length} Characters`}
              </div>
              <div>
                {totalHeight}
                cm ({`${(totalHeight / 30.48).toFixed()} ft`}/
                {`${(totalHeight / 2.54).toFixed()}in`})
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MovieTableDisplay;
