export type Position = {
  center: {
    lat: number;
    lng: number;
  };
  errMsg?: string | null;
  isLoading: boolean;
} | null;

// export type PositionData = {
//   center: {
//     lat: number;
//     lng: number;
//   };
//   errMsg?: string;
//   isLoading: boolean;
// } | null;