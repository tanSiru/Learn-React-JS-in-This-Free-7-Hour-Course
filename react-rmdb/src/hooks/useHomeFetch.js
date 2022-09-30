import {useState, useEffect} from 'react';

//API
import api from '../API';

//initalState can be beneficial for whenever a reset is needed
const initialState = {
    page:0,
    results:[],
    total_pages:0,
    total_results:0,

}

export const useHomeFetch = () => {
    //state for holding moviesb
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async (page, searchTerm = '') => {
        try{
            setError(false);
            setLoading(true);

            const movies = await api.fetchMovies(searchTerm,page);

            setState(prev =>({
                ...movies,
                results:
                page > 1 ? [...prev.results,...movies.results] : [...movies.results]
            }))

        }catch(error){
            setError(true);
        }
        setLoading(false)
    }

    
    //initial render
    useEffect(()=>{
        fetchMovies(1)
    },[])
    //array: dependencies for when the useEffect is triggered
    //when empty it will only run once
    
    return {state,loading,error};
}