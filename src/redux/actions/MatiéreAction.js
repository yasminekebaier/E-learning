import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddMatiéres = createAsyncThunk(
  "Matieres/createMatieres",
  async (MatiereData, { rejectWithValue }) => {
      const {name} = MatiereData;
      try {
          const config = {
              headers: {
                  "Content-Type": "application/json",
              },
          };
          const response = await axios.post(
              "http://localhost:8085/Matiere/addMatiere",
             {name} , 
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
)
export const fetchMatieres= createAsyncThunk(
  "Matiere/list",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
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
export const DeleteMatieres= createAsyncThunk(
  "Matiere/delete",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
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
export const UpdateMatiere= createAsyncThunk(
  "Matiere/update",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
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