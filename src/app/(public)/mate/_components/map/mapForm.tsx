"use client";

import { locationStore } from "@/zustand/locationStore";
import { useState, useEffect } from "react";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
  CustomOverlayMap,
  RoadviewMarker,
  Roadview,
  CustomOverlayRoadview
} from "react-kakao-maps-sdk";
import ToggleButton from "./toggleButton";

interface MapComponentProps {
  center: { lat: number; lng: number };
}

const MapForm = ({ center }: MapComponentProps) => {
  const { position, setPosition } = locationStore();
  const [toggle, setToggle] = useState<"map" | "roadview">("map");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          });
        },
        (error) => {
          setPosition({
            center: center,
            errMsg: error.message,
            isLoading: false
          });
        }
      );
    } else {
      setPosition({
        center: center,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false
      });
    }
  }, []);

  return (
    <div className="relative">
      {toggle === "map" ? (
        <Map
          center={position.center}
          style={{ width: "100%", height: "19.3125rem", borderRadius: "0.5rem" }}
          level={4}
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
      ) : (
        <Roadview
          position={{ ...position.center, radius: 50 }}
          style={{
            width: "100%",
            height: "19.3125rem",
            borderRadius: "0.5rem"
          }}
        >
          <RoadviewMarker
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
          />
          <CustomOverlayRoadview position={position.center} yAnchor={1} xAnchor={0}>
            <div className="relative -translate-y-10 rounded-[1rem] bg-[#61646B] px-[1rem] py-[0.5rem] text-white before:absolute before:bottom-[-10px] before:left-[10px] before:h-0 before:w-0 before:border-b-[0.5rem] before:border-l-[0.5rem] before:border-r-[0.5rem] before:border-t-[0.5rem] before:border-b-transparent before:border-l-[#61646B] before:border-r-transparent before:border-t-[#61646B] before:content-['']">
              <span>산책 장소</span>
            </div>
          </CustomOverlayRoadview>
        </Roadview>
      )}
      <ToggleButton toggle={toggle} setToggle={setToggle}/>
    </div>
  );
};

export default MapForm;
