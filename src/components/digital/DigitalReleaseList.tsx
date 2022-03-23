import { Card, Container } from "react-bootstrap";
import { useEffect } from "react";
import DigitalReleaseItem from "./DigitalReleaseItem";

interface IDigitalReleaseList {
  releases: any;
  updateReleaseList: Function;
}

export default function DigitalReleaseList({
  releases,
  updateReleaseList,
}: IDigitalReleaseList) {
  useEffect(() => {}, []);

  return (
    <>
      {releases.map((release: any, index: number) => {
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
