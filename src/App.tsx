import { useState } from "react";

// Components
import { motion, AnimatePresence } from "framer-motion";
import Welcome from "./components/Welcome";
import MovieDetail from "./components/MovieDetail";

// Functions and Datas
import { movieDataType } from "./data/dataTypes";

function App() {
  const [selected, setSelected] = useState<movieDataType | null>(null);
  const [movieList, setMovieList] = useState<movieDataType[]>([]);

  return (
    <div className="h-full">
      {selected === null ? (
        <AnimatePresence>
          <motion.div exit={{ opacity: 0 }}>
            <Welcome
              setSelected={setSelected}
              movieList={movieList}
              setMovieList={setMovieList}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <MovieDetail selected={selected} setSelected={setSelected} />
      )}
    </div>
  );
}

export default App;
