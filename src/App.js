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
        <Route path="/register" element={<RegisterEnseignant />} />
        <Route path="/registerEtudiant" element={<RegisterEtudiant />} />
        {/* Route avec Layout comme wrapper */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="AddQuizDevoirs" element={<AddQuizDevoir />} />
           <Route path="EvaluerQuizDevoirs" element={<EvaluateQuizDevoirs />} />
           <Route path="Ressources" element={<Ressources />} />
            <Route path="visioconférence" element={<Visioconférence />} />
            <Route path="visioconférenceEtudiant" element={<VisioconférenceEtudiant />} />
          {/* Ajoute ici d'autres routes si nécessaire */}
        </Route>
        {/* Redirection ou page 404 */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
