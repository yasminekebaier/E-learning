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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil directement visible sans login */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Pages de création de compte */}
        <Route path="/register" element={<RegisterEnseignant />} />
        <Route path="/registerEtudiant" element={<RegisterEtudiant />} />

        {/* Pages protégées sous Layout */}
        <Route path="/app" element={<Layout />}>
          <Route path="AddQuizDevoirs" element={<AddQuizDevoir />} />
          <Route path="EvaluerQuizDevoirs" element={<EvaluateQuizDevoirs />} />
          <Route path="Ressources" element={<Ressources />} />
          <Route path="visioconférence" element={<Visioconférence />} />
          <Route path="visioconférenceEtudiant" element={<VisioconférenceEtudiant />} />
        </Route>

        {/* Redirection en cas d'erreur */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
