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
import Inscription from './Pages/auth/Inscription';
import ListEleve from './Pages/Admin/ListEleve';
import ListEnseignant from './Pages/Admin/ListEnseignant';
import Acceuil from './Pages/Admin/Acceuil';
import ListAdmin from './Pages/Admin/ListAdmin';
import GestionMatiere from './Pages/Admin/GestionMatiere';
import MesCours from './Pages/cours/MesCours';
import GestionCours from './Pages/cours/GestionCours';
import Message from './Pages/Chat/Message';

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
        <Route path="/inscription" element={<Inscription />} />

        {/* Pages protégées */}
        <Route
          path="/app"
          element={
            <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT", "ROLE_ELEVE","ROLE_ADMIN"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Sous-pages accessibles pour tous les rôles */}
          <Route path="Ressources" element={<Ressources />} />
          <Route path="visioConference" element={<Visioconférence />} />
          <Route path="visioConferenceEtudiant" element={<VisioconférenceEtudiant />} />
 


          {/* Sous-pages réservées aux enseignants */}
          <Route
            path="AddQuizDevoirs"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT"]}>
                <AddQuizDevoir />
              </PrivateRoute>
            }
          />
           <Route
            path="GestionCours"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT"]}>
                <GestionCours />
              </PrivateRoute>
            }
          />
              <Route
            path="profile"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT", "ROLE_ELEVE","ROLE_ADMIN"]}>
              <Profile/>
              </PrivateRoute>
            }
          />
{/* Sous-pages réservées aux administrateur */}
 <Route
            path="eleves"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ADMIN"]}>
                <ListEleve/>
              </PrivateRoute>
            }
          />
           <Route
            path="enseignants"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ADMIN"]}>
                <ListEnseignant/>
              </PrivateRoute>
            }
          />
            <Route
            path="acceuiladmin"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ADMIN"]}>
              <Acceuil/>
              </PrivateRoute>
            }
          />
           <Route
            path="admin"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ADMIN"]}>
              <ListAdmin/>
              </PrivateRoute>
            }
          />
           <Route
            path="profile"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT", "ROLE_ELEVE","ROLE_ADMIN"]}>
              <Profile/>
              </PrivateRoute>
            }
          />
            <Route
            path="gestionmatiere"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ADMIN"]}>
              <GestionMatiere/>
              </PrivateRoute>
            }
          />
        
          <Route
            path="EvaluerQuizDevoirs"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ENSEIGNANT"]}>
                <EvaluateQuizDevoirs />
              </PrivateRoute>
            }
          />
  {/* Sous-pages réservées aux étudiants */}
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
             <Route
             path="matieres/:matiere"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ELEVE"]}>
                <MesCours />
              </PrivateRoute>
            }
          />
            <Route
            path="message"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ELEVE","ROLE_ENSEIGNANT"]}>
                <Message />
              </PrivateRoute>
            }/>
             <Route
            path="visioConferenceEtudiant"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ELEVE"]}>
                <VisioconférenceEtudiant />
              </PrivateRoute>
            }/>
             <Route
            path="profile"
            element={
              <PrivateRoute rolesAllowed={["ROLE_ELEVE", "ROLE_ADMIN", "ROLE_ENSEIGNANT"]}>
              <Profile/>
              </PrivateRoute>
            }
          />
        </Route>
       
        

        {/* Redirection en cas de route inconnue */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
