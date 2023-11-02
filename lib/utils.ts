import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export async function getLinks() {
    const { data } = await axios.get("/api/links");
    return data.links
}


export type TNewLink = {
  title: string,
  url: string,
  icon: string
}

export const addLinks = async (links:TNewLink[]) => {
  const filteredArray = links.filter(e => Object.values(e).every((value) => typeof value === 'string' && value.trim() !== ''));
  if(filteredArray.length > 0) {
    const { data } = await axios.post("/api/links", {links:filteredArray});
    return data;
  }
  return null;
}

export async function getProfileInfo() {
  const { data } = await axios.get("/api/profile");
  return data;
}