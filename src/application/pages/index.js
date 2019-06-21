import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Container from '../components/Container';
import Loading from '../components/Loading';
import Navigation from '../pages/Navigation';
import Categories from '../pages/Categories';
import CategoriesSM from '../pages/Categories/Categories-sm';
import { getPopularMovies,getGenres,getMoviesByGenre,searchMovies } from '../api';
import { getDataFn } from '../actions/data';
import MoviesInformation from './MoviesInformation';
class index extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            movies : [],
            searching: false,
            loading: false,
            genres: []
        }
    }

    componentWillMount(){
        this.loadGenre(1);
    }

    searchMovies = (query) => {
       this.setState({searching: true,loading: true});
        let data = getDataFn(searchMovies+query).then(data=>{
            let movies = data.results;
            this.setState({
                movies: movies,loading:false
            });
        }).catch(err=>{
           this.setState({
               searching: false,loading: false
           })
        })
    }

    loadGenre = (page) => {
        this.setState({loading: true});
       let data = getDataFn(getGenres+page).then(data=>{
           let genres = data.genres;
           this.setState({genres: genres});
           this.setState({loading: false});
       });  
    }

    fetchByGenre = (id) => {
        this.setState({loading: true,searching: true});
        let data = getDataFn(getMoviesByGenre+id).then(data=>{
            let movies = data.results;
            this.setState({
                movies: movies
            });
            this.setState({loading: false});
        });
       
        
    }


    render(){
        let { movies } = this.state;
    return(
        <Container>
        <HashRouter>
        <Navigation searchMoviesFn={this.searchMovies}/>
        <CategoriesSM />
        <Categories fetchByGenre={this.fetchByGenre} genres={this.state.genres}/>
        {this.state.loading && <Loading />}
          <Switch>
            <Route 
                exact
                path="/" 
                render={(props)=><Home {...props} searching={this.state.searching} movies={this.state.movies} />} />
            <Route 
                path="/movie/:id" 
                render={(props)=><MoviesInformation />} />
          </Switch>
        </HashRouter>
        </Container>
    );

    }
}

export default index;