import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchRessources = createAsyncThunk(
  "Ressources/list",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get("http://localhost:8085/Ressource/listRessource",config
      )
      console.log("listes des ressources",response.data)
      return response.data; 
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)
export const AddRessources = createAsyncThunk(
  "Ressources/createRessources",
  async (RessourceData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", RessourceData.file);
      formData.append("titre", RessourceData.titreRes);
      formData.append("type", RessourceData.typeRes);
      formData.append("niveauScolaire", RessourceData.niveau); // correspond au Enum Niveau_SCOLAIRE
      formData.append("courid", Number(RessourceData.coursId)); // <-- important, correspond au @RequestParam

     const token = localStorage.getItem("token"); // ou où tu stockes ton JWT

const response = await axios.post(
  "http://localhost:8085/Ressource/add",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  }
);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const DeleteRessourcesAction =createAsyncThunk(
  "Ressources/deleteRessources",
  async ({ RessourcesIdToDelete }, { rejectWithValue }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.delete(`http://localhost:8085/Ressource/deleteone/${RessourcesIdToDelete}`,
    config);
    
    console.log("employee supprimé")
  }catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
})
export const UpdateRessourceAction = createAsyncThunk(
  "Ressource/updateRessource",
  async ({ RessourceId, titreRes, typeRes, niveau, coursId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("titreRes", titreRes);
      formData.append("typeRes", typeRes);
      formData.append("niveau", niveau);
      formData.append("idCours", coursId);
      if (file) formData.append("file", file);

      const response = await axios.put(
        `http://localhost:8085/Ressource/update/${RessourceId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
