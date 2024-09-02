import { Json } from "@/types/supabase";

export const queryKeys = {
  // mate
  matePosts: (id: string) => ["matePosts", id],
  address: (center: { lat: number; lng: number }) => ["address", center],
  geoData: ["geoData"],
  usersPets: (petIds: Json) => ["usersPets", petIds],
  userPets: (userId: string) => ["userPets", userId],
};