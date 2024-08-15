import { MoviePage } from '../components/moviepage';
import { ProtectedRoute } from '../components/protectedroute';
import { NavBar } from '../components/navbar';

export default function Movie() {
    return (
        <ProtectedRoute>
        <NavBar/>
        <MoviePage />
        </ProtectedRoute>
    );
}