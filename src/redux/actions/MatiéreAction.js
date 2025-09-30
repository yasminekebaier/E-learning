import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddMatiéres = createAsyncThunk(
  "Matieres/createMatieres",
  async (MatiereData, { rejectWithValue }) => {
    const { name, description, enseignantId, eleveId } = MatiereData;

    try {
      const response = await axios.post(
        "http://localhost:8085/Matiere/add",
        null, // pas de body
        {
          params: {
            formateurId: enseignantId, // attention au nom des params
            eleveId: eleveId,
            nom: name,
            description: description,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);





export const fetchMatieres= createAsyncThunk(
  "Matiere/list",
  async (_, { rejectWithValue }) => {
    try {
       const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8085/Matiere/listMatiere",
        config
      )
      console.log(response.data)
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
export const DeleteMatieres = createAsyncThunk(
  "Matiere/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8085/Matiere/deleteone/${id}`
      );
      console.log("Suppression OK :", response.data);
      return id; // <-- retourne l’ID supprimé au lieu de response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const UpdateMatiere = createAsyncThunk(
  "Matiere/update",
  async ({ id, name, description, formateurId, eleveId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8085/Matiere/update/${id}`,
        {
          name,
          description,
          enseignant: { id: formateurId },
          eleve: { id: eleveId }
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      return response.data; // retourne la matière mise à jour
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
