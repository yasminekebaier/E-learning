import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Ajouter un cours
export const AddCours = createAsyncThunk(
  "Cours/createCours",
  async (CoursData, { rejectWithValue }) => {
 const {
  matiereId,
  studentId,   
  nom,
  description,
  etat,
  type,
  datedebut,
  datefin,
  nbrhour,
  prix,
  nomformateur,
  creepar
} = CoursData;


    const payload = {
      nom,
      description,
      etat,
      type,
      datedebut: datedebut ? new Date(datedebut).toISOString() : null,
      datefin: datefin ? new Date(datefin).toISOString() : null,
      nbrhour: Number(nbrhour),
      prix: Number(prix),
      nomformateur,
      creepar,
      ressources: [] // pas de ressources à la création
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
  `http://localhost:8085/Cours/addcours/${matiereId}/${studentId}`,
  payload,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
);


      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchCours = createAsyncThunk(
  "Cours/list",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("http://localhost:8085/Cours/listCours", config);
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
export const DeleteCours = createAsyncThunk(
  "Cours/delete",
  async (coursId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:8085/Cours/deleteone/${coursId}`,
        config
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
export const UpdateCours = createAsyncThunk(
  "Cours/updateCours",
  async ({ id, coursData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        nom: coursData.nom,
        description: coursData.description,
        etat: coursData.etat,
        type: coursData.type,
        datedebut: coursData.datedebut ? new Date(coursData.datedebut).toISOString() : null,
        datefin: coursData.datefin ? new Date(coursData.datefin).toISOString() : null,
        nbrhour: Number(coursData.nbrhour),
        prix: Number(coursData.prix),
        nomformateur: coursData.nomformateur,
        creepar: coursData.creepar,
        ressources: coursData.ressources || []
      };

      const response = await axios.put(
        `http://localhost:8085/Cours/update/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

