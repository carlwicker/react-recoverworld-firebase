import { useEffect } from "react";
import DigitalReleaseItem from "./digitalReleaseItem/DigitalReleaseItem";

interface IDigitalReleaseList {
  releases: any;
  updateReleaseList: Function;
  labelFilteredResults: any;
}

export default function DigitalReleaseList({
  updateReleaseList,
  labelFilteredResults,
}: IDigitalReleaseList) {
  return (
    <>
      {labelFilteredResults?.map((release: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <DigitalReleaseItem
              release={release}
              updateReleaseList={updateReleaseList}
            />
          </div>
        );
      })}
    </>
  );
}
