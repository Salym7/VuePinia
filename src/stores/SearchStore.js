import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";
const url = "https:api.themoviedb.org/3/search/movie?api_key=f74f6e49746523431d8cd7ac3e478658&query=";

// Option Api
// export const useSearchStore = defineStore("searchStore", {
//     state: () => ({
//         loader: false,
//         movies: [],
//     }),
//     actions: {
//         async getMovies(search) {
//             this.loader = true;
//             const res = await fetch(`${url}${search}`);
//             const data = await res.json();
//             this.movies = data.results;
//             this.loader = false;
//         },
//         addToUserMovies(movie) {
//             const movieStore = useMovieStore();
//             movieStore.movies.push({ ...movie, isWatched: false });
//             movieStore.activeTab = 1;
//         },
//     },
// });

//Composition Api
export const useSearchStore = defineStore("searchStore", () => {
    const loader = ref(false);
    const movies = ref([]);

    const getMovies = async (search) => {
        loader.value = true;
        const res = await fetch(`${url}${search}`);
        const data = await res.json();
        movies.value = data.results;
        loader.value = false;
    };
    const addToUserMovies = (movie) => {
        const movieStore = useMovieStore();
        movieStore.movies.push({ ...movie, isWatched: false });
        movieStore.activeTab = 1;
    };

    return {
        loader,
        movies,
        getMovies,
        addToUserMovies,
    };
});
