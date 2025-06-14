import axios from 'axios';
import {Note} from '../types/note';

const BASE_URL =  'https://notehub-public.goit.study/api/notes';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const fetchNotes = async (
  search?: string,
  page = 1,
  perPage = 12
): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>(BASE_URL, {
    params: {
      ...(search? {search} : {}),
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await axios.post<Note>(BASE_URL, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response  = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    }
  });
  return response.data;
};