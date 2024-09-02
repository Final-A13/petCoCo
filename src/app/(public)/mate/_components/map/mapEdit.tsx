"use client";

import { locationStore } from "@/zustand/locationStore";
import { useEffect } from "react";
import { Map, MapMarker, MapTypeControl, ZoomControl, CustomOverlayMap } from "react-kakao-maps-sdk";

interface MapComponentProps {
  center: { lat: number; lng: number };
  isEditing?: boolean;
  dbPosition?: { lat: number; lng: number };
}

const MapEdit = ({ center, isEditing, dbPosition }: MapComponentProps) => {
  const { position, setPosition } = locationStore();

  useEffect(() => {
    if (isEditing && dbPosition) {
      setPosition({
        center: dbPosition,
        isLoading: false
      });
    }
  }, []);

  return (
    <>
      <Map
        center={position.center}
        style={{ width: "100%", height: "19.3125rem", borderRadius: "0.5rem" }}
        level={5}
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({
            center: {
              lat: latlng.getLat(),
              lng: latlng.getLng()
            }
          });
        }}
      >
        <MapMarker
          position={position.center}
          image={{
            src: "/assets/svg/ph_paw.svg",
            size: {
              width: 30,
              height: 30
            },
            options: {
              offset: {
                x: 15,
                y: 30
              }
            }
          }}
        ></MapMarker>
        <CustomOverlayMap position={position.center} yAnchor={1} xAnchor={0}>
          <div className="relative -translate-y-10 rounded-[1rem] bg-[#61646B] px-[1rem] py-[0.5rem] text-white before:absolute before:bottom-[-10px] before:left-[10px] before:h-0 before:w-0 before:border-b-[0.5rem] before:border-l-[0.5rem] before:border-r-[0.5rem] before:border-t-[0.5rem] before:border-b-transparent before:border-l-[#61646B] before:border-r-transparent before:border-t-[#61646B] before:content-['']">
            <span>산책 장소</span>
          </div>
        </CustomOverlayMap>
        <MapTypeControl position={"BOTTOMLEFT"} />
        <ZoomControl position={"RIGHT"} />
      </Map>
    </>
  );
};

export default MapEdit;
