import { Card, Container } from "react-bootstrap";
import { useEffect } from "react";
import DigitalReleaseItem from "./DigitalReleaseItem";

interface IDigitalTracklisting {
  releases: any;
}

export default function DigitalTracklisting({
  releases,
}: IDigitalTracklisting) {
  useEffect(() => {}, []);

  return (
    <>
      {releases.map((release: any, index: number) => {
        return <DigitalReleaseItem key={index} release={release} />;
      })}
    </>
  );
}
