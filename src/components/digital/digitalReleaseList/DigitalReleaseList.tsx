import { Container } from "react-bootstrap";
import DigitalReleaseItem from "../digitalReleaseItem/DigitalReleaseItem";

interface IDigitalReleaseList {
  updateReleaseList: Function;
  labelFilteredResults: any;
  isAdmin: boolean;
}

export default function DigitalReleaseList({
  updateReleaseList,
  labelFilteredResults,
  isAdmin,
}: IDigitalReleaseList) {
  return (
    <>
      {labelFilteredResults?.map((release: any, index: number) => {
        return (
          <DigitalReleaseItem
            key={index}
            release={release}
            updateReleaseList={updateReleaseList}
            isAdmin={isAdmin}
          />
        );
      })}
    </>
  );
}
