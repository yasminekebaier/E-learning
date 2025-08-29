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
      const response = await axios.get(
        "http://localhost:8085/Ressource/listRessource",
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
);
export const AddRessources = createAsyncThunk(
  "Ressources/createRessources",
  async (RessourceData, { rejectWithValue }) => {
      const { titreRes, typeRes, contenuRes, heureAjout, Niveau, cours } = RessourceData;
      try {
          const config = {
              headers: {
                  "Content-Type": "application/json",
              },
          };
          const response = await axios.post(
              "http://localhost:8085/Ressource/addResource/1",
             { titreRes, typeRes, contenuRes, heureAjout, Niveau, cours } , 
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
  async ({ RessourceId, typeRes, titreRes ,Matiere,Niveau}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        `http://localhost:8085/Ressource/update/${RessourceId}`,
        { typeRes, titreRes ,Matiere,Niveau},
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