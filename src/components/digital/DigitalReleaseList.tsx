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
              display: "flex",
              flexDirection: "column",
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
