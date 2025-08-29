import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import AddQuizDevoir from './Pages/QuizDevoirs/AddQuizDevoir';
import EvaluateQuizDevoirs from './Pages/QuizDevoirs/EvaluateQuizDevoirs';
import Ressources from './Pages/Ressources/Ressources';
import RegisterEnseignant from './Pages/auth/RegisterEnseignant';
import Visioconférence from './Pages/VisioConférence/Visioconférence';
import VisioconférenceEtudiant from './Pages/VisioConférence/VisioconférenceEtudiant';
import RegisterEtudiant from './Pages/auth/RegisterEtudiant';
import LoginEtudiant from './Pages/auth/LoginEtudiant';
import Profile from './Pages/Profile';
import MesDevoirs from './Pages/Devoirs/MesDevoirs';
import PrivateRoute from './Components/PrivateRoute';
import MesMatiére from './Pages/Matiéres/MesMatiére';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterEnseignant />} />
        <Route path="/registerEtudiant" element={<RegisterEtudiant />} />
        <Route path="/LoginEtudiant" element={<LoginEtudiant />} />

        {/* Pages protégées */}
        <Route
          path="/app"
          element={
            <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT", "ROLE_ELEVE"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Sous-pages accessibles pour tous les rôles */}
          <Route path="Ressources" element={<Ressources />} />
          <Route path="visioconférence" element={<Visioconférence />} />
          <Route path="visioconférenceEtudiant" element={<VisioconférenceEtudiant />} />
          <Route path="profile" element={ <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT", "ROLE_ELEVE"]}>
               <Profile />
              </PrivateRoute>} />

          {/* Sous-pages réservées aux enseignants */}
          <Route
            path="AddQuizDevoirs"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT"]}>
                <AddQuizDevoir />
              </PrivateRoute>
            }
          />

          {/* Sous-pages réservées aux étudiants */}
          <Route
            path="EvaluerQuizDevoirs"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT"]}>
                <EvaluateQuizDevoirs />
              </PrivateRoute>
            }
          />

          <Route
            path="devoirs"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ELEVE"]}>
                <MesDevoirs />
              </PrivateRoute>
            }
          />
            <Route
            path="matieres"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ELEVE"]}>
                <MesMatiére />
              </PrivateRoute>
            }/>
        </Route>
       
        

        {/* Redirection en cas de route inconnue */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
