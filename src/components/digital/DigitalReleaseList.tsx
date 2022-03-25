import { Card, Container } from "react-bootstrap";
import { useEffect } from "react";
import DigitalReleaseItem from "./digitalReleaseItem/DigitalReleaseItem";
import IRelease from "../../interfaces/IRelease";

interface IDigitalReleaseList {
  releases: any;
  updateReleaseList: Function;
  labelFilteredResults: any;
}

export default function DigitalReleaseList({
  updateReleaseList,
  labelFilteredResults,
}: IDigitalReleaseList) {
  useEffect(() => {}, []);

  return (
    <>
      {labelFilteredResults.map((release: any, index: number) => {
        return (
          <DigitalReleaseItem
            key={index}
            release={release}
            updateReleaseList={updateReleaseList}
          />
        );
      })}
    </>
  );
}
